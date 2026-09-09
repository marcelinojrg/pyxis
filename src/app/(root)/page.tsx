import HomeHero from './_components/home/HomeHero';
import HomePartnersBar from './_components/home/HomePartnersBar';
import HomeFeatures from './_components/home/HomeFeatures';
import HomeAboutSummary from './_components/home/HomeAboutSummary';
import HomeVisionMission from './_components/home/HomeVisionMission';
import CTASection from '@/components/Common/CTASection';
import { prisma } from '@/lib/prisma';

export default async function HomePage() {
  const partners = await prisma.partner.findMany({
    where: { isActive: true },
    select: { name: true, image: true },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Section */}
      <HomeHero />

      {/* 2. Client / Partner Logos Bar */}
      <HomePartnersBar partners={partners} />

      {/* 3. Features Grid */}
      <HomeFeatures />

      {/* 4. About summary: Pyxis and four milestone cards */}
      <HomeAboutSummary />

      {/* 5. Vision and mission: the Pyxis journey */}
      <HomeVisionMission />

      {/* 6. Conversion CTA */}
      <CTASection spacing="comfortable" />
    </div>
  );
}
