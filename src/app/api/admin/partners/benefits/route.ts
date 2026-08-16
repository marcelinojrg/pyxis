import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/requireAdmin';
import { partnerBenefitSchema } from '@/validations';
import { successResponse, errorResponse, handleZodError } from '@/lib/api-response';

export async function GET() {
  try {
    const benefits = await prisma.partnerBenefit.findMany({
      orderBy: { order: 'asc' },
    });
    return successResponse(benefits);
  } catch {
    return errorResponse('Gagal mengambil data benefit mitra', 'SERVER_ERROR', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const validated = partnerBenefitSchema.safeParse(body);

    if (!validated.success) {
      return handleZodError(validated.error);
    }

    const benefit = await prisma.partnerBenefit.create({
      data: validated.data,
    });

    return successResponse(benefit, 201);
  } catch {
    return errorResponse('Gagal membuat benefit mitra baru', 'SERVER_ERROR', 500);
  }
}
