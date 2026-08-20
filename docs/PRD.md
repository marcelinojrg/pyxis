# PRD — Product Requirement Document

## Company Profile Dinamis — PT. Pyxis Ultimate Solution

## 1. Latar Belakang

PT. Pyxis Ultimate Solution adalah perusahaan software hotel & restoran berbasis di Malang, transformasi dari PT. MYOH Technology, Tbk. Produk utama mereka adalah **Alcor PMS** (Property Management System berbasis cloud untuk hotel/resort/guest house) dan **Alcor POS** (sistem kasir untuk restoran/café/karaoke, terintegrasi dengan PMS).

Saat ini dibutuhkan website company profile baru yang **dinamis** — artinya seluruh konten (teks, gambar, daftar produk, mitra, karir, legalitas, SEO) dapat dikelola secara mandiri oleh admin tanpa perlu mengubah kode atau melakukan deploy ulang.

## 2. Tujuan (Goals)

1. Menampilkan profil perusahaan, produk unggulan (Alcor PMS, Alcor POS), jaringan mitra, dan legalitas secara profesional kepada calon klien B2B (hotel, restoran, resort, guest house).
2. Memungkinkan admin internal mengelola seluruh konten website secara mandiri melalui dashboard admin yang intuitif.
3. Menyediakan kanal penangkapan prospek (leads) yang efektif melalui formulir kontak umum dan formulir kemitraan.
4. Membangun website yang cepat, responsif di semua ukuran layar (mobile-friendly), aman, dan teroptimasi untuk mesin pencari (SEO).

## 3. Target Pengguna

| Peran | Deskripsi | Kebutuhan Utama |
| :--- | :--- | :--- |
| **Pengunjung Publik** | Calon klien B2B: pemilik/manajer hotel, restoran, calon mitra bisnis, dan pelamar kerja. | Akses informasi produk cepat & jelas, kemudahan menghubungi tim sales, navigasi responsif. |
| **Admin** | Staf internal Pyxis (1 akun tunggal, dibuat via database seed awal). | Autentikasi aman, antarmuka manajemen konten (CRUD) lengkap, pemantauan pesan masuk/leads. |

---

## 4. Ruang Lingkup (Scope)

### 4.1 Halaman Publik

| Halaman | Rute URL | Komponen & Konten Utama |
| :--- | :--- | :--- |
| **Home** | `/` | Hero section dinamis (judul, subjudul, banner/gambar, CTA), featured products (Alcor PMS & Alcor POS), highlights/keunggulan perusahaan, conversion CTA, footer global. |
| **Tentang Kami** | `/tentang` (atau `/about`) | Profil & sejarah transformasi perusahaan, visi & misi, nilai perusahaan, alamat kantor, visual pendukung. |
| **Produk / Layanan** | `/produk` (atau `/products`) | Katalog seluruh produk software, kartu produk (nama, deskripsi singkat, gambar, badge fitur, CTA detail). |
| **Detail Produk** | `/produk/[slug]` | Rute dinamis berdasarkan slug: deskripsi lengkap, daftar fitur modular, galeri gambar produk, tombol CTA penawaran/demo ke form kontak. |
| **Mitra / Partners** | `/mitra` (atau `/partners`) | Hero banner kemitraan, benefit bergabung sebagai mitra, grid logo partner/integrasi, CTA/form pendaftaran kemitraan. |
| **Karir** | `/karir` (atau `/careers`) | Pengenalan kultur kerja, status lowongan aktif (`hasOpenPositions`), deskripsi kriteria posisi, email kontak lamaran. |
| **Kontak** | `/kontak` (atau `/contact`) | Form pesan masuk (nama, email, no. telp, pesan, tipe kebutuhan: umum/kemitraan), info alamat kantor resmi, email & nomor telepon, embed peta (opsional/stretch). |
| **Legal / Kebijakan** | `/legal` | Navigasi kebijakan tab: Kebijakan Privasi (*Privacy Policy*), Syarat & Ketentuan (*Terms of Service*), dan Kebijakan Cookie (*Cookie Policy*). |
| **Blog** | `/blog` | Daftar artikel terbit (judul, kutipan/excerpt, gambar cover, tanggal terbit), diurutkan dari yang terbaru. |
| **Detail Artikel** | `/blog/[slug]` | Rute dinamis berdasarkan slug: konten lengkap artikel, gambar cover, nama penulis, dan tanggal terbit. |
| **404 & Error** | Not Found / Error | Halaman penanganan error kustom yang ramah pengguna dengan tombol navigasi kembali ke Home. |

---

### 4.2 Admin Dashboard (Protected, `/admin/*`)

Seluruh mutasi data di admin dashboard dilindungi autentikasi **Better Auth** dengan otorisasi RBAC (Role/Permission, permission kunci: `admin.access`) — proteksi rute di `src/proxy.ts`, otorisasi server action di `src/services/admin/security.ts`.

> Status implementasi per 2026-08-19: ✅ sudah berjalan · 🚧 ada tapi rusak/sebagian · ❌ belum dibangun

| Modul | Status | Deskripsi Fungsional |
| :--- | :---: | :--- |
| **Autentikasi & Akun** | 🚧 | Login via email+password (Better Auth), logout aman, reset password & verifikasi email via antrean email. _Catatan: halaman `/login` masih memakai kode next-auth lama dan route handler Better Auth belum dibuat (lihat `ONLY_ME.md`)._ |
| **Dashboard Metrics** | 🚧 | Ringkasan metrik konten. _Catatan: `/admin` saat ini baru halaman placeholder._ |
| **Pengaturan Global (Site Settings)** | ❌ | Edit nama perusahaan, logo URL, alamat kantor, nomor telepon, email resmi, teks footer, dan tautan sosial media. _Saat ini metadata situs via env (`NEXT_PUBLIC_SEO_*`); model `SiteSettings` belum ada di schema._ |
| **Kelola Hero & Highlights** | ❌ | Edit judul hero, subjudul hero, gambar hero, label CTA, URL CTA, serta CRUD poin-poin *Home Highlights*. |
| **Kelola Halaman About** | ❌ | Edit teks judul, narasi sejarah, visi, misi, gambar pendukung, dan informasi alamat kantor. _Model `Branch` tersedia untuk alamat kantor._ |
| **Kelola Produk (CRUD Lengkap)** | ❌ | Tambah/edit/hapus produk: nama, slug unik, deskripsi, benefit, fitur, kapabilitas, upload gambar, dan status tayang. _Model DB sudah siap; server action CRUD belum ada._ |
| **Kelola Mitra (Partners CMS)** | ❌ | Edit hero & benefit halaman kemitraan, serta CRUD data partner. _Model `Client` tersedia untuk logo partner._ |
| **Kelola Karir (Career CMS)** | ❌ | CRUD lowongan (kategori, lokasi, tipe, departemen, persyaratan) dan kelola lamaran masuk. _Model DB sudah siap._ |
| **Kelola Legal (Legal CMS)** | ❌ | Edit konten Privacy Policy, Terms of Service, dan Cookie Policy secara dinamis. _Model belum ada di schema._ |
| **Kelola Pesan Kontak (Leads)** | ❌ | Daftar pesan masuk dari pengunjung, filter status baca, tandai sudah dibaca, dan hapus pesan. _Model `ContactMessage` belum ada di schema._ |
| **Kelola Blog (Blog CMS)** | 🚧 | CRUD artikel: judul, slug, konten rich text (TipTap), gambar cover, kategori, dan penulis. _Server action `services/admin/articles.ts` sudah ada; UI admin belum ada._ |
| **Kelola User & Role (RBAC)** | 🚧 | CRUD user dan role. _Server action `services/admin/users.ts` & `roles.ts` sudah ada; UI admin belum ada._ |
| **Kelola SEO per Halaman (Page SEO)** | ❌ | Pengaturan meta title, meta description, OG image, canonical URL per halaman. _Model `PageSeo` belum ada di schema; SEO saat ini via env + `genPageMetadata`._ |

---

### 4.3 User Stories

- Sebagai **calon klien hotel/restoran**, saya ingin mempelajari spesifikasi dan fitur Alcor PMS & POS serta mengirim formulir permintaan demo dengan mudah.
- Sebagai **calon mitra**, saya ingin melihat daftar integrasi/benefit kemitraan dan mengajukan diri menjadi mitra resmi Pyxis.
- Sebagai **admin perusahaan**, saya ingin mengunggah produk baru, memperbarui materi legal, atau mengubah status lowongan karir secara mandiri tanpa bantuan developer.
- Sebagai **admin perusahaan**, saya ingin memantau dan memilah pesan/leads yang masuk dari pengunjung website untuk segera ditindaklanjuti oleh tim sales.
- Sebagai **admin perusahaan**, saya ingin menulis dan menerbitkan artikel blog (tips, berita perusahaan) secara mandiri untuk mendukung SEO dan kredibilitas.
- Sebagai **pengunjung**, saya ingin membaca artikel blog perusahaan untuk memahami keahlian Pyxis sebelum memutuskan menghubungi tim sales.

---

## 5. Out of Scope (TIDAK Dikerjakan pada Versi Ini)

Untuk menjaga fokus, kualitas, dan tenggat waktu rilis:

- ❌ **Pendaftaran Publik (`/register`) & Multi-Role Admin** — Hanya ada 1 akun admin resmi yang dibuat via database seeding. _Catatan 2026-08-19: schema & Better Auth plugin `admin` sudah mendukung RBAC Role/Permission; UI multi-role belum dibangun dan keputusan scope ini perlu ditinjau ulang._
- ❌ **Multi-bahasa (i18n)** — Default Bahasa Indonesia.
- ❌ **Sistem Pembayaran / E-Commerce Online** — Transaksi software enterprise B2B dilakukan via proses sales/kontrak offline.
- ❌ **Live Chat Widget Pihak Ketiga** — Saluran komunikasi terpusat pada form kontak terintegrasi database.
- ❌ **Notifikasi Email SMTP Otomatis** — Pesan tersimpan di database dan dikelola langsung via admin dashboard. _Catatan 2026-08-19: infrastruktur antrean email (`EmailQueue` + Nodemailer) sudah ada dan dipakai untuk newsletter/reset password/verifikasi; email notifikasi leads tetap masuk backlog._
- ❌ **Fitur Blog Lanjutan (kategori, tag, komentar, multi-penulis)** — Blog tersedia versi sederhana: artikel + SEO per artikel. _Catatan 2026-08-19: model `ArticleCategory` sudah ada di schema; tag/komentar tetap masuk backlog._
- ❌ **Dark Mode** — Mengikuti standar tema terang korporat B2B yang bersih dan profesional. _Catatan 2026-08-19: infrastruktur dark mode (`next-themes`, token `.dark` di globals.css, `ThemeToggle`) sudah terpasang dari template; keputusan scope tema terang tetap berlaku._

---

## 6. Arsitektur & Teknologi

- **Framework**: Next.js 16.2 (App Router, Turbopack, React 19, TypeScript strict mode, `typedRoutes`)
- **Database & ORM**: PostgreSQL via Prisma ORM 7 (driver `@prisma/adapter-pg`, client di-generate ke `generated/prisma`, konfigurasi di `prisma.config.ts`)
- **Autentikasi**: Better Auth (email+password, plugin `admin` untuk RBAC Role/Permission) — detail di `docs/ARCHITECTURE.md`
- **Media Storage**: ImageKit (upload server-side via REST API + kompresi `sharp`)
- **Styling**: Tailwind CSS 4 (CSS-first `@theme`) + shadcn/ui (Font: Inter + Geist)
- **Validasi**: Zod 4 schema validation (Client & Server side, schema di `src/schemas`)
- **Mutasi data**: Server Actions (`'use server'` di `src/services`), bukan REST route handler

---

## 7. Kriteria Sukses (Acceptance Criteria)

1. Seluruh halaman publik (Produk, Detail Produk, Mitra, Karir, Kontak, Legal, Blog, Detail Artikel) menampilkan data dinamis dari database PostgreSQL.
2. Form kontak dan form pendaftaran kemitraan tervalidasi dengan baik dan tersimpan ke database.
3. Akses rute `/admin/*` terlindungi secara ketat; unauthorized user otomatis dialihkan ke halaman login admin.
4. Admin dapat melakukan operasi CRUD pada seluruh modul konten tanpa menimbulkan error runtime.
5. Antarmuka 100% responsif pada viewport mobile (360px+), tablet, dan desktop tanpa ada masalah horizontal overflow.
6. Lolos pemeriksaan `npm run lint`, `npm run typecheck`, dan `npm run build` tanpa error.

---

> ⚠️ **Fitur Inti yang TIDAK BOLEH Dihapus**: CRUD Produk, Form Kontak ke DB, Login Admin, Konten Dinamis Halaman Publik.
