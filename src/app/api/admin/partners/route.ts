import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/requireAdmin';
import { partnerSchema } from '@/validations';
import { successResponse, errorResponse, handleZodError } from '@/lib/api-response';

export async function GET() {
  try {
    const partners = await prisma.partner.findMany({
      orderBy: { order: 'asc' },
    });
    return successResponse(partners);
  } catch {
    return errorResponse('Gagal mengambil daftar mitra', 'SERVER_ERROR', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const validated = partnerSchema.safeParse(body);

    if (!validated.success) {
      return handleZodError(validated.error);
    }

    const partner = await prisma.partner.create({
      data: validated.data,
    });

    return successResponse(partner, 201);
  } catch {
    return errorResponse('Gagal membuat mitra baru', 'SERVER_ERROR', 500);
  }
}
