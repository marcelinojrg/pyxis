import { genPageMetadata } from '@/app/seo';
import PageHero from '@/components/Common/PageHero';
import { PartnersBenefits } from '@/app/(root)/_components/partners/PartnersBenefits';
import { PartnersInterfacing } from '@/app/(root)/_components/partners/PartnersInterfacing';
import CTASection from '@/components/Common/CTASection';

export const metadata = genPageMetadata({
  title: 'Kemitraan — Integrasi & Ekosistem Mitra PT. Pyxis Ultimate Solution',
  description:
    'Bergabung dalam ekosistem kemitraan PT. Pyxis Ultimate Solution: integrasi channel manager, keylock system, POS, hardware, dan teknologi IoT perhotelan.',
  path: '/partners',
});

export default function PartnersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Kemitraan Pyxis"
        description="Berkolaborasi untuk menghadirkan teknologi hospitality terbaik melalui integrasi yang mulus dan solusi inovatif."
      />
      <PartnersBenefits />
      <PartnersInterfacing />
      <CTASection />
    </div>
  );
}
