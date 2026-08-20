import type { Metadata } from 'next';
// import { prisma } from '@/lib/prisma';
// import { getAboutContent } from '@/lib/queries/about';
// import { getSiteSettings } from '@/lib/queries/site-settings';
import { AboutHero } from '@/app/(root)/_components/AboutHero';
import { AboutProfile } from '@/app/(root)/_components/AboutProfile';
import { AboutVisionMission } from '@/app/(root)/_components/AboutVisionMission';
import { AboutContact } from '@/app/(root)/_components/AboutContact';
import AboutCTA from '@/app/(root)/_components/AboutCTA';

export function generateMetadata(): Metadata {
  const title = 'Tentang Kami — PT. Pyxis Ultimate Solution';
  const description =
    'PT PYXIS Ultimate Solution menyediakan infrastruktur digital inovatif untuk membantu bisnis Anda tetap unggul.';

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default function AboutPage() {
  // const [aboutContent, siteSettings] = await Promise.all([getAboutContent(), getSiteSettings()]);

  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Section — Navy gradient with bold heading */}
      <AboutHero
        title="Membangun Masa Depan Teknologi Hospitality"
        content="PT PYXIS Ultimate Solution menyediakan infrastruktur digital inovatif untuk membantu bisnis Anda tetap unggul."
      />

      {/* 2. Our Journey — Image + text + 30+ badge */}
      <AboutProfile />

      {/* 3. Vision & Mission + Evolusi Produk side-by-side */}
      <AboutVisionMission />

      {/* 4. Lokasi Kami — Two company contact cards */}
      <AboutContact />

      {/* 5. CTA — Saatnya Bergabung */}
      <AboutCTA />
    </div>
  );
}
