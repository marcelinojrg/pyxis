# QA-AUTH — Login dan Proteksi Admin

## Login valid

1. Buka `/login`.
2. Isi email admin valid.
3. Isi password admin valid.
4. Klik **Masuk**.

Expected:

- [ ] Berpindah ke `/admin`.
- [ ] Dashboard tampil.
- [ ] Tidak ada error 5xx.

## Login invalid

Ulangi dengan password salah dan email tidak terdaftar.

Expected:

- [ ] Tetap di `/login`.
- [ ] Pesan error tampil.
- [ ] Tidak ada session valid.

## Proteksi route

1. Hapus cookie/session.
2. Buka langsung:
   - `/admin`
   - `/admin/products`
   - `/admin/blog`
   - `/admin/careers`

Expected:

- [ ] Semua diarahkan ke `/login`.
- [ ] Tidak ada data admin yang tampil.

## Session

- [ ] Logout menghapus akses admin.
- [ ] Setelah logout, tombol Back tidak membuka data admin.
- [ ] Session expired mengarah ke login.
