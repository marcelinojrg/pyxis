import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/requireAdmin';
import { productSchema } from '@/validations';
import { successResponse, errorResponse, handleZodError } from '@/lib/api-response';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const numId = parseInt(id, 10);
    if (isNaN(numId)) {
      return errorResponse('ID tidak valid', 'VALIDATION_ERROR', 400);
    }

    const product = await prisma.product.findUnique({
      where: { id: numId },
    });

    if (!product) {
      return errorResponse('Produk tidak ditemukan', 'NOT_FOUND', 404);
    }

    return successResponse(product);
  } catch {
    return errorResponse('Gagal mengambil detail produk', 'SERVER_ERROR', 500);
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const numId = parseInt(id, 10);
    if (isNaN(numId)) {
      return errorResponse('ID tidak valid', 'VALIDATION_ERROR', 400);
    }

    const body = await request.json();
    const validated = productSchema.safeParse(body);

    if (!validated.success) {
      return handleZodError(validated.error);
    }

    // Check slug collision
    const existing = await prisma.product.findFirst({
      where: {
        slug: validated.data.slug,
        NOT: { id: numId },
      },
    });

    if (existing) {
      return errorResponse('Slug produk sudah digunakan oleh produk lain', 'CONFLICT', 409);
    }

    const product = await prisma.product.update({
      where: { id: numId },
      data: validated.data,
    });

    return successResponse(product);
  } catch {
    return errorResponse('Gagal memperbarui produk', 'SERVER_ERROR', 500);
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

    await prisma.product.delete({
      where: { id: numId },
    });

    return successResponse({ message: 'Produk berhasil dihapus' });
  } catch {
    return errorResponse('Gagal menghapus produk', 'SERVER_ERROR', 500);
  }
}
