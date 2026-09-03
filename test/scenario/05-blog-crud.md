# QA-BLOG — CRUD Blog

Gunakan judul unik `QA-YYYYMMDD-Article`.

## Create draft

1. Buka `/admin/blog`.
2. Klik **Tulis artikel**.
3. Isi judul dan konten rich text.
4. Pilih kategori.
5. Biarkan status Draft.
6. Simpan.

Expected:

- [ ] Artikel muncul di admin.
- [ ] Draft tidak muncul di `/blog`.
- [ ] Konten rich text tersimpan.
- [ ] Cover opsional dapat dikosongkan.

## Update dan publish

- [ ] Edit judul/konten/kategori.
- [ ] Simpan sebagai draft.
- [ ] Ubah status menjadi terbit.
- [ ] Artikel tampil di `/blog`.
- [ ] Detail, tanggal, cover, dan kategori benar.

## Delete

- [ ] Hapus artikel.
- [ ] Konfirmasi dialog.
- [ ] Artikel hilang dari admin dan publik.
- [ ] Cover ImageKit ikut terhapus jika ada.

## Validasi

- [ ] Judul kosong ditolak.
- [ ] Konten kosong ditolak.
- [ ] Tanpa kategori ditolak jika kategori wajib.
- [ ] Cover bukan gambar ditolak.
