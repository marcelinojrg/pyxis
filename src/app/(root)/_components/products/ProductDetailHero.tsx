import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/container';

export interface ProductDetailHeroProps {
  name: string;
  description?: string | null;
  image?: string | null;
  slug: string;
}

export const ProductDetailHero: FC<ProductDetailHeroProps> = ({
  name,
  description,
  image,
  slug,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-neutral-200 bg-[#F8FAFC] py-20 text-brand-deep sm:py-24 md:min-h-[62vh] md:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex max-w-4xl flex-col justify-center text-left lg:col-span-7">
            <Link
              href="/products"
              className="mb-8 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-deep"
            >
              <ArrowLeft className="h-4 w-4" />
              All products
            </Link>

            <h1 className="max-w-3xl text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-brand-deep sm:text-5xl md:text-6xl lg:text-[4rem]">
              {name}
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-600 sm:text-base">
              {description ||
                'An integrated hospitality system for clearer operations and better service.'}
            </p>
            <Link
              href={`/contact?product=${slug}`}
              className="group mt-7 inline-flex self-start items-center gap-3 border-b border-[#F59E0B] pb-2 text-sm font-semibold text-brand-deep transition-colors duration-200 hover:text-brand"
            >
              Schedule a demo
              <ArrowUpRight className="h-5 w-5 rotate-90 transition-transform duration-300 group-hover:rotate-0" />
            </Link>
          </div>

          <figure className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden border border-neutral-200 bg-white">
              {image && <Image src={image} alt={name} fill className="object-cover" priority />}
            </div>
          </figure>
        </div>
      </Container>
    </section>
  );
};
