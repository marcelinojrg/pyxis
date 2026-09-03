# Deployment Pyxis

Target utama: Vercel untuk aplikasi Next.js dan Supabase untuk PostgreSQL. Docker dipertahankan sebagai validasi CI dan jalur self-hosting, bukan jalur utama release.

## Gambaran sederhana

1. GitHub menyimpan source.
2. Vercel mengambil source, menjalankan build, lalu menyediakan Preview dan Production.
3. Supabase menyimpan database PostgreSQL.
4. ImageKit menyimpan gambar CMS.
5. Migration mengubah struktur database sebelum versi aplikasi baru menerima traffic.

## 1. Akun dan project

- Buat project Supabase di region terdekat dengan mayoritas pengguna.
- Buat project Vercel dari repository GitHub Pyxis.
- Jangan deploy ke domain production sebelum Preview lulus smoke test.

Vercel menyediakan environment Local, Preview, dan Production. Gunakan database terpisah untuk Preview jika data uji tidak boleh bercampur dengan production.

## 2. Database URL

Untuk Vercel/serverless:

- `DATABASE_URL`: Supavisor transaction pooler, biasanya port 6543, untuk traffic aplikasi.
- `DIRECT_URL`: direct connection atau session pooler port 5432 untuk migration, backup, dan restore.

Ambil kedua URL dari tombol **Connect** di dashboard Supabase. Jangan menaruh URL atau password database di repository.

Referensi:

- https://supabase.com/docs/guides/database/prisma
- https://supabase.com/docs/guides/database/connecting-to-postgres

## 3. Environment Vercel

Isi minimal untuk Preview dan Production:

```text
DATABASE_URL
DIRECT_URL
BETTER_AUTH_SECRET
BETTER_AUTH_URL
NEXT_PUBLIC_APP_URL
IMAGEKIT_PRIVATE_KEY
IMAGEKIT_PUBLIC_KEY
IMAGEKIT_URL
NEXT_PUBLIC_SEO_TITLE
NEXT_PUBLIC_SEO_AUTHOR
NEXT_PUBLIC_SEO_DESCRIPTION
NEXT_PUBLIC_SEO_LANGUAGE
NEXT_PUBLIC_SEO_LOCALE
NEXT_PUBLIC_SEO_SITE_URL
NEXT_PUBLIC_SEO_EMAIL
NEXT_PUBLIC_SEO_PHONE
```

`BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL`, dan `NEXT_PUBLIC_SEO_SITE_URL` harus memakai URL environment yang sedang diuji. Generate `BETTER_AUTH_SECRET` secara acak dan jangan digunakan ulang dari development.

Environment email/SMTP sengaja tidak dibahas pada fase ini.

## 4. Migration

Production hanya memakai:

```bash
npm run db:migrate:deploy
```

Command membaca `DIRECT_URL` dari `prisma.config.ts`. Jalankan melalui job release terproteksi, bukan dari laptop harian dan bukan melalui `prisma migrate dev`.

Sebelum migration:

1. Pastikan seluruh file migration sudah masuk Git.
2. Ambil backup database.
3. Uji restore backup ke database non-production.
4. Jalankan migration pada Preview/staging.
5. Verifikasi `/api/health` dan CMS.

Referensi: https://docs.prisma.io/docs/cli/migrate/deploy

## 5. Bootstrap admin

Jalankan `npm run db:seed` hanya saat database baru. Gunakan `ADMIN_EMAIL` dan `ADMIN_PASSWORD` yang aman. Ganti password default sebelum domain production dibuka.

## 6. Smoke test Preview

Wajib lulus:

- `/api/health` mengembalikan HTTP 200.
- Guest diarahkan dari seluruh route admin ke login.
- Admin dapat login.
- CRUD Produk, Blog, dan Karier bekerja.
- Draft/nonaktif tidak tampil publik.
- Upload dan hapus gambar ImageKit bekerja.
- Delapan halaman publik membuka pada mobile tanpa overflow.
- Metadata, sitemap, robots, dan 404 benar.

## 7. Release Production

1. Catat versi Git yang lulus Preview.
2. Jalankan backup.
3. Jalankan migration production.
4. Promote deployment yang sudah diuji.
5. Jalankan smoke test production.
6. Pantau error log, latency, status health, dan koneksi database.

## 8. Rollback

Rollback aplikasi berarti promote deployment Vercel sebelumnya. Rollback database tidak otomatis: restore backup hanya bila migration merusak data dan setelah dampaknya dipahami.

Jangan memakai `prisma migrate reset`, `db push`, atau menghapus migration pada production.

## Checklist sebelum mulai

- [ ] Repository GitHub bersih dan CI hijau.
- [ ] Project Supabase tersedia.
- [ ] Project Vercel tersedia.
- [ ] Domain production ditentukan.
- [ ] ImageKit production tersedia.
- [ ] Backup dan restore pernah diuji.
- [ ] Pemilik menerima akses dashboard dan recovery codes.
