# API-CONTRACTS.md
# Kontrak Data & Mutasi

> Disinkronkan 2026-08-19. Project ini **tidak memakai REST API route handler** untuk CRUD konten.
> Semua operasi data dilakukan lewat **Server Actions** (`'use server'`) di `src/services/**`.

## 1. Bentuk Kontrak: Server Actions

Setiap fungsi publik di `src/services` adalah server action yang dipanggil langsung dari komponen/hook client (TanStack Query mutation) atau dari server.

Format respons standar — `ServiceResponse<T>` (`src/types/service-response.d.ts`):

```ts
export type ServiceResponse<T = unknown> = {
  success: boolean;   // true jika operasi berhasil
  data?: T;           // payload hasil (tipikal untuk read/create/update)
  error?: string;     // pesan error siap tampil (jika gagal)
  message?: string;   // pesan sukses siap tampil (opsional)
};
```

Aturan:

- Server action **tidak boleh melempar stack trace** ke client — tangkap error, kembalikan `{ success: false, error }`.
- Jangan pernah mengembalikan: password, token session, stack trace, atau secret (ImageKit private key, SMTP pass).
- Semua respons mutasi harus typed (pakai generics `ServiceResponse<T>` dengan interface dari `src/interfaces`).

## 2. Endpoint HTTP yang Tersisa

Satu-satunya endpoint HTTP non-halaman adalah milik **Better Auth** (`/api/auth/*`) — saat ini route handler-nya belum dibuat (known issue, lihat `ONLY_ME.md`). Setelah dibuat, kontraknya mengikuti dokumentasi resmi Better Auth (session, sign-in, sign-up, admin plugin).

Rewrite internal: `/cdn-cgi/rum` → `/api/beacon` (proxy Cloudflare Web Analytics, `next.config.ts`).

## 3. Alur Wajib Setiap Mutasi

Semua server action mutasi (create/update/delete) mengikuti urutan:

1. **Auth** — ambil session: `auth.api.getSession({ headers: await headers() })`.
2. **Authorize** — `verifySession` / `verifyPermission` dari `services/admin/security.ts` (RBAC: permission seperti `admin.access`).
3. **Parse & validate** — parse input dengan schema Zod di `src/schemas` (server-side, jangan percaya client).
4. **Mutate** — operasi Prisma.
5. **Revalidate** — `revalidatePath` untuk path publik yang terdampak.
6. **Return** — `ServiceResponse` typed.

## 4. Kontrak per Domain (yang sudah ada)

| Domain    | File service                          | Operasi utama                                        |
| --------- | ------------------------------------- | ---------------------------------------------------- |
| Users     | `services/admin/users.ts`             | CRUD user admin, ambil user aktif (`getCurrentUserData`) |
| Roles     | `services/admin/roles.ts`             | CRUD role                                            |
| Articles  | `services/admin/articles.ts`          | CRUD artikel (slug otomatis via `slugify`)           |
| Security  | `services/admin/security.ts`          | `verifySession`, `verifyPermission`, `getUserPermissionsAndRoles` |
| Uploads   | `services/public/uploads.ts`          | `uploadImage` (ImageKit + sharp), `deleteImage`      |
| Emails    | `services/public/emails.ts`           | `queueEmail` → tabel `EmailQueue`                    |
| Auth      | `services/public/auth.ts`             | Login/register (schema `loginSchema`/`registerSchema`) |
| Profile   | `services/participant/profile.ts`     | Update nama/akun user login                          |
| Newsletter| `app/actions/newsletter.ts`           | Subscribe email → `NewsletterSubscriber` + `queueEmail` |

## 5. Kontrak Slug

- Dibuat dengan `slugify` (`src/lib/slugify.ts`): kebab-case, huruf kecil, tanpa karakter spesial.
- Unik per model yang memiliki field `slug` (`Product`, `Career`, `Article`).
- Slug dapat di-override manual selama tetap unik.

## 6. Kontrak Pagination & Pencarian

Server action list mengembalikan bentuk paginasi konsisten (lihat interface `*PaginationResponse` di `src/interfaces/features/*`):

```ts
{
  data: T[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}
```

Client memakai `usePagination` / `useDebounce` / `useSort` (`src/hooks`) bersama TanStack Query.

## 7. Kebijakan Validasi

- Input publik (form kontak/newsletter) divalidasi Zod di server action sebelum menyentuh database.
- Upload gambar divalidasi di server (tipe & ukuran) sebelum diproses `sharp` dan dikirim ke ImageKit.
- Error validasi dikembalikan sebagai `error` string yang aman ditampilkan ke user.
