import { z } from 'zod';

const optionalText = (max: number, message: string) =>
  z.string().trim().max(max, message).optional();

const imageSchema = z
  .string()
  .trim()
  .max(2048, 'URL gambar terlalu panjang.')
  .refine(
    (value) => !value || /^\/(?!\/)/.test(value) || /^https?:\/\/\S+$/i.test(value),
    'URL gambar tidak valid.'
  )
  .optional();

const contentItemSchema = z.object({
  title: z.string().trim().min(1, 'Judul wajib diisi.').max(120, 'Judul maksimal 120 karakter.'),
  description: optionalText(500, 'Deskripsi maksimal 500 karakter.'),
  icon: optionalText(80, 'Nama ikon maksimal 80 karakter.'),
});

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Nama produk wajib diisi.')
    .max(120, 'Nama produk maksimal 120 karakter.'),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .max(120, 'Slug maksimal 120 karakter.')
    .refine(
      (value) => !value || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value),
      'Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung.'
    )
    .optional(),
  description: optionalText(150, 'Deskripsi singkat maksimal 150 karakter.'),
  featureSubtitle: optionalText(3000, 'Deskripsi lengkap maksimal 3.000 karakter.'),
  image: imageSchema,
  order: z
    .number()
    .int('Urutan harus berupa bilangan bulat.')
    .min(0, 'Urutan tidak boleh negatif.')
    .max(9999),
  isActive: z.boolean(),
  benefits: z.array(contentItemSchema).max(30, 'Maksimal 30 manfaat.'),
  features: z.array(contentItemSchema).max(30, 'Maksimal 30 fitur.'),
  capabilities: z
    .array(
      z.object({
        title: z
          .string()
          .trim()
          .min(1, 'Judul grup kapabilitas wajib diisi.')
          .max(120, 'Judul grup maksimal 120 karakter.'),
        description: optionalText(3000, 'Deskripsi grup maksimal 3.000 karakter.'),
        imageUrl: imageSchema,
        items: z.array(contentItemSchema).max(30, 'Maksimal 30 item per grup kapabilitas.'),
      })
    )
    .max(10, 'Maksimal 10 grup kapabilitas.'),
});

export type ProductValues = z.infer<typeof productSchema>;
