import {
  heroSchema,
  aboutSchema,
  productSchema,
  partnerSchema,
  partnerBenefitSchema,
  partnersPageContentSchema,
  legalSchema,
  careerSchema,
  contactSchema,
  siteSettingsSchema,
  seoSchema,
} from '../src/validations';
import { isRateLimited } from '../src/lib/rate-limit';

async function testPhase4() {
  console.log('🧪 Testing Phase 4 Validation Schemas and Logic...\n');

  // 1. Hero Schema
  const validHero = heroSchema.safeParse({
    title: 'Solusi Hotel Modern',
    subtitle: 'Alcor PMS & POS',
    imageUrl: 'https://example.com/banner.webp',
    ctaLabel: 'Hubungi Kami',
    ctaUrl: '/kontak',
  });
  if (!validHero.success) throw new Error('Hero schema validation failed on valid data');
  console.log('✅ 1. Hero schema valid data passed');

  const invalidHero = heroSchema.safeParse({ title: '' });
  if (invalidHero.success) throw new Error('Hero schema accepted empty title');
  console.log('✅ 1b. Hero schema invalid data correctly rejected');

  // 2. About Schema
  const validAbout = aboutSchema.safeParse({
    title: 'Tentang Pyxis',
    content: 'Sejarah transformasi dari MYOH ke Pyxis',
    vision: 'Visi terbaik',
    mission: 'Misi terbaik',
  });
  if (!validAbout.success) throw new Error('About schema validation failed on valid data');
  console.log('✅ 2. About schema valid data passed');

  // 3. Product Schema
  const validProduct = productSchema.safeParse({
    name: 'Alcor PMS',
    slug: 'alcor-pms',
    shortDesc: 'Sistem hotel',
    fullDesc: 'Deskripsi lengkap',
    features: ['Fitur 1', 'Fitur 2'],
    isFeatured: true,
    isPublished: true,
  });
  if (!validProduct.success) throw new Error('Product schema validation failed on valid data');
  console.log('✅ 3. Product schema valid data passed');

  const invalidSlug = productSchema.safeParse({
    name: 'Bad Slug',
    slug: 'Bad Slug With Spaces!',
    shortDesc: 'Short',
    fullDesc: 'Full',
  });
  if (invalidSlug.success) throw new Error('Product schema accepted invalid slug');
  console.log('✅ 3b. Product schema rejected invalid slug');

  // 4. Partner Schemas
  const validPartner = partnerSchema.safeParse({
    name: 'Partner A',
    category: 'Payment Gateway',
    description: 'Integrasi pembayaran',
  });
  if (!validPartner.success) throw new Error('Partner schema validation failed');

  const validBenefit = partnerBenefitSchema.safeParse({
    title: 'Revenue Share',
    description: 'Komisi menarik',
    order: 1,
  });
  if (!validBenefit.success) throw new Error('PartnerBenefit schema validation failed');

  const validPartnerPage = partnersPageContentSchema.safeParse({
    heroTitle: 'Mitra Pyxis',
    ctaLabel: 'Gabung Mitra',
  });
  if (!validPartnerPage.success) throw new Error('PartnersPageContent schema validation failed');
  console.log('✅ 4. Partner schemas passed');

  // 5. Legal Schema
  const validLegal = legalSchema.safeParse({
    privacyPolicy: 'Kebijakan privasi...',
    termsOfService: 'Syarat dan ketentuan...',
  });
  if (!validLegal.success) throw new Error('Legal schema validation failed');
  console.log('✅ 5. Legal schema passed');

  // 6. Career Schema
  const validCareer = careerSchema.safeParse({
    description: 'Kultur kerja di Pyxis',
    hasOpenPositions: true,
    openPositionsText: 'Software Engineer',
    applyEmail: 'career@pyxis.co.id',
  });
  if (!validCareer.success) throw new Error('Career schema validation failed');
  console.log('✅ 6. Career schema passed');

  // 7. Contact Schema
  const validContact = contactSchema.safeParse({
    name: 'Budi Santoso',
    email: 'budi@hotel.com',
    phone: '08123456789',
    message: 'Saya ingin demo Alcor PMS',
    source: 'general',
  });
  if (!validContact.success) throw new Error('Contact schema validation failed');
  console.log('✅ 7. Contact schema passed');

  const invalidContactEmail = contactSchema.safeParse({
    name: 'Budi',
    email: 'not-an-email',
    message: 'Halo',
  });
  if (invalidContactEmail.success) throw new Error('Contact schema accepted invalid email');
  console.log('✅ 7b. Contact schema rejected invalid email');

  // 8. Site Settings Schema
  const validSettings = siteSettingsSchema.safeParse({
    companyName: 'PT. Pyxis Ultimate Solution',
    email: 'info@pyxis.co.id',
    phone: '+6234112345',
  });
  if (!validSettings.success) throw new Error('Site settings schema validation failed');
  console.log('✅ 8. Site Settings schema passed');

  // 9. SEO Schema
  const validSeo = seoSchema.safeParse({
    pageKey: 'home',
    metaTitle: 'Home | Pyxis',
    metaDescription: 'Solusi hotel dan restoran',
    noIndex: false,
  });
  if (!validSeo.success) throw new Error('SEO schema validation failed');
  console.log('✅ 9. SEO schema passed');

  // 10. Rate Limiter Test
  const testKey = 'test_ip_123';
  let blocked = false;
  for (let i = 0; i < 6; i++) {
    if (isRateLimited(testKey, 5, 1000)) {
      blocked = true;
      break;
    }
  }
  if (!blocked) throw new Error('Rate limiter failed to block 6th request with limit 5');
  console.log('✅ 10. Rate limiter correctly blocked excessive requests');

  console.log('\n🎉 ALL PHASE 4 VALIDATION & LOGIC TESTS PASSED!');
}

testPhase4().catch((err) => {
  console.error('❌ Phase 4 test failed:', err);
  process.exit(1);
});
