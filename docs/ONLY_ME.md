# ONLY_ME.md — Checklist Eksekusi

> Aturan pakai file ini:
> 1. Kalau muncul ide fitur baru di luar `PRD.md`, JANGAN langsung dikerjakan — tambahkan di bagian **"Backlog / Stretch Goal"** paling bawah.

---

## Backlog / Stretch Goal (jangan dikerjakan kecuali diminta eksplisit)

- [ ] Testimoni klien dengan rating
- [ ] Embed Google Maps di halaman kontak
- [ ] Notifikasi email otomatis saat ada pesan masuk baru
- [ ] Drag-and-drop untuk urutan produk (bukan input angka manual)
- [ ] Blog/artikel section

---

## Catatan Perubahan (isi manual jika ada penyesuaian scope di tengah jalan)

- 2026-08-14: Sinkronisasi menyeluruh `PRD.md` dengan schema database (`schema.prisma`), arsitektur (`ARCHITECTURE.md`), dan `SCREEN-SPEC.md`. Menambahkan ruang lingkup halaman Mitra (`/mitra`), Karir (`/karir`), Legalitas (`/legal`), Pengaturan Global (SiteSettings), dan Page SEO CMS ke dalam PRD. Menghapus folder `src/app/(auth)/register` karena website menggunakan sistem single-admin (seeded via database) dan melarang pendaftaran publik.
