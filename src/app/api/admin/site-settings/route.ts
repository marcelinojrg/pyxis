import { NextRequest } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/requireAdmin';
import { siteSettingsSchema } from '@/validations';
import { successResponse, errorResponse, handleZodError } from '@/lib/api-response';

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: 1 },
    });
    return successResponse(settings);
  } catch {
    return errorResponse('Gagal mengambil pengaturan website', 'SERVER_ERROR', 500);
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const validated = siteSettingsSchema.safeParse(body);

    if (!validated.success) {
      return handleZodError(validated.error);
    }

    const { socialLinks, ...rest } = validated.data;
    const jsonSocialLinks = socialLinks === null ? Prisma.JsonNull : socialLinks;

    const dataPayload = {
      ...rest,
      ...(socialLinks !== undefined ? { socialLinks: jsonSocialLinks } : {}),
    };

    const settings = await prisma.siteSettings.upsert({
      where: { id: 1 },
      update: dataPayload,
      create: { id: 1, ...dataPayload },
    });

    return successResponse(settings);
  } catch {
    return errorResponse('Gagal memperbarui pengaturan website', 'SERVER_ERROR', 500);
  }
}
