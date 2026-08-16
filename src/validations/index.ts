import { z } from 'zod';

// 1. Hero Schema
export const heroSchema = z.object({
  title: z.string().min(1, 'Judul hero wajib diisi').max(200),
  subtitle: z.string().max(500).optional().nullable(),
  imageUrl: z.string().url('URL gambar tidak valid').or(z.literal('')).optional().nullable(),
  ctaLabel: z.string().max(50).optional().nullable(),
  ctaUrl: z.string().max(200).optional().nullable(),
});

export const homeHighlightSchema = z.object({
  title: z.string().min(1, 'Judul highlight wajib diisi').max(100),
  description: z.string().max(300).optional().nullable(),
  iconKey: z.string().max(50).optional().nullable(),
  iconUrl: z.string().url('URL icon tidak valid').or(z.literal('')).optional().nullable(),
  order: z.number().int().default(0),
  isPublished: z.boolean().default(true),
});

// 2. About Schema
export const aboutSchema = z.object({
  title: z.string().min(1, 'Judul about wajib diisi').max(200),
  content: z.string().min(1, 'Konten about wajib diisi'),
  vision: z.string().optional().nullable(),
  mission: z.string().optional().nullable(),
  imageUrl: z.string().url('URL gambar tidak valid').or(z.literal('')).optional().nullable(),
  officeAddress: z.string().max(500).optional().nullable(),
});

// 3. Product Schema
export const productSchema = z.object({
  name: z.string().min(1, 'Nama produk wajib diisi').max(100),
  slug: z
    .string()
    .min(1, 'Slug wajib diisi')
    .max(100)
    .regex(/^[a-z0-9-]+$/, 'Slug hanya boleh huruf kecil, angka, dan tanda hubung (-)'),
  shortDesc: z.string().min(1, 'Deskripsi singkat wajib diisi').max(300),
  fullDesc: z.string().min(1, 'Deskripsi lengkap wajib diisi'),
  features: z.array(z.string()).default([]),
  imageUrl: z.string().url('URL gambar tidak valid').or(z.literal('')).optional().nullable(),
  galleryUrls: z.array(z.string().url('URL gambar galeri tidak valid')).default([]),
  order: z.number().int().default(0),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
});

// 4. Partner Schemas
export const partnerSchema = z.object({
  name: z.string().min(1, 'Nama partner wajib diisi').max(100),
  category: z.string().max(50).optional().nullable(),
  description: z.string().max(300).optional().nullable(),
  iconUrl: z.string().url('URL icon tidak valid').or(z.literal('')).optional().nullable(),
  order: z.number().int().default(0),
  isPublished: z.boolean().default(false),
});

export const partnerBenefitSchema = z.object({
  title: z.string().min(1, 'Judul benefit wajib diisi').max(100),
  description: z.string().max(300).optional().nullable(),
  iconKey: z.string().max(50).optional().nullable(),
  iconUrl: z.string().url('URL icon tidak valid').or(z.literal('')).optional().nullable(),
  order: z.number().int().default(0),
  isPublished: z.boolean().default(true),
});

export const partnersPageContentSchema = z.object({
  heroTitle: z.string().max(200).optional().nullable(),
  heroSubtitle: z.string().max(500).optional().nullable(),
  ctaLabel: z.string().max(50).optional().nullable(),
});

// 5. Legal Schema
export const legalSchema = z.object({
  privacyPolicy: z.string().optional().nullable(),
  termsOfService: z.string().optional().nullable(),
  cookiePolicy: z.string().optional().nullable(),
});

// 6. Career Schema
export const careerSchema = z.object({
  description: z.string().optional().nullable(),
  hasOpenPositions: z.boolean().default(false),
  openPositionsText: z.string().optional().nullable(),
  applyEmail: z.string().email('Email tujuan lamaran tidak valid').optional().nullable(),
});

// 7. Contact Schema (Public & Admin)
export const contactSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi').max(100),
  email: z.string().email('Email tidak valid').max(100),
  phone: z.string().max(30).optional().nullable(),
  message: z.string().min(1, 'Pesan wajib diisi').max(2000),
  source: z.enum(['general', 'partnership']).default('general'),
});

// 8. Site Settings Schema
export const siteSettingsSchema = z.object({
  companyName: z.string().max(100).optional().nullable(),
  logoUrl: z.string().url('URL logo tidak valid').or(z.literal('')).optional().nullable(),
  address: z.string().max(500).optional().nullable(),
  phone: z.string().max(50).optional().nullable(),
  email: z.string().email('Email tidak valid').or(z.literal('')).optional().nullable(),
  footerText: z.string().max(300).optional().nullable(),
  socialLinks: z.record(z.string(), z.string()).optional().nullable(),
  defaultMetaTitle: z.string().max(100).optional().nullable(),
  defaultMetaDescription: z.string().max(300).optional().nullable(),
  defaultOgImageUrl: z
    .string()
    .url('URL OG Image tidak valid')
    .or(z.literal(''))
    .optional()
    .nullable(),
});

// 9. SEO Schema
export const seoSchema = z.object({
  pageKey: z.string().min(1, 'Page key wajib diisi').max(50),
  metaTitle: z.string().max(100).optional().nullable(),
  metaDescription: z.string().max(300).optional().nullable(),
  ogImageUrl: z.string().url('URL OG image tidak valid').or(z.literal('')).optional().nullable(),
  canonicalUrl: z.string().url('Canonical URL tidak valid').or(z.literal('')).optional().nullable(),
  noIndex: z.boolean().default(false),
});
