import type { FC } from 'react';
import { Container } from '@/components/ui/container';

export interface AboutHeroProps {
  title: string;
  content?: string | null;
  imageUrl?: string | null;
}

export const AboutHero: FC<AboutHeroProps> = ({ title, content }) => {
  return (
    <section className="relative flex items-center pt-36 pb-20 md:pt-48 md:pb-28 min-h-[95vh] bg-gradient-to-b from-[#001A53] to-[#004AEB] text-white overflow-hidden">
      {/* Subtle grid pattern overlay */}
      <div className="" />

      <Container className="relative z-10 w-full">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold font-heading text-white leading-[1.18] tracking-tight">
            {title}
          </h1>

          {content && (
            <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
              {content}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
};
