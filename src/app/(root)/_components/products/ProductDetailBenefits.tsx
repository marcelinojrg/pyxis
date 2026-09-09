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

function getGridColumns(count: number) {
  if (count <= 1) return 'md:grid-cols-1';
  if (count === 2 || count === 4) return 'md:grid-cols-2';
  return 'md:grid-cols-3';
}

export const ProductDetailBenefits: FC<ProductDetailBenefitsProps> = ({ benefits }) => {
  if (!benefits || benefits.length === 0) return null;

  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <h2 className="max-w-sm text-3xl font-bold leading-[1.08] tracking-tight text-neutral-900 sm:text-4xl">
              What it helps you do.
            </h2>
          </div>

          <div
            className={`grid border-l border-t border-neutral-200 md:col-span-8 ${getGridColumns(benefits.length)}`}
          >
            {benefits.map((item) => (
              <article
                key={item.id}
                className="border-b border-r border-neutral-200 px-5 py-7 md:px-6"
              >
                <h3 className="max-w-[16rem] text-lg font-semibold leading-6 tracking-tight text-neutral-900">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[18rem] text-sm leading-6 text-neutral-600">
                  {item.description || 'A practical improvement for your operation.'}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
