import { PartnerLogoMarquee } from '../partners/PartnerLogoMarquee';
import type { PartnerLogo } from '../partners/PartnerLogoMarquee';

export default function HomePartnersBar({ partners }: { partners: PartnerLogo[] }) {
  return (
    <section className="border-b border-neutral-100 bg-white py-12 sm:py-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center space-y-6">
          <div
            data-home-reveal="heading"
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500 sm:text-xs"
          >
            <span>Trusted by</span>
            <strong className="text-[#1D4ED8]">900+ hotels & restaurants</strong>
            <span>Integrated with</span>
            <strong className="text-neutral-900">50+ partners</strong>
          </div>

          <PartnerLogoMarquee partners={partners} className="-mx-4 sm:-mx-6 md:-mx-8" />
        </div>
      </div>
    </section>
  );
}
