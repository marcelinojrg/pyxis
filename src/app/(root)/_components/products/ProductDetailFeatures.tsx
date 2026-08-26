import type { FC } from 'react';
import { Container } from '@/components/ui/container';

export interface FeatureItem {
  id: string;
  title: string;
  description?: string | null;
  icon?: string | null;
}

export interface ProductDetailFeaturesProps {
  subtitle?: string | null;
  features: FeatureItem[];
}

export const ProductDetailFeatures: FC<ProductDetailFeaturesProps> = ({ subtitle, features }) => {
  if (!features || features.length === 0) return null;

  return (
    <section className="bg-[#f7f8fa] py-12 md:py-16">
      <Container>
        <div className="max-w-2xl mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#07358b] mb-4">Fitur Utama</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            {subtitle ||
              'Solusi modular yang dapat disesuaikan dengan kebutuhan unik properti Anda.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
          {features.map((feat) => (
            <div key={feat.id} className="grid grid-cols-[36px_1fr] gap-3">
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#fff0d2] text-[#ae7215] text-xs">
                ✦
              </div>
              <div>
                <h3 className="text-base font-bold text-[#07358b] mb-2">{feat.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{feat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
