# TEST-MATRIX.md
# QA and Acceptance Test Matrix

## 0. Status Kelayakan (per 2026-08-19)

Legend: ✅ bisa dijalankan sekarang · 🚧 terhalang known issue · ❌ fiturnya belum dibangun

| Grup | Status | Catatan |
| --- | :---: | --- |
| 1. Public Navigation | 🚧 | Home ✅, About crash (known issue), Products/Partners/Legal/Careers belum dibangun |
| 2. Lead Form | ❌ | Form kontak publik belum ada; newsletter (`/` footer) bisa dites |
| 3. Admin | 🚧 | `/admin` & `/login` rusak (known issue di `ONLY_ME.md`) |
| 4. Upload | ✅ | `uploadImage`/`deleteImage` (ImageKit) sudah ada di `services/public/uploads.ts` |
| 5. Responsive | ✅ | Berlaku untuk halaman yang sudah ada |
| 6. Accessibility | ✅ | Berlaku untuk halaman yang sudah ada |
| 7. Security | 🚧 | Proteksi proxy ✅ berjalan; mutasi admin belum ada yang bisa dites |
| 8. SEO | 🚧 | sitemap/robots/metadata ✅; halaman dinamis belum ada |
| 9. Engineering | 🚧 | `typecheck`/`build` masih gagal karena known issues |
| 10. Visual QA | 🚧 | Hanya untuk halaman yang sudah ter-render |

Matriks di bawah adalah **target QA**; skenario untuk fitur yang belum dibangun dijalankan saat fiturnya selesai.

## 1. Public Navigation

| ID | Scenario | Expected |
|---|---|---|
| PUB-001 | Open Home | loads without error |
| PUB-002 | Navigate to About | correct page |
| PUB-003 | Navigate to Products | published products shown |
| PUB-004 | Open product detail | correct slug data |
| PUB-005 | Open unpublished slug | not publicly rendered |
| PUB-006 | Open invalid slug | 404 |
| PUB-007 | Open Partners | content loads |
| PUB-008 | Open Contact | form visible |
| PUB-009 | Open Legal | 3 policy sections |
| PUB-010 | Open Careers | correct status |
| PUB-011 | Unknown path | custom 404 |

## 2. Lead Form

| ID | Scenario | Expected |
|---|---|---|
| LEAD-001 | valid general contact | saved |
| LEAD-002 | valid partnership | saved with source partnership |
| LEAD-003 | invalid email | validation error |
| LEAD-004 | missing required field | validation error |
| LEAD-005 | too many requests | 429 |
| LEAD-006 | server failure | safe error state |

## 3. Admin

| ID | Scenario | Expected |
|---|---|---|
| ADM-001 | no session /admin | redirect login |
| ADM-002 | valid login | dashboard |
| ADM-003 | invalid login | safe failure |
| ADM-004 | create product | product stored |
| ADM-005 | edit product | public reflects change |
| ADM-006 | delete product | removed |
| ADM-007 | unpublished product | hidden public |
| ADM-008 | featured toggle | home changes |
| ADM-009 | partner CRUD | works |
| ADM-010 | legal edit | public changes |
| ADM-011 | career edit | public changes |
| ADM-012 | site settings | footer/contact changes |
| ADM-013 | message mark read | state updates |
| ADM-014 | message delete | removed |

## 4. Upload

- valid JPG under 2MB;
- valid PNG;
- valid WebP;
- invalid extension;
- too large;
- upload failure;
- URL stored;
- image rendered with next/image.

## 5. Responsive

Test:
- 360x800;
- 390x844;
- 768x1024;
- 1024x768;
- 1280x800;
- 1440x900.

Check:
- no horizontal scroll;
- heading wrap;
- CTA;
- menu;
- image crop;
- forms;
- tables.

## 6. Accessibility

- keyboard tab through navbar;
- mobile menu keyboard;
- Escape closes modal/menu;
- form labels;
- error announcement where appropriate;
- visible focus;
- color contrast;
- semantic heading order.

## 7. Security

- guest cannot PUT product;
- guest cannot DELETE product;
- guest cannot update legal;
- invalid JSON handled;
- XSS payload safely rendered;
- no secret in client bundle;
- rate limit enforced.

## 8. SEO

- titles;
- descriptions;
- canonical;
- sitemap;
- robots;
- OG;
- product metadata;
- no unpublished page leakage.

## 9. Engineering

- npm run lint;
- npm run typecheck;
- npm run build;
- production smoke test.

Baseline 2026-08-19: `typecheck`/`build` masih gagal karena known issues (`ONLY_ME.md`) — sebagian besar error leftover sudah dibersihkan (30 file sistem event lama dihapus), sisa error adalah modul hilang di `/about`, `/admin`, `/login`, dan `prisma/seed.ts` yang usang.

## 10. Visual QA

For each public page:
- compare screenshot to Figma;
- compare section order;
- typography;
- spacing;
- imagery;
- CTA;
- responsive behavior;
- hover/focus state.
