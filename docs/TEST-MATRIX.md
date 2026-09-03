# Matriks QA Pyxis

Status implementasi terbaru berada di `ONLY_ME.md`. Matriks ini menyatakan pemeriksaan yang diperlukan sebelum production.

## Otomatis saat ini

| ID | Pemeriksaan | Implementasi |
| --- | --- | --- |
| AUTO-001 | Guest ditolak dari `/admin`, Products, Blog, dan Careers CMS | `cms-admin-access.spec.ts` |
| AUTO-002 | Delapan halaman publik membuka tanpa HTTP 5xx pada viewport 360 px | `cms-public-pages.spec.ts` |
| AUTO-003 | Tidak ada overflow horizontal pada delapan halaman publik | `cms-public-pages.spec.ts` |
| AUTO-004 | TypeScript strict lulus | `npm run typecheck` |
| AUTO-005 | ESLint lulus | `npm run lint` |
| AUTO-006 | Prisma generate dan production build lulus | `npm run build` |

## Wajib sebelum production

### Auth dan security

- Login admin valid dan invalid.
- Session kedaluwarsa diarahkan ke login.
- User tanpa permission ditolak oleh route dan Server Action.
- Seluruh mutasi Produk, Blog, dan Karier memvalidasi input di server.
- Secret tidak masuk bundle client atau log.

### CMS

- CRUD Produk, termasuk slug unik, status aktif, urutan, gambar, benefit, fitur, dan kapabilitas.
- CRUD Blog, termasuk kategori, cover, rich text, draft/publish, dan artikel draft tidak tampil publik.
- CRUD Karier, termasuk kategori, slug unik, urutan, status aktif, dan lowongan nonaktif tidak tampil publik.

### Website publik

- Home, About, Products, Blog, Careers, Contact, Legal, dan Partners pada mobile, tablet, dan desktop.
- Detail Products, Blog, dan Careers: slug valid, slug tidak ada, serta content nonaktif/draft.
- Metadata, canonical, sitemap, robots, Open Graph, dan halaman 404.
- Keyboard navigation, focus, label form, heading, alt text, dan contrast.

### Deployment

- Environment production lengkap dan tervalidasi.
- Migration deploy dan seed admin dilakukan secara terkendali.
- `/api/health` mengembalikan 200 saat DB sehat dan 503 saat DB tidak sehat.
- Production smoke test dijalankan setelah deploy.
- Backup/restore, observability, alerting, dan rollback diverifikasi.

Pengujian email/SMTP tidak dikerjakan sampai ada instruksi terpisah.
