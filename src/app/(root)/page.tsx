import type { Metadata } from 'next';
// import { getHeroSection } from '@/lib/queries/home';
import { prisma } from '@/lib/prisma';
import HomeHero from './_components/home/HomeHero';
import HomePartnersBar from './_components/home/HomePartnersBar';
import HomeFeatures from './_components/home/HomeFeatures';
import HomeAboutSummary from './_components/home/HomeAboutSummary';
import HomeVisionMission from './_components/home/HomeVisionMission';
import HomeEvolution from './_components/home/HomeEvolution';
import HomeCTA from './_components/home/HomeCTA';

// export async function generateMetadata(): Promise<Metadata> {
//   const seo = await prisma.pageSeo.findUnique({
//     where: { pageKey: 'home' },
//   });

//   return {
//     title: seo?.metaTitle || 'Pyxis — Kelola Hotel Anda dengan Lebih Cerdas & Mudah',
//     description:
//       seo?.metaDescription ||
//       'Pyxis membantu Anda meningkatkan efisiensi operasional, memaksimalkan pendapatan, dan memberikan pengalaman tamu yang tak terlupakan melalui satu platform terpadu.',
//     openGraph: {
//       title: seo?.metaTitle || 'Pyxis — Kelola Hotel Anda dengan Lebih Cerdas & Mudah',
//       description:
//         seo?.metaDescription ||
//         'Sistem manajemen properti terdepan untuk industri perhotelan modern.',
//       images: seo?.ogImageUrl ? [seo.ogImageUrl] : [],
//     },
//     robots: {
//       index: !seo?.noIndex,
//       follow: !seo?.noIndex,
//     },
//   };
// }

export default async function HomePage() {
  // const heroData = await getHeroSection();

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
      <HomeCTA />
    </div>
  );
}
