import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/requireAdmin';
import { productSchema } from '@/validations';
import { successResponse, errorResponse, handleZodError } from '@/lib/api-response';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { order: 'asc' },
    });
    return successResponse(products);
  } catch {
    return errorResponse('Gagal mengambil daftar produk', 'SERVER_ERROR', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const validated = productSchema.safeParse(body);

    if (!validated.success) {
      return handleZodError(validated.error);
    }

    // Check slug uniqueness
    const existing = await prisma.product.findUnique({
      where: { slug: validated.data.slug },
    });
    if (existing) {
      return errorResponse('Slug produk sudah digunakan', 'CONFLICT', 409);
    }

    const product = await prisma.product.create({
      data: validated.data,
    });

    return successResponse(product, 201);
  } catch {
    return errorResponse('Gagal membuat produk baru', 'SERVER_ERROR', 500);
  }
}
