# DESIGN.md — Panduan Visual & Sistem Desain

> Tujuan file ini: memastikan AI agent menghasilkan tampilan yang **konsisten** setiap kali membuat komponen baru, bukan desain acak tiap sesi.
>
> Disinkronkan 2026-08-19: mekanisme token kini Tailwind CSS 4 (CSS-first `@theme` di `src/app/globals.css`, dimuat bersama `@config "../../tailwind.config.ts"`), dark mode via class `.dark`.

## 1. Kesan yang Ingin Dibangun

Pyxis adalah perusahaan **B2B software enterprise** (software hotel). Kesan visual yang dituju:

- **Profesional & terpercaya** (bukan playful/childish)
- **Modern & clean** (banyak whitespace, tidak ramai)
- **Teknologi/tech-forward** tapi tetap hangat (karena berhubungan dengan industri hospitality)

## 2. Palet Warna

### Kondisi aktual (2026-08-19)

Token warna memakai **variabel CSS oklch** di `src/app/globals.css` (pola shadcn/ui): `--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--success`, `--warning`, `--border`, `--ring`, dll — lengkap dengan padanan `.dark`. Token ini dipetakan ke utility Tailwind (`bg-primary`, `text-muted-foreground`, ...) lewat `@theme inline`. Palet bawaan saat ini **netral monokrom** (primary hampir hitam), belum memakai warna brand navy/amber.

### Palet brand (TARGET — belum diterapkan di globals.css)

| Nama Token      | Hex                    | Penggunaan                                                    |
| --------------- | ---------------------- | ------------------------------------------------------------- |
| `primary`       | `#1E3A8A` (navy blue)  | Warna utama brand — navbar, tombol utama, heading penting     |
| `primary-light` | `#3B82F6`              | Hover state, aksen sekunder                                   |
| `secondary`     | `#F59E0B` (amber/gold) | Aksen CTA, highlight, badge — dipakai SEDIKIT, jangan dominan |
| `neutral-900`   | `#111827`              | Teks heading                                                  |
| `neutral-700`   | `#374151`              | Teks body                                                     |
| `neutral-400`   | `#9CA3AF`              | Teks placeholder/disabled                                     |
| `neutral-100`   | `#F3F4F6`              | Background section alternatif                                 |
| `neutral-50`    | `#F9FAFB`              | Background utama                                              |
| `white`         | `#FFFFFF`              | Card background, navbar                                       |
| `success`       | `#16A34A`              | Notifikasi sukses (misal: pesan terkirim)                     |
| `error`         | `#DC2626`              | Notifikasi error/validasi gagal                               |

Cara menerapkan palet brand: ubah nilai variabel CSS di `:root` (dan `.dark`) pada `globals.css` — **jangan** menulis hex langsung berulang-ulang di komponen.

## 3. Tipografi

### Kondisi aktual (2026-08-19)

- Font yang dimuat di `src/app/layout.tsx` (`next/font/google`): **Inter** untuk heading dan **Roboto** untuk body.

### Target brand

- **Font heading**: `Inter` (600/700 weight) — modern, tegas
- **Font body**: `Roboto` (400 weight) — readable untuk teks panjang
- Import lewat `next/font/google`, JANGAN link CDN manual di `<head>`

| Elemen             | Ukuran (desktop)   | Ukuran (mobile)    | Weight |
| ------------------ | ------------------ | ------------------ | ------ |
| H1 (hero title)    | `text-5xl` (48px)  | `text-3xl` (30px)  | 700    |
| H2 (section title) | `text-3xl` (30px)  | `text-2xl` (24px)  | 600    |
| H3 (card title)    | `text-xl` (20px)   | `text-lg` (18px)   | 600    |
| Body               | `text-base` (16px) | `text-base` (16px) | 400    |
| Small/caption      | `text-sm` (14px)   | `text-sm` (14px)   | 400    |

## 4. Spacing & Layout

- Gunakan skala spacing default Tailwind (`4, 8, 12, 16, 24, 32, 48, 64...`) — jangan pakai angka custom sembarangan.
- Max width konten: `max-w-7xl` untuk container utama, dengan padding horizontal `px-4 md:px-8`.
- Jarak antar section vertikal: `py-16 md:py-24`.
- Grid produk: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, gap `gap-6 md:gap-8`.

## 5. Breakpoint Responsif (ikuti default Tailwind)

| Nama | Lebar min | Catatan              |
| ---- | --------- | -------------------- |
| `sm` | 640px     | HP besar / landscape |
| `md` | 768px     | Tablet               |
| `lg` | 1024px    | Laptop kecil         |
| `xl` | 1280px    | Desktop              |

**Wajib mobile-first**: tulis style default untuk mobile dulu, baru tambahkan `md:` `lg:` untuk layar lebih besar.

## 6. Komponen — Gaya Visual

### Button

- Primary button: background `primary`, text putih, `rounded-lg`, `px-6 py-3`, hover jadi `primary-light`, ada transisi (`transition-colors duration-200`)
- Secondary/outline button: border `primary`, text `primary`, background transparan, hover background `neutral-100`
- Semua button pakai komponen `Button` dari shadcn/ui sebagai basis, dikustom lewat `className`

### Card (Produk, dll)

- Background putih, `rounded-xl`, `shadow-sm` (hover jadi `shadow-md`), border tipis `border border-neutral-100`
- Padding internal `p-6`
- Gambar produk di atas card, `aspect-video`, `object-cover`, `rounded-t-xl`

### Form (Kontak & Admin)

- Input: `rounded-lg`, `border border-neutral-300`, `px-4 py-2.5`, focus state `ring-2 ring-primary-light`
- Label di atas input, `text-sm font-medium text-neutral-700 mb-1`
- Pesan error validasi: teks `error` color, `text-sm`, muncul di bawah input terkait
- Tombol submit full-width di mobile, auto-width di desktop

### Navbar

- Sticky top, background putih dengan `shadow-sm` saat sudah discroll (opsional, boleh skip animasi scroll kalau mepet waktu)
- Logo/nama perusahaan di kiri, menu di kanan (desktop), hamburger menu di mobile
- Menu: Home, About, Produk, Kontak

### Footer

- Background `neutral-900` atau `primary` (pilih salah satu, konsisten), teks putih/neutral-300
- Berisi: nama perusahaan, alamat singkat, link menu, copyright

## 7. Admin Dashboard — Gaya Berbeda dari Public

Dashboard admin **tidak perlu semewah halaman publik** — prioritaskan fungsi & kejelasan:

- Layout: sidebar kiri (fixed, `w-64`) + konten kanan
- Gunakan komponen table dari shadcn/ui untuk list produk/pesan
- Warna tetap konsisten dengan palet di atas, tapi lebih banyak pakai `neutral` (background `neutral-50`, card putih)
- Form admin: gunakan layout 1 kolom untuk mobile-friendly, 2 kolom untuk field pendek berdampingan (misal: nama + slug) di desktop

## 8. Gambar & Ikon

- Ikon: gunakan `lucide-react` (sudah include di shadcn/ui ecosystem) — jangan campur beberapa icon library berbeda.
- Gambar produk: rasio `16:9` untuk konsistensi di grid card.
- Semua `<img>` HARUS pakai `next/image` (`<Image>`) untuk optimasi otomatis — jangan tag `<img>` biasa kecuali untuk kasus khusus yang dikomentari alasannya.
- Alt text WAJIB diisi deskriptif (bukan kosong `alt=""`) untuk aksesibilitas & SEO.

## 9. Aksesibilitas Minimum

- Kontras warna teks vs background minimal rasio 4.5:1 (palet di atas sudah memenuhi ini untuk kombinasi standar).
- Semua elemen interaktif (button, link, input) harus bisa diakses via keyboard (Tab), gunakan elemen native (`<button>`, `<a>`) bukan `<div onClick>`.
- Form wajib punya `<label>` yang terhubung ke `<input>` (via `htmlFor`/`id`), bukan hanya placeholder.

## 10. Tone Copywriting

- Bahasa Indonesia formal-semi-santai (bukan kaku birokratis, tapi tetap profesional B2B).
- CTA button pakai kata kerja aktif: "Hubungi Kami", "Lihat Produk", "Kirim Pesan" — bukan "Klik Disini".
- Hindari jargon berlebihan; jelaskan fitur produk dengan bahasa yang dipahami pemilik hotel/restoran (bukan hanya developer).
