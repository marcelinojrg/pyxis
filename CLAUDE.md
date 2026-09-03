# CLAUDE.md — Instruksi Utama untuk AI Agent

> File ini adalah **entry point wajib**. Baca file ini di awal SETIAP sesi kerja, sebelum menyentuh kode apa pun.

## 1. Tentang Project

**Nama project**: Company Profile Dinamis — PT. Pyxis Ultimate Solution
**Deskripsi singkat**: Website company profile untuk PT. Pyxis Ultimate Solution (perusahaan software hotel & restoran, Malang — produk utama: Alcor PMS, Alcor POS). CMS admin hanya mencakup Produk, Blog, dan Karier. Halaman lain menggunakan konten statis atau konfigurasi/env sesuai kebutuhan.

**Pemilik project**: dikerjakan solo, dibantu penuh oleh AI agent (kamu).
**Target rilis**: 4 minggu dari kickoff.

## 2. Urutan Membaca Dokumen (WAJIB, jangan dilompati)

1. `CLAUDE.md` (file ini) — overview & aturan main
2. `docs/PRD.md` — requirement produk, fitur apa saja yang harus ada, apa yang TIDAK boleh dikerjakan (ada kolom status implementasi per halaman/modul)
3. `docs/ARCHITECTURE.md` — stack teknis, struktur folder, schema database, alur auth/upload/email
4. `docs/DESIGN.md` — panduan visual: token warna, tipografi, spacing
5. `docs/ONLY_ME.md` — status known issues & backlog. Cek bagian "Laporan Bug" sebelum mengerjakan sesuatu yang mungkin terkait.

Jangan mengerjakan task yang tidak ada di suruh. Jika menemukan kebutuhan baru saat coding, tanyakan dahulu sebagai task baru, baru dikerjakan.

## 3. Tech Stack (ringkas — detail penuh di ARCHITECTURE.md)

- Framework: **Next.js 16** (App Router, Turbopack, `typedRoutes`, React Compiler) + **React 19** + TypeScript strict
- Database: **PostgreSQL** via **Prisma ORM 7** (adapter `@prisma/adapter-pg`, client di `generated/prisma`)
- Auth: **Better Auth** (email+password, plugin `admin`, RBAC Role/Permission) — proteksi rute di `src/proxy.ts`
- Styling: **TailwindCSS 4** (CSS-first di `globals.css`) + **shadcn/ui**
- Upload gambar: **ImageKit** (server-side + kompresi `sharp`)
- Mutasi data: **Server Actions** (`'use server'` di `src/services`) — BUKAN REST route handler
- Validasi: **Zod 4** (schema di `src/schemas`)
- Email: **Nodemailer** + tabel `EmailQueue`
- Hosting: **Vercel** (app) + **Supabase/Neon** (database)

## 4. Command Penting

```bash
npm run dev               # dev server (localhost:3000, Turbopack)
npm run build             # build production
npm run lint              # eslint
npm run lint:fix          # eslint --fix
npm run typecheck         # tsc --noEmit
npm run db:seed           # seed database (tsx prisma/seed.ts) — lihat known issue di ONLY_ME.md
npx prisma migrate dev    # jalankan migrasi database (development)
npx prisma generate       # generate Prisma client setelah ubah schema
npx prisma studio         # buka GUI database
```

## 5. Aturan Coding (Non-negotiable)

1. **TypeScript strict** — tidak boleh ada `any` tanpa alasan jelas yang dikomentari. Perhatikan `verbatimModuleSyntax`: import type harus pakai `import type`.
2. **Konten halaman CMS Produk, Blog, dan Karier harus berasal dari database**, bukan hardcode di komponen. Halaman non-CMS boleh memakai konten statis atau env sesuai scope. Label UI statis (misal tombol "Kirim", "Simpan") selalu boleh.
3. **Setiap Server Action yang mengubah data (create/update/delete) HARUS dilindungi autentikasi + otorisasi** — cek session Better Auth lalu `verifyPermission` dari `services/admin/security.ts`. Tidak ada mutasi publik tanpa proteksi.
4. **Validasi input di server**, jangan percaya validasi client saja. Gunakan schema Zod di `src/schemas`.
5. **Upload gambar** lewat `uploadImage` (`services/public/uploads.ts`) — validasi tipe & ukuran di server sebelum kompresi dan kirim ke ImageKit.
6. **Komponen React**: functional component + TypeScript. Ikuti arsitektur di `src/components/README.md`: primitif di `ui/`, reusable di `Common/`, komposit di `Mixins/`, section halaman di `app/(root)/_components/`.
7. **Penamaan file**: kebab-case untuk primitif ui, PascalCase untuk komponen fitur; nama komponen React PascalCase.
8. **Jangan install package baru** di luar yang sudah ada di `package.json` tanpa mencatat alasannya di `ONLY_ME.md` dulu.
9. **Selesai = terverifikasi** — lihat Definition of Done di bawah.
10. Tulis komentar dalam Bahasa Indonesia atau Inggris konsisten (pilih salah satu di awal, jangan campur dalam satu file).

## 6. Environment Variables yang Dibutuhkan

Buat file `.env` (JANGAN pernah commit file ini ke git) — referensi lengkap di `.env.example`:

```
DATABASE_URL=             # PostgreSQL (lokal / Supabase pooler)
DIRECT_URL=               # session-mode pooler untuk prisma migrate
BETTER_AUTH_SECRET=       # secret Better Auth
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SEO_*=        # metadata SEO (title, description, social, dll)
IMAGEKIT_URL=             # endpoint ImageKit
IMAGEKIT_PRIVATE_KEY=     # private key (server-only!)
IMAGEKIT_PUBLIC_KEY=
SMTP_HOST=                # kredensial SMTP untuk EmailQueue
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
```

Pastikan `.env` masuk `.gitignore`.

## 7. Definition of Done (untuk SETIAP task)

Sebuah task dianggap selesai HANYA jika:

- [ ] Kode berjalan tanpa error di `npm run dev`
- [ ] Tidak ada error BARU di `npm run typecheck` (baseline saat ini masih punya known issues — daftar di `ONLY_ME.md`; jangan menambah error baru)
- [ ] Tidak ada error di `npm run lint` untuk file yang disentuh
- [ ] Fitur sudah dicoba manual minimal 1x sesuai skenario di PRD.md
- [ ] Jika mengubah schema database, migrasi sudah dijalankan (`npx prisma migrate dev`) dan `npx prisma generate` berhasil
- [ ] Jika ada known issue yang selesai diperbaiki, update statusnya di `ONLY_ME.md`

## 8. Larangan Keras

- ❌ Jangan menyimpan file upload di local filesystem server (akan hilang saat deploy ulang di Vercel) — WAJIB lewat ImageKit.
- ❌ Jangan hardcode credential/API key di kode. Selalu lewat `process.env`.
- ❌ Jangan membuat fitur di luar scope `PRD.md` bagian "Out of Scope" tanpa persetujuan eksplisit dari user.
- ❌ Jangan skip validasi auth/permission di server action dengan alasan "biar cepat testing dulu".
- ❌ Jangan generate desain/komponen yang bertentangan dengan `DESIGN.md`.
- ❌ Jangan menghidupkan kembali kode leftover sistem event lama yang sudah dibersihkan.

## 9. Kalau Ragu

Jika instruksi ambigu atau bertabrakan antara `PRD.md`/`ARCHITECTURE.md`/`ONLY_ME.md`, **berhenti dan tanyakan ke user**, jangan mengasumsikan sendiri lalu lanjut coding.
