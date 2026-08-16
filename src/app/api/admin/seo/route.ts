import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/requireAdmin';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET() {
  try {
    await requireAdmin();
    const seos = await prisma.pageSeo.findMany({
      orderBy: { pageKey: 'asc' },
    });
    return successResponse(seos);
  } catch {
    return errorResponse('Gagal mengambil data SEO', 'SERVER_ERROR', 500);
  }
}
