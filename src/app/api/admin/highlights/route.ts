import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/requireAdmin';
import { homeHighlightSchema } from '@/validations';
import { successResponse, errorResponse, handleZodError } from '@/lib/api-response';

export async function GET() {
  try {
    const highlights = await prisma.homeHighlight.findMany({
      orderBy: { order: 'asc' },
    });
    return successResponse(highlights);
  } catch {
    return errorResponse('Gagal mengambil data highlights', 'SERVER_ERROR', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const validated = homeHighlightSchema.safeParse(body);

    if (!validated.success) {
      return handleZodError(validated.error);
    }

    const highlight = await prisma.homeHighlight.create({
      data: validated.data,
    });

    return successResponse(highlight, 201);
  } catch {
    return errorResponse('Gagal membuat highlight baru', 'SERVER_ERROR', 500);
  }
}
