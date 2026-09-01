import { z } from 'zod';

const imageUrl = z
  .string()
  .trim()
  .max(2048, 'URL cover terlalu panjang.')
  .refine(
    (value) => !value || value.startsWith('/') || /^https:\/\/[^\s]+$/i.test(value),
    'URL cover tidak valid.'
  );

export const articleSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Judul artikel minimal 3 karakter.')
    .max(160, 'Judul artikel maksimal 160 karakter.'),
  content: z
    .string()
    .max(200_000, 'Konten artikel terlalu panjang.')
    .refine(
      (value) =>
        value
          .replace(/<[^>]*>/g, ' ')
          .replace(/&nbsp;/gi, ' ')
          .trim().length >= 20,
      'Konten artikel minimal 20 karakter.'
    ),
  cover: imageUrl.optional(),
  categoryIds: z
    .array(z.string().uuid('Kategori tidak valid.'))
    .min(1, 'Pilih minimal satu kategori.')
    .max(8, 'Maksimal 8 kategori per artikel.')
    .refine((ids) => new Set(ids).size === ids.length, 'Kategori tidak boleh duplikat.'),
  isPublished: z.boolean(),
});

export const articleCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Nama kategori minimal 2 karakter.')
    .max(60, 'Nama kategori maksimal 60 karakter.')
    .regex(
      /^[\p{L}\p{N}][\p{L}\p{N}\s&/-]*$/u,
      'Nama kategori hanya boleh berisi huruf, angka, spasi, &, /, atau -.'
    ),
});

export type ArticleValues = z.infer<typeof articleSchema>;
export type ArticleCategoryValues = z.infer<typeof articleCategorySchema>;
