# Service Layer — Pyxis

Business logic server berada di `src/services`. Komponen UI tidak boleh memuat authorization atau query database langsung.

## Domain aktif

- `admin/products.ts` — CRUD Produk.
- `admin/articles.ts` — CRUD Blog dan kategori.
- `admin/careers.ts` — CRUD Karier dan kategori.
- `admin/security.ts` — session, permission, dan audit log.
- `admin/users.ts` dan `admin/roles.ts` — service RBAC; UI CMS bukan scope saat ini.
- `public/uploads.ts` — validasi, kompresi, upload, dan penghapusan gambar.
- `public/auth.ts` — helper auth yang masih perlu audit scope.

## Kontrak

Server Action:

- memvalidasi input di server;
- memverifikasi permission sebelum mutasi;
- memakai Prisma transaction ketika beberapa write harus atomik;
- mengembalikan `ServiceResponse<T>`;
- tidak mengirim Error mentah, stack trace, password, token, atau secret;
- menjalankan `revalidatePath` atau invalidasi query setelah mutasi berhasil.

Error log harus cukup untuk diagnosis tanpa membocorkan data pribadi.

Pekerjaan email ditunda.
