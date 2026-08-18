import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { getAboutContent } from '@/lib/queries/about';
import { getSiteSettings } from '@/lib/queries/site-settings';
import { AboutHero } from '@/app/(root)/_components/AboutHero';
import { AboutProfile } from '@/app/(root)/_components/AboutProfile';
import { AboutVisionMission } from '@/app/(root)/_components/AboutVisionMission';
import { AboutContact } from '@/app/(root)/_components/AboutContact';
import AboutCTA from '@/app/(root)/_components/AboutCTA';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await prisma.pageSeo.findUnique({
    where: { pageKey: 'about' },
  });

  const siteSettings = await getSiteSettings();

  return {
    title:
      seo?.metaTitle ||
      'Tentang Kami — PT. Pyxis Ultimate Solution',
    description:
      seo?.metaDescription ||
      siteSettings?.defaultMetaDescription ||
      'PT PYXIS Ultimate Solution menyediakan infrastruktur digital inovatif untuk membantu bisnis Anda tetap unggul.',
    openGraph: {
      title:
        seo?.metaTitle ||
        'Tentang Kami — PT. Pyxis Ultimate Solution',
      description:
        seo?.metaDescription ||
        siteSettings?.defaultMetaDescription ||
        'PT PYXIS Ultimate Solution menyediakan infrastruktur digital inovatif untuk membantu bisnis Anda tetap unggul.',
      images: seo?.ogImageUrl
        ? [seo.ogImageUrl]
        : siteSettings?.defaultOgImageUrl
          ? [siteSettings.defaultOgImageUrl]
          : [],
    },
    robots: {
      index: !seo?.noIndex,
      follow: !seo?.noIndex,
    },
  };
}

export default async function AboutPage() {
  const [aboutContent, siteSettings] = await Promise.all([getAboutContent(), getSiteSettings()]);

  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Section — Navy gradient with bold heading */}
      <AboutHero
        title="Membangun Masa Depan Teknologi Hospitality"
        content="PT PYXIS Ultimate Solution menyediakan infrastruktur digital inovatif untuk membantu bisnis Anda tetap unggul."
        imageUrl={aboutContent?.imageUrl}
      />

      {/* 2. Our Journey — Image + text + 30+ badge */}
      <AboutProfile
        officeAddress={aboutContent?.officeAddress}
        imageUrl={aboutContent?.imageUrl}
      />

      {/* 3. Vision & Mission + Evolusi Produk side-by-side */}
      <AboutVisionMission vision={aboutContent?.vision} mission={aboutContent?.mission} />

      {/* 4. Lokasi Kami — Two company contact cards */}
      <AboutContact
        companyName={siteSettings?.companyName}
        address={siteSettings?.address}
        phone={siteSettings?.phone}
        email={siteSettings?.email}
        officeAddress={aboutContent?.officeAddress}
      />

      {/* 5. CTA — Saatnya Bergabung */}
      <AboutCTA />
    </div>
  );
}
