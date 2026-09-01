'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/utils';
import { careerCategorySchema, careerSchema, type CareerValues } from '@/schemas/careers';
import { createAuditLog, verifyPermission } from './security';

const careerSelect = {
  id: true,
  categoryId: true,
  title: true,
  slug: true,
  location: true,
  type: true,
  department: true,
  description: true,
  responsibilities: true,
  requirements: true,
  order: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
  category: { select: { id: true, name: true } },
} as const;

type CareerAction = 'read' | 'create' | 'update' | 'delete';

async function canManageCareers(action: CareerAction) {
  return verifyPermission(`career.${action}`);
}

async function canManageCareerCategories(action: CareerAction) {
  return verifyPermission(`career.category.${action}`);
}

function revalidateCareers(slug?: string) {
  revalidatePath('/admin/careers');
  revalidatePath('/admin');
  revalidatePath('/careers');
  revalidatePath('/sitemap.xml');
  if (slug) revalidatePath(`/careers/${slug}`);
}

async function uniqueCareerSlug(title: string, id?: string) {
  const base = slugify(title);
  if (!base) return null;

  let slug = base;
  let suffix = 2;
  while (
    await prisma.career.findFirst({
      where: { slug, ...(id ? { NOT: { id } } : {}) },
      select: { id: true },
    })
  ) {
    slug = `${base}-${suffix++}`;
  }
  return slug;
}

export async function getAdminCareers() {
  if (!(await canManageCareers('read'))) {
    return { success: false, data: [], error: 'Akses ditolak.' };
  }

  const data = await prisma.career.findMany({
    select: careerSelect,
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  });
  return { success: true, data };
}

export async function getAdminCareerById(id: string) {
  if (!(await canManageCareers('read'))) return { success: false, error: 'Akses ditolak.' };

  const data = await prisma.career.findUnique({ where: { id }, select: careerSelect });
  if (!data) return { success: false, error: 'Lowongan tidak ditemukan.' };
  return { success: true, data };
}

export async function createCareer(values: CareerValues) {
  if (!(await canManageCareers('create'))) return { success: false, error: 'Akses ditolak.' };

  const parsed = careerSchema.safeParse(values);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || 'Data lowongan tidak valid.',
    };
  }

  const slug = await uniqueCareerSlug(parsed.data.title);
  if (!slug) return { success: false, error: 'Judul tidak dapat dijadikan slug.' };

  try {
    const data = await prisma.career.create({
      data: {
        ...parsed.data,
        categoryId: parsed.data.categoryId || null,
        department: parsed.data.department || null,
        slug,
      },
      select: careerSelect,
    });
    await createAuditLog({
      action: 'create',
      table: 'careers',
      recordId: data.id,
      newValues: JSON.stringify(data),
    });
    revalidateCareers(slug);
    return { success: true, data, message: 'Lowongan berhasil dibuat.' };
  } catch (error) {
    console.error('[createCareer]', error);
    return { success: false, error: 'Lowongan gagal dibuat. Coba lagi.' };
  }
}

export async function updateCareer(id: string, values: CareerValues) {
  if (!(await canManageCareers('update'))) return { success: false, error: 'Akses ditolak.' };

  const parsed = careerSchema.safeParse(values);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || 'Data lowongan tidak valid.',
    };
  }

  const existing = await prisma.career.findUnique({
    where: { id },
    select: { id: true, slug: true },
  });
  if (!existing) return { success: false, error: 'Lowongan tidak ditemukan.' };

  const slug = await uniqueCareerSlug(parsed.data.title, id);
  if (!slug) return { success: false, error: 'Judul tidak dapat dijadikan slug.' };

  try {
    const data = await prisma.career.update({
      where: { id },
      data: {
        ...parsed.data,
        categoryId: parsed.data.categoryId || null,
        department: parsed.data.department || null,
        slug,
      },
      select: careerSelect,
    });
    await createAuditLog({
      action: 'update',
      table: 'careers',
      recordId: data.id,
      oldValues: JSON.stringify(existing),
      newValues: JSON.stringify(data),
    });
    revalidateCareers(existing.slug);
    if (slug !== existing.slug) revalidateCareers(slug);
    return { success: true, data, message: 'Lowongan berhasil diperbarui.' };
  } catch (error) {
    console.error('[updateCareer]', error);
    return { success: false, error: 'Lowongan gagal diperbarui. Coba lagi.' };
  }
}

export async function deleteCareerById(id: string) {
  if (!(await canManageCareers('delete'))) return { success: false, error: 'Akses ditolak.' };

  const existing = await prisma.career.findUnique({ where: { id }, select: { slug: true } });
  if (!existing) return { success: false, error: 'Lowongan tidak ditemukan.' };

  try {
    await prisma.career.delete({ where: { id } });
    await createAuditLog({
      action: 'delete',
      table: 'careers',
      recordId: id,
      oldValues: JSON.stringify(existing),
    });
    revalidateCareers(existing.slug);
    return { success: true, message: 'Lowongan berhasil dihapus.' };
  } catch (error) {
    console.error('[deleteCareerById]', error);
    return { success: false, error: 'Lowongan gagal dihapus. Coba lagi.' };
  }
}

export async function getCareerCategories() {
  if (!(await canManageCareerCategories('read'))) {
    return { success: false, data: [], error: 'Akses ditolak.' };
  }

  const data = await prisma.careerCategory.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { careers: true } } },
  });
  return { success: true, data };
}

export async function createCareerCategory(name: string) {
  if (!(await canManageCareerCategories('create'))) {
    return { success: false, error: 'Akses ditolak.' };
  }

  const parsed = careerCategorySchema.safeParse({ name });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Kategori tidak valid.' };
  }

  const duplicate = await prisma.careerCategory.findFirst({
    where: { name: { equals: parsed.data.name, mode: 'insensitive' } },
    select: { id: true },
  });
  if (duplicate) return { success: false, error: 'Kategori dengan nama ini sudah ada.' };

  try {
    const data = await prisma.careerCategory.create({ data: parsed.data });
    await createAuditLog({
      action: 'create',
      table: 'career_categories',
      recordId: data.id,
      newValues: JSON.stringify(data),
    });
    revalidateCareers();
    return { success: true, data, message: 'Kategori berhasil dibuat.' };
  } catch (error) {
    console.error('[createCareerCategory]', error);
    return { success: false, error: 'Kategori gagal dibuat. Coba lagi.' };
  }
}

export async function updateCareerCategory(id: string, name: string) {
  if (!(await canManageCareerCategories('update'))) {
    return { success: false, error: 'Akses ditolak.' };
  }

  const parsed = careerCategorySchema.safeParse({ name });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Kategori tidak valid.' };
  }

  const [existing, duplicate] = await Promise.all([
    prisma.careerCategory.findUnique({ where: { id } }),
    prisma.careerCategory.findFirst({
      where: { name: { equals: parsed.data.name, mode: 'insensitive' }, NOT: { id } },
      select: { id: true },
    }),
  ]);
  if (!existing) return { success: false, error: 'Kategori tidak ditemukan.' };
  if (duplicate) return { success: false, error: 'Kategori dengan nama ini sudah ada.' };

  try {
    const data = await prisma.careerCategory.update({ where: { id }, data: parsed.data });
    await createAuditLog({
      action: 'update',
      table: 'career_categories',
      recordId: data.id,
      oldValues: JSON.stringify(existing),
      newValues: JSON.stringify(data),
    });
    revalidateCareers();
    return { success: true, data, message: 'Kategori berhasil diperbarui.' };
  } catch (error) {
    console.error('[updateCareerCategory]', error);
    return { success: false, error: 'Kategori gagal diperbarui. Coba lagi.' };
  }
}

export async function deleteCareerCategory(id: string) {
  if (!(await canManageCareerCategories('delete'))) {
    return { success: false, error: 'Akses ditolak.' };
  }

  const category = await prisma.careerCategory.findUnique({
    where: { id },
    include: { _count: { select: { careers: true } } },
  });
  if (!category) return { success: false, error: 'Kategori tidak ditemukan.' };
  if (category._count.careers > 0) {
    return {
      success: false,
      error: `Kategori masih digunakan oleh ${category._count.careers} lowongan.`,
    };
  }

  try {
    await prisma.careerCategory.delete({ where: { id } });
    await createAuditLog({
      action: 'delete',
      table: 'career_categories',
      recordId: id,
      oldValues: JSON.stringify(category),
    });
    revalidateCareers();
    return { success: true, message: 'Kategori berhasil dihapus.' };
  } catch (error) {
    console.error('[deleteCareerCategory]', error);
    return { success: false, error: 'Kategori gagal dihapus. Coba lagi.' };
  }
}
