import type { FC } from 'react';
import type { Route } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export interface CTASectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  spacing?: 'default' | 'comfortable';
}

export const CTASection: FC<CTASectionProps> = ({
  title = 'Make your hotel operations ready to grow',
  description = "Talk to Pyxis about your hotel's needs and find the right solution for your operation.",
  buttonText = 'Talk to Our Team',
  buttonHref = '/contact',
  spacing = 'default',
}) => {
  return (
    <section
      className={`relative overflow-hidden bg-[#08152F] text-white ${
        spacing === 'comfortable' ? 'py-14 sm:py-16' : 'py-16'
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="grid gap-7 border-y border-white/20 py-7 md:grid-cols-[1fr_auto] md:items-end md:gap-12 md:py-9">
          <div className="max-w-2xl">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-200">
              Next step
            </p>
            <h2
              data-home-reveal="heading"
              className="max-w-lg text-2xl font-bold leading-[1.08] tracking-tight text-white sm:text-3xl md:text-4xl"
            >
              {title}
            </h2>
            <p data-home-reveal="copy" className="mt-4 max-w-lg text-sm leading-6 text-blue-100">
              {description}
            </p>
          </div>

          <div data-home-reveal="cta" className="flex flex-col items-start md:items-end">
            <Link
              href={buttonHref as Route}
              className="group inline-flex w-full items-center justify-between gap-6 border-b border-[#F59E0B] pb-2 text-sm font-semibold text-white transition-colors duration-200 hover:text-[#FBBF24] md:w-auto"
            >
              {buttonText}
              <ArrowUpRight className="h-5 w-5 rotate-90 transition-transform duration-300 group-hover:rotate-0" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
