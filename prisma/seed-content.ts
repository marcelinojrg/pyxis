import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is not set');

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// Gambar cover artikel — memakai aset publik yang sudah ada di repository
const COVER_IMAGE = '/assets/img/home-hero-pyxis.webp';

async function getOrCreateArticleCategory(name: string) {
  const existing = await prisma.articleCategory.findFirst({ where: { name } });
  if (existing) return existing;
  return prisma.articleCategory.create({ data: { name } });
}

async function getOrCreateCareerCategory(name: string) {
  const existing = await prisma.careerCategory.findFirst({ where: { name } });
  if (existing) return existing;
  return prisma.careerCategory.create({ data: { name } });
}

async function seedArticles() {
  console.log('🌱 Seeding articles...');

  const categoryTips = await getOrCreateArticleCategory('Tips & Insight');
  const categoryIndustri = await getOrCreateArticleCategory('Industri');

  // Penulis artikel: admin hasil seed.ts (nullable — tetap jalan kalau admin belum ada)
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@pyxis.co.id';
  const admin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!admin) {
    console.warn(
      '⚠️ Admin user belum ada — artikel dibuat tanpa createdBy (jalankan npm run db:seed dulu).'
    );
  }

  await prisma.article.upsert({
    where: { slug: 'cara-pms-meningkatkan-efisiensi-operasional-hotel' },
    update: {},
    create: {
      slug: 'cara-pms-meningkatkan-efisiensi-operasional-hotel',
      title: '5 Cara PMS Meningkatkan Efisiensi Operasional Hotel',
      cover: COVER_IMAGE,
      createdBy: admin ? { connect: { id: admin.id } } : undefined,
      articleCategories: { connect: [{ id: categoryTips.id }] },
      content: `
<p>Property Management System (PMS) bukan lagi sekadar alat tambahan untuk hotel modern — melainkan tulang punggung operasional harian. Dari front office hingga housekeeping, semua departemen bergerak berdasarkan data yang sama. Berikut lima cara Alcor PMS membantu hotel beroperasi lebih efisien.</p>
<h2>1. Satu Data untuk Semua Departemen</h2>
<p>Tidak ada lagi data ganda yang memicu kesalahan input. Status kamar, tarif, dan profil tamu tersimpan dalam satu database yang diakses secara real-time oleh front office, housekeeping, dan manajemen.</p>
<h2>2. Check-in dan Check-out Lebih Cepat</h2>
<p>Proses check-in yang lambat adalah keluhan klasik tamu. Dengan Alcor PMS, petugas front office dapat menemukan reservasi, menyiapkan kamar, dan menyelesaikan administrasi dalam hitungan menit — antrean di lobi pun berkurang.</p>
<h2>3. Housekeeping yang Terkoordinasi</h2>
<p>Status kamar kotor, bersih, dan siap jual diperbarui langsung dari lapangan. Front office tidak lagi menjual kamar yang belum siap, dan tim housekeeping bekerja dengan prioritas yang jelas.</p>
<h2>4. Laporan yang Bisa Diandalkan</h2>
<p>Okupansi, ADR, dan RevPAR dihitung otomatis setiap hari. Manajemen tidak perlu menunggu akhir bulan untuk mengambil keputusan terkait tarif dan promosi.</p>
<h2>5. Integrasi dengan POS dan Channel Manager</h2>
<p>Tagihan restoran dan outlet langsung masuk ke folio tamu, sementara ketersediaan kamar tersinkron ke seluruh channel penjualan. Satu ekosistem, nol duplikasi pekerjaan.</p>
<p>Ingin melihat langsung bagaimana Alcor PMS bekerja untuk hotel Anda? <strong>Hubungi tim Pyxis Ultimate Solution untuk demo gratis.</strong></p>
`.trim(),
    },
  });
  console.log('✅ Artikel: 5 Cara PMS Meningkatkan Efisiensi Operasional Hotel');

  await prisma.article.upsert({
    where: { slug: 'panduan-memilih-sistem-pos-untuk-restoran' },
    update: {},
    create: {
      slug: 'panduan-memilih-sistem-pos-untuk-restoran',
      title: 'Panduan Memilih Sistem POS untuk Restoran',
      cover: COVER_IMAGE,
      createdBy: admin ? { connect: { id: admin.id } } : undefined,
      articleCategories: { connect: [{ id: categoryTips.id }] },
      content: `
<p>Sistem Point of Sale (POS) adalah pusat saraf operasional restoran. Pilihan yang tepat mempercepat layanan dan merapikan laporan; pilihan yang salah justru menambah pekerjaan. Berikut hal-hal yang perlu diperhatikan sebelum memilih sistem POS.</p>
<h2>Kecepatan Transaksi di Jam Sibuk</h2>
<p>Jam makan siang dan malam adalah ujian sesungguhnya. Pastikan sistem POS mampu menerima pesanan dan pembayaran dalam hitungan detik, mendukung split bill, serta tidak bergantung penuh pada koneksi internet.</p>
<h2>Integrasi dengan Sistem Hotel</h2>
<p>Untuk restoran yang berada di dalam hotel, integrasi POS dengan PMS adalah keharusan. Tagihan tamu yang makan di restoran seharusnya otomatis masuk ke folio kamar — tanpa input ulang, tanpa selisih.</p>
<h2>Manajemen Menu yang Fleksibel</h2>
<p>Menu restoran berubah mengikuti musim dan ketersediaan bahan. Sistem POS yang baik memudahkan pengelolaan menu, varian, dan modifier (topping, level pedas, ukuran) tanpa bantuan teknisi.</p>
<h2>Laporan Penjualan Real-time</h2>
<p>Penjualan per outlet, per menu, dan per shift seharusnya bisa dipantau kapan saja. Dari sinilah keputusan promosi, penyesuaian harga, dan evaluasi kinerja staf dibuat berdasarkan data, bukan perkiraan.</p>
<h2>Dukungan dan Keandalan</h2>
<p>Restoran tidak bisa berhenti beroperasi karena gangguan sistem. Pilih penyedia yang memberikan dukungan cepat dan memiliki rekam jejak stabil di industri hospitality.</p>
<p><strong>Alcor POS</strong> dirancang khusus untuk kebutuhan restoran dan outlet hotel di Indonesia — termasuk integrasi penuh dengan Alcor PMS. Jadwalkan demo dengan tim Pyxis untuk melihatnya langsung.</p>
`.trim(),
    },
  });
  console.log('✅ Artikel: Panduan Memilih Sistem POS untuk Restoran');

  await prisma.article.upsert({
    where: { slug: 'tren-teknologi-hospitality-2026' },
    update: {},
    create: {
      slug: 'tren-teknologi-hospitality-2026',
      title: 'Tren Teknologi Hospitality 2026: Dari AI hingga Contactless Check-in',
      cover: COVER_IMAGE,
      createdBy: admin ? { connect: { id: admin.id } } : undefined,
      articleCategories: { connect: [{ id: categoryIndustri.id }] },
      content: `
<p>Industri hospitality terus bergerak cepat. Setelah beberapa tahun fokus pada pemulihan, 2026 menjadi tahun di mana teknologi kembali menjadi pembeda utama antar properti. Berikut tren yang patut diperhatikan pelaku hotel dan restoran.</p>
<h2>AI untuk Personalisasi Tamu</h2>
<p>Kecerdasan buatan mulai dipakai untuk membaca preferensi tamu: dari rekomendasi kamar, penawaran F&amp;B, hingga waktu pengiriman promosi yang paling tepat. Hotel yang memanfaatkan data tamu secara etis akan unggul dalam loyalitas.</p>
<h2>Contactless Check-in dan Pembayaran</h2>
<p>Tamu semakin terbiasa dengan layanan tanpa antre. Check-in mandiri, kunci digital, dan pembayaran QRIS atau e-wallet bukan lagi nilai tambah — melainkan ekspektasi dasar, terutama di segmen milenial dan Gen Z.</p>
<h2>Distribusi Channel yang Semakin Penting</h2>
<p>Ketergantungan pada satu channel penjualan berisiko. Channel manager yang menyinkronkan tarif dan ketersediaan ke banyak OTA secara real-time menjadi investasi wajib agar okupansi stabil tanpa overbooking.</p>
<h2>Data sebagai Aset Strategis</h2>
<p>Laporan okupansi, ADR, dan RevPAR yang akurat dan real-time memungkinkan manajemen mengambil keputusan tarif secara harian. Properti yang masih mengandalkan rekap manual akan semakin tertinggal.</p>
<p>Pyxis Ultimate Solution terus mengembangkan ekosistem Alcor — PMS, POS, dan Channel Manager — agar hotel dan restoran di Indonesia siap menghadapi tren ini. <strong>Mulai konsultasikan kebutuhan properti Anda hari ini.</strong></p>
`.trim(),
    },
  });
  console.log('✅ Artikel: Tren Teknologi Hospitality 2026');
}

async function seedCareers() {
  console.log('🌱 Seeding careers...');

  const categoryEngineering = await getOrCreateCareerCategory('Engineering');
  const categoryDesign = await getOrCreateCareerCategory('Product & Design');
  const categoryOperations = await getOrCreateCareerCategory('Business & Operations');

  await prisma.career.upsert({
    where: { slug: 'senior-full-stack-developer' },
    update: {},
    create: {
      slug: 'senior-full-stack-developer',
      title: 'Senior Full-Stack Developer',
      location: 'Malang, Indonesia',
      type: 'Full-time',
      department: 'Engineering',
      category: { connect: { id: categoryEngineering.id } },
      description:
        'Kami mencari Senior Full-Stack Developer untuk memperkuat tim pengembang produk Alcor — ekosistem software untuk hotel dan restoran (PMS, POS, dan Channel Manager).\n\nAnda akan membangun fitur end-to-end: dari perancangan skema database, server action, hingga antarmuka yang dipakai langsung oleh staf hotel dan restoran di lapangan. Kami bekerja dengan Next.js, TypeScript, dan PostgreSQL, dan mengutamakan kode yang bersih, teruji, dan mudah dipelihara.',
      responsibilities: [
        'Merancang dan membangun fitur baru pada produk Alcor (PMS, POS, Channel Manager) secara end-to-end.',
        'Menulis kode TypeScript yang bersih, teruji, dan mudah dipelihara.',
        'Merancang skema database PostgreSQL dan query yang efisien bersama tim.',
        'Berkolaborasi dengan desainer produk dan tim bisnis untuk menerjemahkan kebutuhan pengguna menjadi solusi teknis.',
        'Melakukan code review dan membimbing developer junior di tim.',
      ],
      requirements: [
        'Pengalaman minimal 3 tahun membangun aplikasi web production dengan React/Next.js dan TypeScript.',
        'Menguasai PostgreSQL dan pengalaman dengan ORM (Prisma menjadi nilai plus).',
        'Memahami pola server action / API dan praktik keamanan aplikasi web.',
        'Terbiasa bekerja dengan git, code review, dan CI/CD.',
        'Nilai plus: pengalaman di domain hospitality, F&B, atau sistem transaksi.',
      ],
      isActive: true,
    },
  });
  console.log('✅ Karir: Senior Full-Stack Developer');

  await prisma.career.upsert({
    where: { slug: 'ui-ux-designer' },
    update: {},
    create: {
      slug: 'ui-ux-designer',
      title: 'UI/UX Designer',
      location: 'Malang, Indonesia',
      type: 'Full-time',
      department: 'Product & Design',
      category: { connect: { id: categoryDesign.id } },
      description:
        'Sebagai UI/UX Designer di Pyxis, Anda merancang pengalaman pengguna untuk dua dunia: situs publik company profile dan dashboard admin yang dipakai setiap hari oleh staf hotel dan restoran.\n\nKami mencari desainer yang peduli pada detail, paham hierarki visual, dan mampu menyederhanakan alur kerja yang kompleks menjadi antarmuka yang mudah digunakan — bahkan oleh pengguna yang tidak terbiasa dengan teknologi.',
      responsibilities: [
        'Merancang alur pengguna dan antarmuka untuk dashboard admin serta halaman publik.',
        'Membuat wireframe, mockup, hingga prototipe interaktif di Figma.',
        'Membangun dan memelihara design system yang konsisten dengan developer.',
        'Melakukan riset dan uji kebergunaan (usability testing) dengan pengguna nyata.',
        'Memastikan desain memenuhi prinsip aksesibilitas dan responsif di berbagai perangkat.',
      ],
      requirements: [
        'Pengalaman minimal 2 tahun sebagai UI/UX Designer (portofolio wajib dilampirkan).',
        'Menguasai Figma dan praktik handoff ke developer.',
        'Memahami dasar HTML/CSS untuk komunikasi efektif dengan tim engineering.',
        'Peka terhadap detail tipografi, warna, dan spacing.',
        'Nilai plus: pengalaman mendesain dashboard atau sistem B2B.',
      ],
      isActive: true,
    },
  });
  console.log('✅ Karir: UI/UX Designer');

  await prisma.career.upsert({
    where: { slug: 'customer-success-specialist' },
    update: {},
    create: {
      slug: 'customer-success-specialist',
      title: 'Customer Success Specialist',
      location: 'Malang, Indonesia',
      type: 'Full-time',
      department: 'Business & Operations',
      category: { connect: { id: categoryOperations.id } },
      description:
        'Customer Success Specialist adalah wajah Pyxis di depan klien: Anda mendampingi hotel dan restoran sejak onboarding, pelatihan, hingga mereka mandiri menggunakan produk Alcor.\n\nPeran ini cocok untuk Anda yang senang berinteraksi dengan orang, paham operasional hotel atau restoran, dan ingin berkarier di persimpangan teknologi dan hospitality.',
      responsibilities: [
        'Melakukan onboarding dan pelatihan produk Alcor kepada klien hotel dan restoran.',
        'Menjadi kontak pertama untuk pertanyaan dan kendala penggunaan produk.',
        'Mengumpulkan feedback klien dan meneruskannya ke tim produk untuk perbaikan.',
        'Menyusun dokumentasi, panduan penggunaan, dan materi pelatihan.',
        'Berkunjung ke lokasi klien untuk implementasi dan pendampingan bila diperlukan.',
      ],
      requirements: [
        'Pengalaman minimal 2 tahun di customer success, implementasi software, atau operasional hotel/restoran.',
        'Kemampuan komunikasi dan presentasi yang sangat baik dalam Bahasa Indonesia.',
        'Mampu menjelaskan konsep teknis dengan bahasa yang sederhana.',
        'Bersedia melakukan perjalanan dinas ke luar kota.',
        'Nilai plus: latar belakang pendidikan atau kerja di bidang perhotelan/pariwisata.',
      ],
      isActive: true,
    },
  });
  console.log('✅ Karir: Customer Success Specialist');
}

async function main() {
  await seedArticles();
  await seedCareers();

  const articles = await prisma.article.count();
  const careers = await prisma.career.count();
  console.log(`\n✨ Selesai! Total artikel: ${articles} | Total lowongan: ${careers}`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
