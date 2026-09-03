# Coding Standards — Pyxis

## TypeScript dan React

- TypeScript strict; hindari `any`.
- Gunakan `import type` untuk type-only import.
- Komponen React berupa function component.
- Gunakan Server Component secara default; Client Component hanya bila membutuhkan state, event, atau browser API.
- Gunakan `next/image` untuk gambar.

## Struktur

- Primitif UI: `src/components/ui`.
- Reusable lintas halaman: `src/components/Common`.
- Komposit layout: `src/components/Mixins`.
- Section publik: `src/app/(root)/_components`.
- Business logic dan Server Action: `src/services`.
- Validasi trust boundary: `src/schemas`.

## Data dan security

- Produk, Blog, dan Karier berasal dari database.
- Semua mutasi memerlukan auth, permission, dan validasi server.
- Jangan hardcode secret.
- Jangan expose stack trace atau data sensitif.
- Upload gambar hanya melalui service ImageKit.

## Penamaan

- Primitif UI: kebab-case.
- Komponen fitur: PascalCase.
- Variable dan function: camelCase.
- Model/type/component: PascalCase.

## Selesai

Jalankan pemeriksaan paling sempit yang relevan. Perubahan umum wajib melewati:

```bash
npm run typecheck
npm run lint
npm run build
```
