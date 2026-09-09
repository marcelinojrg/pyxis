'use server';

import { randomUUID } from 'node:crypto';
import { verifyPermission } from '@/services/admin/security';
import sharp from 'sharp';

/** Timeout (ms) for the complete upload and Sharp compression process. */
const UPLOAD_TIMEOUT_MS = 30_000;
const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;
const MAX_IMAGE_PIXELS = 40_000_000;
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);
const ALLOWED_IMAGE_FORMATS = new Set(['jpeg', 'png', 'webp', 'avif']);

async function canUploadTo(subDir: string) {
  const permissions = subDir.startsWith('products')
    ? ['product.create', 'product.update']
    : subDir.startsWith('blog') || subDir.startsWith('articles')
      ? ['article.create', 'article.update']
      : ['admin.access'];

  return (await Promise.all(permissions.map((permission) => verifyPermission(permission)))).some(
    Boolean
  );
}

/**
 * Promise wrapper with a timeout so the process cannot hang indefinitely.
 * If the limit is exceeded, the Promise is rejected with a clear error.
 */
function withTimeout<T>(promise: Promise<T>, ms: number, label = 'Operasi'): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`${label} melebihi batas waktu ${ms / 1000}s.`)), ms)
    ),
  ]);
}

/**
 * Upload and compress an image with ImageKit.
 */
export async function uploadImage(
  file: File,
  subDir: string = ''
): Promise<{ success: boolean; url?: string; error?: string }> {
  if (!(await canUploadTo(subDir))) {
    return { success: false, error: 'Access denied.' };
  }
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return { success: false, error: 'The image must be JPEG, PNG, WebP, or AVIF.' };
  }
  if (file.size === 0 || file.size > MAX_IMAGE_SIZE_BYTES) {
    return { success: false, error: 'The image size must be between 1 byte and 10 MB.' };
  }
  if (!/^[a-zA-Z0-9/_-]{0,120}$/.test(subDir) || subDir.split('/').includes('..')) {
    return { success: false, error: 'The upload folder is invalid.' };
  }

  const startTime = Date.now();
  console.log(
    `[uploadImage] ▶ Mulai upload ke ImageKit: "${file.name}" (${(file.size / 1024).toFixed(1)} KB) → subDir: "${subDir || '(root)'}"`
  );

  try {
    const imageBuffer = Buffer.from(await file.arrayBuffer());
    const image = sharp(imageBuffer, { limitInputPixels: MAX_IMAGE_PIXELS });
    const metadata = await withTimeout(image.metadata(), UPLOAD_TIMEOUT_MS, 'Image validation');
    if (
      !metadata.format ||
      !ALLOWED_IMAGE_FORMATS.has(metadata.format) ||
      !metadata.width ||
      !metadata.height ||
      metadata.width * metadata.height > MAX_IMAGE_PIXELS
    ) {
      return {
        success: false,
        error: 'The file is not a valid image or its dimensions are too large.',
      };
    }
    const optimizedImage = await withTimeout(
      image.rotate().webp({ quality: 82 }).toBuffer(),
      UPLOAD_TIMEOUT_MS,
      'Image validation'
    );
    const baseName =
      file.name
        .replace(/\.[^.]+$/, '')
        .replace(/[^a-zA-Z0-9_-]/g, '-')
        .slice(0, 60) || 'image';
    const fileName = `${baseName}-${randomUUID()}.webp`;
    const formData = new FormData();
    formData.append(
      'file',
      new Blob([Uint8Array.from(optimizedImage)], { type: 'image/webp' }),
      fileName
    );
    formData.append('fileName', fileName);
    if (subDir) {
      formData.append('folder', subDir);
    }

    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    if (!privateKey) {
      return {
        success: false,
        error: 'ImageKit is not configured. Contact the system administrator.',
      };
    }
    const authHeader = 'Basic ' + Buffer.from(privateKey + ':').toString('base64');

    const res = await withTimeout(
      fetch('https://upload.imagekit.io/api/v1/files/upload', {
        method: 'POST',
        headers: {
          Authorization: authHeader,
        },
        body: formData,
      }),
      UPLOAD_TIMEOUT_MS,
      'Image upload'
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`ImageKit upload failed with status ${res.status}: ${errorText}`);
    }

    const data = (await res.json()) as { url?: string };
    if (!data.url) throw new Error('ImageKit did not return an image URL.');
    const elapsed = Date.now() - startTime;
    console.log(`[uploadImage] ✅ Upload ImageKit selesai dalam ${elapsed}ms → URL: ${data.url}`);

    return {
      success: true,
      url: data.url,
    };
  } catch (error) {
    const elapsed = Date.now() - startTime;
    console.error(`[uploadImage] ❌ Failed after ${elapsed}ms for file "${file.name}":`, error);
    return { success: false, error: 'Failed to upload the image to ImageKit.' };
  }
}

/**
 * Delete an image from ImageKit.
 */
export async function deleteImage(url: string): Promise<{ success: boolean; error?: string }> {
  if (!(await verifyPermission('admin.access'))) {
    return { success: false, error: 'Access denied.' };
  }

  try {
    if (!url) return { success: true };

    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== 'https:' || parsedUrl.hostname !== 'ik.imagekit.io') {
      return { success: false, error: 'The image URL is invalid.' };
    }

    const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
    if (pathParts.length < 2) return { success: false, error: 'The image URL is invalid.' };

    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    if (!privateKey) throw new Error('IMAGEKIT_PRIVATE_KEY is not configured.');
    const authHeader = 'Basic ' + Buffer.from(privateKey + ':').toString('base64');
    const imageKitPath =
      '/' +
      pathParts
        .slice(1)
        .filter((part) => !part.startsWith('tr:'))
        .join('/');
    const searchRes = await withTimeout(
      fetch(
        `https://api.imagekit.io/v1/files?searchQuery=${encodeURIComponent(`path="${imageKitPath}"`)}`,
        {
          headers: { Authorization: authHeader },
        }
      ),
      UPLOAD_TIMEOUT_MS,
      'Image search'
    );

    if (!searchRes.ok) throw new Error(`ImageKit search failed (${searchRes.status}).`);
    const files = (await searchRes.json()) as { fileId: string }[];
    if (!files[0]) return { success: true };

    const deleteRes = await withTimeout(
      fetch(`https://api.imagekit.io/v1/files/${files[0].fileId}`, {
        method: 'DELETE',
        headers: { Authorization: authHeader },
      }),
      UPLOAD_TIMEOUT_MS,
      'Image deletion'
    );
    if (!deleteRes.ok) throw new Error(`ImageKit deletion failed (${deleteRes.status}).`);

    return { success: true };
  } catch (error) {
    console.error('Delete Image Error:', error);
    return { success: false, error: 'Failed to delete the image file.' };
  }
}
