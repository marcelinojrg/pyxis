'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/utils';
import { productSchema, type ProductValues } from '@/schemas/products';
import { verifyPermission } from './security';

const productSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  featureSubtitle: true,
  image: true,
  order: true,
  isActive: true,
  features: {
    select: { id: true, title: true, description: true, order: true },
    orderBy: { order: 'asc' as const },
  },
  capabilities: {
    select: {
      id: true,
      title: true,
      description: true,
      imageUrl: true,
      items: {
        select: { id: true, title: true, description: true, order: true },
        orderBy: { order: 'asc' as const },
      },
    },
    orderBy: { createdAt: 'asc' as const },
  },
} as const;

async function canManageProducts(action: 'read' | 'create' | 'update' | 'delete') {
  return (await verifyPermission(`product.${action}`)) || (await verifyPermission('admin.access'));
}

function revalidateProducts(slug?: string) {
  revalidatePath('/admin/products');
  revalidatePath('/products');
  revalidatePath('/sitemap.xml');
  if (slug) revalidatePath(`/products/${slug}`);
}

async function uniqueSlug(name: string, id?: string) {
  const base = slugify(name);
  if (!base) return null;

  let slug = base;
  let suffix = 2;
  while (
    await prisma.product.findFirst({
      where: { slug, ...(id ? { NOT: { id } } : {}) },
      select: { id: true },
    })
  ) {
    slug = `${base}-${suffix++}`;
  }
  return slug;
}

async function resolveOrder(order: ProductValues['order'], id?: string) {
  if (order !== 'last') return order;
  const last = await prisma.product.findFirst({
    where: id ? { NOT: { id } } : undefined,
    orderBy: { order: 'desc' },
    select: { order: true },
  });
  return (last?.order ?? 0) + 1;
}

function featureData(features: ProductValues['features']) {
  return features.map((feature, index) => ({
    title: feature.title,
    description: feature.description || null,
    order: index + 1,
  }));
}

function capabilityData(values: ProductValues) {
  if (
    !values.capabilityTitle &&
    !values.capabilityDescription &&
    !values.capabilityImageUrl &&
    !values.capabilityItems.length
  )
    return undefined;
  return {
    title: values.capabilityTitle || 'System Capabilities',
    description: values.capabilityDescription || null,
    imageUrl: values.capabilityImageUrl || null,
    items: {
      create: values.capabilityItems.map((item, index) => ({
        title: item.title,
        description: item.description || null,
        order: index + 1,
      })),
    },
  };
}

export async function getAdminProducts() {
  if (!(await canManageProducts('read')))
    return { success: false, data: [], error: 'Akses ditolak.' };

  const data = await prisma.product.findMany({
    select: productSelect,
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
  });
  return { success: true, data };
}

export async function getAdminProductById(id: string) {
  if (!(await canManageProducts('read'))) return { success: false, error: 'Akses ditolak.' };

  const data = await prisma.product.findUnique({ where: { id }, select: productSelect });
  if (!data) return { success: false, error: 'Produk tidak ditemukan.' };
  return { success: true, data };
}

export async function createProduct(values: ProductValues) {
  if (!(await canManageProducts('create'))) return { success: false, error: 'Akses ditolak.' };

  const parsed = productSchema.safeParse(values);
  if (!parsed.success)
    return { success: false, error: parsed.error.issues[0]?.message || 'Data produk tidak valid.' };

  const slug = await uniqueSlug(parsed.data.name);
  if (!slug) return { success: false, error: 'Nama produk tidak dapat dijadikan slug.' };
  const order = await resolveOrder(parsed.data.order);

  try {
    const data = await prisma.product.create({
      data: {
        name: parsed.data.name,
        order,
        isActive: parsed.data.isActive,
        image: parsed.data.image || null,
        description: parsed.data.description || null,
        featureSubtitle: parsed.data.featureSubtitle || null,
        slug,
        features: { create: featureData(parsed.data.features) },
        ...(capabilityData(parsed.data)
          ? { capabilities: { create: capabilityData(parsed.data) } }
          : {}),
      },
      select: productSelect,
    });
    revalidateProducts(slug);
    return { success: true, data, message: 'Produk berhasil dibuat.' };
  } catch (error) {
    console.error('[createProduct]', error);
    return { success: false, error: 'Produk gagal dibuat. Coba lagi.' };
  }
}

export async function updateProduct(id: string, values: ProductValues) {
  if (!(await canManageProducts('update'))) return { success: false, error: 'Akses ditolak.' };

  const parsed = productSchema.safeParse(values);
  if (!parsed.success)
    return { success: false, error: parsed.error.issues[0]?.message || 'Data produk tidak valid.' };

  const existing = await prisma.product.findUnique({
    where: { id },
    select: { id: true, slug: true },
  });
  if (!existing) return { success: false, error: 'Produk tidak ditemukan.' };

  const slug = await uniqueSlug(parsed.data.name, id);
  if (!slug) return { success: false, error: 'Nama produk tidak dapat dijadikan slug.' };
  const order = await resolveOrder(parsed.data.order, id);

  try {
    const data = await prisma.product.update({
      where: { id },
      data: {
        name: parsed.data.name,
        order,
        isActive: parsed.data.isActive,
        image: parsed.data.image || null,
        description: parsed.data.description || null,
        featureSubtitle: parsed.data.featureSubtitle || null,
        slug,
        features: { deleteMany: {}, create: featureData(parsed.data.features) },
        capabilities: {
          deleteMany: {},
          ...(capabilityData(parsed.data) ? { create: capabilityData(parsed.data) } : {}),
        },
      },
      select: productSelect,
    });
    revalidateProducts(existing.slug);
    if (slug !== existing.slug) revalidateProducts(slug);
    return { success: true, data, message: 'Produk berhasil diperbarui.' };
  } catch (error) {
    console.error('[updateProduct]', error);
    return { success: false, error: 'Produk gagal diperbarui. Coba lagi.' };
  }
}

export async function deleteProductById(id: string) {
  if (!(await canManageProducts('delete'))) return { success: false, error: 'Akses ditolak.' };

  const existing = await prisma.product.findUnique({ where: { id }, select: { slug: true } });
  if (!existing) return { success: false, error: 'Produk tidak ditemukan.' };

  try {
    await prisma.product.delete({ where: { id } });
    revalidateProducts(existing.slug);
    return { success: true, message: 'Produk berhasil dihapus.' };
  } catch (error) {
    console.error('[deleteProductById]', error);
    return { success: false, error: 'Produk gagal dihapus. Coba lagi.' };
  }
}
