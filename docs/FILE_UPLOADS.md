# Upload Gambar — Pyxis

Semua gambar bisnis diunggah melalui `src/services/public/uploads.ts`.

## Alur

1. Verifikasi permission yang sesuai.
2. Validasi tipe, ukuran, dan dimensi di server.
3. Kompres gambar dengan Sharp.
4. Unggah ke ImageKit.
5. Simpan URL/identitas asset pada model terkait.
6. Hapus asset lama saat replacement atau penghapusan record berhasil.

## Aturan

- Format gambar mengikuti validasi service yang aktif.
- Jangan menyimpan upload pada filesystem lokal production.
- Jangan percaya MIME type atau ukuran dari client.
- Jangan menaruh ImageKit private key di client.
- Gunakan `next/image` dan alt text deskriptif saat render.

Upload dokumen, CV publik, dan attachment bukan bagian pekerjaan deployment saat ini.
