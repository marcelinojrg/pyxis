'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const motionQuery = '(min-width: 768px) and (prefers-reduced-motion: no-preference)';

export default function PublicReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const isPublic = !pathname.startsWith('/admin') && !pathname.startsWith('/login');
    if (!isPublic) return;

    const main = document.querySelector('main');
    if (!main) return;

    const media = window.matchMedia(motionQuery);
    let observer: IntersectionObserver | undefined;
    let targets: HTMLElement[] = [];
    const itemsByTarget = new Map<HTMLElement, HTMLElement[]>();

    const reset = () => {
      observer?.disconnect();
      observer = undefined;
      document.documentElement.classList.remove('public-motion-ready');

      targets.forEach((target) => {
        delete target.dataset.publicReveal;
        delete target.dataset.publicRevealState;
      });
      itemsByTarget.forEach((items) => {
        items.forEach((item) => {
          delete item.dataset.publicRevealItem;
          item.style.removeProperty('--public-reveal-delay');
        });
      });
      itemsByTarget.clear();
      targets = [];
    };

    const mount = () => {
      reset();
      if (!media.matches) return;

      targets = Array.from(
        main.querySelectorAll<HTMLElement>(':scope > div > *, :scope > section, :scope > article')
      );
      if (targets.length === 0) return;

      targets.forEach((target) => {
        const declaredItems = Array.from(
          target.querySelectorAll<HTMLElement>(
            '[data-home-reveal], [data-public-reveal-item], [data-reveal-item]'
          )
        );
        const items =
          declaredItems.length > 0
            ? declaredItems
            : Array.from(target.querySelectorAll<HTMLElement>('.grid > *'));
        const variant = target.querySelector('h1')
          ? 'hero'
          : items.length > 1
            ? 'cards'
            : target.querySelector('img')
              ? 'media'
              : 'section';

        target.dataset.publicReveal = variant;
        target.dataset.publicRevealState = 'pending';

        items.forEach((item, index) => {
          item.dataset.publicRevealItem = '';
          item.style.setProperty('--public-reveal-delay', `${Math.min(index, 5) * 70}ms`);
        });
        itemsByTarget.set(target, items);
      });

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const target = entry.target as HTMLElement;
            target.dataset.publicRevealState = 'visible';
            itemsByTarget.get(target)?.forEach((item) => {
              item.dataset.publicRevealItem = 'visible';
            });
            observer?.unobserve(target);
          });
        },
        { rootMargin: '0px 0px -30px 0px', threshold: 0.05 }
      );

      document.documentElement.classList.add('public-motion-ready');
      requestAnimationFrame(() => {
        targets.forEach((target) => observer?.observe(target));
      });
    };

    media.addEventListener('change', mount);
    mount();

    return () => {
      media.removeEventListener('change', mount);
      reset();
    };
  }, [pathname]);

  return null;
}
