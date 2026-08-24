import { z } from 'zod';

export const careerApplicationSchema = z.object({
  careerId: z.string().min(1, 'ID lowongan tidak valid.'),
  fullName: z.string().min(3, 'Nama lengkap minimal 3 karakter.'),
  email: z.string().email('Format email tidak valid.'),
  phone: z.string().min(8, 'Nomor telepon minimal 8 digit.'),
  portfolioUrl: z.string().url('URL portofolio/LinkedIn tidak valid.').optional().or(z.literal('')),
  resumeUrl: z.string().default('#placeholder-resume'),
});

export type CareerApplicationInput = z.infer<typeof careerApplicationSchema>;
