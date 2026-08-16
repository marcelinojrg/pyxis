# ARCHITECTURE.md — Arsitektur Teknis

## 1. Tech Stack Lengkap

| Layer           | Teknologi                                            | Versi (minimal)           | Alasan                                            |
| --------------- | ---------------------------------------------------- | ------------------------- | ------------------------------------------------- |
| Framework       | Next.js                                              | 15.x (App Router)         | Frontend + backend jadi satu, cocok solo dev      |
| Bahasa          | TypeScript                                           | 5.x                       | Strict typing, kurangi bug                        |
| Database        | PostgreSQL                                           | 15+                       | Relasional, gratis di Neon/Supabase               |
| ORM             | Prisma                                               | 5.x                       | Schema-first, migrasi mudah                       |
| Auth            | NextAuth.js (Auth.js)                                | 5.x (beta/stable terbaru) | Standar untuk Next.js, credentials provider cukup |
| Styling         | TailwindCSS                                          | 3.x/4.x                   | Cepat untuk solo dev                              |
| Komponen UI     | shadcn/ui                                            | latest                    | Komponen siap pakai, tetap bisa dikustom          |
| Validasi        | Zod                                                  | latest                    | Validasi schema di server & client                |
| Upload gambar   | Cloudinary (via `next-cloudinary` atau API langsung) | latest                    | Tidak perlu storage server sendiri                |
| Hosting app     | Vercel                                               | -                         | Auto-deploy dari GitHub, gratis untuk skala ini   |
| Hosting DB      | Neon atau Supabase (pilih salah satu)                | -                         | PostgreSQL gratis tier                            |
| Package manager | npm                                                  | -                         | Default, konsisten                                |

## 2. Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Admin {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // hashed dengan bcrypt, JANGAN plaintext
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model HeroSection {
  id          String   @id @default(cuid())
  title       String
  subtitle    String
  imageUrl    String?
  ctaLabel    String   @default("Hubungi Kami")
  ctaUrl      String   @default("/kontak")
  updatedAt   DateTime @updatedAt
  // Catatan: tabel ini didesain hanya akan punya 1 row (singleton pattern).
  // Ambil row pertama via findFirst(), buat row default lewat seed.
}

model AboutContent {
  id          String   @id @default(cuid())
  title       String
  content     String   @db.Text
  imageUrl    String?
  updatedAt   DateTime @updatedAt
  // Singleton pattern, sama seperti HeroSection.
}

model Product {
  id           String   @id @default(cuid())
  name         String
  slug         String   @unique
  shortDesc    String
  fullDesc     String   @db.Text
  features     String[] // array string, tiap elemen 1 fitur
  imageUrl     String?
  galleryUrls  String[] @default([])
  order        Int      @default(0)
  isPublished  Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@index([slug])
  @@index([order])
}

model ContactMessage {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String?
  message   String   @db.Text
  isRead    Boolean  @default(false)
  createdAt DateTime @default(now())

  @@index([isRead])
  @@index([createdAt])
}
```

**Catatan penting seed data**: `prisma/seed.ts` HARUS membuat:

1. Satu row `HeroSection` default (judul & subtitle placeholder yang masuk akal).
2. Satu row `AboutContent` default.
3. Satu akun `Admin` dari `ADMIN_EMAIL` / `ADMIN_PASSWORD` di `.env.local` (password di-hash pakai `bcrypt` sebelum disimpan).
4. Minimal 2 row `Product` dummy (Alcor PMS, Alcor POS) supaya halaman produk tidak kosong saat testing.

## 4. Daftar API / Route Handler

| Method | Path                      | Auth?               | Deskripsi                                                           |
| ------ | ------------------------- | ------------------- | ------------------------------------------------------------------- |
| GET    | `/api/hero`               | Tidak               | Ambil data hero untuk halaman Home                                  |
| PUT    | `/api/hero`               | **Admin**           | Update data hero                                                    |
| GET    | `/api/about`              | Tidak               | Ambil data about                                                    |
| PUT    | `/api/about`              | **Admin**           | Update data about                                                   |
| GET    | `/api/produk`             | Tidak               | List semua produk yang `isPublished=true`, urut berdasarkan `order` |
| POST   | `/api/produk`             | **Admin**           | Tambah produk baru                                                  |
| GET    | `/api/produk/[id]`        | Tidak               | Detail 1 produk                                                     |
| PUT    | `/api/produk/[id]`        | **Admin**           | Update produk                                                       |
| DELETE | `/api/produk/[id]`        | **Admin**           | Hapus produk                                                        |
| POST   | `/api/kontak`             | Tidak (rate-limit!) | Simpan pesan dari form kontak publik                                |
| GET    | `/api/kontak`             | **Admin**           | List pesan masuk                                                    |
| PATCH  | `/api/kontak/[id]`        | **Admin**           | Update status `isRead`                                              |
| DELETE | `/api/kontak/[id]`        | **Admin**           | Hapus pesan                                                         |
| POST   | `/api/upload`             | **Admin**           | Upload gambar ke Cloudinary, return URL                             |
| \*     | `/api/auth/[...nextauth]` | -                   | Handler NextAuth (login/logout/session)                             |

Alternatif: boleh pakai **Next.js Server Actions** menggantikan sebagian route handler di atas (khususnya untuk form admin) — pilih salah satu pendekatan dan konsisten, jangan campur tanpa alasan jelas.

## 5. Alur Autentikasi Admin

1. Admin buka `/admin/login`, input email + password.
2. NextAuth `CredentialsProvider` mem-verifikasi ke tabel `Admin` (bandingkan password hash pakai `bcrypt.compare`).
3. Jika valid, session (JWT strategy) dibuat.
4. `src/app/admin/layout.tsx` mengecek session di server (`getServerSession`) — kalau tidak ada session valid, redirect ke `/admin/login`.
5. Semua Route Handler yang butuh admin harus memanggil helper `requireAdmin()` di `lib/auth.ts` yang cek session sebelum lanjut proses.

## 6. Alur Upload Gambar

1. Admin pilih file di form (`ImageUploader.tsx`).
2. Validasi client: tipe file (jpg/png/webp), ukuran maks 2MB.
3. Kirim ke `/api/upload` (multipart/form-data).
4. Server validasi ulang (jangan percaya client saja), lalu upload ke Cloudinary via SDK.
5. Response berisi `secure_url` dari Cloudinary, disimpan sebagai `imageUrl`/`galleryUrls` di database.

## 7. Keamanan (Non-negotiable)

- Semua route mutasi data (POST/PUT/PATCH/DELETE) di luar `/api/kontak` (POST) dan `/api/auth/*` **wajib** dicek admin session.
- `/api/kontak` (POST) publik tapi **wajib diberi rate limiting sederhana** (misal: max 5 request/menit per IP) untuk mencegah spam — bisa pakai package ringan seperti `@upstash/ratelimit` atau implementasi in-memory sederhana kalau traffic rendah.
- Semua input divalidasi dengan Zod schema di server, bukan hanya di client.
- Password admin **wajib** di-hash dengan `bcrypt` (salt rounds minimal 10), tidak pernah disimpan/di-log plaintext.
- Sanitasi input teks (terutama `message` dari form kontak) untuk mencegah XSS saat ditampilkan di dashboard.
- `.env.local` wajib masuk `.gitignore` — cek sebelum commit pertama.

## 8. Deployment

1. Push repo ke GitHub.
2. Connect repo ke Vercel, set semua environment variable dari `.env.example` di dashboard Vercel.
3. Database: buat project di Neon/Supabase, copy `DATABASE_URL` ke Vercel env.
4. Jalankan `npx prisma migrate deploy` (bukan `migrate dev`) untuk environment production — bisa lewat build command Vercel: `prisma generate && prisma migrate deploy && next build`.
5. Jalankan seed sekali secara manual (via `npx prisma db seed` dari local yang connect ke DB production, atau lewat script terpisah) untuk membuat akun admin pertama.
