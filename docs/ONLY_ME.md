# ONLY_ME.md — Checklist Eksekusi

> Aturan pakai file ini:
> 1. Kalau muncul ide fitur baru di luar `PRD.md`, JANGAN langsung dikerjakan — tambahkan di bagian **"Backlog / Stretch Goal"** paling bawah.

---

## Laporan Bug — Investigasi 2026-08-18

> Sumber masalah: commit `0c2a6ed` ("info: convert") — konversi besar yang menghapus banyak file tapi tidak mengupdate semua pemakainya. Status: **belum diperbaiki**, baru didata.

### Kategori A — pecah saat runtime (halaman crash)

**1. `/about` crash — 3 module hilang**
- `@/components/ui/container` — `container.tsx` dihapus di commit `0c2a6ed`. Dipakai 5 komponen: `AboutHero`, `AboutProfile`, `AboutVisionMission`, `AboutContact`, `AboutCTA`. Isi asli masih ada di git history (`git show 0c2a6ed~1:src/components/ui/container.tsx`).
- `@/lib/queries/about` dan `@/lib/queries/site-settings` — seluruh folder `src/lib/queries/` dihapus di commit yang sama. Dipakai `src/app/(root)/about/page.tsx:3-4`.
- **Komplikasi:** query asli pakai model `prisma.aboutContent` dan `prisma.siteSettings`, tapi kedua model itu **tidak ada di schema sekarang** (schema sudah ditulis ulang — sekarang isinya Product, Career, Article, Branch, dll). Sekadar restore file query tidak cukup — datanya tidak ada di database.

**2. `/admin` crash — `@/lib/requireAdmin` hilang**
- File dihapus di commit `0c2a6ed`. Dipakai `src/app/(admin)/layout.tsx:2` dan `src/app/(admin)/admin/page.tsx:1`.
- **Komplikasi:** versi asli pakai API next-auth (`auth()`), padahal auth sekarang sudah pindah ke better-auth (`src/lib/auth.ts`). Harus ditulis ulang mengikuti pola `auth.api.getSession` yang sudah ada di `src/proxy.ts`.

**3. `/login` crash — `next-auth/react` tidak terpasang**
- `src/app/(auth)/login/page.tsx:5` import `signIn` dari `next-auth/react`. Package `next-auth` tidak ada di `package.json` maupun `node_modules`.
- Project sudah pindah ke better-auth — `src/lib/authClient.ts` sudah export `signIn` versi better-auth. Halaman login belum ikut dimigrasikan.

### Kategori B — pecah tooling ✅ SELESAI (2026-08-19)

**4. `npm run db:seed` gagal — `bcryptjs` tidak terpasang** — FIXED 2026-08-19: `prisma/seed.ts` ditulis ulang sesuai schema sekarang (tanpa dependency baru). Admin Better Auth = `User` + `Account` credential (hash scrypt dari `better-auth/crypto`, bukan bcrypt), Role `superadmin` + 17 permission yang dipakai `src/proxy.ts` dan `src/services/admin/*`. Import client pindah `@prisma/client` → `../generated/prisma/client` (konvensi Prisma 7, sama dengan `src/lib/prisma.ts`). Terverifikasi: `npm run db:seed` sukses, dijalankan 2x tetap sukses (idempotent).
- ~~`prisma/seed.ts:5` import `bcryptjs`, tidak ada di `package.json`.~~
- **Temuan tambahan saat test (sudah disetujui user):** satu-satunya migration (`20260814083910_init_schema`) ternyata stale — isinya schema Sitivent lama, padahal `schema.prisma` sudah ditulis ulang dan tidak pernah dimigrasi. DB lokal di-reset, migration baru `20260819052116_init_schema` dibuat dari schema sekarang. `DIRECT_URL` juga ditambahkan ke `.env` karena `prisma.config.ts` membacanya tapi kuncinya tidak ada.

**5. `npm run typecheck` dan `npm run build` gagal — ~20 file services leftover** — FIXED 2026-08-19: 37 file leftover dihapus (services/interfaces/schemas event lama + folder `Mixins/Sidebar`), barrel index dirapikan. Semua error typecheck dari kategori ini hilang.
- ~~File `src/services/admin/*` dan `src/services/public/*` (events, registrations, payments, certificates, testimonials, attendance, search) import enum yang tidak ada di generated client: `EventStatus`, `EventType`, `PaymentStatus`, `RegistrationStatus`, `AttendanceStatus`, `CertNumberMode` — enums yang ada hanya `EmailStatus` dan `ApplicationStatus`.~~
- ~~Mereka juga pakai model yang tidak ada di schema: `event`, `registration`, `testimonial`, `gallery`, `certificate`, `supportMessage`.~~
- ~~Ini kode sisa sistem event lama yang seharusnya ikut terhapus saat konversi. Saat ini tidak dipakai halaman publik mana pun (jadi tidak crash runtime), tapi membuat build production gagal.~~

### Kategori C — minor ✅ SELESAI (2026-08-19)

**6. Cache `.next` stale** — FIXED 2026-08-19: folder `.next` dihapus; 25 error typecheck dari `validator.ts` hilang (error typecheck turun 49 → 20).

**7. `BETTER_AUTH_URL` belum di-set di `.env`** — FIXED 2026-08-19: `BETTER_AUTH_URL` + `BETTER_AUTH_SECRET` (random 32 byte hex) ditambahkan ke `.env`. Catatan: kunci lama `NEXTAUTH_*`/`CLOUDINARY_*` masih tersisa di `.env` tapi tidak dipakai — bisa dibersihkan kapan saja.

### Keputusan yang masih menunggu user


---

## Backlog / Stretch Goal (jangan dikerjakan kecuali diminta eksplisit)


---

## Catatan Perubahan (isi manual jika ada penyesuaian scope di tengah jalan)

---
