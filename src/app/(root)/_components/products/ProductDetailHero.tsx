import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ImageIcon } from 'lucide-react';
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
    <section className="bg-slate-50 pt-28 pb-16 md:pt-36 md:pb-20">
      <Container>
        <Link
          href="/products"
          className="mb-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Produk
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="space-y-5 text-left">
            <h1 className="max-w-xl text-4xl sm:text-5xl md:text-6xl font-bold font-heading text-brand-deep leading-[1.05]">
              {name}
            </h1>
            <p className="max-w-xl text-sm sm:text-base text-neutral-600 leading-relaxed">
              {description ||
                'Solusi teknologi terintegrasi untuk meningkatkan performa bisnis hospitality Anda.'}
            </p>
            <div className="pt-2">
              <Link
                href={`/contact?product=${slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-7 py-3 text-sm font-bold text-neutral-950 shadow-lg transition-all duration-200 hover:bg-amber-600 active:scale-95"
              >
                Jadwalkan Demo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative aspect-video rounded-xl overflow-hidden border border-neutral-200 shadow-xl bg-white">
            {image ? (
              <Image src={image} alt={name} fill className="object-cover" priority />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-brand-tint">
                <ImageIcon className="h-12 w-12 text-brand/30" />
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
