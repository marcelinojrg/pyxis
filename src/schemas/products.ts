import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().trim().min(1, 'Nama produk wajib diisi.').max(120),
  description: z.string().trim().max(150, 'Deskripsi singkat maksimal 150 karakter.').optional(),
  featureSubtitle: z.string().trim().max(3000, 'Deskripsi lengkap terlalu panjang.').optional(),
  image: z
    .string()
    .refine(
      (value) => !value || value.startsWith('/') || /^https?:\/\//.test(value),
      'URL gambar tidak valid.'
    )
    .optional(),
  order: z.union([
    z.number().int().min(0, 'Urutan tidak boleh negatif.').max(9999),
    z.literal('last'),
  ]),
  isActive: z.boolean(),
  features: z
    .array(
      z.object({
        title: z.string().trim().min(1, 'Fitur tidak boleh kosong.').max(120),
        description: z.string().trim().max(500).optional(),
      })
    )
    .max(20),
  capabilityTitle: z.string().trim().max(120).optional(),
  capabilityDescription: z.string().trim().max(3000).optional(),
  capabilityImageUrl: z
    .string()
    .refine(
      (value) => !value || value.startsWith('/') || /^https?:\/\//.test(value),
      'URL gambar kapabilitas tidak valid.'
    )
    .optional(),
  capabilityItems: z
    .array(
      z.object({
        title: z.string().trim().min(1, 'Kapabilitas tidak boleh kosong.').max(120),
        description: z.string().trim().max(500).optional(),
      })
    )
    .max(20),
});

export type ProductValues = z.infer<typeof productSchema>;
