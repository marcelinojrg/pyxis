import type { FC } from 'react';
import { Container } from '@/components/ui/container';

export interface ProductDetailDescriptionProps {
  content?: string | null;
}

export const ProductDetailDescription: FC<ProductDetailDescriptionProps> = ({ content }) => {
  if (!content?.trim()) return null;

  const paragraphs = content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
    .filter(Boolean);

  if (paragraphs.length === 0) return null;

  return (
    <section className="border-y border-neutral-200/70 bg-[#F8FAFC] py-16 sm:py-20">
      <Container>
        <div className="grid gap-8 md:grid-cols-12 md:gap-16">
          <h2 className="max-w-sm text-3xl font-bold leading-[1.08] tracking-tight text-neutral-900 md:col-span-5 sm:text-4xl">
            Designed around the daily operation.
          </h2>
          <div className="max-w-2xl space-y-4 md:col-span-7">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-base leading-7 text-neutral-600">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
