# Core Modules & Features - SITIVENT

SITIVENT memiliki modul utama:

## Authentication

- Login
- Register
- Forgot Password
- Reset Password
- Email Verification

## Dashboard

- Admin Dashboard
- Participant Dashboard

## Event Management

- Create Event
- Update Event
- Delete Event
- Publish Event
- Close Event

## Registration

- Register Event
- Cancel Registration
- View Registration

## Payment

- Manual Transfer
- Payment Verification
- Refund

## Attendance

- QR Generation
- QR Validation
- Check-In

## Certificate

- Template Management
- Certificate Generation
- Certificate Download

## Notification

- Email Notification
- Reminder
- Certificate Delivery

# PANDUAN-ADMIN.md
# Panduan Admin Website Pyxis

> Disinkronkan 2026-08-19. Panduan ini menggambarkan **kondisi aktual** dashboard admin terlebih dahulu, lalu fitur yang direncanakan.

## Status Saat Ini (per 2026-08-19)

| Bagian | Status | Keterangan |
| --- | :---: | --- |
| Login (`/login`) | 🚧 | Halaman ada, tetapi masih memakai kode next-auth lama dan belum berfungsi. Autentikasi sudah pindah ke Better Auth — migrasi halaman login tercatat di `ONLY_ME.md`. |
| Dashboard (`/admin`) | 🚧 | Baru halaman placeholder ("Dashboard Utama"). Proteksi rute sudah aktif di `src/proxy.ts` (butuh permission `admin.access`). |
| Modul CRUD konten | ❌ | Scope CMS hanya Produk, Blog/Artikel, dan Karier. |

**Implikasi praktis**: sampai known issues di `ONLY_ME.md` diperbaiki, admin belum bisa login dan mengelola konten lewat dashboard. Pengelolaan data sementara dilakukan langsung ke database (mis. `npx prisma studio`) oleh developer.

## 1. Login (setelah diperbaiki)

Alur target:

1. Buka `/login`.
2. Masukkan email dan password (Better Auth email+password).
3. User dengan permission `admin.access` diarahkan ke `/admin`; user biasa ke `/participant/dashboard`.
4. Lupa password: tautan reset dikirim lewat email (antrean `EmailQueue`).

## 2. Dashboard

Target: ringkasan metrik konten (produk, artikel, lamaran karir, pelanggan newsletter, pesan masuk). Saat ini belum tersedia.

## 3. Modul yang Direncanakan (belum tersedia)

Panduan detail per modul akan ditulis di sini saat UI admin dibangun. Rencana modul sesuai `PRD.md` §4.2:

- **Produk** — CRUD produk (nama, slug, deskripsi, benefit, fitur, kapabilitas, gambar via ImageKit).
- **Blog/Artikel** — CRUD artikel rich text (TipTap), cover, kategori. Server action sudah tersedia (`services/admin/articles.ts`).
- **Karir** — CRUD lowongan + kelola lamaran (`CareerApplication`).
- **User & Role** — CRUD user dan role RBAC. Server action sudah tersedia (`services/admin/users.ts`, `roles.ts`).
- **Site Settings / Hero / About / Mitra / Legal / Pesan / Page SEO** — bukan CMS pada scope ini; gunakan konten statis atau konfigurasi/env.

## 4. Praktik Aman (berlaku sekarang & nanti)

- Jangan membagikan password atau kredensial admin.
- Logout setelah selesai.
- Jangan menulis data sensitif ke field publik.
- Periksa hasil perubahan pada website setelah menyimpan.
- Jangan membagikan data lead/pelamar kepada pihak yang tidak berwenang.
