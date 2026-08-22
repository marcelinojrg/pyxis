import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is not set');

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding products...');

  // upsert = insert kalau belum ada, update kalau sudah (aman dijalankan berulang kali)
  await prisma.product.upsert({
    where: { slug: 'alcor-pms' },
    update: {},
    create: {
      slug: 'alcor-pms',
      name: 'Alcor PMS',
      description:
        'Property Management System untuk operasional hotel: front office, reservasi, housekeeping, dan billing dalam satu platform.',
      benefits: {
        create: [
          {
            title: 'Front Office Terintegrasi',
            description: 'Check-in, check-out, dan manajemen kamar dalam satu layar.',
            order: 1,
          },
          {
            title: 'Laporan Real-time',
            description: 'Okupansi dan pendapatan terpantau kapan saja.',
            order: 2,
          },
        ],
      },
    },
  });
  console.log('✅ Alcor PMS');

  await prisma.product.upsert({
    where: { slug: 'alcor-pos' },
    update: {},
    create: {
      slug: 'alcor-pos',
      name: 'Alcor POS',
      description:
        'Point of Sale untuk restoran dan outlet hotel, terintegrasi langsung dengan tagihan kamar di Alcor PMS.',
    },
  });
  console.log('✅ Alcor POS');

  const total = await prisma.product.count();
  console.log(`\n✨ Selesai! Total produk di database: ${total}`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
