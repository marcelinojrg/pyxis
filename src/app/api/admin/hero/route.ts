import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/requireAdmin';
import { heroSchema } from '@/validations';
import { successResponse, errorResponse, handleZodError } from '@/lib/api-response';

export async function GET() {
  try {
    const hero = await prisma.heroSection.findUnique({
      where: { id: 1 },
    });
    return successResponse(hero);
  } catch {
    return errorResponse('Gagal mengambil data hero', 'SERVER_ERROR', 500);
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const validated = heroSchema.safeParse(body);

    if (!validated.success) {
      return handleZodError(validated.error);
    }

    const hero = await prisma.heroSection.upsert({
      where: { id: 1 },
      update: validated.data,
      create: { id: 1, ...validated.data },
    });

    return successResponse(hero);
  } catch {
    return errorResponse('Gagal memperbarui hero section', 'SERVER_ERROR', 500);
  }
}
