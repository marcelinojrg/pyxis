# FIGMA-AUDIT.md
# Figma Design Audit

## 1. Figma Source

File:
`PYXIS`

URL:
`https://www.figma.com/design/RIWU4dyafGtJmY17m7M8Hr/PYXIS?node-id=0-1&t=6X2ImTCVHcy3Wcp4-1`

## 2. Audit Status

Figma menjadi source visual utama.
Dokumen ini harus diisi dengan node ID dan screenshot hasil inspeksi setiap section sebelum implementasi visual final.

Pada sesi dokumentasi ini, struktur node detail Figma tidak dapat ditampilkan penuh melalui connector runtime. Karena itu, dokumen ini tidak mengarang nama section atau angka visual yang belum terverifikasi.

Temuan yang dapat ditetapkan dari dokumen proyek:
- website sudah dipisah menjadi section;
- page utama yang harus dicakup adalah Home, About, Products, Product Detail, Partners, Contact, Legal, Careers;
- desain lama menetapkan gaya B2B modern, clean, professional, tech-forward;
- implementasi harus memetakan setiap section Figma ke `SCREEN-SPEC.md`.

## 3. Audit Checklist per Section

Gunakan tabel berikut saat inspeksi Figma langsung:

| Page | Section | Figma Node | Layout | Background | Content Source | Responsive Rule | Status |
|---|---|---|---|---|---|---|---|
| Home | Hero | isi dari Figma | isi | isi | HeroSection | isi | Pending |
| Home | Featured Products | isi dari Figma | isi | isi | Product | isi | Pending |
| Home | Highlights | isi dari Figma | isi | isi | HomeHighlight | isi | Pending |
| Home | CTA | isi dari Figma | isi | isi | SiteSettings/CTA | isi | Pending |
| About | Intro | isi dari Figma | isi | isi | AboutContent | isi | Pending |
| About | Vision/Mission | isi dari Figma | isi | isi | AboutContent | isi | Pending |
| Products | Product grid | isi dari Figma | isi | isi | Product | isi | Pending |
| Product Detail | Hero | isi dari Figma | isi | isi | Product | isi | Pending |
| Product Detail | Features | isi dari Figma | isi | isi | Product | isi | Pending |
| Product Detail | Gallery | isi dari Figma | isi | isi | Product | isi | Pending |
| Partners | Hero | isi dari Figma | isi | isi | PartnersPageContent | isi | Pending |
| Partners | Benefits | isi dari Figma | isi | isi | PartnerBenefit | isi | Pending |
| Partners | Integration grid | isi dari Figma | isi | isi | Partner | isi | Pending |
| Contact | Form | isi dari Figma | isi | isi | ContactMessage | isi | Pending |
| Legal | Policies | isi dari Figma | isi | isi | LegalContent | isi | Pending |
| Careers | Careers content | isi dari Figma | isi | isi | CareerContent | isi | Pending |

## 4. What Must Be Extracted From Figma

Untuk setiap section:
- frame/node ID;
- desktop width;
- height;
- horizontal padding;
- vertical padding;
- max content width;
- grid columns;
- gap;
- typography;
- line height;
- button dimension;
- radius;
- border;
- shadow;
- image ratio;
- image crop;
- alignment;
- interaction;
- hover/focus;
- mobile behavior;
- tablet behavior;
- asset dependency.

## 5. Design Gap Checklist

Periksa apakah Figma sudah mendefinisikan:
- mobile layout;
- tablet layout;
- hover;
- focus;
- loading;
- empty;
- error;
- published/unpublished state;
- long content;
- missing image;
- missing product;
- long product feature list;
- validation error.

Jika tidak ada, implementation default berasal dari `DESIGN.md`, `SCREEN-SPEC.md`, dan accessibility requirement.

## 6. Figma to Code Mapping Rule

Setiap visual block besar harus memiliki:
```text
Figma Node
  -> Screen Section
  -> React Component
  -> Data Model
  -> Admin Editor
  -> Acceptance Test
```

Contoh:
```text
Hero node
  -> Home Hero
  -> HeroSection
  -> HeroSection model
  -> /admin/hero
  -> PUB/ADM test
```

## 7. Do Not Guess

Jangan menganggap:
- jumlah section;
- warna exact;
- font exact;
- ukuran exact;
- icon;
- illustration;
- image;
- animation;
- layout responsive

sudah benar hanya berdasarkan dokumen lama. Verifikasi ke Figma lalu catat.
