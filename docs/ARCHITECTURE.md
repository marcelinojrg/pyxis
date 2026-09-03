# ARCHITECTURE.md — Arsitektur Teknis

> Disinkronkan dengan struktur `src/` hasil refactor 2026-08-19 dan schema database berjalan.
> Sumber kebenaran: `package.json`, `prisma/schema.prisma`, `next.config.ts`, `.env.example`, dan isi `src/`.

## 1. Tech Stack Lengkap

| Layer              | Teknologi                                        | Versi (package.json) | Catatan                                                        |
| ------------------ | ------------------------------------------------ | -------------------- | -------------------------------------------------------------- |
| Framework          | Next.js (App Router, Turbopack)                  | 16.2.x               | `typedRoutes`, `reactCompiler`, Server Actions (body 50MB)      |
| Bahasa             | TypeScript                                       | 6.x                  | strict, `verbatimModuleSyntax` aktif                            |
| UI                 | React                                            | 19.2.x               | React Compiler aktif                                            |
| Database           | PostgreSQL                                       | -                    | Lokal (dev) / Supabase (prod)                                   |
| ORM                | Prisma                                           | 7.8.x                | Generator `prisma-client` → `generated/prisma`, driver `@prisma/adapter-pg` |
| Auth               | Better Auth                                      | 1.6.x                | Plugin `admin` (RBAC), email+password, email verification       |
| Styling            | TailwindCSS                                      | 4.2.x                | CSS-first (`@theme` di `globals.css`), dark mode via class      |
| Komponen UI        | shadcn/ui (radix-ui)                             | latest               | Primitif di `src/components/ui`                                 |
| Validasi           | Zod                                              | 4.x                  | Schema di `src/schemas`, dipakai server & client                |
| Upload gambar      | ImageKit                                         | `@imagekit/next` 2.x | Upload via REST API server-side + kompresi `sharp`              |
| Rich text editor   | TipTap                                           | 3.x                  | Editor + toolbar custom di `components/ui/toolbars`             |
| Data fetching      | TanStack Query + Server Actions                  | 5.x                  | Mutasi via `'use server'` di `src/services`                     |
| Tabel              | TanStack Table                                   | 8.x                  | Untuk list/tabel admin                                          |
| Email              | Nodemailer + tabel `EmailQueue`                  | 9.x                  | Antrean email (newsletter, reset password, verifikasi)          |
| Chart              | Recharts                                         | 3.x                  | Dashboard                                                       |
| Form               | React Hook Form + `@hookform/resolvers`          | 7.x                  | -                                                               |
| Testing            | Playwright                                       | 1.6x                 | Konfigurasi di `playwright.config.ts`, test di `test/`          |
| Hosting app        | Vercel                                           | -                    | -                                                               |
| Hosting DB         | Supabase / Neon                                  | -                    | PostgreSQL                                                      |
| Package manager    | npm                                              | 11.x                 | -                                                               |

## 2. Struktur Folder `src/`

```
src/
├── app/                      # Next.js App Router
│   ├── (root)/               # Route publik: /, /about, /contact
│   │   └── _components/      # Section per halaman (HomeHero, AboutProfile, ...)
│   ├── (admin)/              # Route admin: /admin (dilindungi proxy)
│   ├── (auth)/               # Route auth: /login
│   ├── actions/              # Server action standalone (newsletter.ts)
│   ├── layout.tsx            # Root layout: metadata, font, providers, Toaster
│   ├── seo.tsx               # Helper genPageMetadata (OG/Twitter/meta)
│   ├── sitemap.tsx           # Sitemap dinamis
│   ├── robots.tsx            # robots.txt
│   ├── error.tsx / loading.tsx / not-found.tsx
│   └── globals.css           # Token desain Tailwind 4 (@theme) + style TipTap
├── components/
│   ├── ui/                   # Primitif shadcn/ui + toolbars TipTap (lihat components/README.md)
│   ├── Common/               # Komponen reusable (RichTextEditor, Modals, Loader, ...)
│   └── Mixins/               # Komponen komposit (Navbar, Footer)
├── services/                 # Server Actions ('use server'), dikelompokkan per aktor
│   ├── admin/                # users, roles, articles, security (+ audit, cors, inputs)
│   ├── public/               # uploads, emails, auth
│   └── index.ts              # Barrel re-export
├── schemas/                  # Schema validasi Zod per domain (users, roles, articles, auth, ...)
├── interfaces/               # Tipe TypeScript (features/, modal, heading, alert)
├── hooks/                    # Hooks client (usePagination, useDebounce, useSort, ...)
├── lib/                      # Utilitas: prisma, auth (server), authClient (client), slugify, format*
├── providers/                # QueryProvider (TanStack Query), PermissionProvider
├── data/                     # siteMetadata (digerakkan env NEXT_PUBLIC_SEO_*)
├── types/                    # Deklarasi tipe global (.d.ts)
└── proxy.ts                  # Proteksi route Next.js 16 (pengganti middleware)
```

Konvensi penamaan komponen didokumentasikan di `src/components/README.md` (Common / Mixins / UI).

## 3. Database Schema (Prisma)

- File schema: `prisma/schema.prisma`.
- Client di-generate ke `generated/prisma` (generator `prisma-client`, bukan `prisma-client-js`).
- Koneksi runtime memakai driver adapter `@prisma/adapter-pg` (`PrismaPg`), bukan URL global di datasource.
- Migrasi memakai `DIRECT_URL` (session-mode pooler) yang dikonfigurasi di `prisma.config.ts`.

### Model — Auth (blok Better Auth)

| Model        | Fungsi                                                            |
| ------------ | ----------------------------------------------------------------- |
| `User`       | Akun pengguna; field tambahan `role`, `banned`, `roleId`          |
| `Session`    | Sesi Better Auth (token, expiry, IP, user agent)                  |
| `Account`    | Kredensial per provider (password untuk email+password)           |
| `Verification` | Token verifikasi email / reset password                         |
| `Role`       | Nama role (mis. `superadmin`)                                     |
| `Permission` | Nama permission (mis. `admin.access`), many-to-many dengan `Role` |

Relasi role user ada dua jalur: many-to-many `User.roles` dan one-to-many `User.roleId` — keduanya dicek saat otorisasi (lihat `proxy.ts` dan `services/admin/security.ts`).

### Model — Konten

| Model                     | Fungsi                                                              |
| ------------------------- | ------------------------------------------------------------------- |
| `Product`                 | Produk (Alcor PMS/POS): slug, nama, deskripsi, gambar               |
| `ProductBenefit`          | Benefit produk (icon, order)                                        |
| `ProductFeature`          | Fitur utama produk (icon, order)                                    |
| `ProductCapability`       | Grup kapabilitas + gambar mockup                                    |
| `ProductCapabilityItem`   | Item dalam grup kapabilitas                                         |
| `Career` + `CareerCategory` | Lowongan kerja (slug, lokasi, tipe, departemen, persyaratan)      |
| `CareerApplication`       | Lamaran kerja (CV, portfolio, status `ApplicationStatus`)           |
| `Article` + `ArticleCategory` | Artikel/blog (slug, konten, cover, pembuat)                     |
| `Branch`                  | Kantor cabang (alamat, telp, email, `isPrimary`)                    |
| `Client`                  | Logo klien/partner                                                  |

### Model — Operasional

| Model                | Fungsi                                                    |
| -------------------- | --------------------------------------------------------- |
| `EmailQueue`         | Antrean email (`EmailStatus`: PENDING/PROCESSING/SENT/FAILED) |
| `NewsletterSubscriber` | Email pelanggan newsletter                              |

Enum yang tersedia di generated client: `EmailStatus`, `ApplicationStatus`.

Konten CMS hanya memakai model Produk, Blog, dan Karier. Konten company profile lain berasal dari source statis atau environment sesuai `PRD.md`.

## 4. Pola Mutasi Data: Server Actions (BUKAN Route Handler)

Tidak ada Route Handler REST (`/api/*`) untuk CRUD konten. Semua mutasi dilakukan lewat **Server Actions** di `src/services/**` (file diawali `'use server'`).

Format respons standar — `ServiceResponse<T>` di `src/types/service-response.d.ts`:

```ts
export type ServiceResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};
```

Alur standar setiap mutasi server action:

1. Ambil session via `auth.api.getSession({ headers })` (Better Auth).
2. Verifikasi izin via `verifySession` / `verifyPermission` (`services/admin/security.ts`).
3. Validasi input dengan schema Zod (`src/schemas`).
4. Mutasi via Prisma.
5. `revalidatePath` untuk path publik yang terdampak.
6. Kembalikan `ServiceResponse` typed.

## 5. Alur Autentikasi & Otorisasi (Better Auth)

1. Konfigurasi server: `src/lib/auth.ts` — `betterAuth` + Prisma adapter + plugin `admin`; email+password aktif, reset password & verifikasi email dikirim lewat `queueEmail`.
2. Client: `src/lib/authClient.ts` — `createAuthClient` + `adminClient`; export `useSession`, `signIn`, `signUp`, `signOut`.
3. Proteksi route: `src/proxy.ts` (Next.js 16 proxy) — cek session langsung dari DB, cek expiry, lalu cek permission RBAC:
   - `/admin/*` butuh permission `admin.access`; tanpa itu di-redirect ke halaman publik.
   - `/login` untuk user yang sudah login di-redirect ke dashboard sesuai role.
4. Otorisasi di server action: `verifyPermission` membaca permission user dari relasi `roles → permissions` (dan `roleId`).
5. Di client, `PermissionProvider` menyediakan data permission/role user untuk UI.

Route handler Better Auth tersedia di `src/app/api/auth/[...all]/route.ts`.

## 6. Alur Upload Gambar (ImageKit)

1. Admin memilih file di form (mis. `RichTextEditor` atau form CRUD).
2. Server action `uploadImage` (`services/public/uploads.ts`):
   - validasi & kompresi gambar dengan `sharp` (timeout 30 detik);
   - upload ke ImageKit REST API (`https://upload.imagekit.io/api/v1/files/upload`) memakai `IMAGEKIT_PRIVATE_KEY` (server-side, jangan pernah bocor ke client);
   - mengembalikan URL publik ImageKit.
3. Gambar dirender dengan `next/image`; domain `ik.imagekit.io` sudah didaftarkan di `images.remotePatterns` (`next.config.ts`).
4. `deleteImage` tersedia untuk menghapus aset dari ImageKit.

## 7. Alur Email (Queue)

1. `queueEmail` (`services/public/emails.ts`) menulis baris ke tabel `EmailQueue` (status `PENDING`).
2. Worker mengirim via Nodemailer dengan kredensial SMTP dari env (`SMTP_HOST/PORT/USER/PASS`), lalu memperbarui status (`SENT`/`FAILED`, `attempts`).
3. Dipakai untuk: newsletter (`app/actions/newsletter.ts`), reset password, dan verifikasi email (dari `lib/auth.ts`).

## 8. Keamanan (ringkas — detail di SECURITY.md)

- Header keamanan global diset di `next.config.ts`: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, `Permissions-Policy`; `poweredByHeader` dimatikan.
- Semua server action mutasi wajib cek session + permission (lihat pola §4).
- Validasi Zod di server untuk semua input.
- Secret hanya lewat env: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `IMAGEKIT_PRIVATE_KEY`, `SMTP_PASS`.

## 9. Environment Variables

Referensi lengkap: `.env.example`.

```
DATABASE_URL=            # PostgreSQL (lokal / Supabase pooler transaction-mode)
DIRECT_URL=              # session-mode pooler, dipakai prisma migrate (prisma.config.ts)
BETTER_AUTH_SECRET=      # secret Better Auth
BETTER_AUTH_URL=         # mis. http://localhost:3000
NEXT_PUBLIC_APP_URL=     # base URL aplikasi
NEXT_PUBLIC_SEO_*=       # metadata SEO (title, description, social, dll)
IMAGEKIT_URL=            # endpoint ImageKit
IMAGEKIT_PRIVATE_KEY=    # private key (server-only)
IMAGEKIT_PUBLIC_KEY=     # public key
SMTP_HOST/PORT/USER/PASS # kredensial SMTP (Nodemailer)
```

## 10. Deployment

1. Provision PostgreSQL production dan pasang environment sesuai `.env.example`.
2. Jalankan `npm run db:migrate:deploy` satu kali melalui deployment job yang terkontrol.
3. Jalankan `npm run build`.
4. Jalankan seed admin hanya saat bootstrap awal, lalu ganti password default.
5. Deploy aplikasi dan verifikasi `/api/health`.
6. Jalankan smoke test production, observability check, backup/restore check, dan rollback check.

Docker menjalankan migration sebelum aplikasi start. Untuk Vercel, migration harus dijalankan melalui CI/job terpisah agar beberapa build paralel tidak berebut migration.

## 11. Status Operasional

Status implementasi dan blocker terbaru hanya berada di `ONLY_ME.md`. Jangan menyalin daftar known issue bertanggal ke dokumen arsitektur.
