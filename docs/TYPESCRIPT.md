# TypeScript Rules — Pyxis

- `strict` wajib aktif.
- Jangan memakai `any` tanpa alasan yang terdokumentasi.
- Gunakan `unknown` lalu lakukan narrowing untuk input tidak tepercaya.
- Gunakan `import type` karena `verbatimModuleSyntax` aktif.
- Gunakan type hasil Zod untuk data form bila sesuai.
- Gunakan interface bersama di `src/interfaces`; type lokal tetap dekat dengan pemakaiannya.
- Jangan memakai non-null assertion untuk menyembunyikan state yang belum divalidasi.
- Tangani nilai nullable dari Prisma secara eksplisit.
- Server Action mengembalikan `ServiceResponse<T>` yang typed.

Validasi TypeScript:

```bash
npm run typecheck
```
