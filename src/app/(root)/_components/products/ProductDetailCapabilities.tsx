import type { FC } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { Cloud, Database, GitBranch, ShieldCheck } from 'lucide-react';

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
    <section className="bg-gradient-to-r from-[#062568] to-[#064ee8] py-16 md:py-20 text-white">
      <Container>
        <div className="space-y-16">
          {capabilities.map((cap, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={cap.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center"
              >
                <div className={isEven ? 'order-1' : 'order-1 lg:order-2'}>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4">{cap.title}</h2>
                  {cap.description && (
                    <p className="text-sm text-blue-100 leading-relaxed mb-6">{cap.description}</p>
                  )}

                  <div className="space-y-4">
                    {cap.items.map((item, itemIndex) => {
                      const Icon = [Cloud, GitBranch, Database, ShieldCheck][itemIndex % 4];
                      return (
                        <div key={item.id} className="grid grid-cols-[28px_1fr] gap-3">
                          <Icon className="mt-0.5 h-5 w-5 text-white" />
                          <div>
                            <h4 className="text-sm font-bold mb-1">{item.title}</h4>
                            {item.description && (
                              <p className="text-xs text-blue-100 leading-relaxed">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div
                  className={`relative aspect-square max-w-md w-full mx-auto rounded-2xl overflow-hidden bg-neutral-400 border border-white/20 shadow-md ${
                    isEven ? 'order-2' : 'order-2 lg:order-1'
                  }`}
                >
                  {cap.imageUrl ? (
                    <Image src={cap.imageUrl} alt={cap.title} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-sm font-medium">
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
