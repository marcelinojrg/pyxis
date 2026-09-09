'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/utils';
import { productSchema, type ProductValues } from '@/schemas/products';
import { deleteImage } from '@/services/public/uploads';
import { createAuditLog, verifyPermission } from './security';

const productListSelect = {
  id: true,
  name: true,
  slug: true,
  image: true,
  order: true,
  isActive: true,
} as const;

const productSelect = {
  ...productListSelect,
  description: true,
  featureSubtitle: true,
  benefits: {
    select: { id: true, title: true, description: true, icon: true, order: true },
    orderBy: { order: 'asc' as const },
  },
  features: {
    select: { id: true, title: true, description: true, icon: true, order: true },
    orderBy: { order: 'asc' as const },
  },
  capabilities: {
    select: {
      id: true,
      title: true,
      description: true,
      imageUrl: true,
      items: {
        select: { id: true, title: true, description: true, icon: true, order: true },
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
  revalidatePath('/admin');
  revalidatePath('/admin/products');
  revalidatePath('/products');
  revalidatePath('/sitemap.xml');
  if (slug) revalidatePath(`/products/${slug}`);
}

async function uniqueSlug(source: string, id?: string) {
  const base = slugify(source).replaceAll('_', '-');
  if (!base) return null;

  const matches = await prisma.product.findMany({
    where: { slug: { startsWith: base }, ...(id ? { NOT: { id } } : {}) },
    select: { slug: true },
  });
  const used = new Set(matches.map(({ slug }) => slug));
  if (!used.has(base)) return base;

  let suffix = 2;
  while (used.has(`${base}-${suffix}`)) suffix += 1;
  return `${base}-${suffix}`;
}

function itemData(items: ProductValues['features']) {
  return items.map((item, index) => ({
    title: item.title,
    description: item.description || null,
    icon: item.icon || null,
    order: index + 1,
  }));
}

function capabilityData(capabilities: ProductValues['capabilities']) {
  return capabilities.map((capability) => ({
    title: capability.title,
    description: capability.description || null,
    imageUrl: capability.imageUrl || null,
    items: { create: itemData(capability.items) },
  }));
}

function isUniqueConstraintError(error: unknown) {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002';
}

async function cleanupImages(urls: Array<string | null | undefined>) {
  const uniqueUrls = [...new Set(urls.filter((url): url is string => Boolean(url)))];
  const results = await Promise.all(uniqueUrls.map((url) => deleteImage(url)));
  results.forEach((result, index) => {
    if (!result.success) console.error('[cleanupImages]', uniqueUrls[index], result.error);
  });
}

export async function getAdminProducts() {
  if (!(await canManageProducts('read')))
    return { success: false, data: [], error: 'You do not have permission to view products.' };

  try {
    const data = await prisma.product.findMany({
      select: productListSelect,
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });
    return { success: true, data };
  } catch (error) {
    console.error('[getAdminProducts]', error);
    return { success: false, data: [], error: 'Failed to load products. Reload and try again.' };
  }
}

export async function getAdminProductById(id: string) {
  if (!(await canManageProducts('read')))
    return { success: false, error: 'You do not have permission to view products.' };
  if (!id) return { success: false, error: 'Product ID is invalid.' };

  try {
    const data = await prisma.product.findUnique({ where: { id }, select: productSelect });
    if (!data) return { success: false, error: 'Product not found.' };
    return { success: true, data };
  } catch (error) {
    console.error('[getAdminProductById]', error);
    return { success: false, error: 'Failed to load the product. Try again.' };
  }
}

export async function createProduct(values: ProductValues) {
  if (!(await canManageProducts('create')))
    return { success: false, error: 'You do not have permission to create products.' };

  const parsed = productSchema.safeParse(values);
  if (!parsed.success)
    return { success: false, error: parsed.error.issues[0]?.message || 'Product data is invalid.' };

  const slug = await uniqueSlug(parsed.data.slug || parsed.data.name);
  if (!slug) return { success: false, error: 'Product name or slug is invalid.' };

  try {
    const data = await prisma.product.create({
      data: {
        name: parsed.data.name,
        slug,
        description: parsed.data.description || null,
        featureSubtitle: parsed.data.featureSubtitle || null,
        image: parsed.data.image || null,
        order: parsed.data.order,
        isActive: parsed.data.isActive,
        benefits: { create: itemData(parsed.data.benefits) },
        features: { create: itemData(parsed.data.features) },
        capabilities: { create: capabilityData(parsed.data.capabilities) },
      },
      select: productSelect,
    });
    await createAuditLog({
      action: 'create',
      table: 'products',
      recordId: data.id,
      newValues: JSON.stringify(data),
    });
    revalidateProducts(slug);
    return { success: true, data, message: 'Product created.' };
  } catch (error) {
    console.error('[createProduct]', error);
    return {
      success: false,
      error: isUniqueConstraintError(error)
        ? 'That slug is already in use. Change the slug and try again.'
        : 'Failed to create the product. Try again.',
    };
  }
}

export async function updateProduct(id: string, values: ProductValues) {
  if (!(await canManageProducts('update')))
    return { success: false, error: 'You do not have permission to update products.' };
  if (!id) return { success: false, error: 'Product ID is invalid.' };

  const parsed = productSchema.safeParse(values);
  if (!parsed.success)
    return { success: false, error: parsed.error.issues[0]?.message || 'Product data is invalid.' };

  const existing = await prisma.product.findUnique({
    where: { id },
    select: { slug: true, image: true, capabilities: { select: { imageUrl: true } } },
  });
  if (!existing) return { success: false, error: 'Product not found.' };

  const slug = await uniqueSlug(parsed.data.slug || parsed.data.name, id);
  if (!slug) return { success: false, error: 'Product name or slug is invalid.' };

  try {
    const data = await prisma.product.update({
      where: { id },
      data: {
        name: parsed.data.name,
        slug,
        description: parsed.data.description || null,
        featureSubtitle: parsed.data.featureSubtitle || null,
        image: parsed.data.image || null,
        order: parsed.data.order,
        isActive: parsed.data.isActive,
        benefits: { deleteMany: {}, create: itemData(parsed.data.benefits) },
        features: { deleteMany: {}, create: itemData(parsed.data.features) },
        capabilities: {
          deleteMany: {},
          create: capabilityData(parsed.data.capabilities),
        },
      },
      select: productSelect,
    });
    await cleanupImages(
      [existing.image, ...existing.capabilities.map(({ imageUrl }) => imageUrl)].filter(
        (url) => url && url !== data.image
      )
    );
    await createAuditLog({
      action: 'update',
      table: 'products',
      recordId: data.id,
      oldValues: JSON.stringify(existing),
      newValues: JSON.stringify(data),
    });
    revalidateProducts(existing.slug);
    if (slug !== existing.slug) revalidateProducts(slug);
    return { success: true, data, message: 'Product updated.' };
  } catch (error) {
    console.error('[updateProduct]', error);
    return {
      success: false,
      error: isUniqueConstraintError(error)
        ? 'That slug is already in use. Change the slug and try again.'
        : 'Failed to update the product. Try again.',
    };
  }
}

export async function deleteProductById(id: string) {
  if (!(await canManageProducts('delete')))
    return { success: false, error: 'You do not have permission to delete products.' };
  if (!id) return { success: false, error: 'Product ID is invalid.' };

  const existing = await prisma.product.findUnique({
    where: { id },
    select: { slug: true, image: true, capabilities: { select: { imageUrl: true } } },
  });
  if (!existing) return { success: false, error: 'Product not found.' };

  try {
    await prisma.product.delete({ where: { id } });
    await cleanupImages([existing.image, ...existing.capabilities.map(({ imageUrl }) => imageUrl)]);
    await createAuditLog({
      action: 'delete',
      table: 'products',
      recordId: id,
      oldValues: JSON.stringify(existing),
    });
    revalidateProducts(existing.slug);
    return { success: true, message: 'Product deleted.' };
  } catch (error) {
    console.error('[deleteProductById]', error);
    return { success: false, error: 'Failed to delete the product. Try again.' };
  }
}
