# SEO-SPEC.md
# SEO and Discoverability Specification

> Disinkronkan 2026-08-19 dengan implementasi berjalan.

## 1. Goals

- accurate page titles;
- meaningful descriptions;
- crawlable pages;
- canonical URLs;
- sitemap;
- robots;
- structured data;
- social sharing metadata.

## 2. Implementasi Saat Ini

| Komponen | Lokasi | Status |
| --- | --- | :---: |
| Metadata situs (title, description, social) | `src/data/siteMetadata.ts` ← env `NEXT_PUBLIC_SEO_*` | ✅ |
| Metadata root (OG, Twitter, robots) | `src/app/layout.tsx` | ✅ |
| Helper metadata per halaman | `src/app/seo.tsx` (`genPageMetadata`) | ✅ |
| Sitemap dinamis | `src/app/sitemap.tsx` | ✅ |
| robots.txt | `src/app/robots.tsx` | ✅ |
| Optimasi gambar (AVIF/WebP) | `next.config.ts` `images` | ✅ |
| Structured data (JSON-LD) | — | ❌ belum ada |
| SEO per halaman dari DB (`PageSeo`) | — | ❌ model belum ada di schema |

## 3. Page Metadata

Required per halaman publik:

- title;
- description;
- canonical;
- Open Graph title;
- Open Graph description;
- Open Graph image.

Halaman yang sudah ada: Home, About, Contact. Halaman target lain (Products, Product Detail, Partners, Careers, Legal, Blog) menyusul saat dibangun — pakai `genPageMetadata` agar konsisten.

## 4. Dynamic SEO (saat halaman dinamis dibangun)

Product detail / blog detail harus menurunkan:

- title dari nama produk / judul artikel;
- description dari deskripsi singkat / excerpt;
- OG image dari gambar produk / cover artikel (URL ImageKit).

Jangan membuat keyword stuffing yang menyesatkan.

## 5. Structured Data (belum diimplementasi)

Minimum saat dibangun:

- Organization pada layer global;
- WebSite pada Home;
- Product/SoftwareApplication hanya bila data faktual tersedia;
- Article pada detail blog.

## 6. Technical

Sudah tersedia:

- sitemap.xml (dinamis);
- robots.txt;
- `metadataBase` diset dari `siteMetadata.siteUrl` (isi `NEXT_PUBLIC_SEO_SITE_URL` di production — saat ini default kosong/localhost);
- gambar via `next/image` dengan alt wajib diisi.

Perlu diperhatikan:

- semantic headings;
- clean slug (pakai `slugify`);
- jangan sampai ada noindex yang tidak disengaja di halaman publik.

## 7. Admin SEO (rencana)

Model `PageSeo` (meta title, meta description, OG image, canonical, noIndex per `pageKey`) **belum ada di schema**. Sampai dibuat, SEO per halaman dikelola lewat kode (`genPageMetadata`) dan env.

## 8. QA

Check:

- duplicate titles;
- missing descriptions;
- broken canonical;
- missing OG image;
- bad heading order;
- unpublished pages indexed accidentally;
- `NEXT_PUBLIC_SEO_SITE_URL` terisi di production (canonical & OG bergantung padanya).
