import { z } from 'zod';

const listItemSchema = z.string().trim().min(1, 'Item tidak boleh kosong.').max(500);

export const careerSchema = z.object({
  title: z.string().trim().min(3, 'Judul minimal 3 karakter.').max(160),
  categoryId: z.string().uuid('Kategori tidak valid.').or(z.literal('')),
  location: z.string().trim().min(2, 'Lokasi wajib diisi.').max(160),
  type: z.string().trim().min(2, 'Tipe pekerjaan wajib diisi.').max(80),
  department: z.string().trim().max(120).optional(),
  description: z.string().trim().min(20, 'Deskripsi minimal 20 karakter.').max(10000),
  responsibilities: z
    .array(listItemSchema)
    .min(1, 'Tambahkan minimal satu tanggung jawab.')
    .max(30),
  requirements: z.array(listItemSchema).min(1, 'Tambahkan minimal satu persyaratan.').max(30),
  order: z.number().int().min(0, 'Urutan tidak boleh negatif.').max(10000),
  isActive: z.boolean(),
});

export const careerCategorySchema = z.object({
  name: z.string().trim().min(2, 'Nama kategori minimal 2 karakter.').max(100),
});

export type CareerValues = z.infer<typeof careerSchema>;
export type CareerCategoryValues = z.infer<typeof careerCategorySchema>;

export const careerApplicationSchema = z.object({
  careerId: z.string().min(1, 'ID lowongan tidak valid.'),
  fullName: z.string().min(3, 'Nama lengkap minimal 3 karakter.'),
  email: z.string().email('Format email tidak valid.'),
  phone: z.string().min(8, 'Nomor telepon minimal 8 digit.'),
  portfolioUrl: z.string().url('URL portofolio/LinkedIn tidak valid.').optional().or(z.literal('')),
  resumeUrl: z.string().url('URL CV tidak valid.'),
});

export type CareerApplicationInput = z.infer<typeof careerApplicationSchema>;
