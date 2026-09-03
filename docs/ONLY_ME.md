# ONLY_ME.md — Checklist Eksekusi

> Aturan pakai file ini:
> 1. Kalau muncul ide fitur baru di luar `PRD.md`, JANGAN langsung dikerjakan — tambahkan di bagian **"Backlog / Stretch Goal"** paling bawah.

---

---

## Backlog / Stretch Goal (jangan dikerjakan kecuali diminta eksplisit)


---

## Status Scope End-to-End

Keterangan: ✅ selesai · ⚠️ sudah ada tetapi belum lengkap/rusak · ❌ belum dikerjakan.

Status ini adalah baseline kerja berdasarkan PRD, arsitektur, dokumentasi desain, dan struktur source saat ini.

### 1. Discovery dan desain Figma

- ⚠️ Requirement company profile dinamis, target pengguna, user story, dan acceptance criteria sudah ditulis di `docs/PRD.md`.
- ⚠️ Arah visual, warna brand, tipografi, spacing, responsive, accessibility, dan komponen UI sudah didokumentasikan di `docs/DESIGN.md`.
- ❌ File, link, atau handoff desain Figma belum tersedia di repository.
- ❌ Audit kesesuaian implementasi terhadap desain Figma belum dapat ditandai selesai tanpa sumber Figma yang tervalidasi.

### 2. Fondasi project dan UI system

- ✅ Next.js App Router, React, TypeScript strict, Tailwind CSS, shadcn/ui, dan konfigurasi lint/typecheck sudah tersedia.
- ✅ Struktur komponen sudah dipisah menjadi `ui`, `Common`, `Mixins`, dan section halaman.
- ✅ Komponen dasar seperti Button, Tooltip, Container, modal, alert, data table, dan TipTap toolbar sudah tersedia.
- ⚠️ Token warna aktual masih netral; palet brand navy/amber di `DESIGN.md` belum sepenuhnya diterapkan.
- ⚠️ Font target Poppins belum dipasang; implementasi saat ini masih memakai Inter/Geist.

### 3. Halaman publik

- ✅ Struktur route publik dan komponen section untuk Home, About, Products, Careers, Contact, Legal, Partners, dan Blog sudah tersedia.
- ✅ Produk, Blog, dan Karier sudah memiliki jalur baca data publik dari database pada list/detail masing-masing.
- ✅ Empty state dasar untuk katalog Produk, artikel Blog, dan lowongan Karier sudah tersedia.
- ✅ CTA “Kembali ke Karir” pada detail lowongan sudah dirapikan ke posisi kiri.
- ✅ Tombol Blog “Muat Lebih Banyak” yang belum memiliki fungsi sudah dihapus.
- ✅ Contact dan lamaran Karier tidak lagi menampilkan konfirmasi sukses palsu saat backend/upload belum aktif.
- ⚠️ Home (`/`) sudah memiliki struktur dan section, tetapi sebagian konten masih hardcode.
- ⚠️ ~About (`/about` atau `/tentang`) tersedia sebagian tetapi pernah tercatat crash karena import/query lama.
- ✅ Products (`/products` atau `/produk`) dan detail produk `[slug]` kini terhubung ke CMS lengkap: benefit, feature, beberapa capability, gambar, urutan, status aktif, validasi, dan slug unik.
- ⚠️ Partners (`/partners` atau `/mitra`) sudah memiliki struktur halaman; data dan form kemitraan belum lengkap.
- ✅ Careers (`/careers` atau `/karir`) kini memiliki CMS lowongan lengkap: kategori, detail peran, urutan, status aktif, dan slug unik. Lamaran online tetap dinonaktifkan sesuai scope.
- ⚠️ Contact (`/contact` atau `/kontak`) memiliki halaman/form visual; form sengaja dinonaktifkan dan belum menyimpan leads.
- ✅ Legal (`/legal`) bukan bagian CMS; halaman statis sudah sesuai scope.
- ✅ Blog list/detail kini memiliki CMS artikel, kategori, cover, rich-text editor, serta draft/publish. Artikel draft tidak tampil di publik atau sitemap.
- ✅ Root layout, metadata helper, sitemap, robots, error, loading, dan not-found sudah tersedia.
- ✅ Placeholder gambar publik pada Home dan About sudah diisi dengan aset lokal di `public/assets/img` dan terhubung melalui `next/image`.
- ⚠️ Verifikasi seluruh halaman publik pada viewport 360px+, tablet, dan desktop belum selesai.

### 4. Database dan data layer

- ✅ PostgreSQL, Prisma 7, driver adapter PostgreSQL, generated client, konfigurasi Prisma, dan migration setup sudah tersedia.
- ✅ Model auth, Product, ProductFeature, ProductBenefit, ProductCapability, Career, Article, Branch, Client, EmailQueue, dan NewsletterSubscriber sudah tersedia.

### 5. Auth, authorization, dan security

- ✅ Better Auth, session, role/permission, `verifySession`, `verifyPermission`, dan proteksi route admin sudah dirancang/diimplementasikan sebagian.
- ⚠️ Login, logout, dan route handler auth masih perlu verifikasi end-to-end karena dokumentasi mencatat ketidaksesuaian dengan migrasi dari NextAuth.
- ⚠️ Seluruh server action belum diaudit satu per satu untuk memastikan session, permission, dan validasi server konsisten.
- ✅ Header security, env-based secrets, validasi Zod, dan aturan upload server-side sudah ditetapkan.
- ❌ Security review menyeluruh dan pengujian unauthorized access belum selesai.

### 6. Admin dashboard dan CMS

Scope CMS resmi hanya Produk, Blog, dan Karier. Halaman lain bukan CMS pada versi ini.

- ✅ Dashboard admin, navigasi desktop/mobile, breadcrumb, dan quick action kini hanya menampilkan Produk, Blog, dan Karier sesuai scope.
- ✅ Server action Produk, Blog, Karier, audit log, permission, dan upload gambar sudah diperketat dan terhubung ke CMS.
- ✅ Product CMS lengkap untuk benefit, feature, capability, gambar, urutan, status aktif, dan validasi.
- ✅ Careers CMS untuk lowongan dan kategori selesai. ⏸ Pengelolaan lamaran tidak dikerjakan pada scope ini; form lamaran publik tetap nonaktif.
- ✅ Blog CMS selesai: daftar, pencarian/filter, kategori, editor, cover, draft/publish, edit, dan hapus.
- ⏸ User dan Role CMS UI tidak dikerjakan pada scope ini; service/action existing tetap dipertahankan.
- — Site Settings, Hero, Home Highlights, About, Partners, Legal, Contact/Leads, dan Page SEO tidak dikerjakan sebagai CMS.

### 7. Upload, email, dan integrasi eksternal

- ✅ ImageKit upload server-side, validasi ukuran/tipe/dimensi, kompresi `sharp`, permission konten, dan delete asset sudah diterapkan. Fallback upload lokal telah dihapus agar file tidak hilang di deployment.
- ✅ EmailQueue dan Nodemailer worker pattern sudah disiapkan untuk newsletter, reset password, dan verifikasi email.
- ⚠️ Email notifikasi leads masih berada di backlog.
- ❌ Verifikasi nyata upload ImageKit dan pengiriman email pada environment production belum selesai.

### 8. Testing, quality gate, dan deployment

- ✅ Playwright dan konfigurasi test sudah tersedia.
- ⚠️ Smoke test CMS fokus tersedia dan lulus untuk proteksi admin serta halaman publik mobile. Test legacy SITIVENT masih perlu dibersihkan/diganti karena tidak relevan dengan Pyxis.
- ✅ `lint` dan `typecheck` lulus; lint masih menampilkan satu warning React Compiler lama pada TanStack Table.
- ⚠️ `build` belum lulus karena environment tidak dapat mengunduh Google Fonts dari Google Fonts.
- ❌ Manual smoke test seluruh user story PRD belum selesai.
- ✅ Target deployment Vercel + PostgreSQL managed dan daftar environment variable sudah didokumentasikan.
- ❌ Deployment production, migration deploy, seed admin, observability, dan rollback check belum selesai.

### Ringkasan akhir

- ✅ Fondasi project, design guideline, database dasar, komponen reusable, sebagian service, dan sebagian route sudah dikerjakan.
- ⚠️ CMS resmi Produk/Blog/Karier dan admin UI terkait telah selesai; auth flow, production upload/email, responsive QA menyeluruh, dan build production masih perlu verifikasi penuh.
- ❌ Scope terbesar yang tersisa: penggantian test legacy, pengujian end-to-end berautentikasi, deployment production, observability, dan rollback.

## Catatan Perubahan (isi manual jika ada penyesuaian scope di tengah jalan)

- Akses admin lokal: buka `http://localhost:3000/admin` setelah menjalankan `docker compose up -d` dan `npm run dev`.
- Kredensial seed development: `admin@pyxis.co.id` / `admin`, kecuali `ADMIN_EMAIL` dan `ADMIN_PASSWORD` di `.env` diatur.
- Password default hanya untuk development; wajib diganti sebelum production.

## Log Audit Production Readiness

### 2026-09-01 — Full production/deployment audit

- Status: **NO-GO production**; project masih berada pada tahap staging/internal QA.
- Estimasi readiness: **40/100**.
- Blocker deployment: Dockerfile memakai pnpm sementara project memakai npm, `.next/standalone` dipakai tanpa `output: 'standalone'`, dan migration production belum dijalankan secara eksplisit.
- Blocker build: production build belum tervalidasi; penggunaan `next/font/google` membutuhkan akses Google Fonts saat build.
- Risiko security: server action newsletter/email belum seluruhnya memiliki authorization dan rate limiting; email verification belum diwajibkan; upload publik belum memiliki quota.
- Risiko reliability: email queue memakai in-memory lock dan diproses langsung dari request, sehingga belum aman untuk multi-instance/serverless.
- Quality gap: belum ada CI/CD, health check, observability, alerting, backup/restore drill, rollback validation, atau production smoke test.
- Scope/documentation gap: masih terdapat referensi dan test legacy SITIVENT yang dapat menghasilkan branding, URL, atau rasa aman palsu.
- Validasi yang berhasil: TypeScript lulus; ESLint lulus dengan satu warning React Compiler/TanStack Table.
- Tindak lanjut wajib: benahi Docker/build, environment validation, migration pipeline, authorization/rate limit, durable email worker, CI/CD, monitoring, rollback, dan test E2E sesuai scope Pyxis.

---
