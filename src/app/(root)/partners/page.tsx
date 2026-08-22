import { genPageMetadata } from '@/app/seo';
import { PartnersHero } from '@/app/(root)/_components/PartnersHero';
import { PartnersBenefits } from '@/app/(root)/_components/PartnersBenefits';
import { PartnersInterfacing } from '@/app/(root)/_components/PartnersInterfacing';
import HomeCTA from '@/app/(root)/_components/HomeCTA';

export const metadata = genPageMetadata({
  title: 'Kemitraan — Integrasi & Ekosistem Mitra PT. Pyxis Ultimate Solution',
  description:
    'Bergabung dalam ekosistem kemitraan PT. Pyxis Ultimate Solution: integrasi channel manager, keylock system, POS, hardware, dan teknologi IoT perhotelan.',
});

export default function PartnersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PartnersHero />
      <PartnersBenefits />
      <PartnersInterfacing />
      <HomeCTA />
    </div>
  );
}
