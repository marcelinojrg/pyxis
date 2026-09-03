# QA-ENV — Environment

## Persiapan

- [ ] Branch/commit yang diuji sudah dicatat.
- [ ] `.env` tersedia dan tidak masuk Git.
- [ ] `DATABASE_URL` terisi.
- [ ] `DIRECT_URL` terisi.
- [ ] `BETTER_AUTH_SECRET` terisi.
- [ ] `BETTER_AUTH_URL` sesuai URL test.
- [ ] `IMAGEKIT_PRIVATE_KEY` terisi jika menguji gambar.
- [ ] Database target sudah disetujui untuk data uji.

## Pemeriksaan

```powershell
npx prisma validate
npx prisma migrate status
npx prisma generate
```

Expected:

- Schema valid.
- Database dapat dijangkau.
- Tidak ada migration gagal.
- Prisma Client berhasil dibuat.

## Jalankan aplikasi

```powershell
npm run dev
```

- [ ] `http://localhost:3000` terbuka.
- [ ] Tidak ada error fatal di terminal.
