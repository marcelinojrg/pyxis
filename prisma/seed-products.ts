import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is not set');

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

const HERO_IMAGE = '/assets/img/home-hero-ilustrasi.jpg';
const CAPABILITY_IMAGE = '/assets/img/home-hero-pyxis.webp';

async function main() {
  console.log('Seeding product detail...');
  await prisma.product.deleteMany();

  await prisma.product.create({
    data: {
      slug: 'alcor-pms',
      name: 'Property Management System',
      description:
        'Kelola seluruh operasional hotel Anda dengan satu platform intuitif untuk meningkatkan efisiensi dan pengalaman tamu yang superior.',
      image: HERO_IMAGE,
      featureSubtitle:
        'Modul komprehensif yang dirancang untuk merampingkan setiap aspek operasional harian hotel Anda.',
      benefits: {
        create: [
          {
            title: 'Improve Guest Satisfaction',
            description:
              'Tingkatkan kepuasan tamu dengan layanan yang cepat dan personal melalui sistem yang terintegrasi.',
            icon: 'smile',
            order: 1,
          },
          {
            title: 'Maximize Occupancy',
            description:
              'Optimalkan tingkat hunian kamar Anda dengan manajemen ketersediaan yang akurat dan real-time.',
            icon: 'trending-up',
            order: 2,
          },
          {
            title: 'Real-time Data Insights',
            description:
              'Maksimalkan pendapatan dengan wawasan data operasional yang dapat dipantau setiap saat.',
            icon: 'chart',
            order: 3,
          },
        ],
      },
      features: {
        create: [
          {
            title: 'Room Management',
            description:
              'Pantau status kamar real-time dan sinkronisasi otomatis dengan tim housekeeping untuk alokasi yang efisien.',
            icon: 'door',
            order: 1,
          },
          {
            title: 'Guest Profiles',
            description:
              'Kelola preferensi dan riwayat kunjungan tamu untuk memberikan layanan personal yang meningkatkan loyalitas.',
            icon: 'users',
            order: 2,
          },
          {
            title: 'Reservation Management',
            description:
              'Proses pemesanan cepat dengan modifikasi mudah dan sistem pembayaran terpusat yang aman.',
            icon: 'calendar',
            order: 3,
          },
          {
            title: 'Housekeeping',
            description:
              'Otomatisasi jadwal pembersihan dan pelaporan status kamar untuk produktivitas staf yang lebih tinggi.',
            icon: 'home',
            order: 4,
          },
          {
            title: 'Front Desk Operations',
            description:
              'Check-in/check-out mulus dan koordinasi antar departemen yang terintegrasi dalam satu dasbor kendali.',
            icon: 'headset',
            order: 5,
          },
          {
            title: 'Billing & Invoicing',
            description:
              'Tagihan terpadu dari seluruh POS dan manajemen faktur perusahaan yang akurat dan otomatis.',
            icon: 'receipt',
            order: 6,
          },
        ],
      },
      capabilities: {
        create: {
          title: 'System Capabilities',
          description:
            'Dibangun dengan arsitektur cloud terdesentralisasi, Pyxis PMS menawarkan keandalan dan skalabilitas tingkat enterprise untuk memastikan operasional hotel Anda tidak pernah terhenti.',
          imageUrl: CAPABILITY_IMAGE,
          items: {
            create: [
              {
                title: 'Cloud Infrastructure',
                description: 'Uptime 99.9% dengan redundansi global.',
                icon: 'cloud',
                order: 1,
              },
              {
                title: 'Real-time Sync',
                description: 'Sinkronisasi instan di seluruh modul dan perangkat.',
                icon: 'sync',
                order: 2,
              },
              {
                title: 'Extensive Integrations',
                description: '50+ integrasi pihak ketiga untuk channel manager, IoT, dan lainnya.',
                icon: 'integration',
                order: 3,
              },
              {
                title: 'Enterprise Security',
                description: 'Keamanan data standar industri dan backup berkala.',
                icon: 'shield',
                order: 4,
              },
            ],
          },
        },
      },
    },
  });

  console.log('Done. Products:', await prisma.product.count());
}

main()
  .catch((error) => {
    console.error('Product seed failed:', error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
