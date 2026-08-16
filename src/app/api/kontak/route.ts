import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactSchema } from '@/validations';
import { successResponse, errorResponse, handleZodError } from '@/lib/api-response';
import { isRateLimited } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    if (isRateLimited(`contact_${ip}`, 5, 60 * 1000)) {
      return errorResponse(
        'Terlalu banyak permintaan. Silakan coba lagi nanti.',
        'RATE_LIMITED',
        429
      );
    }

    const body = await request.json();
    const validated = contactSchema.safeParse(body);

    if (!validated.success) {
      return handleZodError(validated.error);
    }

    const message = await prisma.contactMessage.create({
      data: {
        name: validated.data.name,
        email: validated.data.email,
        phone: validated.data.phone,
        message: validated.data.message,
        source: validated.data.source,
      },
    });

    return successResponse(message, 201);
  } catch {
    return errorResponse('Gagal menyimpan pesan kontak', 'SERVER_ERROR', 500);
  }
}
