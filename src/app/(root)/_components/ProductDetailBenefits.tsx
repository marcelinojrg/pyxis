import type { FC } from 'react';
import { Container } from '@/components/ui/container';

export interface BenefitItem {
  id: string;
  title: string;
  description?: string | null;
  icon?: string | null;
}

export interface ProductDetailBenefitsProps {
  benefits: BenefitItem[];
}

export const ProductDetailBenefits: FC<ProductDetailBenefitsProps> = ({ benefits }) => {
  if (!benefits || benefits.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Manfaat Utama
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Keunggulan yang akan dirasakan langsung oleh tim operasional dan manajemen Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((item) => (
            <div
              key={item.id}
              className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200/80 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-bold text-neutral-900 mb-2">{item.title}</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {item.description || 'Deskripsi manfaat produk.'}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
