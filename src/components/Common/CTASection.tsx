import type { FC } from 'react';
import type { Route } from 'next';
import Link from 'next/link';

export interface CTASectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export const CTASection: FC<CTASectionProps> = ({
  title = 'Saatnya Bergabung',
  description = 'Perkembangan teknologi begitu cepat dan perusahaan atau platform baru bermunculan setiap saat. Pyxis memberikan salah satu solusi terbaik untuk mengelola properti Anda dengan lebih cerdas.',
  buttonText = 'Hubungi Tim Kami',
  buttonHref = '/contact',
}) => {
  return (
    <section className="relative py-16 overflow-hidden bg-[#0A1222] text-white">
      {/* Background Architectural Overlay Gradient */}
      <div className="absolute inset-0 bg-linear-to-r from-[#0B1E48]/80 via-[#0A1222]/95 to-[#050B14] -z-10" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="rounded-3xl bg-[#111C33] border border-white/10 p-8 sm:p-12 md:p-14 max-w-5xl mx-auto shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-left">
            <h2
              data-home-reveal="heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-white leading-tight"
            >
              {title}
            </h2>
            <p
              data-home-reveal="copy"
              className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-xl"
            >
              {description}
            </p>
          </div>

          <div data-home-reveal="cta" className="shrink-0 w-full md:w-auto">
            <Link
              href={buttonHref as Route}
              className="inline-flex items-center justify-center w-full md:w-auto px-7 py-3 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-neutral-950 font-bold text-sm transition-all duration-200 shadow-lg active:scale-95 text-center"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
