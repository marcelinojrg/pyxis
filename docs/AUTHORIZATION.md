# Authentication & Authorization — Pyxis

Pyxis memakai Better Auth untuk login, session, role, dan permission. Jangan membuat mekanisme auth kedua.

## Lapisan proteksi

1. `src/proxy.ts` melindungi route `/admin/*`.
2. Server Action memverifikasi session dan permission sebelum membaca data sensitif atau melakukan mutasi.
3. Client guard hanya untuk UX; client bukan batas keamanan.

## Permission aktif

- `admin.access`
- `product.create|update|delete`
- `article.create|update|delete`
- `article.category.create|update|delete`
- `career.create|update|delete`
- `career.category.create|update|delete`
- `user.read|create|update|delete`
- `role.read|create|update|delete`

Beberapa service menerima `admin.access` sebagai fallback. Ikuti pola service domain yang sudah ada.

## Aturan mutasi

Urutan wajib:

1. Ambil session dari Better Auth.
2. Verifikasi permission di server.
3. Validasi input dengan Zod.
4. Jalankan operasi Prisma.
5. Tulis audit log bila domain mendukungnya.
6. Kembalikan error aman tanpa stack trace atau secret.

Guest dan user tanpa permission harus gagal tertutup.
