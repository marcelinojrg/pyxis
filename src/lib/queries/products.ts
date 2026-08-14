import { prisma } from '../prisma';

export async function getPublishedProducts() {
  return await prisma.product.findMany({
    where: { isPublished: true },
    orderBy: { order: 'asc' },
  });
}

export async function getFeaturedProducts() {
  return await prisma.product.findMany({
    where: { isPublished: true, isFeatured: true },
    orderBy: { order: 'asc' },
  });
}

export async function getProductBySlug(slug: string) {
  return await prisma.product.findUnique({
    where: { slug },
  });
}
