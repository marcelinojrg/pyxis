import type { FC } from 'react';
import { Container } from '@/components/ui/container';

export interface PartnersHeroProps {
  title?: string;
  description?: string;
}

export const PartnersHero: FC<PartnersHeroProps> = ({
  title = 'Kemitraan Pyxis',
  description = 'Berkolaborasi untuk menghadirkan teknologi hospitality terbaik melalui integrasi yang mulus dan solusi inovatif.',
}) => {
  return (
    <section className="relative flex items-center justify-center pt-36 pb-20 md:pt-48 md:pb-28 min-h-[95vh] bg-gradient-to-r from-[#001A53] to-[#004AEB] text-white overflow-hidden">
      <Container className="text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold font-heading text-white leading-[1.18] tracking-tight">
            {title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
      </Container>
    </section>
  );
};
