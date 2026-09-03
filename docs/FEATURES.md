# Fitur Pyxis

Dokumen ini merangkum scope aktif. Detail requirement dan status implementasi tetap mengacu ke `PRD.md` dan `ONLY_ME.md`.

## Website publik

- Home dan About untuk profil perusahaan.
- Products: daftar dan detail produk aktif dari database.
- Blog: daftar dan detail artikel terbit dari database.
- Careers: daftar dan detail lowongan aktif dari database.
- Partners, Contact, dan Legal sebagai halaman company profile non-CMS.
- Metadata, sitemap, robots, error, loading, dan not-found.

## CMS admin

Scope CMS hanya:

- Produk: data utama, benefit, fitur, kapabilitas, gambar, urutan, slug, dan status aktif.
- Blog: artikel, kategori, cover, rich text, draft/publish, dan slug.
- Karier: lowongan, kategori, detail peran, urutan, slug, dan status aktif.

Semua mutasi CMS wajib memakai autentikasi, permission, validasi Zod di server, dan audit log sesuai layanan yang tersedia.

## Platform

- Better Auth untuk session dan RBAC.
- Prisma 7 dan PostgreSQL.
- ImageKit dan Sharp untuk gambar.
- Health check, validasi environment production, CI, Docker, dan deployment Vercel/container.

## Tidak termasuk scope

- Manajemen event, peserta, pendaftaran, pembayaran, check-in, QR tiket, sertifikat, speaker, atau testimonial event.
- CMS Site Settings, Hero, About, Partners, Legal, Contact/Leads, dan Page SEO.
- UI CMS User/Role dan pengelolaan lamaran karier.

Pekerjaan email ditunda sampai ada instruksi terpisah.
