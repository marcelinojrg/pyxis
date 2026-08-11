# PRD — Product Requirement Document

## Company Profile Dinamis — PT. Pyxis Ultimate Solution

## 1. Latar Belakang

PT. Pyxis Ultimate Solution adalah perusahaan software hotel & restoran berbasis di Malang, transformasi dari PT. MYOH Technology, Tbk. Produk utama mereka adalah **Alcor PMS** (Property Management System berbasis cloud untuk hotel/resort/guest house) dan **Alcor POS** (sistem kasir untuk restoran/café/karaoke, terintegrasi dengan PMS).

Saat ini dibutuhkan website company profile baru yang **dinamis** — artinya seluruh konten (teks, gambar, daftar produk) bisa diubah oleh admin tanpa perlu mengubah kode/deploy ulang.

## 2. Tujuan (Goals)

1. Menampilkan profil perusahaan dan produk (Alcor PMS, Alcor POS) secara profesional kepada calon klien (hotel, restoran, guest house).
2. Memungkinkan admin non-teknis mengubah konten kapan saja lewat dashboard sederhana.
3. Menyediakan kanal kontak/leads dari pengunjung website.
4. Website harus cepat, responsif (mobile-friendly), dan mudah di-maintain oleh satu developer.

## 3. Target Pengguna

| Peran                 | Deskripsi                                                                                 | Kebutuhan                                                                           |
| --------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **Pengunjung publik** | Calon klien: pemilik/manajer hotel, restoran, guest house yang mencari software manajemen | Info produk jelas, cara kontak mudah, loading cepat                                 |
| **Admin**             | Staf internal Pyxis (1 akun, ditambah manual di database awal)                            | Login aman, edit konten tanpa perlu tahu coding, lihat pesan masuk dari form kontak |

## 4. Ruang Lingkup (Scope)

### 4.1 Halaman Publik

| Halaman                                            | Konten                                                                                                                                               |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Home**                                           | Hero section (judul, subjudul, gambar/banner, CTA button), ringkasan produk unggulan (max 3-4 card), highlight keunggulan perusahaan, CTA ke Contact |
| **About**                                          | Sejarah perusahaan (dari MYOH ke Pyxis), visi misi, alamat kantor                                                                                    |
| **Produk / Layanan**                               | List semua produk (Alcor PMS, Alcor POS, dst.), tiap produk punya halaman detail: deskripsi, daftar fitur, gambar                                    |
| **Detail Produk** (dynamic route `/produk/[slug]`) | Deskripsi lengkap, fitur-fitur (list), galeri gambar, CTA ke Contact                                                                                 |
| **Kontak**                                         | Form kontak (nama, email, no. telepon, pesan), info alamat/telepon/email statis, embed Google Maps (opsional, boleh skip jika mepet waktu)           |
| **404 / Not Found**                                | Halaman error kustom sederhana                                                                                                                       |

### 4.2 Admin Dashboard (protected, `/admin/*`)

| Fitur                    | Deskripsi                                                                                                                                                                                                                                                                        |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Login**                | Login dengan email + password (NextAuth credentials provider)                                                                                                                                                                                                                    |
| **Dashboard home**       | Ringkasan: jumlah produk, jumlah pesan masuk baru                                                                                                                                                                                                                                |
| **Kelola Hero/Home**     | Edit judul, subjudul, gambar hero, teks highlight                                                                                                                                                                                                                                |
| **Kelola About**         | Edit teks about, gambar                                                                                                                                                                                                                                                          |
| **Kelola Produk (CRUD)** | Tambah/edit/hapus produk: nama, slug (auto-generate dari nama, bisa diedit), deskripsi singkat, deskripsi lengkap, fitur (list dinamis, bisa tambah/hapus item), upload gambar (bisa lebih dari 1 untuk galeri), urutan tampil (drag-order boleh skip, cukup input angka urutan) |
| **Kelola Pesan Kontak**  | Lihat daftar pesan yang masuk dari form kontak, tandai sudah dibaca, hapus                                                                                                                                                                                                       |
| **Ganti Password Admin** | Fitur dasar untuk ganti password sendiri                                                                                                                                                                                                                                         |

### 4.3 User Stories (contoh, jadikan acuan skenario testing)

- Sebagai **pengunjung**, saya ingin melihat daftar produk Pyxis di halaman utama supaya saya cepat tahu apa yang ditawarkan.
- Sebagai **pengunjung**, saya ingin mengisi form kontak supaya tim Pyxis bisa menghubungi saya kembali.
- Sebagai **admin**, saya ingin login ke dashboard supaya saya bisa mengubah konten website.
- Sebagai **admin**, saya ingin menambah produk baru beserta fitur-fiturnya tanpa perlu bantuan developer.
- Sebagai **admin**, saya ingin melihat pesan yang masuk dari pengunjung supaya saya bisa follow up leads.

## 5. Out of Scope (TIDAK dikerjakan pada versi ini)

Untuk menjaga project selesai dalam 1 bulan solo, hal-hal berikut **sengaja tidak dikerjakan**:

- ❌ Multi-bahasa (i18n) — cukup Bahasa Indonesia saja
- ❌ Multi-admin dengan role berbeda (editor, superadmin, dll) — cukup 1 role admin
- ❌ Blog/artikel/news section
- ❌ Sistem pembayaran/e-commerce
- ❌ Live chat
- ❌ Integrasi email otomatis (notifikasi email saat ada pesan masuk) — cukup tersimpan di database, dibaca manual di dashboard
- ❌ Dark mode
- ❌ Testimoni klien dengan sistem rating — kalau ada waktu lebih boleh ditambahkan sebagai stretch goal, bukan prioritas

Jika AI agent menemukan potensi fitur di luar daftar ini selama coding, **jangan dikerjakan otomatis** — catat sebagai usulan di `TASKS.md` bagian "Backlog / Stretch Goal" dan tanyakan ke user.

## 6. Kriteria Sukses (Acceptance Criteria)

Project dianggap selesai dan siap dipakai jika:

1. Semua halaman publik di 4.1 bisa diakses dan menampilkan data dari database (bukan hardcode).
2. Admin bisa login, dan hanya admin yang bisa akses `/admin/*`.
3. Admin bisa CRUD produk penuh (create, read, update, delete) dan perubahan langsung terlihat di halaman publik tanpa deploy ulang.
4. Form kontak berhasil menyimpan data ke database dan muncul di dashboard admin.
5. Website responsif di layar HP (min. lebar 360px), tablet, dan desktop.
6. Website ter-deploy di Vercel dengan domain/subdomain yang bisa diakses publik.
7. Tidak ada error console di browser pada kondisi normal.
8. Loading halaman utama di bawah ~2-3 detik pada koneksi normal (optimasi gambar Next.js `<Image>` dipakai).

## 7. Prioritas Jika Waktu Mepet

Kalau di minggu ke-4 waktu tidak cukup, urutan prioritas pemotongan fitur (dari yang paling boleh dikorbankan dulu):

1. Galeri multi-gambar produk → cukup 1 gambar per produk
2. Embed Google Maps di halaman kontak
3. Fitur "tandai sudah dibaca" pada pesan kontak → cukup list biasa
4. Ganti password admin dari dashboard → cukup lewat database manual/Prisma Studio

**Yang TIDAK BOLEH dipotong** (inti dari "dinamis"): CRUD produk, form kontak tersimpan ke DB, login admin.
