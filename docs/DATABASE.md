# Database Pyxis

Pyxis memakai PostgreSQL dan Prisma ORM 7. Schema tunggal berada di `prisma/schema.prisma`.

## Model aktif

### Auth dan akses

- `User`, `Session`, `Account`, `Verification`
- `Role`, `Permission`
- `AuditLog`

### CMS

- `Product`, `ProductBenefit`, `ProductFeature`, `ProductCapability`, `ProductCapabilityItem`
- `Article`, `ArticleCategory`
- `Career`, `CareerCategory`, `CareerApplication`

### Company profile dan operasional

- `Branch`, `Client`
- `NewsletterSubscriber`
- `EmailQueue` — pekerjaan email ditunda

Tidak ada model event, pendaftaran peserta, pembayaran, attendance, tiket QR, atau sertifikat.

## Perintah

```bash
npx prisma generate
npx prisma migrate dev
npm run db:migrate:deploy
npm run db:seed
```

`DATABASE_URL` wajib tersedia saat runtime. Gunakan migration baru untuk perubahan schema; jangan mengedit migration production yang sudah dijalankan.

## Aturan

- Gunakan constraint database untuk uniqueness dan foreign key.
- Gunakan `onDelete` secara eksplisit pada relation.
- Gunakan transaction untuk write yang harus atomik.
- Migration production dijalankan sebelum aplikasi menerima traffic.
- Backup dan restore harus diuji sebelum production.
