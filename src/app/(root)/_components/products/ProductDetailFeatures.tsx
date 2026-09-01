import type { FC } from 'react';
import { Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/container';

export interface FeatureItem {
  id: string;
  title: string;
  description?: string | null;
  icon?: string | null;
}

export interface ProductDetailFeaturesProps {
  features: FeatureItem[];
}

export const ProductDetailFeatures: FC<ProductDetailFeaturesProps> = ({ features }) => {
  if (!features || features.length === 0) return null;

  return (
    <section className="bg-white py-12 md:py-16">
      <Container>
        <div className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-bold text-brand-deep sm:text-3xl">Fitur Utama</h2>
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feat) => (
            <div key={feat.id} className="grid grid-cols-[36px_1fr] gap-4">
              <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-brand-deep sm:text-xl">{feat.title}</h3>
                <p className="text-base leading-relaxed text-neutral-600">{feat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
