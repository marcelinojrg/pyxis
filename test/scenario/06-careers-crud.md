# QA-CAREER — CRUD Karier

Gunakan judul unik `QA-YYYYMMDD-Career` dan status Draft.

## Create

1. Buka `/admin/careers`.
2. Klik **Tambah Lowongan**.
3. Isi judul, departemen, lokasi, tipe, deskripsi, tanggung jawab, dan persyaratan.
4. Simpan.

Expected:

- [ ] Lowongan muncul di admin.
- [ ] Status Draft.
- [ ] Tidak muncul di `/careers`.
- [ ] Slug unik terbentuk.

## Update

- [ ] Ubah lokasi/deskripsi.
- [ ] Simpan.
- [ ] Perubahan tetap ada setelah refresh.

## Publish

- [ ] Aktifkan lowongan.
- [ ] Simpan.
- [ ] Lowongan muncul di daftar publik.
- [ ] Detail slug dapat dibuka.

## Delete

- [ ] Hapus lowongan.
- [ ] Konfirmasi dialog.
- [ ] Lowongan hilang dari admin dan publik.

## Validasi

- [ ] Judul kosong ditolak.
- [ ] Lokasi kosong ditolak.
- [ ] Deskripsi kosong ditolak.
- [ ] Responsibility/requirement kosong ditolak.
- [ ] Status nonaktif tidak tampil publik.
