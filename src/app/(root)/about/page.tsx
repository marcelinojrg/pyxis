import type { Metadata } from 'next';
import { AboutHero } from '@/app/(root)/_components/about/AboutHero';
import { AboutProfile } from '@/app/(root)/_components/about/AboutProfile';
import { AboutVisionMission } from '@/app/(root)/_components/about/AboutVisionMission';
import { AboutContact } from '@/app/(root)/_components/about/AboutContact';
import AboutCTA from '@/app/(root)/_components/about/AboutCTA';

export const metadata: Metadata = {
  title: 'Tentang Kami — PT. Pyxis Ultimate Solution',
  description:
    'PT PYXIS Ultimate Solution menyediakan infrastruktur digital inovatif untuk membantu bisnis Anda tetap unggul.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'Tentang Kami — PT. Pyxis Ultimate Solution',
    description:
      'PT PYXIS Ultimate Solution menyediakan infrastruktur digital inovatif untuk membantu bisnis Anda tetap unggul.',
  },
};

export default function AboutPage() {
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
