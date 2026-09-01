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
    <section className="bg-slate-50 pt-8 pb-12 md:pt-12 md:pb-16">
      <Container>
        <h2 className="mb-6 text-2xl font-bold text-brand-deep sm:text-3xl">Tentang Produk</h2>
        <div className="space-y-5">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed text-neutral-600">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
};
