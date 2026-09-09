import type { FC } from 'react';
import {
  ArrowLeftRight,
  TabletSmartphone,
  KeyRound,
  PhoneCall,
  SlidersHorizontal,
} from 'lucide-react';
import { Container } from '@/components/ui/container';

const INTERFACING_CATEGORIES = [
  {
    id: 'channel-managers',
    icon: ArrowLeftRight,
    title: 'Channel managers',
    description: "Connect distribution channels to the hotel's core operation.",
  },
  {
    id: 'device-integration',
    icon: TabletSmartphone,
    title: 'Device integration',
    description: 'Bring operational hardware into one connected workflow.',
  },
  {
    id: 'keylock-systems',
    icon: KeyRound,
    title: 'Keylock systems',
    description: 'Connect room access with front office operations.',
  },
  {
    id: 'pabx',
    icon: PhoneCall,
    title: 'P.A.B.X.',
    description: 'Keep room and telephone activity connected to the hotel system.',
  },
  {
    id: 'smart-devices',
    icon: SlidersHorizontal,
    title: 'Smart devices',
    description: 'Extend control across rooms and operating environments.',
  },
] as const;

export const PartnersInterfacing: FC = () => {
  return (
    <section className="border-t border-neutral-200/70 bg-[#F3F4F6] py-20 sm:py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="max-w-2xl text-3xl font-bold leading-[1.08] tracking-tight text-neutral-900 sm:text-4xl">
              Integration across hospitality operations.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-neutral-600">
              Pyxis connects the systems teams use every day, from distribution and access to
              devices and communications.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-5">
          {INTERFACING_CATEGORIES.map((category) => {
            const Icon = category.icon;

            return (
              <article key={category.id} className="border-t border-neutral-300 py-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-base font-semibold tracking-tight text-neutral-900">
                    {category.title}
                  </h3>
                  <Icon className="h-5 w-5 shrink-0 text-[#1D4ED8]" aria-hidden="true" />
                </div>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{category.description}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
