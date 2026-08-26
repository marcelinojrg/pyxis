import type { FC } from 'react';
import { Container } from '@/components/ui/container';

export const CareerHero: FC = () => {
  return (
    <section className="relative flex items-center pt-36 pb-20 md:pt-48 md:pb-28 min-h-[95vh] bg-gradient-to-b from-[#001A53] to-[#004AEB] text-white overflow-hidden">
      <Container className="text-center relative z-10">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-white leading-tight tracking-tight">
            Bergabung dengan Tim Pyxis
          </h1>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Membangun masa depan teknologi bersama talenta terbaik.
          </p>
        </div>
      </Container>
    </section>
  );
};
