# COMPONENT-CATALOG.md
# Inventaris Komponen & Aturan Pakai

> Disinkronkan 2026-08-19 dengan struktur `src/components` hasil refactor.
> Konvensi arsitektur komponen (Common / Mixins / UI) dijelaskan di `src/components/README.md`.

## 1. Tujuan

Dokumen ini mencegah setiap section dibuat sebagai component unik yang sulit dipelihara, dan menjadi daftar tunggal komponen yang benar-benar ada di codebase.

## 2. Struktur Komponen

| Folder                        | Isi                                                        |
| ----------------------------- | ---------------------------------------------------------- |
| `src/components/ui/`          | Primitif shadcn/ui + toolbar TipTap. Siap pakai, tanpa logika bisnis. |
| `src/components/Common/`      | Komponen reusable lintas halaman (modal, editor, loader).  |
| `src/components/Mixins/`      | Komponen komposit: Navbar, Footer.                         |
| `src/app/(root)/_components/` | Section spesifik halaman publik (Home*, About*).           |

## 3. UI Primitives (`components/ui/`)

shadcn/ui: `alert`, `avatar`, `badge`, `breadcrumb`, `button`, `calendar`, `card`, `carousel`, `chart`, `checkbox`, `collapsible`, `combobox`, `command`, `context-menu`, `data-table`, `dialog`, `dropdown-menu`, `empty`, `field`, `input`, `input-group`, `kbd`, `label`, `pagination`, `popover`, `radio-group`, `select`, `separator`, `sheet`, `sidebar`, `skeleton`, `sonner` (toaster), `spinner`, `switch`, `table`, `tabs`, `textarea`, `tooltip`.

TipTap toolbars (`components/ui/toolbars/`): `toolbar-provider`, `bold`, `italic`, `underline`, `strikethrough`, `heading`, `link`, `bullet-list`, `ordered-list`, `blockquote`, `code`, `code-block`, `table`, `text-align`, `font-family`, `font-size`, `line-height`, `sub-super`, `emoji`, `image-placeholder-toolbar`, `search-and-replace-toolbar`, `undo`, `redo`, `hard-break`, `horizontal-rule` + custom extensions di `toolbars/extensions/` (`image`, `image-placeholder`, `font-size`, `line-height`, `search-and-replace`).

## 4. Common Components (`components/Common/`)

| Komponen            | Fungsi                                              |
| ------------------- | --------------------------------------------------- |
| `RichTextEditor`    | Editor TipTap lengkap; upload gambar via `services/public/uploads` |
| `Modals/Modal`      | Modal dasar                                         |
| `Modals/AlertModal` | Konfirmasi (mis. hapus)                             |
| `Modals/ImagePreviewModal` | Preview gambar                              |
| `Modals/ImageCropperModal` | Crop gambar sebelum upload (`react-advanced-cropper`) |
| `Heading`           | Judul section dengan subjudul                       |
| `GreetingCard`      | Kartu sambutan (dashboard)                          |
| `Loader`            | Loading spinner                                     |
| `ErrorState`        | Tampilan error + aksi kembali                       |
| `ScrollToTop`       | Tombol scroll ke atas                               |
| `ThemeToggle`       | Toggle dark mode (`next-themes`)                    |
| `CustomIcons`       | Ikon custom di luar lucide                          |
| `Alerts/ApiAlert` & `Alerts/ApiListAlert` | Notifikasi status API          |

## 5. Mixins (`components/Mixins/`)

| Komponen | Isi |
| -------- | --- |
| `Navbar` | `index.tsx` + konstanta `navLinks.ts` + `Navbar.module.css` |
| `Footer` | `index.tsx` + konstanta `footerLinks.tsx` |

> Catatan: folder `Mixins/Sidebar` (AppSidebar, CMSHeader, dsb.) sudah **dihapus** pada 2026-08-19 — leftover sistem event lama yang tidak terpakai.

## 6. Page Sections (`app/(root)/_components/`)

**Home** (urut render di `(root)/page.tsx`):
`HomeHero`, `HomePartnersBar`, `HomeAboutSummary`, `HomeFeaturedProducts`, `HomeFeatures`, `HomeHighlights`, `HomeVisionMission`, `HomeEvolution`, `HomeCTA`.

**About**:
`AboutHero`, `AboutProfile`, `AboutVisionMission`, `AboutContact`, `AboutCTA`.
> ⚠️ Section About saat ini crash karena `@/components/ui/container` hilang (known issue, lihat `ONLY_ME.md`).

## 7. Komponen yang Direncanakan tapi BELUM ADA

Komponen berikut ada di spesifikasi (SCREEN-SPEC.md / PRD.md) tetapi belum diimplementasi — jangan dianggap tersedia:

- `Container` (`ui/container.tsx`) — hilang saat konversi, perlu dibuat ulang;
- `ProductCard`, `FeatureList` (halaman produk);
- `ContactForm` (form kontak publik);
- Komponen admin: tabel & form CRUD (products, articles, careers, messages), sidebar admin, metric card dashboard.

## 8. Aturan Komponen

- Tidak boleh ada query database langsung di komponen UI level rendah — data lewat props atau hook (TanStack Query).
- Mutasi hidup di layer form/container (server action di `src/services`), bukan di primitif UI.
- Props harus typed (interface di `src/interfaces` bila dibagikan antar komponen).
- Varian harus disengaja (pakai `cva` bila perlu), bukan styling acak per instance.
- File: `kebab-case.tsx` untuk primitif ui; `PascalCase.tsx` untuk komponen fitur/section. Nama komponen `PascalCase`.

## 9. Figma Mapping

Referensi Figma per komponen/section (node, visual role, responsive rule, data source) dicatat terpisah bila desain sudah final. Dokumen `FIGMA-AUDIT.md` saat ini **tidak ada** — buat kembali saat dibutuhkan.
