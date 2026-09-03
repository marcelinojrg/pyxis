# QA-PRODUCT — CRUD Produk

Gunakan nama unik `QA-YYYYMMDD-Product` dan status **Draft**.

## Create

1. Login admin.
2. Buka `/admin/products`.
3. Klik tambah produk.
4. Isi nama, slug, deskripsi, deskripsi lengkap, dan urutan.
5. Simpan.

Expected:

- [ ] Produk muncul di daftar admin.
- [ ] Status Draft.
- [ ] Tidak muncul di `/products`.
- [ ] Slug terbentuk dan unik.

## Update

- [ ] Ubah nama/deskripsi.
- [ ] Simpan.
- [ ] Perubahan tampil setelah refresh.
- [ ] Detail memakai slug terbaru.

## Nested data

- [ ] Tambah benefit.
- [ ] Tambah feature.
- [ ] Tambah capability dan item.
- [ ] Ubah urutan item.
- [ ] Simpan dan refresh.
- [ ] Semua data tetap tersimpan.

## Delete

- [ ] Hapus produk.
- [ ] Konfirmasi dialog.
- [ ] Produk hilang dari daftar admin.
- [ ] URL detail tidak lagi tersedia.
- [ ] Asset ImageKit ikut terhapus jika ada.

## Validasi

- [ ] Nama kosong ditolak.
- [ ] Slug invalid ditolak/dinormalisasi.
- [ ] Urutan negatif ditolak.
- [ ] File non-gambar ditolak.
