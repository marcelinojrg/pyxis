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
| **404 & Error** | Not Found / Error | Halaman penanganan error kustom yang ramah pengguna dengan tombol navigasi kembali ke Home. |

---

### 4.2 Admin Dashboard (Protected, `/admin/*`)

Seluruh mutasi data di admin dashboard dilindungi autentikasi session admin tunggal:

| Modul | Deskripsi Fungsional |
| :--- | :--- |
| **Autentikasi & Akun** | Login admin via credentials (email & password ter-hash bcrypt), logout aman, dan fitur ganti password admin sendiri. *(Pendaftaran publik `/register` dilarang keras)*. |
| **Dashboard Metrics** | Ringkasan metrik: total produk terbit, total mitra aktif, jumlah pesan kontak masuk baru/belum dibaca (*unread*), dan total pesan. |
| **Pengaturan Global (Site Settings)** | Edit nama perusahaan, logo URL, alamat kantor, nomor telepon, email resmi, teks footer, dan tautan sosial media. |
| **Kelola Hero & Highlights** | Edit judul hero, subjudul hero, gambar hero, label CTA, URL CTA, serta CRUD poin-poin *Home Highlights* (judul, deskripsi, icon, urutan). |
| **Kelola Halaman About** | Edit teks judul, narasi sejarah, visi, misi, gambar pendukung, dan informasi alamat kantor. |
| **Kelola Produk (CRUD Lengkap)** | Tambah/edit/hapus produk: nama, slug unik (otomatis dari nama & dapat disesuaikan), deskripsi singkat, deskripsi lengkap, daftar fitur (list dinamis), upload gambar utama & galeri, urutan tampil (*order*), status *featured*, dan status *published*. |
| **Kelola Mitra (Partners CMS)** | Edit hero & benefit halaman kemitraan, serta CRUD data partner (nama mitra, kategori, deskripsi, logo/icon, urutan, status terbit). |
| **Kelola Karir (Career CMS)** | Edit pengantar karir, saklar status lowongan aktif (*open positions toggle*), teks detail posisi, dan email tujuan lamaran. |
| **Kelola Legal (Legal CMS)** | Edit konten Privacy Policy, Terms of Service, dan Cookie Policy secara dinamis. |
| **Kelola Pesan Kontak (Leads)** | Daftar pesan masuk dari pengunjung, filter berdasarkan status (sudah dibaca / belum) dan sumber pesan (*general* / *partnership*), tandai sudah dibaca, dan hapus pesan. |
| **Kelola SEO per Halaman (Page SEO)** | Pengaturan meta title, meta description, OG image, canonical URL, dan opsi noIndex per halaman (`pageKey`). |

---

### 4.3 User Stories

- Sebagai **calon klien hotel/restoran**, saya ingin mempelajari spesifikasi dan fitur Alcor PMS & POS serta mengirim formulir permintaan demo dengan mudah.
- Sebagai **calon mitra**, saya ingin melihat daftar integrasi/benefit kemitraan dan mengajukan diri menjadi mitra resmi Pyxis.
- Sebagai **admin perusahaan**, saya ingin mengunggah produk baru, memperbarui materi legal, atau mengubah status lowongan karir secara mandiri tanpa bantuan developer.
- Sebagai **admin perusahaan**, saya ingin memantau dan memilah pesan/leads yang masuk dari pengunjung website untuk segera ditindaklanjuti oleh tim sales.

---

## 5. Out of Scope (TIDAK Dikerjakan pada Versi Ini)

Untuk menjaga fokus, kualitas, dan tenggat waktu rilis:

- ❌ **Pendaftaran Publik (`/register`) & Multi-Role Admin** — Hanya ada 1 akun admin resmi yang dibuat via database seeding.
- ❌ **Multi-bahasa (i18n)** — Default Bahasa Indonesia.
- ❌ **Sistem Pembayaran / E-Commerce Online** — Transaksi software enterprise B2B dilakukan via proses sales/kontrak offline.
- ❌ **Live Chat Widget Pihak Ketiga** — Saluran komunikasi terpusat pada form kontak terintegrasi database.
- ❌ **Notifikasi Email SMTP Otomatis** — Pesan tersimpan di database dan dikelola langsung via admin dashboard (masuk ke *backlog/stretch goal*).
- ❌ **Blog / Artikel / News Section Komprehensif** — Fokus penuh pada profil korporat dan katalog produk.
- ❌ **Dark Mode** — Mengikuti standar tema terang korporat B2B yang bersih dan profesional.

---

## 6. Arsitektur & Teknologi

- **Framework**: Next.js 16 (App Router, Turbopack, React 19, TypeScript strict mode)
- **Database & ORM**: PostgreSQL via Prisma ORM 7 (`prisma.config.ts` datasource)
- **Autentikasi**: NextAuth.js / Auth.js (Credentials Provider, session-based)
- **Media Storage**: Cloudinary (Upload gambar produk, logo, dan dokumen pendukung)
- **Styling**: Tailwind CSS + shadcn/ui components (Font: Poppins untuk heading, Inter untuk body)
- **Validasi**: Zod schema validation (Client & Server side)

---

## 7. Kriteria Sukses (Acceptance Criteria)

1. Seluruh halaman publik (Home, Tentang, Produk, Detail Produk, Mitra, Karir, Kontak, Legal) menampilkan data dinamis dari database PostgreSQL.
2. Form kontak dan form pendaftaran kemitraan tervalidasi dengan baik dan tersimpan ke database `ContactMessage`.
3. Akses rute `/admin/*` terlindungi secara ketat; unauthorized user otomatis dialihkan ke halaman login admin.
4. Admin dapat melakukan operasi CRUD pada seluruh modul konten tanpa menimbulkan error runtime.
5. Antarmuka 100% responsif pada viewport mobile (360px+), tablet, dan desktop tanpa ada masalah horizontal overflow.
6. Lolos pemeriksaan `npm run lint`, `npm run typecheck`, dan `npm run build` tanpa error.

---

## 8. Prioritas Penyesuaian (Jika Waktu Mendesak)

Jika waktu pengembangan terbatas, pemotongan fitur dilakukan berdasarkan urutan berikut:
1. Galeri multi-gambar produk → cukup 1 gambar utama per produk.
2. Embed Google Maps interaktif pada halaman kontak → cukup informasi teks alamat lengkap.
3. Fitur filter kategori mitra → cukup grid daftar mitra standar.
4. Pergantian password admin di dashboard → dapat dilakukan via database / Prisma Studio.

> ⚠️ **Fitur Inti yang TIDAK BOLEH Dihapus**: CRUD Produk, Form Kontak ke DB, Login Admin, Konten Dinamis Halaman Publik.
