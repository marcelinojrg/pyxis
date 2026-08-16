import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/requireAdmin';
import { careerSchema } from '@/validations';
import { successResponse, errorResponse, handleZodError } from '@/lib/api-response';

export async function GET() {
  try {
    const career = await prisma.careerContent.findUnique({
      where: { id: 1 },
    });
    return successResponse(career);
  } catch {
    return errorResponse('Gagal mengambil data karir', 'SERVER_ERROR', 500);
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const validated = careerSchema.safeParse(body);

    if (!validated.success) {
      return handleZodError(validated.error);
    }

    const career = await prisma.careerContent.upsert({
      where: { id: 1 },
      update: validated.data,
      create: { id: 1, ...validated.data },
    });

    return successResponse(career);
  } catch {
    return errorResponse('Gagal memperbarui data karir', 'SERVER_ERROR', 500);
  }
}
