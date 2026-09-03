# ANIMATION.md — Motion System Website Pyxis

> Dokumen ini adalah kontrak animasi untuk website publik Pyxis. Motion harus
> membantu pengunjung memahami struktur halaman, hubungan antar-elemen, dan
> aksi berikutnya—bukan menjadi dekorasi yang mengganggu.

## 1. Arah Motion

Karakter motion Pyxis:

- profesional, presisi, modern, dan tenang;
- terasa seperti sistem enterprise yang matang, bukan website playful;
- memberi kesan teknologi yang tetap hangat untuk industri hospitality;
- memiliki satu bahasa gerak yang konsisten di Home, About, Products, Blog,
  Careers, Partners, Contact, dan Legal.

Prinsip utama:

1. Konten tetap terbaca tanpa motion.
2. Animasi mengarahkan perhatian, menjelaskan perubahan state, atau memberi
   feedback atas aksi pengguna.
3. Gunakan transform dan opacity sebagai properti utama agar performa tetap
   baik.
4. Jangan menggeser layout setelah konten terlihat.
5. Jangan membuat semua elemen bergerak bersamaan.
6. Hover adalah enhancement desktop; fungsi utama harus tetap nyaman di
   touchscreen.

## 2. Motion Tokens

### Durasi

| Token | Nilai | Penggunaan |
| --- | ---: | --- |
| `instant` | `0ms` | State yang harus langsung berubah |
| `fast` | `150ms` | Icon, warna, underline, small feedback |
| `normal` | `200ms` | Button, link, hover, focus |
| `medium` | `300ms` | Navbar scroll, drawer, panel kecil |
| `content` | `440ms` | Item list/card ketika masuk viewport |
| `section` | `500ms` | Section reveal standar |
| `hero` | `650ms` | Hero utama dan elemen pembuka halaman |
| `settle` | `900ms` | Image settle yang sangat halus, maksimal sekali per media |

Durasi di atas adalah batas referensi, bukan alasan untuk menunda konten.
Animasi aksi pengguna umumnya maksimal `300ms`; animasi masuk halaman boleh
lebih panjang karena berjalan satu kali.

### Easing

- `ease-out`: default untuk elemen yang masuk atau selesai bergerak.
- `cubic-bezier(0.16, 1, 0.3, 1)`: easing utama Pyxis, terasa cepat di awal
  lalu berhenti lembut.
- `ease-in-out`: hanya untuk perubahan bolak-balik yang tidak terkait respons
  langsung pengguna.
- Hindari bounce, elastic, overshoot besar, dan linear untuk UI biasa.

### Jarak gerak

- Reveal standar: `translateY(12px)`.
- Reveal hero: `translateY(18px)`.
- Item berurutan: `translateY(8px)`.
- Timeline kiri/kanan: `translateX(16px)`.
- Image settle: `scale(1.025)` ke `scale(1)`.
- Hindari pergeseran lebih besar dari `24px` kecuali transisi drawer/full-page.

### Stagger

- Jeda antar-item: `120ms`.
- Maksimal item yang diberi stagger: 6.
- Untuk grid panjang, setelah item keenam gunakan delay yang sama atau tanpa
  delay tambahan.
- Stagger hanya berlaku pada kelompok yang masuk viewport bersama, bukan pada
  seluruh halaman sekaligus.

## 3. Aturan Global

### Page load dan page transition

- Navbar langsung tersedia; jangan disembunyikan oleh entrance animation.
- Hero menampilkan konten utama dengan reveal berurutan: eyebrow/label,
  heading, deskripsi, CTA, lalu media pendukung.
- Section di bawah fold di-reveal ketika sekitar 10% area section masuk
  viewport.
- Jangan memakai blank loading screen atau splash screen untuk website publik.
- Saat berpindah route, pertahankan scroll behavior native/halus tanpa
  menahan navigasi. Fokus keyboard harus berpindah ke konten halaman baru.

### Scroll

- Anchor link menggunakan smooth scroll selama pengguna tidak meminta reduced
  motion.
- Smooth scrolling tidak boleh memblokir nested scroll pada menu, modal, atau
  form.
- Jangan membuat parallax besar, scroll hijacking, atau efek yang membuat
  posisi baca sulit diprediksi.

### Reduced motion

Jika `prefers-reduced-motion: reduce` aktif:

- matikan reveal, stagger, image settle, parallax, dan smooth scrolling;
- tampilkan semua konten langsung dengan `opacity: 1` dan `transform: none`;
- pertahankan feedback penting melalui perubahan warna, border, atau icon;
- drawer, accordion, dan dialog tetap boleh berubah state secara instan;
- tidak boleh ada konten penting yang hanya muncul setelah event animasi.

Motion berbasis viewport hanya diaktifkan pada desktop/tablet (`min-width:
768px`) bila efek tersebut memang dibutuhkan. Mobile memprioritaskan kecepatan,
readability, dan baterai.

## 4. Komponen Global

### Navbar

- Initial state: transparan di Home jika hero mendukungnya; putih pada halaman
  lain.
- Setelah scroll lebih dari `20px`: transisi `300ms` ke background putih
  `95%`, backdrop blur, shadow, border bawah tipis, dan padding yang sedikit
  lebih rapat.
- Link desktop: warna berubah `200ms`; underline aktif selalu terlihat;
  underline hover tumbuh dari kiri ke kanan `300ms` dengan `scaleX`.
- CTA Contact: warna hover `200ms`; pressed state `scale(0.95)` maksimal
  `150ms`.
- Mobile menu: panel turun dari bawah navbar dengan opacity dan translateY;
  durasi `300ms`. Tutup saat route berubah atau item dipilih.
- Icon hamburger/X berubah langsung atau maksimal `200ms`; jangan memutar icon
  360 derajat.

### Button dan link

- Hover: perubahan warna/background/shadow `200ms`.
- Focus-visible: ring muncul tanpa animasi lambat.
- Pressed: scale `0.98–0.95` hanya untuk tombol yang memang terasa tactile.
- Link teks tidak boleh bergantung pada pergeseran layout; gunakan underline,
  warna, atau opacity.
- Disabled: tidak ada hover/press animation dan state harus tetap terbaca.

### Card

- Hover desktop: shadow naik satu tingkat, border/accent dapat berubah, dan
  media boleh zoom maksimal `scale(1.02)` di dalam `overflow-hidden`.
- Durasi hover `200–300ms`.
- Jangan mengangkat card lebih dari `4px`; grid harus tetap stabil.
- Card Produk, Blog, dan Careers memakai pola motion yang sama.

### Image

- Gunakan fade/settle ringan hanya setelah image berhasil tersedia.
- Placeholder tidak boleh berkedip antara loading dan loaded.
- Jangan memakai zoom otomatis berulang ketika scroll.
- Semua image motion harus mempertahankan aspect ratio dan tidak membuat CLS.

### Form dan feedback

- Focus input: ring/border berubah `150–200ms` tanpa scale.
- Error: pesan muncul di bawah field terkait; gunakan opacity/translate kecil
  bila tidak menyebabkan field lain bergeser secara mengejutkan.
- Submit: tombol masuk state loading dengan label dan spinner yang jelas;
  cegah submit ganda.
- Success/error toast: masuk dari arah konsisten, durasi masuk `200ms`, keluar
  `150ms`; toast tidak menutupi CTA atau field yang sedang dipakai.

### Footer

- Footer tidak perlu entrance animation yang mencolok.
- Link dan icon mengikuti hover/focus global.
- Newsletter submit memakai feedback yang sama dengan form lain.

## 5. Spesifikasi Per Halaman

### Home `/`

Urutan hero:

1. label/eyebrow: fade + `translateY(8px)`, `440ms`;
2. heading: fade + `translateY(18px)`, `650ms`;
3. subheading: `120ms` setelah heading;
4. CTA: `120ms` setelah subheading;
5. visual hero: fade + image settle `900ms`.

Setelah hero:

- About summary: section reveal sekali saat masuk viewport.
- Featured Products: card stagger `120ms`, maksimal 6 item; hover mengikuti
  pola card global.
- Features/highlights: icon muncul dengan fade, bukan spin atau bounce.
- Vision/Mission: dua panel reveal berurutan, maksimal `120ms` antar-panel.
- Evolution/timeline: item kiri masuk dari kiri `16px`, item kanan dari kanan
  `16px`; garis timeline tidak dianimasikan seperti progress bar.
- Partners bar: logo tidak bergerak otomatis; bila memakai marquee, harus ada
  pause on hover/focus dan fallback statis untuk reduced motion.
- CTA penutup: heading lalu tombol reveal berurutan; tombol tetap terlihat
  sebagai tujuan akhir scroll.

### About `/about` atau `/tentang`

- Hero memakai pola hero global.
- Profile: text dan image reveal sebagai satu kelompok, image tidak melayang.
- Vision/Mission: panel bergantian fade-up; jangan memakai flip card.
- Journey/timeline: gunakan pola evolution Home.
- CTA: reveal standar, tanpa efek perhatian baru.

### Products `/products` atau `/produk`

- Hero memakai reveal standar/hero sesuai tinggi media.
- Grid product: card masuk saat viewport; stagger maksimal 6.
- Filter/kategori bila tersedia: perubahan hasil harus mempertahankan posisi
  layout, gunakan cross-fade singkat `200ms` dan hindari animasi setiap teks.
- Navigasi ke detail tidak memakai zoom page; lakukan route transition ringan
  dan fokuskan pengguna ke konten detail.

### Product detail `/products/[slug]`

- Hero detail: nama produk, deskripsi, CTA, dan image masuk berurutan.
- Benefits/features/capabilities: heading reveal sekali, lalu item stagger.
- Accordion/collapsible bila digunakan: tinggi panel berubah `300ms` dengan
  opacity konten; icon chevron berputar maksimal `180deg`.
- CTA kontak di akhir halaman harus menjadi anchor visual terakhir, bukan
  berkedip atau pulsing terus-menerus.

### Blog `/blog`

- Hero dan intro reveal standar.
- Article card: stagger `120ms`; cover image boleh settle sekali.
- Pencarian/filter: input tetap stabil; hasil list cross-fade `200ms`.
- Empty state tampil langsung dan tidak menunggu animasi.

### Blog detail `/blog/[slug]`

- Header artikel: category/date, title, metadata, lalu cover image.
- Body artikel tidak dianimasikan paragraf demi paragraf; pembaca memerlukan
  stabilitas dan kontrol scroll.
- Related articles di bagian bawah mengikuti card global.

### Careers `/careers`

- Hero mengikuti pola global.
- Culture section boleh memakai image reveal ringan.
- Daftar lowongan: item masuk dengan stagger; filter/search tidak mengubah
  tinggi layout secara abrupt.
- Badge kategori hanya berubah warna/opacity.

### Career detail `/careers/[slug]`

- Header detail reveal berurutan.
- Deskripsi role tampil langsung setelah halaman siap.
- CTA kembali ke daftar dan CTA apply memakai button/link global.
- Form apply, jika diaktifkan pada scope mendatang, harus memakai state form
  global dan tidak boleh memalsukan success state.

### Partners `/partners` atau `/mitra`

- Hero dan benefits memakai reveal standar.
- Logo/partner mark tampil statis atau stagger pendek; hindari carousel
  autoplay kecuali ada kebutuhan bisnis yang jelas.
- Interface/integration diagram boleh memakai draw/reveal sekali, tetapi semua
  label harus tetap terbaca tanpa animasi.

### Contact `/contact` atau `/kontak`

- Info kontak dan form reveal sebagai dua kelompok, bukan setiap field satu per
  satu.
- Focus, validation, loading, error, dan success mengikuti aturan form.
- Jangan menambahkan confetti, pulse CTA, atau animasi agresif pada halaman
  yang bertujuan mengurangi friksi menghubungi sales.

### Legal `/legal`

- Tidak perlu entrance animation pada body legal.
- Hanya navbar, link, dan anchor scroll yang mengikuti motion global.
- Prioritas: readability, anchor stability, dan keyboard navigation.

## 6. Prioritas Implementasi

### P0 — wajib

- reduced-motion fallback;
- navbar scroll state;
- button/link/card hover dan focus-visible;
- Home hero reveal;
- reveal section publik tanpa menghilangkan konten saat JavaScript gagal;
- loading, error, dan success state form/toast.

### P1 — penting

- reveal konsisten pada Products, Blog, Careers, About, Partners, Contact;
- product/detail accordion bila komponen tersebut digunakan;
- filter/search cross-fade;
- timeline Home/About.

### P2 — opsional

- image settle;
- diagram reveal pada Partners;
- transisi route yang lebih halus setelah navigasi dasar terbukti stabil.

Jangan menambah library animasi baru sebelum kebutuhan P0/P1 tidak dapat
dipenuhi dengan CSS, IntersectionObserver, dan komponen yang sudah tersedia.

## 7. Guardrail Teknis

- Animasi publik tidak boleh berjalan di admin.
- Jangan memakai `window`/observer tanpa cleanup.
- Observer harus `unobserve` target yang sudah terlihat.
- Gunakan `will-change` hanya selama elemen menunggu animasi; kembalikan ke
  default setelah selesai.
- Prefer `transform`, `opacity`, dan perubahan warna; hindari animasi `width`,
  `height`, `top`, `left`, dan properti layout yang mahal.
- Pastikan SSR/JS failure tetap menampilkan semua konten.
- Jangan menambah `tabindex` hanya untuk mengontrol motion.
- Uji keyboard, touch, viewport 360px, tablet, desktop, dan reduced motion.

## 8. Kondisi Implementasi Saat Ini

Baseline yang sudah ada di source:

- `PublicReveal` aktif untuk Home pada `min-width: 768px` dan hanya saat
  `prefers-reduced-motion: no-preference`.
- Reveal section menggunakan `500ms`, hero `650ms`, item `440ms`, stagger
  `120ms`, dan easing `cubic-bezier(0.16, 1, 0.3, 1)`.
- Media hero/media section memiliki settle `900ms` dari `scale(1.025)` ke
  `scale(1)`.
- Evolution card memakai reveal horizontal `16px` dengan durasi `560ms`.
- Navbar sudah memiliki scroll transition `300ms`, underline `300ms`, dan
  mobile drawer state.
- `SmoothScroll` tersedia dan menghormati reduced motion; sebelum digunakan
  pada layout publik, verifikasi bahwa mounting-nya memang diperlukan dan tidak
  mengganggu nested scroll atau anchor navigation.

Bagian ini adalah baseline faktual, bukan batas akhir. Implementasi berikutnya
harus mengikuti token dan perilaku pada bagian sebelumnya.

## 9. Acceptance Criteria

- Semua halaman publik tetap usable ketika reduced motion aktif.
- Tidak ada flash of invisible content saat JavaScript/observer gagal.
- Tidak ada horizontal overflow pada 360px, tablet, atau desktop.
- Hero terbaca dan CTA dapat digunakan sebelum animasi selesai.
- Tidak ada layout shift yang disebabkan oleh animation.
- Hover tidak menjadi satu-satunya cara untuk menemukan fungsi.
- Keyboard focus selalu terlihat dan tidak tertutup navbar/drawer.
- Scroll, anchor, drawer, accordion, filter, form, toast, dan route navigation
  tidak terasa tertahan lebih dari yang diperlukan.
- Motion review harus memeriksa `Home`, satu halaman katalog (`Products` atau
  `Blog`), satu detail, `Careers`, `Contact`, serta reduced-motion mode.

## 10. Definition of Done Motion

- [ ] Token durasi/easing/jarak dipakai konsisten.
- [ ] P0 selesai tanpa regresi fungsi.
- [ ] Reduced-motion dan keyboard diverifikasi.
- [ ] Mobile 360px+, tablet, dan desktop diverifikasi.
- [ ] Tidak ada blank content, CLS, overflow, atau scroll hijacking.
- [ ] Motion yang tidak membantu pemahaman dihapus.
- [ ] Screenshot/video review dilakukan untuk Home dan minimal dua halaman
  publik lain sebelum motion dianggap selesai.
