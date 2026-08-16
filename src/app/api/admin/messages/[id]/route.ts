import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/requireAdmin';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const numId = parseInt(id, 10);
    if (isNaN(numId)) {
      return errorResponse('ID tidak valid', 'VALIDATION_ERROR', 400);
    }

    const body = await request.json();
    const isRead = Boolean(body.isRead);

    const updated = await prisma.contactMessage.update({
      where: { id: numId },
      data: { isRead },
    });

    return successResponse(updated);
  } catch {
    return errorResponse('Gagal memperbarui status pesan', 'SERVER_ERROR', 500);
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

    await prisma.contactMessage.delete({
      where: { id: numId },
    });

    return successResponse({ message: 'Pesan berhasil dihapus' });
  } catch {
    return errorResponse('Gagal menghapus pesan', 'SERVER_ERROR', 500);
  }
}
