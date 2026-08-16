import { NextRequest } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { requireAdmin } from '@/lib/requireAdmin';
import { successResponse, errorResponse } from '@/lib/api-response';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return errorResponse('File gambar wajib diunggah', 'VALIDATION_ERROR', 400);
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return errorResponse(
        'Format file tidak didukung. Hanya JPG, PNG, dan WebP yang diizinkan.',
        'VALIDATION_ERROR',
        422
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return errorResponse('Ukuran file melebihi batas maksimal 2MB.', 'VALIDATION_ERROR', 422);
    }

    // Check Cloudinary configuration
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return errorResponse(
        'Kredensial Cloudinary belum dikonfigurasi di environment variables (.env)',
        'CONFIGURATION_ERROR',
        500
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: 'pyxis',
              resource_type: 'image',
            },
            (error, result) => {
              if (error || !result) {
                reject(error || new Error('Upload gagal'));
              } else {
                resolve({
                  secure_url: result.secure_url,
                  public_id: result.public_id,
                });
              }
            }
          )
          .end(buffer);
      }
    );

    return successResponse(
      {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      },
      201
    );
  } catch (error: any) {
    return errorResponse(error?.message || 'Gagal mengunggah gambar', 'SERVER_ERROR', 500);
  }
}
