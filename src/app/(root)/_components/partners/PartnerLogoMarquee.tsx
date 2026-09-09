'use client';

import { useEffect, useRef, type FC } from 'react';
import Image from 'next/image';

export type PartnerLogo = {
  name: string;
  image: string;
};

type Props = {
  partners: PartnerLogo[];
  className?: string;
  size?: 'default' | 'large';
};

export const PartnerLogoMarquee: FC<Props> = ({ partners, className = '', size = 'default' }) => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
    let isVisible = false;
    const sync = () => {
      if (isVisible && motion.matches && !document.hidden) marquee.dataset.active = 'true';
      else delete marquee.dataset.active;
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.01 }
    );

    observer.observe(marquee);
    motion.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);

    return () => {
      observer.disconnect();
      motion.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  return (
    <div ref={marqueeRef} className={`partner-marquee overflow-hidden ${className}`}>
      <div className="partner-marquee-track flex w-max items-center py-1">
        {[false, true].map((isDuplicate) => (
          <div
            key={isDuplicate ? 'duplicate' : 'primary'}
            aria-hidden={isDuplicate || undefined}
            className={`flex shrink-0 items-center ${
              size === 'large' ? 'gap-6 pr-6' : 'gap-10 pr-10'
            }`}
          >
            {partners.map((partner) => (
              <div
                key={partner.name}
                className={`flex shrink-0 items-center justify-center ${
                  size === 'large' ? 'h-20 w-40' : 'h-14 w-32'
                }`}
              >
                <Image
                  src={partner.image}
                  alt={isDuplicate ? '' : partner.name}
                  width={112}
                  height={56}
                  className={`w-auto object-contain mix-blend-multiply opacity-70 grayscale transition-[filter,opacity] duration-300 hover:opacity-100 hover:grayscale-0 ${
                    size === 'large' ? 'max-h-14' : 'max-h-11'
                  }`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
