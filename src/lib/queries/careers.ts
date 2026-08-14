import { prisma } from '../prisma';

export async function getCareerContent() {
  return await prisma.careerContent.findUnique({
    where: { id: 1 },
  });
}
