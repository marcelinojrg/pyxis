'use server';

import { prisma } from '@/lib/prisma';
import { careerApplicationSchema, type CareerApplicationInput } from '@/schemas/careers';

export async function submitCareerApplication(data: CareerApplicationInput) {
  try {
    const validated = careerApplicationSchema.parse(data);

    const careerExists = await prisma.career.findUnique({
      where: { id: validated.careerId },
    });

    if (!careerExists) {
      return { success: false, error: 'Lowongan pekerjaan tidak ditemukan.' };
    }

    await prisma.careerApplication.create({
      data: {
        careerId: validated.careerId,
        fullName: validated.fullName,
        email: validated.email,
        phone: validated.phone,
        portfolioUrl: validated.portfolioUrl || null,
        resumeUrl: validated.resumeUrl || '#placeholder-resume',
        status: 'PENDING',
      },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Gagal mengirimkan lamaran.' };
  }
}
