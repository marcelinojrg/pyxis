'use server';

import { randomUUID } from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);
const LOCAL_UPLOAD_ROOT = path.resolve(process.cwd(), 'public', 'uploads');

function safeUploadDirectory(subDir: string) {
  const directory = path.resolve(LOCAL_UPLOAD_ROOT, subDir);
  if (!directory.startsWith(`${LOCAL_UPLOAD_ROOT}${path.sep}`) && directory !== LOCAL_UPLOAD_ROOT) {
    return null;
  }
  return directory;
}

export async function saveLocalImage(file: File, subDir: string) {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return { success: false, error: 'Format gambar harus JPEG, PNG, WebP, atau AVIF.' };
  }
  if (file.size === 0 || file.size > MAX_IMAGE_SIZE_BYTES) {
    return { success: false, error: 'Ukuran gambar harus antara 1 byte dan 10 MB.' };
  }
  if (!/^[a-zA-Z0-9/_-]{0,120}$/.test(subDir) || subDir.split('/').includes('..')) {
    return { success: false, error: 'Folder upload tidak valid.' };
  }

  const directory = safeUploadDirectory(subDir);
  if (!directory) return { success: false, error: 'Folder upload tidak valid.' };

  try {
    const optimizedImage = await sharp(Buffer.from(await file.arrayBuffer()))
      .rotate()
      .webp({ quality: 82 })
      .toBuffer();
    const baseName =
      file.name
        .replace(/\.[^.]+$/, '')
        .replace(/[^a-zA-Z0-9_-]/g, '-')
        .slice(0, 60) || 'image';
    const fileName = `${baseName}-${randomUUID()}.webp`;
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, fileName), optimizedImage);
    return { success: true, url: `/uploads/${subDir ? `${subDir}/` : ''}${fileName}` };
  } catch (error) {
    console.error('[saveLocalImage]', error);
    return { success: false, error: 'Gagal menyimpan gambar.' };
  }
}

export async function removeLocalImage(url: string) {
  try {
    const parsedUrl = new URL(url, 'http://localhost');
    if (!parsedUrl.pathname.startsWith('/uploads/')) return { success: false };
    const filePath = path.resolve(process.cwd(), 'public', parsedUrl.pathname.slice(1));
    if (!filePath.startsWith(`${LOCAL_UPLOAD_ROOT}${path.sep}`)) return { success: false };
    await unlink(filePath).catch((error: NodeJS.ErrnoException) => {
      if (error.code !== 'ENOENT') throw error;
    });
    return { success: true };
  } catch (error) {
    console.error('[removeLocalImage]', error);
    return { success: false };
  }
}
