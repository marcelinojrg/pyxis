import { prisma } from '../prisma';

export async function getSiteSettings() {
  return await prisma.siteSettings.findUnique({
    where: { id: 1 },
  });
}
