# Testing Pyxis

## Pemeriksaan utama

```bash
npm run typecheck
npm run lint
npm run build
npm run test:cms
```

`npm run test:cms` menjalankan smoke test aktif:

- `cms-admin-access.spec.ts`: pengunjung tanpa session ditolak dari route admin.
- `cms-public-pages.spec.ts`: halaman publik utama dapat dibuka pada viewport 360 px tanpa overflow horizontal.

## Sumber skenario

`TEST-MATRIX.md` adalah daftar tunggal skenario manual dan otomatis. Folder `test/scenario` serta suite `TC001–TC100` lama dihapus karena menduplikasi matriks dan menguji fitur sistem event yang tidak ada di Pyxis.

## Aturan

- Tes baru harus berasal dari acceptance criteria `PRD.md`.
- Jangan membuat tes untuk fitur out-of-scope.
- Tes yang membutuhkan kredensial production tidak boleh menyimpan secret di repository.
- Pekerjaan dan pengujian email ditunda sampai ada instruksi terpisah.
