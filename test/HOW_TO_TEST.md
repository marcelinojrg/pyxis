# Menjalankan Test Pyxis

## Persiapan

1. Pasang Node.js dan npm sesuai `package.json`.
2. Salin konfigurasi lokal dari `.env.example` ke `.env`, lalu isi nilai development.
3. Pastikan PostgreSQL berjalan dan schema sudah tersedia.
4. Jalankan `npm ci`.

## Quality gate

```bash
npm run typecheck
npm run lint
npm run build
npm run test:cms
```

Playwright menyalakan development server otomatis bila port 3000 belum digunakan.

## Hasil yang diharapkan

- Route admin mengarahkan guest ke login.
- Delapan route publik merender elemen `main`.
- Viewport 360 × 800 tidak memiliki overflow horizontal.
- Build production selesai tanpa mengambil dependency runtime dari layanan eksternal.

Skenario lengkap berada di `docs/TEST-MATRIX.md`. Pengujian email ditunda.
