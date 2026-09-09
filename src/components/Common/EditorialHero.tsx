import type { FC, ReactNode } from 'react';
import type { Route } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export interface EditorialHeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  children?: ReactNode;
  tone?: 'blue' | 'light';
}

export const EditorialHero: FC<EditorialHeroProps> = ({
  eyebrow,
  title,
  description,
  ctaText,
  ctaHref,
  children,
  tone = 'blue',
}) => {
  const isLight = tone === 'light';

  return (
    <section
      className={`${
        isLight
          ? 'border-b border-neutral-200 bg-white text-neutral-950'
          : 'bg-[radial-gradient(circle_at_82%_24%,rgba(96,165,250,0.22),transparent_34%),linear-gradient(135deg,#004AEB_0%,#001A53_100%)] text-white'
      } relative overflow-hidden py-24 md:py-32 lg:flex lg:min-h-[649px] lg:items-center`}
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:translate-y-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div
            className={`${
              isLight ? 'border-neutral-300' : 'border-white/25'
            } max-w-4xl border-t pt-9 lg:col-span-7`}
          >
            {eyebrow && (
              <p
                className={`${
                  isLight ? 'text-[#1D4ED8]' : 'text-blue-100/75'
                } text-xs font-semibold uppercase tracking-[0.2em]`}
              >
                {eyebrow}
              </p>
            )}
            <h1
              className={`${
                isLight ? 'text-neutral-950' : 'text-white'
              } mt-5 max-w-3xl text-4xl font-bold leading-[1.06] tracking-[-0.035em] sm:text-5xl lg:text-[4rem]`}
            >
              {title}
            </h1>
            <p
              className={`${
                isLight ? 'text-neutral-600' : 'text-blue-50/90'
              } mt-6 max-w-xl text-sm leading-7 sm:text-base`}
            >
              {description}
            </p>
            {ctaText && ctaHref && (
              <Link
                href={ctaHref as Route}
                className={`${
                  isLight
                    ? 'text-neutral-900 hover:text-[#1D4ED8]'
                    : 'text-white hover:text-[#FBBF24]'
                } group mt-8 inline-flex items-center gap-3 border-b border-[#F59E0B] pb-2 text-sm font-semibold transition-colors duration-200`}
              >
                {ctaText}
                <ArrowUpRight className="h-5 w-5 rotate-90 transition-transform duration-300 group-hover:rotate-0" />
              </Link>
            )}
          </div>

          <div className="lg:col-span-5">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default EditorialHero;
