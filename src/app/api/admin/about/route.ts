import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/requireAdmin';
import { aboutSchema } from '@/validations';
import { successResponse, errorResponse, handleZodError } from '@/lib/api-response';

export async function GET() {
  try {
    const about = await prisma.aboutContent.findUnique({
      where: { id: 1 },
    });
    return successResponse(about);
  } catch {
    return errorResponse('Gagal mengambil data about', 'SERVER_ERROR', 500);
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const validated = aboutSchema.safeParse(body);

    if (!validated.success) {
      return handleZodError(validated.error);
    }

    const about = await prisma.aboutContent.upsert({
      where: { id: 1 },
      update: validated.data,
      create: { id: 1, ...validated.data },
    });

    return successResponse(about);
  } catch {
    return errorResponse('Gagal memperbarui about content', 'SERVER_ERROR', 500);
  }
}
