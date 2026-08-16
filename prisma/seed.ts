import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

import bcrypt from 'bcryptjs';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is not set');

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  // Seed admin with hashed password
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@pyxis.co.id';
  const rawPassword = process.env.ADMIN_PASSWORD || 'admin';
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Administrator',
    },
  });

  console.log('✅ Admin seeded:', admin.email);

  // Seed initial singleton rows
  const siteSettings = await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      companyName: 'PT. Pyxis Ultimate Solution',
      address: 'Malang, Indonesia',
      phone: '+62 341 123456',
      email: 'info@pyxis.co.id',
      footerText: '© 2024 PT. Pyxis Ultimate Solution. All rights reserved.',
      defaultMetaTitle: 'Company Profile Dinamis - PT. Pyxis Ultimate Solution',
      defaultMetaDescription: 'Solutions hotel dan restoran dengan Alcor PMS dan Alcor POS',
      defaultOgImageUrl: '',
    },
  });

  console.log('✅ SiteSettings seeded');

  const heroSection = await prisma.heroSection.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: 'Solusi Hotel & Restoran Terpercaya',
      subtitle:
        'Transformasikan operasional bisnis Anda dengan system modern yang efficient dan scalable',
      imageUrl: '',
      ctaLabel: 'Lihat Produk',
      ctaUrl: '/produk',
    },
  });

  console.log('✅ HeroSection seeded');

  const aboutContent = await prisma.aboutContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: 'Tentang Kami',
      content:
        'PT. Pyxis Ultimate Solution adalah perusahaan software yang berfokus pada solusi untuk hotel dan restoran.',
      vision: 'Menjadi partner teknologi terbaik untuk sektor hospitality Indonesia.',
      mission: 'Menghadirkan solusi software yang practical, user-friendly, dan cost-effective.',
      officeAddress: 'Malang, Indonesia',
    },
  });

  console.log('✅ AboutContent seeded');

  const partnersPageContent = await prisma.partnersPageContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      heroTitle: 'Bergabunglah Bersama Kami',
      heroSubtitle:
        'Mari berkolaborasi untuk menciptakan solusi yang lebih baik untuk kebutuhan bisnis Anda',
      ctaLabel: 'Ajukan Kemitraan',
    },
  });

  console.log('✅ PartnersPageContent seeded');

  const legalContent = await prisma.legalContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      privacyPolicy: '',
      termsOfService: '',
      cookiePolicy: '',
    },
  });

  console.log('✅ LegalContent seeded');

  const careerContent = await prisma.careerContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      description: '',
      hasOpenPositions: false,
      openPositionsText: '',
      applyEmail: 'careers@pyxis.co.id',
    },
  });

  console.log('✅ CareerContent seeded');

  // Seed default hero highlights
  const highlights = [
    {
      id: 1,
      title: 'Customizable Solutions',
      description: 'Solusi yang bisa disesuaikan dengan kebutuhan unik bisnis Anda',
      iconKey: 'settings',
      order: 1,
    },
    {
      id: 2,
      title: 'User-Friendly Interface',
      description: 'Desain intuitif mudah dibingkai tanpa pelatihan berat',
      iconKey: 'users',
      order: 2,
    },
    {
      id: 3,
      title: '24/7 Support',
      description: 'Tim support siap membantu kapan saja',
      iconKey: 'help-circle',
      order: 3,
    },
  ];

  for (const highlight of highlights) {
    await prisma.homeHighlight.upsert({
      where: { id: highlight.id },
      update: {},
      create: highlight,
    });
  }

  console.log('✅ HomeHighlights seeded');

  // Seed Alcor PMS and Alcor POS as dummy products
  const alcorPms = await prisma.product.upsert({
    where: { slug: 'alcor-pms' },
    update: {},
    create: {
      name: 'Alcor PMS',
      slug: 'alcor-pms',
      shortDesc: 'Property Management System untuk hotel modern',
      fullDesc:
        'Alcor PMS adalah solution all-in-one untuk hotel. Mendukung reservation management, housekeeping, house-admin, finance, F&B, dan integrasi payment gateway.',
      features: [
        'Reservation management',
        'Housekeeping scheduling',
        'Dashboard real-time',
        'Integrasi payment gateway',
        'Multi-property support',
      ],
      imageUrl: '',
      galleryUrls: [],
      order: 1,
      isFeatured: true,
      isPublished: true,
    },
  });

  const alcorPos = await prisma.product.upsert({
    where: { slug: 'alcor-pos' },
    update: {},
    create: {
      name: 'Alcor POS',
      slug: 'alcor-pos',
      shortDesc: 'Point of Sales solution untuk restoran dan café',
      fullDesc:
        'Alcor POS membantu restoran menyederhanakan operasional seperti order, payment tracking, inventory management, dan reports.',
      features: [
        'Quick menu navigation',
        'Multiple payment methods',
        'Inventory tracking',
        'Sales & profit reports',
        'Kitchen display system',
      ],
      imageUrl: '',
      galleryUrls: [],
      order: 2,
      isFeatured: true,
      isPublished: true,
    },
  });

  console.log('✅ Products seeded:', alcorPms.name, alcorPos.name);

  console.log('\n✨ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
