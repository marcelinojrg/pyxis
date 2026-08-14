import { prisma } from '../prisma';

export async function getHeroSection() {
  return await prisma.heroSection.findUnique({
    where: { id: 1 },
  });
}

export async function getHomeHighlights() {
  return await prisma.homeHighlight.findMany({
    where: { isPublished: true },
    orderBy: { order: 'asc' },
  });
}
