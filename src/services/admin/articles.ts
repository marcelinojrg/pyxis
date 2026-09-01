'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/utils';
import type {
  Article,
  ArticleCategoryListResponse,
  ArticleCategoryResponse,
  ArticlePaginationResponse,
  ArticleResponse,
} from '@/interfaces/features/articles';
import {
  articleCategorySchema,
  articleSchema,
  type ArticleCategoryValues,
  type ArticleValues,
} from '@/schemas/articles';
import { createAuditLog, verifyPermission, verifySession } from './security';

const ADMIN_PATH = '/admin/blog';
const PUBLIC_PATH = '/blog';

const articleSelect = {
  id: true,
  title: true,
  slug: true,
  content: true,
  cover: true,
  isPublished: true,
  publishedAt: true,
  createdAt: true,
  updatedAt: true,
  createdById: true,
  articleCategories: {
    select: { id: true, name: true, createdAt: true, updatedAt: true },
    orderBy: { name: 'asc' as const },
  },
} as const;

async function canManageArticle(action: 'read' | 'create' | 'update' | 'delete') {
  return (await verifyPermission(`article.${action}`)) || (await verifyPermission('admin.access'));
}

async function canManageCategory(action: 'read' | 'create' | 'update' | 'delete') {
  return (
    (await verifyPermission(`article.category.${action}`)) ||
    (await verifyPermission('admin.access'))
  );
}

function revalidateArticles(...slugs: Array<string | null | undefined>) {
  revalidatePath('/admin');
  revalidatePath(ADMIN_PATH);
  revalidatePath(PUBLIC_PATH);
  revalidatePath('/sitemap.xml');
  for (const slug of new Set(slugs.filter(Boolean))) revalidatePath(`/blog/${slug}`);
}

async function uniqueSlug(title: string, id?: string) {
  const base = slugify(title).slice(0, 120);
  if (!base) return null;

  let candidate = base;
  let suffix = 2;
  while (
    await prisma.article.findFirst({
      where: { slug: candidate, ...(id ? { NOT: { id } } : {}) },
      select: { id: true },
    })
  ) {
    candidate = `${base.slice(0, 114)}-${suffix++}`;
  }
  return candidate;
}

async function validCategoryConnections(categoryIds: string[]) {
  const ids = [...new Set(categoryIds)];
  const categories = await prisma.articleCategory.findMany({
    where: { id: { in: ids } },
    select: { id: true },
  });
  return categories.length === ids.length ? categories : null;
}

export async function getArticles(
  page = 1,
  limit = 100,
  search = ''
): Promise<ArticlePaginationResponse> {
  if (!(await canManageArticle('read'))) {
    return {
      success: false,
      data: [],
      meta: { total: 0, page: 1, lastPage: 1 },
      error: 'Akses ditolak.',
    };
  }

  const safePage = Math.max(1, Math.floor(page));
  const safeLimit = Math.min(100, Math.max(1, Math.floor(limit)));
  const query = search.trim().slice(0, 100);
  const where = query
    ? {
        OR: [
          { title: { contains: query, mode: 'insensitive' as const } },
          { slug: { contains: query, mode: 'insensitive' as const } },
          {
            articleCategories: {
              some: { name: { contains: query, mode: 'insensitive' as const } },
            },
          },
        ],
      }
    : {};

  try {
    const [data, total] = await Promise.all([
      prisma.article.findMany({
        where,
        select: articleSelect,
        orderBy: [{ updatedAt: 'desc' }, { title: 'asc' }],
        skip: (safePage - 1) * safeLimit,
        take: safeLimit,
      }),
      prisma.article.count({ where }),
    ]);
    return {
      success: true,
      data: data as Article[],
      meta: { total, page: safePage, lastPage: Math.max(1, Math.ceil(total / safeLimit)) },
    };
  } catch (error) {
    console.error('[getArticles]', error);
    return {
      success: false,
      data: [],
      meta: { total: 0, page: safePage, lastPage: 1 },
      error: 'Artikel gagal dimuat.',
    };
  }
}

export async function getArticleById(id: string): Promise<ArticleResponse> {
  if (!(await canManageArticle('read'))) return { success: false, error: 'Akses ditolak.' };

  const data = await prisma.article.findUnique({ where: { id }, select: articleSelect });
  if (!data) return { success: false, error: 'Artikel tidak ditemukan.' };
  return { success: true, data: data as Article };
}

export async function createArticle(values: ArticleValues): Promise<ArticleResponse> {
  if (!(await canManageArticle('create'))) return { success: false, error: 'Akses ditolak.' };

  const parsed = articleSchema.safeParse(values);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || 'Data artikel tidak valid.',
    };
  }

  const session = await verifySession();
  if (!session?.user) return { success: false, error: 'Sesi Anda telah berakhir.' };

  const [slug, categories] = await Promise.all([
    uniqueSlug(parsed.data.title),
    validCategoryConnections(parsed.data.categoryIds),
  ]);
  if (!slug) return { success: false, error: 'Judul tidak dapat dijadikan slug.' };
  if (!categories) return { success: false, error: 'Satu atau lebih kategori tidak ditemukan.' };

  try {
    const data = await prisma.article.create({
      data: {
        title: parsed.data.title,
        slug,
        content: parsed.data.content,
        cover: parsed.data.cover || null,
        isPublished: parsed.data.isPublished,
        publishedAt: parsed.data.isPublished ? new Date() : null,
        createdById: session.user.id,
        articleCategories: { connect: categories },
      },
      select: articleSelect,
    });
    await createAuditLog({
      action: 'create',
      table: 'articles',
      recordId: data.id,
      newValues: JSON.stringify(data),
    });
    revalidateArticles(slug);
    return {
      success: true,
      data: data as Article,
      message: parsed.data.isPublished
        ? 'Artikel berhasil diterbitkan.'
        : 'Draft berhasil disimpan.',
    };
  } catch (error) {
    console.error('[createArticle]', error);
    return { success: false, error: 'Artikel gagal disimpan. Coba lagi.' };
  }
}

export async function updateArticleById(
  id: string,
  values: ArticleValues
): Promise<ArticleResponse> {
  if (!(await canManageArticle('update'))) return { success: false, error: 'Akses ditolak.' };

  const parsed = articleSchema.safeParse(values);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || 'Data artikel tidak valid.',
    };
  }

  const existing = await prisma.article.findUnique({
    where: { id },
    select: { id: true, slug: true, isPublished: true, publishedAt: true },
  });
  if (!existing) return { success: false, error: 'Artikel tidak ditemukan.' };

  const [slug, categories] = await Promise.all([
    uniqueSlug(parsed.data.title, id),
    validCategoryConnections(parsed.data.categoryIds),
  ]);
  if (!slug) return { success: false, error: 'Judul tidak dapat dijadikan slug.' };
  if (!categories) return { success: false, error: 'Satu atau lebih kategori tidak ditemukan.' };

  const publishedAt = parsed.data.isPublished
    ? existing.isPublished
      ? existing.publishedAt || new Date()
      : new Date()
    : null;

  try {
    const data = await prisma.article.update({
      where: { id },
      data: {
        title: parsed.data.title,
        slug,
        content: parsed.data.content,
        cover: parsed.data.cover || null,
        isPublished: parsed.data.isPublished,
        publishedAt,
        articleCategories: { set: [], connect: categories },
      },
      select: articleSelect,
    });
    await createAuditLog({
      action: 'update',
      table: 'articles',
      recordId: data.id,
      oldValues: JSON.stringify(existing),
      newValues: JSON.stringify(data),
    });
    revalidateArticles(existing.slug, slug);
    return {
      success: true,
      data: data as Article,
      message: parsed.data.isPublished
        ? 'Artikel berhasil diperbarui dan diterbitkan.'
        : 'Draft berhasil diperbarui.',
    };
  } catch (error) {
    console.error('[updateArticleById]', error);
    return { success: false, error: 'Artikel gagal diperbarui. Coba lagi.' };
  }
}

export async function deleteArticleById(id: string): Promise<ArticleResponse> {
  if (!(await canManageArticle('delete'))) return { success: false, error: 'Akses ditolak.' };

  const existing = await prisma.article.findUnique({ where: { id }, select: { slug: true } });
  if (!existing) return { success: false, error: 'Artikel tidak ditemukan.' };

  try {
    await prisma.article.delete({ where: { id } });
    await createAuditLog({
      action: 'delete',
      table: 'articles',
      recordId: id,
      oldValues: JSON.stringify(existing),
    });
    revalidateArticles(existing.slug);
    return { success: true, message: 'Artikel berhasil dihapus.' };
  } catch (error) {
    console.error('[deleteArticleById]', error);
    return { success: false, error: 'Artikel gagal dihapus. Coba lagi.' };
  }
}

export async function deleteBulkArticles(ids: string[]): Promise<ArticleResponse> {
  if (!(await canManageArticle('delete'))) return { success: false, error: 'Akses ditolak.' };

  const validIds = [...new Set(ids.filter((id) => /^[0-9a-f-]{36}$/i.test(id)))].slice(0, 100);
  if (!validIds.length) return { success: false, error: 'Pilih artikel yang akan dihapus.' };

  try {
    await prisma.article.deleteMany({ where: { id: { in: validIds } } });
    await Promise.all(
      validIds.map((recordId) => createAuditLog({ action: 'delete', table: 'articles', recordId }))
    );
    revalidateArticles();
    return { success: true, message: `${validIds.length} artikel berhasil dihapus.` };
  } catch (error) {
    console.error('[deleteBulkArticles]', error);
    return { success: false, error: 'Artikel gagal dihapus. Coba lagi.' };
  }
}

export async function getCategories(): Promise<ArticleCategoryListResponse> {
  if (!(await canManageCategory('read'))) {
    return { success: false, data: [], error: 'Akses ditolak.' };
  }

  try {
    const categories = await prisma.articleCategory.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { articles: true } } },
    });
    return {
      success: true,
      data: categories.map(({ _count, ...category }) => ({
        ...category,
        articleCount: _count.articles,
      })),
    };
  } catch (error) {
    console.error('[getCategories]', error);
    return { success: false, data: [], error: 'Kategori gagal dimuat.' };
  }
}

export async function createCategory(
  values: ArticleCategoryValues
): Promise<ArticleCategoryResponse> {
  if (!(await canManageCategory('create'))) return { success: false, error: 'Akses ditolak.' };

  const parsed = articleCategorySchema.safeParse(values);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };

  const exists = await prisma.articleCategory.findFirst({
    where: { name: { equals: parsed.data.name, mode: 'insensitive' } },
    select: { id: true },
  });
  if (exists) return { success: false, error: 'Kategori dengan nama ini sudah ada.' };

  try {
    const data = await prisma.articleCategory.create({ data: parsed.data });
    await createAuditLog({
      action: 'create',
      table: 'article_categories',
      recordId: data.id,
      newValues: JSON.stringify(data),
    });
    revalidateArticles();
    return { success: true, data, message: 'Kategori berhasil dibuat.' };
  } catch (error) {
    console.error('[createCategory]', error);
    return { success: false, error: 'Kategori gagal dibuat. Coba lagi.' };
  }
}

export async function updateCategory(
  id: string,
  values: ArticleCategoryValues
): Promise<ArticleCategoryResponse> {
  if (!(await canManageCategory('update'))) return { success: false, error: 'Akses ditolak.' };

  const parsed = articleCategorySchema.safeParse(values);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };

  const [category, conflict] = await Promise.all([
    prisma.articleCategory.findUnique({ where: { id } }),
    prisma.articleCategory.findFirst({
      where: { name: { equals: parsed.data.name, mode: 'insensitive' }, NOT: { id } },
      select: { id: true },
    }),
  ]);
  if (!category) return { success: false, error: 'Kategori tidak ditemukan.' };
  if (conflict) return { success: false, error: 'Kategori dengan nama ini sudah ada.' };

  try {
    const data = await prisma.articleCategory.update({ where: { id }, data: parsed.data });
    await createAuditLog({
      action: 'update',
      table: 'article_categories',
      recordId: data.id,
      oldValues: JSON.stringify(category),
      newValues: JSON.stringify(data),
    });
    revalidateArticles();
    return { success: true, data, message: 'Kategori berhasil diperbarui.' };
  } catch (error) {
    console.error('[updateCategory]', error);
    return { success: false, error: 'Kategori gagal diperbarui. Coba lagi.' };
  }
}

export async function deleteCategory(id: string): Promise<ArticleCategoryResponse> {
  if (!(await canManageCategory('delete'))) return { success: false, error: 'Akses ditolak.' };

  const category = await prisma.articleCategory.findUnique({
    where: { id },
    include: { _count: { select: { articles: true } } },
  });
  if (!category) return { success: false, error: 'Kategori tidak ditemukan.' };
  if (category._count.articles > 0) {
    return { success: false, error: 'Kategori masih digunakan oleh artikel.' };
  }

  try {
    await prisma.articleCategory.delete({ where: { id } });
    await createAuditLog({
      action: 'delete',
      table: 'article_categories',
      recordId: id,
      oldValues: JSON.stringify(category),
    });
    revalidateArticles();
    return { success: true, message: 'Kategori berhasil dihapus.' };
  } catch (error) {
    console.error('[deleteCategory]', error);
    return { success: false, error: 'Kategori gagal dihapus. Coba lagi.' };
  }
}
