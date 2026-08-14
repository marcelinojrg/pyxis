import { prisma } from '../prisma';

export async function getLegalContent() {
  return await prisma.legalContent.findUnique({
    where: { id: 1 },
  });
}
