# SECURITY.md
# Security Baseline

> Disinkronkan 2026-08-19 dengan stack berjalan (Better Auth, ImageKit, Server Actions).

## 1. Authentication

- Auth memakai **Better Auth** (`src/lib/auth.ts`), bukan NextAuth.
- Password di-hash oleh Better Auth (default `scrypt`) — jangan pernah menyimpan plaintext.
- Session disimpan di DB (tabel `Session`) dan diverifikasi server-side di `src/proxy.ts` + server action.
- Logout berfungsi dan menghapus session.
- Login gagal tidak membocorkan apakah email terdaftar.
- Reset password & verifikasi email lewat antrean email (`EmailQueue`), token via tabel `Verification`.

## 2. Authorization (RBAC)

- Otorisasi berbasis Role/Permission (plugin `admin` Better Auth + model `Role`/`Permission`).
- Proteksi rute di `src/proxy.ts`: `/admin/*` butuh permission `admin.access`.
- Setiap server action mutasi memanggil `verifySession` / `verifyPermission` (`services/admin/security.ts`) sebelum menyentuh data.
- Superadmin dicek lewat role bernama `superadmin` (relasi `roles` maupun `roleId`).

## 3. Input Validation

Gunakan Zod **server-side** (schema di `src/schemas`) untuk:

- users;
- roles;
- articles;
- auth (login/register);
- newsletter;
- upload metadata.

Validasi client (React Hook Form + Zod resolver) hanya pendamping — server tetap sumber kebenaran.

## 4. XSS

Area berisiko:

- konten artikel rich text (TipTap);
- deskripsi panjang produk;
- konten yang dirender dari DB.

Aturan:

- Jangan render HTML mentah dengan `dangerouslySetInnerHTML` kecuali sudah disanitasi. `dompurify` tersedia di dependensi untuk sanitasi.
- Konten rich text disimpan sebagai HTML dari TipTap; pastikan sanitasi saat render di halaman publik.

## 5. Rate Limiting

- Endpoint publik yang menulis data (mis. newsletter, form kontak bila dibangun) harus diberi rate limiting.
- Saat ini rate limiting **belum diimplementasi** — catat sebagai backlog sebelum form kontak publik dirilis.
- Bila memakai Vercel, gunakan store yang bekerja lintas instance (mis. Upstash Ratelimit), bukan in-memory semata.

## 6. Upload Security

- Upload hanya lewat server action `uploadImage` (`services/public/uploads.ts`).
- Validasi tipe & ukuran di server sebelum kompresi `sharp` dan kirim ke ImageKit.
- `IMAGEKIT_PRIVATE_KEY` hanya dipakai di server — jangan pernah dikirim ke client atau masuk bundle.
- Simpan URL publik ImageKit di DB, bukan secret.
- Timeout 30 detik untuk proses upload/kompresi.

## 7. Environment

Secret hanya di environment (lihat `.env.example`), jangan pernah di-hardcode:

- `DATABASE_URL` / `DIRECT_URL`;
- `BETTER_AUTH_SECRET` / `BETTER_AUTH_URL`;
- `IMAGEKIT_PRIVATE_KEY` / `IMAGEKIT_PUBLIC_KEY` / `IMAGEKIT_URL`;
- `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS`.

Pastikan `.env`/`.env.local` masuk `.gitignore`.

## 8. Headers

`next.config.ts` menyetel header keamanan:

- `X-Content-Type-Options: nosniff`;
- `X-Frame-Options: SAMEORIGIN` (DENY untuk `/admin/managements/*`);
- `Referrer-Policy: strict-origin-when-cross-origin`;
- `Permissions-Policy` (camera/microphone/geolocation dibatasi);
- `poweredByHeader` dimatikan.

Content-Security-Policy dibuat per request di `src/proxy.ts` dengan nonce acak.
`script-src` tetap memakai nonce dan `strict-dynamic`; `'unsafe-eval'` hanya
aktif saat development untuk React debugging. `style-src` memakai nonce di
production. Development mengizinkan inline styles karena Next DevTools membuat
elemen `<style>` tanpa nonce; jangan membawa pengecualian ini ke production.
Sumber gambar dan koneksi yang diizinkan dibatasi ke origin aplikasi,
Unsplash, dan ImageKit.

## 9. Data Minimization

- Form publik hanya menyimpan field yang dibutuhkan PRD.
- Jangan meminta data sensitif yang tidak perlu.
- Data lead/lamaran (`CareerApplication`) diperlakukan sebagai data pribadi — jangan dibagikan ke pihak tidak berwenang.

## 10. Logging

Jangan pernah menulis ke log:

- password;
- token session mentah;
- secret API (ImageKit private key, SMTP pass);
- payload kredensial lengkap.

Log server action memakai prefix (mis. `[uploadImage]`) dan hanya mencatat metadata non-sensitif.
