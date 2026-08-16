import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/requireAdmin';
import { partnersPageContentSchema } from '@/validations';
import { successResponse, errorResponse, handleZodError } from '@/lib/api-response';

export async function GET() {
  try {
    const content = await prisma.partnersPageContent.findUnique({
      where: { id: 1 },
    });
    return successResponse(content);
  } catch {
    return errorResponse('Gagal mengambil konten halaman mitra', 'SERVER_ERROR', 500);
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const validated = partnersPageContentSchema.safeParse(body);

    if (!validated.success) {
      return handleZodError(validated.error);
    }

    const content = await prisma.partnersPageContent.upsert({
      where: { id: 1 },
      update: validated.data,
      create: { id: 1, ...validated.data },
    });

    return successResponse(content);
  } catch {
    return errorResponse('Gagal memperbarui konten halaman mitra', 'SERVER_ERROR', 500);
  }
}
