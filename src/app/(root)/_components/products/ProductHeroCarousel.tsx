import type { FC } from 'react';
import Image from 'next/image';

export interface HeroProduct {
  id: string;
  name: string;
  image?: string | null;
  slug: string;
}

interface ProductHeroVisualProps {
  products: HeroProduct[];
}

export const ProductHeroVisual: FC<ProductHeroVisualProps> = ({ products }) => {
  const featuredProduct = products[0];

  if (!featuredProduct?.image) return null;

  return (
    <figure className="relative mx-auto aspect-[4/3] w-full max-w-sm overflow-hidden border border-white/25 bg-[#001A53] shadow-2xl shadow-black/15">
      <Image
        src={featuredProduct.image}
        alt="Hospitality operation supported by Pyxis systems"
        fill
        sizes="(max-width: 1024px) 100vw, 384px"
        className="object-cover"
      />
    </figure>
  );
};
