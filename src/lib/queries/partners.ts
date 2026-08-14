import { prisma } from '../prisma';

export async function getPartnersPageContent() {
  return await prisma.partnersPageContent.findUnique({
    where: { id: 1 },
  });
}

export async function getPartnerBenefits() {
  return await prisma.partnerBenefit.findMany({
    where: { isPublished: true },
    orderBy: { order: 'asc' },
  });
}

export async function getPublishedPartners() {
  return await prisma.partner.findMany({
    where: { isPublished: true },
    orderBy: { order: 'asc' },
  });
}
