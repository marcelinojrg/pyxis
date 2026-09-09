'use client';

import type { FC } from 'react';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import { Container } from '@/components/ui/container';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const CULTURES = [
  {
    title: 'A culture that stays close',
    description: 'We work across disciplines and stay close to the people who use what we build.',
    image: '/assets/img/karir-carousel-1.jpg',
  },
  {
    title: 'Room to grow',
    description:
      'Every team member is encouraged to learn, test ideas, and take ownership of better work.',
    image: '/assets/img/home-hero-ilustrasi.jpg',
  },
  {
    title: 'Work with a clear outcome',
    description:
      'Our products help hospitality teams make daily operations simpler and more dependable.',
    image: '/assets/img/karir-carousel-3.jpg',
  },
];

export const CareerCulture: FC = () => {
  return (
    <section className="border-b border-neutral-200 bg-white py-16 sm:py-24">
      <Container>
        <div className="grid gap-8 border-t border-neutral-300 pt-7 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1D4ED8]">
              Life at Pyxis
            </p>
            <h2 className="mt-4 max-w-xl text-3xl font-bold leading-[1.08] tracking-tight text-neutral-950 sm:text-4xl">
              Build useful things with people who care about the detail.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-neutral-600 lg:col-span-5 lg:col-start-8">
            We offer more than a role. You will work with a team that values clarity, thoughtful
            craft, and progress that can be felt by the people using our products.
          </p>
        </div>

        <Carousel
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 4000 })]}
          className="mt-12 border-y border-neutral-300 px-10 sm:mt-16"
        >
          <CarouselContent>
            {CULTURES.map((culture) => (
              <CarouselItem key={culture.title}>
                <div className="grid items-center gap-8 py-8 md:grid-cols-2 md:gap-14 md:py-10">
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                    <Image
                      src={culture.image}
                      alt={culture.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                      How we work
                    </p>
                    <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-3xl">
                      {culture.title}
                    </h3>
                    <p className="mt-4 max-w-md text-base leading-7 text-neutral-600">
                      {culture.description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 rounded-none border-neutral-300 bg-white text-neutral-900 shadow-none hover:bg-neutral-50" />
          <CarouselNext className="right-0 rounded-none border-neutral-300 bg-white text-neutral-900 shadow-none hover:bg-neutral-50" />
        </Carousel>
      </Container>
    </section>
  );
};
