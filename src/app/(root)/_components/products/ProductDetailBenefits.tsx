import type { FC } from 'react';
import { BarChart3, Smile, TrendingUp } from 'lucide-react';
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
    <section className="bg-white py-12 md:py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {benefits.map((item, index) => {
            const Icon = [Smile, TrendingUp, BarChart3][index % 3];
            return (
              <div key={item.id}>
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md bg-[#e5edff] text-[#16459d]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-[#07358b] mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {item.description || 'Deskripsi manfaat produk.'}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
