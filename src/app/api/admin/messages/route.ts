import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/requireAdmin';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const { searchParams } = new URL(request.url);
    const source = searchParams.get('source');
    const isReadParam = searchParams.get('isRead');

    const where: { source?: string; isRead?: boolean } = {};
    if (source) where.source = source;
    if (isReadParam !== null && isReadParam !== undefined) {
      where.isRead = isReadParam === 'true';
    }

    const messages = await prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return successResponse(messages);
  } catch {
    return errorResponse('Gagal mengambil daftar pesan', 'SERVER_ERROR', 500);
  }
}
