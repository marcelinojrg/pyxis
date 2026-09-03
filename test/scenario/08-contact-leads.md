# QA-CONTACT — Contact dan Leads

## Form valid

1. Buka `/contact`.
2. Isi nama, email, nomor telepon, tipe kebutuhan, dan pesan.
3. Kirim.

Expected:

- [ ] Validasi berhasil.
- [ ] Pesan tersimpan di database.
- [ ] User mendapat status sukses.
- [ ] Tidak ada email yang dikirim pada fase ini.

## Form invalid

- [ ] Nama kosong ditolak.
- [ ] Email invalid ditolak.
- [ ] Pesan kosong/terlalu panjang ditolak.
- [ ] Payload tidak valid tidak membuat record.
- [ ] Spam/rate limit menolak request berulang sesuai kebijakan.

Jika form masih disabled/nonaktif, tandai `BLOCKED` dan laporkan sebagai gap implementasi.
