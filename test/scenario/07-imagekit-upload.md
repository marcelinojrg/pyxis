# QA-IMAGE — Upload dan Cleanup ImageKit

## Prasyarat

- [ ] `IMAGEKIT_PRIVATE_KEY` tersedia di `.env`.
- [ ] File uji JPG/PNG/WebP valid.
- [ ] Ukuran file maksimal 10 MB.
- [ ] Jangan gunakan file pribadi/sensitif.

## Upload Produk

1. Buat Produk Draft.
2. Upload gambar utama.
3. Upload gambar capability jika diperlukan.
4. Simpan.

Expected:

- [ ] Produk berhasil disimpan.
- [ ] URL gambar tersimpan di database.
- [ ] Gambar muncul di Media Library ImageKit folder `products`.
- [ ] Gambar dapat tampil di preview/detail.

## Update gambar

- [ ] Ganti gambar utama.
- [ ] Simpan.
- [ ] Gambar baru tampil.
- [ ] Gambar lama terhapus dari ImageKit.

## Delete

- [ ] Hapus Produk.
- [ ] Pastikan record database hilang.
- [ ] Pastikan gambar utama dan capability tidak lagi ada di ImageKit.

## Negative test

- [ ] File >10 MB ditolak.
- [ ] File non-gambar ditolak.
- [ ] File gambar rusak ditolak.
- [ ] Private key kosong menghasilkan pesan konfigurasi, bukan crash halaman.
