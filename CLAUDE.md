# CLAUDE.md — Instruksi Utama untuk AI Agent

> File ini adalah **entry point wajib**. Baca file ini di awal SETIAP sesi kerja, sebelum menyentuh kode apa pun.

## 1. Tentang Project

**Nama project**: Company Profile Dinamis — PT. Pyxis Ultimate Solution
**Deskripsi singkat**: Website company profile untuk PT. Pyxis Ultimate Solution (perusahaan software hotel & restoran, Malang — produk utama: Alcor PMS, Alcor POS). Seluruh konten (hero, about, daftar produk, kontak masuk) dikelola lewat admin dashboard, BUKAN hardcode di kode.

**Pemilik project**: dikerjakan solo, dibantu penuh oleh AI agent (kamu).
**Target rilis**: 4 minggu dari kickoff.

## 2. Urutan Membaca Dokumen (WAJIB, jangan dilompati)

1. `CLAUDE.md` (file ini) — overview & aturan main
2. `docs/PRD.md` — requirement produk, fitur apa saja yang harus ada, apa yang TIDAK boleh dikerjakan
3. `docs/ARCHITECTURE.md` — stack teknis, struktur folder, schema database, daftar API
4. `docs/DESIGN.md` — panduan visual: warna, tipografi, komponen, spacing

Jangan mengerjakan task yang tidak ada di suruh. Jika menemukan kebutuhan baru saat coding, tanyakan dahulu sebagai task baru, baru dikerjakan.

## 3. Tech Stack (ringkas — detail penuh di ARCHITECTURE.md)

- Framework: **Next.js 15** (App Router, TypeScript strict mode)
- Database: **PostgreSQL** via **Prisma ORM**
- Auth: **NextAuth.js (Auth.js)** — hanya 1 role: `admin`
- Styling: **TailwindCSS** + **shadcn/ui**
- Upload gambar: **Cloudinary**
- Hosting: **Vercel** (app) + **Neon/Supabase** (database)

## 4. Command Penting

```bash
npm run dev              # jalankan dev server (localhost:3000)
npm run build             # build production
npx prisma migrate dev    # jalankan migrasi database (development)
npx prisma studio         # buka GUI database
npx prisma generate       # generate Prisma client setelah ubah schema
npm run lint               # cek linting
npm run typecheck          # cek TypeScript (tsc --noEmit)
```

## 5. Aturan Coding (Non-negotiable)

1. **TypeScript strict** — tidak boleh ada `any` tanpa alasan jelas yang dikomentari.
2. **Semua teks yang tampil di halaman publik harus berasal dari database**, bukan hardcode di komponen. Kecuali label UI statis (misal tombol "Kirim", "Simpan").
3. **Setiap Server Action / Route Handler yang mengubah data (create/update/delete) HARUS dilindungi autentikasi admin.** Tidak ada endpoint tulis yang publik.
4. **Validasi input di server**, jangan percaya validasi client saja. Gunakan `zod` untuk schema validation.
5. **Semua form upload gambar** harus divalidasi tipe file (jpg/png/webp) dan ukuran maksimal (2MB) sebelum diupload ke Cloudinary.
6. **Komponen React**: functional component + TypeScript, satu file = satu komponen utama. Simpan di `/components`, dipisah `/components/public` dan `/components/admin`.
7. **Penamaan file**: kebab-case untuk file, PascalCase untuk nama komponen React.
8. **Jangan install package baru** di luar yang sudah disebut di ARCHITECTURE.md tanpa mencatat alasannya di TASKS.md dulu.
9. **Setiap kali sebuah task di TASKS.md selesai dan berjalan tanpa error**, update checkbox-nya jadi `[x]` sebelum lanjut ke task berikutnya.
10. Tulis komentar dalam Bahasa Indonesia atau Inggris konsisten (pilih salah satu di awal, jangan campur dalam satu file).

## 6. Environment Variables yang Dibutuhkan

Buat file `.env.local` (JANGAN pernah commit file ini ke git):

```
DATABASE_URL=              # connection string PostgreSQL (Neon/Supabase)
NEXTAUTH_SECRET=            # random string, generate dengan `openssl rand -base64 32`
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=                # email login admin awal (seed)
ADMIN_PASSWORD=             # password login admin awal (seed) — akan di-hash, bukan plaintext
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Pastikan `.env.local` masuk `.gitignore`. Sediakan `.env.example` (tanpa nilai asli) untuk referensi.

## 7. Definition of Done (untuk SETIAP task, bukan hanya project akhir)

Sebuah task dianggap selesai HANYA jika:

- [ ] Kode berjalan tanpa error di `npm run dev`
- [ ] Tidak ada error di `npm run typecheck`
- [ ] Tidak ada error di `npm run lint`
- [ ] Fitur sudah dicoba manual minimal 1x sesuai skenario di PRD.md
- [ ] Jika mengubah schema database, migrasi sudah dijalankan (`prisma migrate dev`) dan berhasil
- [ ] Checkbox terkait di `TASKS.md` sudah diupdate

## 8. Larangan Keras

- ❌ Jangan menyimpan file upload di local filesystem server (akan hilang saat deploy ulang di Vercel) — WAJIB pakai Cloudinary.
- ❌ Jangan hardcode credential/API key di kode. Selalu lewat `process.env`.
- ❌ Jangan membuat fitur di luar scope `PRD.md` bagian "Out of Scope" tanpa persetujuan eksplisit dari user.
- ❌ Jangan skip validasi auth di route/admin API dengan alasan "biar cepat testing dulu".
- ❌ Jangan generate desain/komponen yang bertentangan dengan `DESIGN.md`.

## 9. Kalau Ragu

Jika instruksi di `TASKS.md` ambigu atau bertabrakan dengan `PRD.md`/`ARCHITECTURE.md`, **berhenti dan tanyakan ke user**, jangan mengasumsikan sendiri lalu lanjut coding.
