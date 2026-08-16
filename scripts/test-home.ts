import 'dotenv/config';
import { getHeroSection, getHomeHighlights } from '../src/lib/queries/home';
import { getFeaturedProducts } from '../src/lib/queries/products';
import { prisma } from '../src/lib/prisma';

async function testHome() {
  console.log('🧪 Testing Home page data queries and integration...\n');

  const [hero, highlights, featured] = await Promise.all([
    getHeroSection(),
    getHomeHighlights(),
    getFeaturedProducts(),
  ]);

  if (!hero) throw new Error('Hero section query returned null');
  console.log('✅ 1. Hero query returned data:', hero.title);

  if (!highlights || highlights.length === 0) throw new Error('Highlights query returned empty');
  console.log(`✅ 2. Highlights query returned ${highlights.length} items`);

  if (!featured || featured.length === 0) throw new Error('Featured products query returned empty');
  console.log(
    `✅ 3. Featured products query returned ${featured.length} items (${featured.map((p) => p.name).join(', ')})`
  );

  console.log('\n🎉 ALL HOME PAGE DATA INTEGRATION TESTS PASSED!');
}

testHome()
  .catch((err) => {
    console.error('❌ Home test failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
