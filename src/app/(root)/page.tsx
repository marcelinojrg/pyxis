import HomeHero from './_components/home/HomeHero';
import HomePartnersBar from './_components/home/HomePartnersBar';
import HomeFeatures from './_components/home/HomeFeatures';
import HomeAboutSummary from './_components/home/HomeAboutSummary';
import HomeVisionMission from './_components/home/HomeVisionMission';
import HomeEvolution from './_components/home/HomeEvolution';
import CTASection from '@/components/Common/CTASection';

export default async function HomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Section */}
      <HomeHero />

      {/* 2. Client / Partner Logos Bar */}
      <HomePartnersBar />

      {/* 3. Features Grid: Fitur Lengkap untuk Segala Kebutuhan */}
      <HomeFeatures />

      {/* 4. About Summary: Tentang Pyxis & 4 Milestone Cards */}
      <HomeAboutSummary />

      {/* 5. Vision & Mission: Visi & Misi Perjalanan Kami */}
      <HomeVisionMission />

      {/* 6. Product Evolution: Evolusi Produk Kami (Nodes 1-5) */}
      <HomeEvolution />

      {/* 7. Conversion CTA: Saatnya Bergabung */}
      <CTASection />
    </div>
  );
}
