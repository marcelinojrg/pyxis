'use server';

import { verifyPermission } from '@/services/admin/security';
import sharp from 'sharp';

/** Timeout (ms) untuk seluruh proses upload & kompresi sharp */
const UPLOAD_TIMEOUT_MS = 30_000;
const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);

/**
 * Wrapper Promise dengan timeout agar proses tidak hang selamanya.
 * Jika melebihi batas waktu, Promise di-reject dengan error yang jelas.
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
 * Upload dan Kompres Gambar ke ImageKit
 */
export async function uploadImage(
  file: File,
  subDir: string = ''
): Promise<{ success: boolean; url?: string; error?: string }> {
  if (!(await verifyPermission('admin.access'))) {
    return { success: false, error: 'Akses ditolak.' };
  }
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return { success: false, error: 'Format gambar harus JPEG, PNG, WebP, atau AVIF.' };
  }
  if (file.size === 0 || file.size > MAX_IMAGE_SIZE_BYTES) {
    return { success: false, error: 'Ukuran gambar harus antara 1 byte dan 10 MB.' };
  }
  if (!/^[a-zA-Z0-9/_-]{0,120}$/.test(subDir) || subDir.split('/').includes('..')) {
    return { success: false, error: 'Folder upload tidak valid.' };
  }

  const startTime = Date.now();
  console.log(
    `[uploadImage] ▶ Mulai upload ke ImageKit: "${file.name}" (${(file.size / 1024).toFixed(1)} KB) → subDir: "${subDir || '(root)'}"`
  );

  try {
    const imageBuffer = Buffer.from(await file.arrayBuffer());
    const optimizedImage = await withTimeout(
      sharp(imageBuffer).rotate().webp({ quality: 82 }).toBuffer(),
      UPLOAD_TIMEOUT_MS,
      'Validasi gambar'
    );
    const fileName = `${file.name.replace(/\.[^.]+$/, '') || 'image'}.webp`;
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
      throw new Error('IMAGEKIT_PRIVATE_KEY belum dikonfigurasi.');
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
      'Upload gambar'
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`ImageKit upload failed with status ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    const elapsed = Date.now() - startTime;
    console.log(`[uploadImage] ✅ Upload ImageKit selesai dalam ${elapsed}ms → URL: ${data.url}`);

    return {
      success: true,
      url: data.url,
    };
  } catch (error) {
    const elapsed = Date.now() - startTime;
    console.error(`[uploadImage] ❌ ERROR setelah ${elapsed}ms untuk file "${file.name}":`, error);
    return { success: false, error: 'Gagal mengunggah gambar ke ImageKit.' };
  }
}

/**
 * Hapus gambar dari ImageKit.
 */
export async function deleteImage(url: string): Promise<{ success: boolean; error?: string }> {
  if (!(await verifyPermission('admin.access'))) {
    return { success: false, error: 'Akses ditolak.' };
  }

  try {
    if (!url) return { success: true };

    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== 'https:' || parsedUrl.hostname !== 'ik.imagekit.io') {
      return { success: false, error: 'URL gambar tidak valid.' };
    }

    const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
    if (pathParts.length < 2) return { success: false, error: 'URL gambar tidak valid.' };

    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    if (!privateKey) throw new Error('IMAGEKIT_PRIVATE_KEY belum dikonfigurasi.');
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
      'Pencarian gambar'
    );

    if (!searchRes.ok) throw new Error(`Pencarian ImageKit gagal (${searchRes.status}).`);
    const files = (await searchRes.json()) as { fileId: string }[];
    if (!files[0]) return { success: true };

    const deleteRes = await withTimeout(
      fetch(`https://api.imagekit.io/v1/files/${files[0].fileId}`, {
        method: 'DELETE',
        headers: { Authorization: authHeader },
      }),
      UPLOAD_TIMEOUT_MS,
      'Penghapusan gambar'
    );
    if (!deleteRes.ok) throw new Error(`Penghapusan ImageKit gagal (${deleteRes.status}).`);

    return { success: true };
  } catch (error) {
    console.error('Delete Image Error:', error);
    return { success: false, error: 'Gagal menghapus file gambar.' };
  }
}
