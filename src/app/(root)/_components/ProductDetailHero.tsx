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
    <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 bg-gradient-to-r from-[#001A53] to-[#004AEB] text-white overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold uppercase tracking-wider">
              Produk Pyxis Ultimate
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-white leading-tight">
              {name}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-blue-100 leading-relaxed">
              {description ||
                'Solusi teknologi terintegrasi untuk meningkatkan performa bisnis hospitality Anda.'}
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href={`/contact?product=${slug}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-neutral-950 font-bold text-sm shadow-lg transition-all active:scale-95"
              >
                Jadwalkan Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative aspect-video lg:aspect-4/3 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900/50">
            {image ? (
              <Image src={image} alt={name} fill className="object-cover" priority />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-900 to-indigo-950 flex items-center justify-center text-blue-200 font-bold text-xl">
                {name} Visual
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
