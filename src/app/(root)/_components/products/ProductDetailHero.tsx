import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
    <section className="bg-[#f7f8fa] pt-28 pb-16 md:pt-36 md:pb-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="space-y-5 text-left">
            <h1 className="max-w-xl text-4xl sm:text-5xl md:text-6xl font-bold font-heading text-[#07358b] leading-[1.05]">
              {name}
            </h1>
            <p className="max-w-xl text-sm sm:text-base text-neutral-600 leading-relaxed">
              {description ||
                'Solusi teknologi terintegrasi untuk meningkatkan performa bisnis hospitality Anda.'}
            </p>
          </div>

          <Link
            href={`/contact?product=${slug}`}
            className="relative aspect-video rounded-xl overflow-hidden border border-neutral-200 shadow-xl bg-white block group"
          >
            {image ? (
              <Image src={image} alt={name} fill className="object-cover" priority />
            ) : (
              <div className="w-full h-full bg-neutral-400 flex items-center justify-center text-white font-bold text-xl">
                Lihat Produk
              </div>
            )}
            <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-lg bg-[#f9a51a] px-4 py-2 text-xs font-bold text-neutral-950 opacity-0 group-hover:opacity-100 transition-opacity">
              Jadwalkan Demo <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
};
