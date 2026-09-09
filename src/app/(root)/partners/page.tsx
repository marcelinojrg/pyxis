import type { Metadata } from 'next';
import Image from 'next/image';
import { PartnersBenefits } from '@/app/(root)/_components/partners/PartnersBenefits';
import { PartnersInterfacing } from '@/app/(root)/_components/partners/PartnersInterfacing';
import { PartnerLogoMarquee } from '@/app/(root)/_components/partners/PartnerLogoMarquee';
import CTASection from '@/components/Common/CTASection';
import EditorialHero from '@/components/Common/EditorialHero';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Partners - Pyxis Hospitality Technology',
  description:
    'Explore the technology ecosystem connected to Pyxis hospitality systems across hotels and restaurants.',
  alternates: { canonical: '/partners' },
};

const FEATURED_PARTNER_NAMES = ['SiteMinder', 'Bonwin', 'LG', 'Panasonic', 'VingCard', 'STAAH'];

export default async function PartnersPage() {
  const partners = await prisma.partner.findMany({
    where: { isActive: true },
    select: { name: true, image: true },
    orderBy: { order: 'asc' },
  });
  const featuredPartners = FEATURED_PARTNER_NAMES.map((name) =>
    partners.find((partner) => partner.name === name)
  ).filter((partner): partner is (typeof partners)[number] => Boolean(partner));

  return (
    <div className="flex min-h-screen flex-col">
      <EditorialHero
        eyebrow="Partners"
        title="Better hospitality, connected."
        description="Pyxis connects hotel management systems with the technology partners that keep hospitality operations running."
        ctaText="Become a partner"
        ctaHref="/contact"
      >
        <div className="border border-white/25 bg-white text-neutral-900">
          <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500 sm:px-6">
            <span>Connected ecosystem</span>
            <span className="text-[#1D4ED8]">50+ partners</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3">
            {featuredPartners.map((partner) => (
              <div
                key={partner.name}
                className="flex h-24 items-center justify-center border-b border-r border-neutral-200 px-4 last:border-r-0 sm:h-28"
              >
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={112}
                  height={56}
                  className="max-h-10 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </EditorialHero>

      <PartnersBenefits />
      <PartnersInterfacing />
      <section className="border-t border-neutral-200/70 bg-white py-20 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="max-w-2xl text-3xl font-bold leading-[1.08] tracking-tight text-neutral-900 sm:text-4xl">
                Technology partners, connected through Pyxis.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-neutral-600">
                Explore the partners that extend Pyxis across the hospitality operation.
              </p>
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1D4ED8] lg:col-span-5 lg:text-right">
              50+ technology partners
            </p>
          </div>

          <div className="mt-12 border-y border-neutral-300 py-4">
            <PartnerLogoMarquee partners={partners} size="large" />
          </div>
        </div>
      </section>
      <CTASection
        title="Build the next hospitality connection"
        description="Tell us what your technology needs to connect. We will help you find the right path into the Pyxis ecosystem."
        buttonText="Talk to Our Team"
      />
    </div>
  );
}
