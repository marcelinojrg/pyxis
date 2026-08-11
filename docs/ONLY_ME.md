# TASKS.md — Checklist Eksekusi

> Aturan pakai file ini:
>
> 1. AI agent mengerjakan task **secara berurutan dari atas**, satu per satu.
> 2. Setelah task selesai DAN memenuhi "Definition of Done" di `CLAUDE.md`, ubah `[ ]` jadi `[x]`.
> 3. Jangan mengerjakan task Minggu 2 sebelum semua task Minggu 1 selesai, kecuali ada alasan teknis jelas (misal: perlu setup Prisma lebih awal) — kalau begitu, catat alasannya di sini sebagai komentar.
> 4. Kalau muncul ide fitur baru di luar `PRD.md`, JANGAN langsung dikerjakan — tambahkan di bagian **"Backlog / Stretch Goal"** paling bawah.

---

## Minggu 1 — Perencanaan & Setup Fondasi

### Hari 1-2: Setup Project

- [ ] Init project Next.js 15 (TypeScript, App Router, Tailwind) — `npx create-next-app@latest`
- [ ] Setup ESLint + Prettier, pastikan konsisten
- [ ] Install & setup shadcn/ui (`npx shadcn@latest init`)
- [ ] Buat struktur folder sesuai `ARCHITECTURE.md` bagian 2
- [ ] Setup repo GitHub, push commit pertama
- [ ] Buat `.env.example` (kosong/placeholder, sesuai daftar di `CLAUDE.md` bagian 6)
- [ ] Buat project database di Neon atau Supabase, dapatkan `DATABASE_URL`

### Hari 3-4: Database & Prisma

- [ ] Install Prisma, init (`npx prisma init`)
- [ ] Tulis `prisma/schema.prisma` sesuai `ARCHITECTURE.md` bagian 3 (semua model: Admin, HeroSection, AboutContent, Product, ContactMessage)
- [ ] Jalankan migrasi pertama (`npx prisma migrate dev --name init`)
- [ ] Buat `prisma/seed.ts` (seed admin + hero default + about default + 2 produk dummy)
- [ ] Test seed berjalan (`npx prisma db seed`), cek data via `npx prisma studio`
- [ ] Buat `src/lib/prisma.ts` (Prisma client singleton, hindari multiple instance saat dev)

### Hari 5: Deploy Skeleton

- [ ] Deploy project (masih kosong/minimal) ke Vercel, sambungkan ke repo GitHub
- [ ] Set semua environment variable di dashboard Vercel
- [ ] Pastikan build production berhasil tanpa error
- [ ] Catat URL deployment untuk referensi testing selanjutnya

### Hari 6-7: Layout Dasar & Navigasi

- [ ] Buat `src/app/layout.tsx` (font Poppins + Inter via `next/font/google`, `globals.css` dengan token warna dari `DESIGN.md`)
- [ ] Buat komponen `Navbar.tsx` (desktop + mobile hamburger menu)
- [ ] Buat komponen `Footer.tsx`
- [ ] Buat halaman placeholder kosong untuk semua route publik (Home, About, Produk, Detail Produk, Kontak) supaya routing sudah jalan
- [ ] Setup halaman 404 custom

**Definition of Done Minggu 1**: `npm run dev` jalan tanpa error, semua route publik bisa diakses (isi masih kosong/placeholder), database sudah punya schema + seed data, project sudah ter-deploy di Vercel.

---

## Minggu 2 — Backend, Auth, dan CRUD API

### Hari 8-9: Autentikasi Admin

- [ ] Install & konfigurasi NextAuth.js (Credentials Provider)
- [ ] Buat `src/lib/auth.ts` (konfigurasi, callback session, helper `requireAdmin()`)
- [ ] Implementasi hashing password dengan `bcrypt` di seed & di proses login
- [ ] Buat halaman `/admin/login` (form email + password)
- [ ] Buat `src/app/admin/layout.tsx` yang redirect ke login kalau belum ada session
- [ ] Test: login dengan akun seed berhasil, akses `/admin` tanpa login redirect ke `/admin/login`

### Hari 10-11: API Hero & About

- [ ] Buat Zod schema validasi untuk Hero & About (`lib/validations/`)
- [ ] Implementasi `GET /api/hero` dan `PUT /api/hero` (dengan `requireAdmin()`)
- [ ] Implementasi `GET /api/about` dan `PUT /api/about` (dengan `requireAdmin()`)
- [ ] Test semua endpoint pakai Postman/Thunder Client atau `curl`, pastikan endpoint PUT ditolak kalau tidak login

### Hari 12-13: API Produk (CRUD penuh)

- [ ] Buat Zod schema validasi Produk (termasuk validasi `slug` unik format kebab-case)
- [ ] Implementasi `GET /api/produk` (list, filter `isPublished=true` untuk publik)
- [ ] Implementasi `POST /api/produk` (admin only)
- [ ] Implementasi `GET /api/produk/[id]`
- [ ] Implementasi `PUT /api/produk/[id]` (admin only)
- [ ] Implementasi `DELETE /api/produk/[id]` (admin only)
- [ ] Buat helper `slugify()` di `lib/utils.ts` untuk auto-generate slug dari nama produk
- [ ] Test semua endpoint CRUD, termasuk skenario gagal (slug duplikat, field wajib kosong)

### Hari 14: API Kontak & Upload

- [ ] Buat Zod schema validasi form kontak
- [ ] Implementasi `POST /api/kontak` (publik, TAMBAHKAN rate limiting sederhana)
- [ ] Implementasi `GET /api/kontak`, `PATCH /api/kontak/[id]`, `DELETE /api/kontak/[id]` (admin only)
- [ ] Setup akun Cloudinary, dapatkan credential, masukkan ke env
- [ ] Implementasi `POST /api/upload` (validasi tipe & ukuran file di server)
- [ ] Test upload gambar, pastikan URL Cloudinary tersimpan dengan benar

**Definition of Done Minggu 2**: Semua endpoint API di `ARCHITECTURE.md` bagian 4 berfungsi dan sudah ditest manual, auth admin bekerja, upload gambar ke Cloudinary berhasil.

---

## Minggu 3 — Frontend Publik & Admin Dashboard

### Hari 15-16: Halaman Publik — Home & About

- [ ] Halaman Home: fetch data Hero, tampilkan `HeroSection` sesuai `DESIGN.md`
- [ ] Halaman Home: tampilkan grid produk unggulan (max 3-4) dengan `ProductCard`
- [ ] Halaman About: fetch & tampilkan `AboutContent`
- [ ] Pastikan responsif di mobile (test resize browser ke 360px)

### Hari 17-18: Halaman Publik — Produk & Kontak

- [ ] Halaman `/produk`: list semua produk published, grid responsif
- [ ] Halaman `/produk/[slug]`: detail produk (fetch by slug, 404 kalau tidak ditemukan/`isPublished=false`)
- [ ] Halaman `/kontak`: form kontak dengan validasi client (react-hook-form + zod) + submit ke `/api/kontak`
- [ ] Tampilkan notifikasi sukses/error setelah submit form (pakai toast dari shadcn/ui)

### Hari 19-20: Admin Dashboard — Layout & Kelola Konten

- [ ] Buat `AdminSidebar.tsx` (menu: Dashboard, Hero, About, Produk, Pesan, Pengaturan)
- [ ] Halaman dashboard home: tampilkan ringkasan angka (jumlah produk, pesan belum dibaca)
- [ ] Halaman edit Hero (form terhubung ke `PUT /api/hero`)
- [ ] Halaman edit About (form terhubung ke `PUT /api/about`)
- [ ] Buat komponen `ImageUploader.tsx` (reusable, dipakai di Hero/About/Produk)

### Hari 21: Admin Dashboard — Kelola Produk & Pesan

- [ ] Halaman list produk admin (table, tombol edit/hapus/tambah)
- [ ] Halaman form tambah produk (`/admin/produk/baru`) — termasuk input dinamis untuk list fitur (tambah/hapus baris)
- [ ] Halaman form edit produk (`/admin/produk/[id]/edit`)
- [ ] Implementasi hapus produk dengan konfirmasi dialog (jangan langsung hapus tanpa konfirmasi)
- [ ] Halaman list pesan kontak (`/admin/pesan`), tombol tandai dibaca & hapus

**Definition of Done Minggu 3**: Semua halaman publik menampilkan data real dari database, admin bisa mengelola Hero/About/Produk/Pesan penuh lewat UI (bukan lewat Prisma Studio lagi).

---

## Minggu 4 — Integrasi, Konten, Testing, Deploy Final

### Hari 22-23: Pengisian Konten Asli

- [ ] Ganti konten dummy Hero dengan konten asli Pyxis (kerja sama dengan user untuk copywriting final)
- [ ] Ganti konten dummy About dengan sejarah asli (MYOH → Pyxis, visi misi)
- [ ] Input data produk asli: Alcor PMS (fitur: Reservation, Front Desk, House Keeping, Profiles, Rate Management, Online Booking, Event Calendar, Reports) dan Alcor POS (fitur: Multi outlet, Order, Printing receipt, Integrasi PMS, Dashboard, Report)
- [ ] Upload gambar-gambar asli (produk, kantor, dsb — minta ke user kalau belum ada)

### Hari 24-25: Testing Menyeluruh

- [ ] Test seluruh user story di `PRD.md` bagian 4.3 satu per satu
- [ ] Test responsif di 3 ukuran layar (mobile 360px, tablet 768px, desktop 1280px+)
- [ ] Test form kontak: submit sukses, validasi gagal (email invalid, field kosong), rate limit
- [ ] Test admin: login gagal (password salah), CRUD produk penuh, upload gambar gagal (file terlalu besar/tipe salah)
- [ ] Cek console browser, pastikan tidak ada error/warning yang mengganggu
- [ ] Jalankan `npm run lint` dan `npm run typecheck`, pastikan bersih

### Hari 26-27: Optimasi & Bug Fixing

- [ ] Pastikan semua gambar pakai `next/image` dengan `sizes` yang tepat
- [ ] Cek Lighthouse score (Performance, Accessibility, SEO) — target minimal skor 80+ untuk masing-masing
- [ ] Perbaiki isu accessibility dasar (kontras, alt text, label form) sesuai `DESIGN.md` bagian 9
- [ ] Fix bug-bug yang ditemukan saat testing

### Hari 28: Deploy Final & Dokumentasi

- [ ] Deploy final ke Vercel (production build bersih)
- [ ] Jalankan `prisma migrate deploy` di database production
- [ ] Jalankan seed admin production (SATU KALI saja, pastikan password kuat, bukan password testing)
- [ ] Test ulang seluruh flow di URL production (bukan hanya localhost)
- [ ] Tulis dokumentasi singkat cara pakai admin dashboard (bisa file `docs/PANDUAN-ADMIN.md` terpisah, bahasa sederhana untuk staf non-teknis)
- [ ] Ganti password seed testing kalau berbeda dari yang dipakai production

**Definition of Done Minggu 4 / Project**: Semua kriteria di `PRD.md` bagian 6 (Acceptance Criteria) terpenuhi, website live di Vercel, admin sudah bisa dipakai staf Pyxis secara mandiri.

---

## Backlog / Stretch Goal (jangan dikerjakan kecuali diminta eksplisit)

- [ ] Testimoni klien dengan rating
- [ ] Embed Google Maps di halaman kontak
- [ ] Notifikasi email otomatis saat ada pesan masuk baru
- [ ] Drag-and-drop untuk urutan produk (bukan input angka manual)
- [ ] Blog/artikel section

---

## Catatan Perubahan (isi manual jika ada penyesuaian scope di tengah jalan)

<!-- Contoh format:
- 2026-08-15: Skip fitur galeri multi-gambar produk karena waktu mepet, sesuai prioritas di PRD.md bagian 7.
-->
