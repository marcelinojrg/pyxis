import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/requireAdmin';
import { homeHighlightSchema } from '@/validations';
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
    const validated = homeHighlightSchema.safeParse(body);

    if (!validated.success) {
      return handleZodError(validated.error);
    }

    const highlight = await prisma.homeHighlight.update({
      where: { id: numId },
      data: validated.data,
    });

    return successResponse(highlight);
  } catch {
    return errorResponse('Gagal memperbarui highlight', 'SERVER_ERROR', 500);
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

    await prisma.homeHighlight.delete({
      where: { id: numId },
    });

    return successResponse({ message: 'Highlight berhasil dihapus' });
  } catch {
    return errorResponse('Gagal menghapus highlight', 'SERVER_ERROR', 500);
  }
}
