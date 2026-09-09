'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';

const EVOLUTION_NODES = [
  {
    step: 1,
    year: '1988',
    title: 'ParHIS',
    description: 'The first DOS-based hotel system was developed by PT. DACCOM ANUGERAHMULYA.',
    align: 'right',
    nodeColor: 'bg-[#1D4ED8] text-white',
    yearBadge: 'bg-blue-50 text-[#1D4ED8] border-blue-200',
  },
  {
    step: 2,
    year: '2000',
    title: 'BITS & MYOH Hotel Software',
    description:
      'PT. MYOHDOTCOM Indonesia, Tbk launched its second-generation Windows-based hospitality software.',
    align: 'left',
    nodeColor: 'bg-[#E2E8F0] text-neutral-700',
    yearBadge: 'bg-blue-50 text-[#1D4ED8] border-blue-200',
  },
  {
    step: 3,
    year: '2004',
    title: 'PT. MYOH Technology Tbk',
    description:
      'The company name was updated to reflect its focus as an information technology developer.',
    align: 'right',
    nodeColor: 'bg-[#E2E8F0] text-neutral-700',
    yearBadge: 'bg-blue-50 text-[#1D4ED8] border-blue-200',
  },
  {
    step: 4,
    year: '2011–2021',
    title: 'Pyxis & Hybrid Technology',
    description:
      "PT. Pyxis Ultimate Solution continued MYOH's hospitality business and introduced hybrid technology in 2014.",
    align: 'left',
    nodeColor: 'bg-[#E2E8F0] text-neutral-700',
    yearBadge: 'bg-blue-50 text-[#1D4ED8] border-blue-200',
  },
  {
    step: 5,
    year: '2021–Present',
    title: 'Pyxis-X',
    description:
      'The Pyxis-X decentralized cloud technology platform was introduced for digital travel and tourism infrastructure.',
    align: 'right',
    nodeColor: 'bg-[#F59E0B] text-white',
    yearBadge: 'bg-amber-50 text-amber-700 border-amber-300',
  },
];

export default function HomeEvolution() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const media = window.matchMedia(
      '(min-width: 768px) and (prefers-reduced-motion: no-preference)'
    );
    let observer: IntersectionObserver | undefined;
    const items = Array.from(timeline.querySelectorAll<HTMLElement>('[data-evolution-item]'));

    const reset = () => {
      observer?.disconnect();
      observer = undefined;
      delete timeline.dataset.evolutionMotion;
      items.forEach((item) => delete item.dataset.evolutionItemState);
    };

    const mount = () => {
      reset();
      if (!media.matches) return;

      items.forEach((item) => (item.dataset.evolutionItemState = 'pending'));
      timeline.dataset.evolutionMotion = 'ready';

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const item = entry.target as HTMLElement;
            item.dataset.evolutionItemState = 'visible';
            observer?.unobserve(item);
          });
        },
        { rootMargin: '0px 0px -30px 0px', threshold: 0.08 }
      );

      requestAnimationFrame(() => {
        items.forEach((item) => observer?.observe(item));
      });
    };

    media.addEventListener('change', mount);
    mount();

    return () => {
      media.removeEventListener('change', mount);
      reset();
    };
  }, []);

  return (
    <section className="py-16 bg-[#F1F5F9]/70 border-t border-neutral-200/70">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2
            data-home-reveal="heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-neutral-900"
          >
            Our product evolution
          </h2>
          <p
            data-home-reveal="copy"
            className="text-sm sm:text-base text-neutral-600 leading-relaxed"
          >
            A long history of continuous innovation built around the changing needs of the
            hospitality industry.
          </p>
        </div>

        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Vertical Center Line */}
          <div className="absolute top-4 bottom-4 left-4 md:left-1/2 -translate-x-1/2 w-0.5 bg-neutral-300/80 z-0" />

          <div className="space-y-12 relative z-10">
            {EVOLUTION_NODES.map((item) => {
              const isRight = item.align === 'right';

              return (
                <div
                  key={item.step}
                  data-evolution-item
                  style={{ '--evolution-delay': `${(item.step - 1) * 80}ms` } as CSSProperties}
                  className="flex flex-col md:flex-row items-start md:items-center relative"
                >
                  {/* Left Side Container */}
                  <div className="w-full md:w-1/2 md:pr-10 md:text-right pl-12 md:pl-0">
                    {!isRight && (
                      <div className="evolution-card evolution-card-left bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm space-y-2 text-left">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-bold font-heading text-neutral-900">
                            {item.title}
                          </h3>
                          <span
                            className={cn(
                              'text-xs font-semibold px-2.5 py-0.5 rounded-full border',
                              item.yearBadge
                            )}
                          >
                            {item.year}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Center Number Circle */}
                  <div
                    className={cn(
                      'absolute left-0 md:left-1/2 translate-x-0 md:-translate-x-1/2 w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center shadow-md ring-4 ring-[#F1F5F9]',
                      item.nodeColor
                    )}
                  >
                    {item.step}
                  </div>

                  {/* Right Side Container */}
                  <div className="w-full md:w-1/2 md:pl-10 text-left pl-12 mt-3 md:mt-0">
                    {isRight && (
                      <div className="evolution-card evolution-card-right bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-bold font-heading text-neutral-900">
                            {item.title}
                          </h3>
                          <span
                            className={cn(
                              'text-xs font-semibold px-2.5 py-0.5 rounded-full border',
                              item.yearBadge
                            )}
                          >
                            {item.year}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
