import type { FC } from 'react';
import { ArrowDown } from 'lucide-react';
import { Container } from '@/components/ui/container';

export interface ProductsHeroProps {
  title?: string;
  description?: string;
}

export const ProductsHero: FC<ProductsHeroProps> = ({
  title = 'Solusi Hospitality Terintegrasi',
  description = 'Berdayakan operasional hotel Anda dengan teknologi modern yang dirancang untuk efisiensi, skalabilitas, dan pengalaman tamu yang tak terlupakan.',
}) => {
  return (
    <section className="relative flex items-center justify-center pt-36 pb-20 md:pt-48 md:pb-28 min-h-[95vh] bg-gradient-to-r from-[#001A53] to-[#004AEB] text-white overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold font-heading text-white leading-[1.18] tracking-tight">
            {title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
          <div className="pt-2">
            <a
              href="#products-list"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-neutral-950 font-bold text-sm shadow-lg hover:bg-blue-50 transition-all active:scale-95"
            >
              Lihat Produk
              <ArrowDown className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
