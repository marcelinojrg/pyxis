import type { FC } from 'react';
import { Container } from '@/components/ui/container';

export const CareerHero: FC = () => {
  return (
    <section className="relative flex items-center justify-center pt-36 pb-20 md:pt-48 md:pb-28 min-h-[70vh] bg-gradient-to-r from-[#001A53] to-[#004AEB] text-white overflow-hidden">
      <Container className="text-center relative z-10">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold uppercase tracking-wider">
            Karir & Kesempatan
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold font-heading text-white leading-[1.18] tracking-tight">
            Tumbuh dan Berkarya Bersama Pyxis
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Bergabunglah dengan tim talenta hebat dalam menciptakan solusi software hospitality masa
            depan Indonesia.
          </p>
        </div>
      </Container>
    </section>
  );
};
