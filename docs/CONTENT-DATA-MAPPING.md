# CONTENT-DATA-MAPPING.md
# Pemetaan Konten → Sumber Data → Admin

> Disinkronkan 2026-08-19 dengan `prisma/schema.prisma` berjalan dan kondisi halaman publik saat ini.
> Status: ✅ sudah berjalan · 🚧 ada tapi rusak/sebagian · ❌ belum diimplementasi

## 1. Tujuan

Mencegah gap antara desain, PRD, database, dan admin dashboard. Setiap konten editorial harus jelas sumbernya dan siapa yang mengelolanya.

## 2. Global (Metadata Situs)

| Konten          | Sumber                              | Editable oleh admin? |
| --------------- | ----------------------------------- | -------------------- |
| Judul situs     | env `NEXT_PUBLIC_SEO_TITLE` → `src/data/siteMetadata.ts` | ❌ (via env/deploy) |
| Deskripsi situs | env `NEXT_PUBLIC_SEO_DESCRIPTION`   | ❌ (via env/deploy)  |
| Sosial media    | env `NEXT_PUBLIC_SEO_INSTAGRAM/X/FACEBOOK/YOUTUBE` | ❌ (via env/deploy) |
| Email/telepon   | env `NEXT_PUBLIC_SEO_EMAIL/PHONE`   | ❌ (via env/deploy)  |
| Logo            | aset statis `public/`               | ❌                   |

> Catatan: model `SiteSettings` sudah **tidak ada** di schema. Jika admin butuh pengaturan global editable, modelnya harus dibuat ulang (lihat backlog).

## 3. Home (`/`)

Status umum: 🚧 — section sudah dirender tetapi **konten masih hardcode di komponen** (`src/app/(root)/_components/Home*`). Query DB lama (hero, pageSeo) dalam keadaan terkomentar.

| Konten              | Sumber saat ini        | Model yang tersedia | Target |
| ------------------- | ---------------------- | -------------------- | ------ |
| Hero (judul, CTA)   | hardcode `HomeHero`    | —                    | DB (model hero perlu dibuat ulang) |
| Logo partner/klien  | hardcode `HomePartnersBar` | `Client` ✅ ada di schema | Tarik dari `Client` |
| Fitur/highlights    | hardcode `HomeFeatures`/`HomeHighlights` | — | DB |
| Ringkasan about     | hardcode `HomeAboutSummary` | —              | DB |
| Visi & misi         | hardcode `HomeVisionMission` | —             | DB |
| Evolusi produk      | hardcode `HomeEvolution` | `Product` ✅       | Tarik dari `Product` |
| Produk unggulan     | hardcode (belum ada section aktif) | `Product` + `ProductBenefit/Feature/Capability` ✅ | Tarik dari `Product` |
| CTA                 | hardcode `HomeCTA`     | —                    | DB/hardcode disetujui |
| SEO halaman         | metadata statis root layout | `PageSeo` ❌ tidak ada | Env atau model baru |

## 4. About (`/about`)

Status: 🚧 crash — `@/lib/queries/about` & `@/lib/queries/site-settings` hilang, dan halaman masih memanggil `prisma.pageSeo` (model tidak ada).

| Konten        | Model lama (sudah dihapus) | Model saat ini | Target |
| ------------- | -------------------------- | -------------- | ------ |
| Narasi/profil | `AboutContent` ❌          | —              | Buat ulang model atau hardcode sementara |
| Visi & misi   | `AboutContent` ❌          | —              | sama seperti atas |
| Alamat kantor | `SiteSettings` ❌          | `Branch` ✅    | Tarik dari `Branch` (`isPrimary`) |
| SEO           | `PageSeo` ❌               | —              | Env atau model baru |

## 5. Contact (`/contact`)

Status: 🚧 sebagian — info kontak memakai `siteMetadata` (env); form kontak publik belum ada.

| Konten            | Sumber                | Model |
| ----------------- | --------------------- | ----- |
| Info kontak       | `siteMetadata` (env)  | `Branch` ✅ tersedia untuk daftar kantor |
| Form pesan        | ❌ belum ada          | `ContactMessage` ❌ tidak ada di schema (perlu dibuat ulang bila dibutuhkan) |
| Newsletter        | ✅ `app/actions/newsletter.ts` | `NewsletterSubscriber` + `EmailQueue` |

## 6. Produk (halaman `/produk` — ❌ belum dibangun)

Model sudah siap di schema: `Product`, `ProductBenefit`, `ProductFeature`, `ProductCapability`, `ProductCapabilityItem`.

| Konten          | Model & Field |
| --------------- | ------------- |
| Nama & slug     | `Product.name`, `Product.slug` |
| Deskripsi       | `Product.description` |
| Gambar hero     | `Product.image` |
| Benefit         | `ProductBenefit` (title, description, icon, order) |
| Fitur utama     | `ProductFeature` (title, description, icon, order) + `Product.featureSubtitle` |
| Kapabilitas     | `ProductCapability` (title, description, imageUrl) + `ProductCapabilityItem` |

## 7. Karir (halaman `/karir` — ❌ belum dibangun)

Model sudah siap: `Career`, `CareerCategory`, `CareerApplication`.

| Konten            | Model & Field |
| ----------------- | ------------- |
| Judul & slug      | `Career.title`, `Career.slug` |
| Kategori          | `CareerCategory` |
| Lokasi/tipe/dept  | `Career.location`, `type`, `department` |
| Deskripsi & syarat| `Career.description`, `responsibilities[]`, `requirements[]` |
| Status aktif      | `Career.isActive` |
| Lamaran masuk     | `CareerApplication` (status `ApplicationStatus`) |

## 8. Blog (halaman `/blog` — ❌ belum dibangun)

Model sudah siap: `Article`, `ArticleCategory`.

| Konten        | Model & Field |
| ------------- | ------------- |
| Judul & slug  | `Article.title`, `Article.slug` |
| Konten        | `Article.content` (rich text TipTap) |
| Cover         | `Article.cover` (URL ImageKit) |
| Kategori      | `ArticleCategory` (many-to-many) |
| Penulis       | `Article.createdBy` → `User` |

## 9. Legal (halaman `/legal` — ❌ belum dibangun)

Model `LegalContent` sudah **tidak ada** di schema. Perlu dibuat ulang bila fitur ini tetap di scope.

## 10. Aturan CMS

CMS resmi pada scope proyek ini hanya terdiri dari Produk, Blog, dan Karier.

Site Settings, Hero, About, Mitra, Legal, Contact/Leads, dan Page SEO bukan CMS pada scope ini.

Setiap field editorial harus mempunyai:

- owner (role/permission yang boleh edit);
- source (model + field, atau env);
- validation (schema Zod di `src/schemas`);
- render target (halaman/komponen);
- fallback (nilai default bila kosong);
- editable status (ya/tidak).

Tidak boleh ada konten bisnis penting yang muncul hanya karena developer menulis string baru di component — kecuali tercatat sebagai hardcode sementara di dokumen ini.

## 11. Kebijakan Placeholder

Placeholder diperbolehkan hanya untuk:

- local development;
- clearly marked (komentar/tercatat di dokumen ini);
- tidak dipresentasikan sebagai fakta perusahaan.
