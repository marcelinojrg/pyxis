# QA-SECURITY — Authorization dan Data Safety

## Server Action

Dengan guest atau user tanpa permission, uji mutasi Produk, Blog, dan Karier.

Expected:

- [ ] Request ditolak server-side.
- [ ] Tidak cukup hanya menyembunyikan tombol di UI.
- [ ] Tidak ada record berubah.

## Input

- [ ] HTML/script di field teks tidak dieksekusi.
- [ ] URL gambar hanya menerima HTTPS ImageKit yang valid.
- [ ] ID record invalid ditolak.
- [ ] Mass delete dibatasi dan hanya menghapus ID valid.

## Secret

- [ ] Private key tidak ada di client bundle.
- [ ] Private key tidak muncul di browser console.
- [ ] Private key tidak muncul di log.
- [ ] `.env` tidak ter-track Git.

## Data integrity

- [ ] Delete record tidak meninggalkan asset media tanpa alasan.
- [ ] Gagal upload tidak membuat record setengah jadi.
- [ ] Gagal delete media tidak mengembalikan secret atau detail internal ke user.
