import type { Metadata } from 'next';
import Image from 'next/image';
import { AboutProfile } from '@/app/(root)/_components/about/AboutProfile';
import { AboutVisionMission } from '@/app/(root)/_components/about/AboutVisionMission';
import { AboutContact } from '@/app/(root)/_components/about/AboutContact';
import CTASection from '@/components/Common/CTASection';
import EditorialHero from '@/components/Common/EditorialHero';

export const metadata: Metadata = {
  title: 'About Pyxis — PT. Pyxis Ultimate Solution',
  description:
    'Pyxis develops integrated hospitality technology for hotels, restaurants, and connected operations.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Pyxis — PT. Pyxis Ultimate Solution',
    description:
      'Pyxis develops integrated hospitality technology for hotels, restaurants, and connected operations.',
  },
};

export default function AboutPage() {
  return (
    <div className="flex w-full flex-col">
      <EditorialHero
        eyebrow="About Pyxis"
        title="Technology built around hospitality."
        description="Pyxis develops connected hotel and restaurant systems that help hospitality teams operate with clarity, consistency, and confidence."
        ctaText="Talk to our team"
        ctaHref="/contact"
      >
        <figure>
          <div className="relative aspect-[4/3] overflow-hidden border border-white/25 bg-blue-950/30">
            <Image
              src="/assets/img/about-pyxis-journey.jpg"
              alt="Hospitality technology team collaborating in a meeting"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
              priority
            />
          </div>
          <figcaption className="flex items-center justify-between gap-4 border-b border-white/25 py-3 text-xs text-blue-100/80">
            <span>People behind the platform</span>
            <span>Malang, Indonesia</span>
          </figcaption>
        </figure>
      </EditorialHero>

      <AboutProfile />
      <AboutVisionMission />
      <AboutContact />
      <CTASection />
    </div>
  );
}
