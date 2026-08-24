import type { FC } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/container';

export interface CapabilityItem {
  id: string;
  title: string;
  description?: string | null;
}

export interface CapabilityGroup {
  id: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  items: CapabilityItem[];
}

export interface ProductDetailCapabilitiesProps {
  capabilities: CapabilityGroup[];
}

export const ProductDetailCapabilities: FC<ProductDetailCapabilitiesProps> = ({ capabilities }) => {
  if (!capabilities || capabilities.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="space-y-16">
          {capabilities.map((cap, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={cap.id} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className={isEven ? 'order-1' : 'order-1 lg:order-2'}>
                  <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">
                    {cap.title}
                  </h2>
                  {cap.description && (
                    <p className="text-sm text-neutral-600 leading-relaxed mb-6">{cap.description}</p>
                  )}

                  <div className="space-y-4">
                    {cap.items.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/70"
                      >
                        <h4 className="text-sm font-bold text-neutral-900 mb-1">{item.title}</h4>
                        {item.description && (
                          <p className="text-xs text-neutral-600 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`relative aspect-video lg:aspect-4/3 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-md ${
                    isEven ? 'order-2' : 'order-2 lg:order-1'
                  }`}
                >
                  {cap.imageUrl ? (
                    <Image src={cap.imageUrl} alt={cap.title} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-400 text-sm font-medium">
                      Visual Kapabilitas
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
