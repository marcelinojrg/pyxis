import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/requireAdmin';
import { partnerBenefitSchema } from '@/validations';
import { successResponse, errorResponse, handleZodError } from '@/lib/api-response';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const numId = parseInt(id, 10);
    if (isNaN(numId)) {
      return errorResponse('ID tidak valid', 'VALIDATION_ERROR', 400);
    }

    const body = await request.json();
    const validated = partnerBenefitSchema.safeParse(body);

    if (!validated.success) {
      return handleZodError(validated.error);
    }

    const benefit = await prisma.partnerBenefit.update({
      where: { id: numId },
      data: validated.data,
    });

    return successResponse(benefit);
  } catch {
    return errorResponse('Gagal memperbarui benefit mitra', 'SERVER_ERROR', 500);
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const numId = parseInt(id, 10);
    if (isNaN(numId)) {
      return errorResponse('ID tidak valid', 'VALIDATION_ERROR', 400);
    }

    await prisma.partnerBenefit.delete({
      where: { id: numId },
    });

    return successResponse({ message: 'Benefit mitra berhasil dihapus' });
  } catch {
    return errorResponse('Gagal menghapus benefit mitra', 'SERVER_ERROR', 500);
  }
}
