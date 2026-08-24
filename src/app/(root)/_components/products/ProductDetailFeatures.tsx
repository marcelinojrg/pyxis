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
    <section className="py-16 md:py-24 bg-neutral-50/60">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Fitur Unggulan
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            {subtitle ||
              'Solusi modular yang dapat disesuaikan dengan kebutuhan unik properti Anda.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => (
            <div
              key={feat.id}
              className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs hover:shadow-md transition-shadow"
            >
              <h3 className="text-base font-bold text-neutral-900 mb-2">{feat.title}</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
