import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/requireAdmin';
import { legalSchema } from '@/validations';
import { successResponse, errorResponse, handleZodError } from '@/lib/api-response';

export async function GET() {
  try {
    const legal = await prisma.legalContent.findUnique({
      where: { id: 1 },
    });
    return successResponse(legal);
  } catch {
    return errorResponse('Gagal mengambil data legal', 'SERVER_ERROR', 500);
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const validated = legalSchema.safeParse(body);

    if (!validated.success) {
      return handleZodError(validated.error);
    }

    const legal = await prisma.legalContent.upsert({
      where: { id: 1 },
      update: validated.data,
      create: { id: 1, ...validated.data },
    });

    return successResponse(legal);
  } catch {
    return errorResponse('Gagal memperbarui konten legal', 'SERVER_ERROR', 500);
  }
}
