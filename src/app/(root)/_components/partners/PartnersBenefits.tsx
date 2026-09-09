import type { FC } from 'react';
import { Container } from '@/components/ui/container';

const BENEFITS = [
  {
    title: 'Hospitality-first expertise',
    description:
      'Pyxis develops hotel management systems for front office, back office, restaurant POS, and P.A.B.X. operations.',
  },
  {
    title: 'Integration that fits',
    description:
      'Connect keylock systems, devices, channel managers, and other hospitality technologies around the core operation.',
  },
  {
    title: 'Support beyond launch',
    description:
      'Partner with a team committed to ongoing customer support and practical implementation.',
  },
] as const;

export const PartnersBenefits: FC = () => {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="max-w-sm text-3xl font-bold leading-[1.08] tracking-tight text-neutral-900 sm:text-4xl">
              Why partner with Pyxis?
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-neutral-600">
              A hospitality platform designed to connect the systems, teams, and services behind
              every guest experience.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-neutral-300">
              {BENEFITS.map((benefit) => (
                <article
                  key={benefit.title}
                  className="grid gap-3 border-b border-neutral-300 py-7 sm:grid-cols-[15rem_1fr] sm:gap-8"
                >
                  <h3 className="text-lg font-semibold tracking-tight text-neutral-900">
                    {benefit.title}
                  </h3>
                  <p className="max-w-xl text-sm leading-6 text-neutral-600">
                    {benefit.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
