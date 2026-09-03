import type { FC, ReactNode } from 'react';
import type { Route } from 'next';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/container';

export interface PageHeroProps {
  title: string;
  description?: string | null;
  ctaText?: string | null;
  ctaHref?: string | null;
  ctaIcon?: ReactNode;
  gradientClassName?: string;
  className?: string;
}

export const PageHero: FC<PageHeroProps> = ({
  title,
  description,
  ctaText,
  ctaHref,
  ctaIcon,
  gradientClassName = 'bg-gradient-to-b from-[#001A53] to-[#004AEB]',
  className,
}) => {
  return (
    <section
      className={cn(
        'relative flex items-center justify-center pt-36 pb-20 md:pt-48 md:pb-28 min-h-[95vh] text-white overflow-hidden',
        gradientClassName,
        className
      )}
    >
      <Container className="relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <h1
            data-home-reveal="heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold font-heading text-white leading-[1.18] tracking-tight"
          >
            {title}
          </h1>

          {description && (
            <p
              data-home-reveal="copy"
              className="text-sm sm:text-base md:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed"
            >
              {description}
            </p>
          )}

          {ctaText && ctaHref && (
            <div data-home-reveal="cta" className="pt-2">
              <Link
                href={ctaHref as Route}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-neutral-950 font-bold text-sm shadow-lg hover:bg-blue-50 transition-all active:scale-95"
              >
                <span>{ctaText}</span>
                {ctaIcon}
              </Link>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default PageHero;
