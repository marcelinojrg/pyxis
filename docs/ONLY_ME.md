# ONLY_ME.md — Checklist Eksekusi

> Aturan pakai file ini:
> 1. Kalau muncul ide fitur baru di luar `PRD.md`, JANGAN langsung dikerjakan — tambahkan di bagian **"Backlog / Stretch Goal"** paling bawah.

---

## Backlog / Stretch Goal (jangan dikerjakan kecuali diminta eksplisit)

- [ ] Testimoni klien dengan rating
- [ ] Embed Google Maps di halaman kontak
- [ ] Notifikasi email otomatis saat ada pesan masuk baru
- [ ] Drag-and-drop untuk urutan produk (bukan input angka manual)
- [ ] Blog lanjutan: kategori, tag, komentar, multi-penulis

---

## Catatan Perubahan (isi manual jika ada penyesuaian scope di tengah jalan)

- 2026-08-17: Blog masuk scope PRD (versi sederhana): halaman publik `/blog` + `/blog/[slug]`, admin CRUD artikel, SEO per artikel via `page_seos`. Tanpa kategori/tag (pindah ke backlog). Desain tabel `blog_posts` ada di bagian DBML bawah — model Prisma & migrasi menyusul saat implementasi.
- 2026-08-14: Sinkronisasi menyeluruh `PRD.md` dengan schema database (`schema.prisma`), arsitektur (`ARCHITECTURE.md`), dan `SCREEN-SPEC.md`. Menambahkan ruang lingkup halaman Mitra (`/mitra`), Karir (`/karir`), Legalitas (`/legal`), Pengaturan Global (SiteSettings), dan Page SEO CMS ke dalam PRD. Menghapus folder `src/app/(auth)/register` karena website menggunakan sistem single-admin (seeded via database) dan melarang pendaftaran publik.

---

## DBML dbdiagram.io — Domain Produk & Blog (tinggal copy)

> Dibuat 2026-08-17, update sesuai PRD (Blog masuk scope, versi sederhana). Tabel `products` sesuai `prisma/schema.prisma` persis. Tabel `blog_posts` adalah **usulan desain** (model Prisma belum ada — perlu migrasi saat implementasi). Tanpa kategori/tag (masuk backlog). SEO per artikel menumpang tabel `page_seos` yang sudah ada (`pageKey` = `blog:<slug>`) — tidak perlu tabel baru. Paste ke https://dbdiagram.io.
>
> **Tidak ada tabel order/transaksi** — memang tidak ada checkout; produk hanya punya tombol Contact Us. Field `order` di bawah adalah **urutan tampil** (sorting produk), bukan order pembelian. Artikel blog diurutkan via `publishedAt`, tidak perlu field order.

```dbml
// =============================================================
// PT. Pyxis Ultimate Solution — Company Profile
// Domain: Produk & Blog
// =============================================================

Table products {
  id int [pk, increment]
  name varchar [not null]
  slug varchar [unique, not null]
  shortDesc varchar [not null]
  fullDesc text [not null]
  features text[]
  imageUrl varchar
  galleryUrls text[]
  order int [not null, default: 0, note: 'urutan tampil, BUKAN order pembelian']
  isFeatured boolean [not null, default: false]
  isPublished boolean [not null, default: false]
  createdAt timestamp [not null, default: `now()`]
  updatedAt timestamp [not null]

  indexes {
    isPublished
    order
  }
}

Table blog_posts {
  id int [pk, increment]
  title varchar [not null]
  slug varchar [unique, not null]
  excerpt varchar
  content text [not null]
  coverImageUrl varchar
  authorName varchar
  publishedAt timestamp
  isPublished boolean [not null, default: false]
  createdAt timestamp [not null, default: `now()`]
  updatedAt timestamp [not null]

  indexes {
    isPublished
    publishedAt
  }
}

// Tidak ada relasi antar tabel — produk dan blog berdiri sendiri.
// SEO per artikel: pakai tabel page_seos yang sudah ada (pageKey = 'blog:<slug>').
```
