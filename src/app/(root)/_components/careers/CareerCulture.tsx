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
    title: 'Budaya Inklusif',
    description:
      'Kami percaya keberagaman adalah kekuatan. Di Pyxis, Anda akan bekerja dalam lingkungan yang mendukung pertumbuhan dan kolaborasi antar tim.',
    image: '/assets/img/karir-carousel-1.jpg',
  },
  {
    title: 'Ruang untuk Bertumbuh',
    description:
      'Setiap anggota tim didukung untuk belajar, mencoba ide baru, dan membangun karir bersama Pyxis.',
    image: '/assets/img/home-hero-ilustrasi.jpg',
  },
  {
    title: 'Kerja yang Bermakna',
    description:
      'Kami membangun teknologi yang membantu bisnis hospitality memberi pengalaman terbaik bagi tamu.',
    image: '/assets/img/karir-carousel-3.jpg',
  },
];

export const CareerCulture: FC = () => {
  return (
    <section className="bg-[#f7f8fa] py-12 md:py-16">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#07358b] mb-3">Life at Pyxis</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Kami menawarkan lebih dari sekadar pekerjaan; kami menawarkan perjalanan karir yang
            didukung oleh budaya, inovasi, dan keseimbangan.
          </p>
        </div>
        <Carousel
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 4000 })]}
          className="mx-auto max-w-6xl px-10"
        >
          <CarouselContent>
            {CULTURES.map((culture) => (
              <CarouselItem key={culture.title}>
                <div className="grid grid-cols-1 items-center gap-8 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-9">
                  <div className="relative aspect-video overflow-hidden rounded-xl bg-white">
                    <Image
                      src={culture.image}
                      alt={culture.title}
                      fill
                      sizes="(max-width: 768px) calc(100vw - 5rem), 50vw"
                      className="object-contain"
                    />
                  </div>
                  <div className="md:px-4">
                    <h3 className="text-lg font-bold text-[#07358b] mb-3">{culture.title}</h3>
                    <p className="text-sm leading-relaxed text-neutral-600">
                      {culture.description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 border-0 bg-transparent text-[#07358b] shadow-none hover:bg-white" />
          <CarouselNext className="right-0 border-0 bg-transparent text-[#07358b] shadow-none hover:bg-white" />
        </Carousel>
      </Container>
    </section>
  );
};
