import { prisma } from '../prisma';

export async function getAboutContent() {
  return await prisma.aboutContent.findUnique({
    where: { id: 1 },
  });
}
