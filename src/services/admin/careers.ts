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
    return { success: false, data: [], error: 'Access denied.' };
  }

  const data = await prisma.career.findMany({
    select: careerSelect,
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  });
  return { success: true, data };
}

export async function getAdminCareerById(id: string) {
  if (!(await canManageCareers('read'))) return { success: false, error: 'Access denied.' };

  const data = await prisma.career.findUnique({ where: { id }, select: careerSelect });
  if (!data) return { success: false, error: 'Opening not found.' };
  return { success: true, data };
}

export async function createCareer(values: CareerValues) {
  if (!(await canManageCareers('create'))) return { success: false, error: 'Access denied.' };

  const parsed = careerSchema.safeParse(values);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || 'Opening data is invalid.',
    };
  }

  const slug = await uniqueCareerSlug(parsed.data.title);
  if (!slug) return { success: false, error: 'The title cannot be converted into a slug.' };

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
    return { success: true, data, message: 'Opening created.' };
  } catch (error) {
    console.error('[createCareer]', error);
    return { success: false, error: 'Failed to create the opening. Try again.' };
  }
}

export async function updateCareer(id: string, values: CareerValues) {
  if (!(await canManageCareers('update'))) return { success: false, error: 'Access denied.' };

  const parsed = careerSchema.safeParse(values);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || 'Opening data is invalid.',
    };
  }

  const existing = await prisma.career.findUnique({
    where: { id },
    select: { id: true, slug: true },
  });
  if (!existing) return { success: false, error: 'Opening not found.' };

  const slug = await uniqueCareerSlug(parsed.data.title, id);
  if (!slug) return { success: false, error: 'The title cannot be converted into a slug.' };

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
    return { success: true, data, message: 'Opening updated.' };
  } catch (error) {
    console.error('[updateCareer]', error);
    return { success: false, error: 'Failed to update the opening. Try again.' };
  }
}

export async function deleteCareerById(id: string) {
  if (!(await canManageCareers('delete'))) return { success: false, error: 'Access denied.' };

  const existing = await prisma.career.findUnique({ where: { id }, select: { slug: true } });
  if (!existing) return { success: false, error: 'Opening not found.' };

  try {
    await prisma.career.delete({ where: { id } });
    await createAuditLog({
      action: 'delete',
      table: 'careers',
      recordId: id,
      oldValues: JSON.stringify(existing),
    });
    revalidateCareers(existing.slug);
    return { success: true, message: 'Opening deleted.' };
  } catch (error) {
    console.error('[deleteCareerById]', error);
    return { success: false, error: 'Failed to delete the opening. Try again.' };
  }
}

export async function getCareerCategories() {
  if (!(await canManageCareerCategories('read'))) {
    return { success: false, data: [], error: 'Access denied.' };
  }

  const data = await prisma.careerCategory.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { careers: true } } },
  });
  return { success: true, data };
}

export async function createCareerCategory(name: string) {
  if (!(await canManageCareerCategories('create'))) {
    return { success: false, error: 'Access denied.' };
  }

  const parsed = careerCategorySchema.safeParse({ name });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Category is invalid.' };
  }

  const duplicate = await prisma.careerCategory.findFirst({
    where: { name: { equals: parsed.data.name, mode: 'insensitive' } },
    select: { id: true },
  });
  if (duplicate) return { success: false, error: 'A category with this name already exists.' };

  try {
    const data = await prisma.careerCategory.create({ data: parsed.data });
    await createAuditLog({
      action: 'create',
      table: 'career_categories',
      recordId: data.id,
      newValues: JSON.stringify(data),
    });
    revalidateCareers();
    return { success: true, data, message: 'Category created.' };
  } catch (error) {
    console.error('[createCareerCategory]', error);
    return { success: false, error: 'Failed to create the category. Try again.' };
  }
}

export async function updateCareerCategory(id: string, name: string) {
  if (!(await canManageCareerCategories('update'))) {
    return { success: false, error: 'Access denied.' };
  }

  const parsed = careerCategorySchema.safeParse({ name });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Category is invalid.' };
  }

  const [existing, duplicate] = await Promise.all([
    prisma.careerCategory.findUnique({ where: { id } }),
    prisma.careerCategory.findFirst({
      where: { name: { equals: parsed.data.name, mode: 'insensitive' }, NOT: { id } },
      select: { id: true },
    }),
  ]);
  if (!existing) return { success: false, error: 'Category not found.' };
  if (duplicate) return { success: false, error: 'A category with this name already exists.' };

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
    return { success: true, data, message: 'Category updated.' };
  } catch (error) {
    console.error('[updateCareerCategory]', error);
    return { success: false, error: 'Failed to update the category. Try again.' };
  }
}

export async function deleteCareerCategory(id: string) {
  if (!(await canManageCareerCategories('delete'))) {
    return { success: false, error: 'Access denied.' };
  }

  const category = await prisma.careerCategory.findUnique({
    where: { id },
    include: { _count: { select: { careers: true } } },
  });
  if (!category) return { success: false, error: 'Category not found.' };
  if (category._count.careers > 0) {
    return {
      success: false,
      error: `This category is still used by ${category._count.careers} openings.`,
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
    return { success: true, message: 'Category deleted.' };
  } catch (error) {
    console.error('[deleteCareerCategory]', error);
    return { success: false, error: 'Failed to delete the category. Try again.' };
  }
}
