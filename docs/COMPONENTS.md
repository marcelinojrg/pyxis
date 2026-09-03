# Component Rules — Pyxis

## Struktur

- `components/ui`: primitif shadcn/ui dan toolbar Tiptap.
- `components/Common`: komponen reusable lintas fitur.
- `components/Mixins`: Navbar dan Footer.
- `app/(root)/_components`: section halaman publik.
- `app/(admin)/_components`: form dan table CMS.

## Aturan

- Reuse komponen yang sudah ada sebelum membuat komponen baru.
- UI primitive tidak boleh mengakses Prisma atau memuat business logic.
- Props harus typed.
- Form wajib memiliki label, error state, disabled state, dan keyboard support.
- Variant reusable dapat memakai CVA; jangan membuat abstraction untuk satu penggunaan.
- Styling mengikuti token `globals.css` dan `DESIGN.md`.
- Gambar memakai `next/image` dan alt text deskriptif.

Komponen aktif harus diverifikasi dari source, bukan daftar inventaris statis yang mudah usang.
