import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/requireAdmin';
import { seoSchema } from '@/validations';
import { successResponse, errorResponse, handleZodError } from '@/lib/api-response';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ pageKey: string }> }
) {
  try {
    const { pageKey } = await params;
    const seo = await prisma.pageSeo.findUnique({
      where: { pageKey },
    });
    return successResponse(seo);
  } catch {
    return errorResponse('Gagal mengambil data SEO', 'SERVER_ERROR', 500);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ pageKey: string }> }
) {
  try {
    await requireAdmin();
    const { pageKey } = await params;
    const body = await request.json();
    const validated = seoSchema.safeParse({ ...body, pageKey });

    if (!validated.success) {
      return handleZodError(validated.error);
    }

    const seo = await prisma.pageSeo.upsert({
      where: { pageKey },
      update: validated.data,
      create: validated.data,
    });

    return successResponse(seo);
  } catch {
    return errorResponse('Gagal memperbarui data SEO', 'SERVER_ERROR', 500);
  }
}
