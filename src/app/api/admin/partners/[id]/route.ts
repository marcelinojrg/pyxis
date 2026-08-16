import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/requireAdmin';
import { partnerSchema } from '@/validations';
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
    const validated = partnerSchema.safeParse(body);

    if (!validated.success) {
      return handleZodError(validated.error);
    }

    const partner = await prisma.partner.update({
      where: { id: numId },
      data: validated.data,
    });

    return successResponse(partner);
  } catch {
    return errorResponse('Gagal memperbarui data mitra', 'SERVER_ERROR', 500);
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

    await prisma.partner.delete({
      where: { id: numId },
    });

    return successResponse({ message: 'Mitra berhasil dihapus' });
  } catch {
    return errorResponse('Gagal menghapus mitra', 'SERVER_ERROR', 500);
  }
}
