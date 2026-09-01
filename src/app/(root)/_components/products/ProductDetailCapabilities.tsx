import path from 'node:path';
import Image from 'next/image';
import sharp from 'sharp';
import { Cloud, Database, GitBranch, ShieldCheck } from 'lucide-react';
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

interface ImageSize {
  width: number;
  height: number;
}

// Baca dimensi asli gambar lokal agar foto tampil dengan rasio alaminya (tanpa dipaksa persegi).
async function getImageSize(url?: string | null): Promise<ImageSize | null> {
  if (!url || !url.startsWith('/')) return null;
  const publicRoot = path.resolve(process.cwd(), 'public');
  const filePath = path.resolve(publicRoot, url.split('?')[0].replace(/^\//, ''));
  if (!filePath.startsWith(`${publicRoot}${path.sep}`)) return null;
  try {
    const metadata = await sharp(filePath).metadata();
    if (metadata.width && metadata.height) {
      return { width: metadata.width, height: metadata.height };
    }
    return null;
  } catch {
    return null;
  }
}

export const ProductDetailCapabilities = async ({
  capabilities,
}: ProductDetailCapabilitiesProps) => {
  if (!capabilities || capabilities.length === 0) return null;

  const imageSizes = await Promise.all(capabilities.map((cap) => getImageSize(cap.imageUrl)));

  return (
    <section className="bg-gradient-to-r from-brand-deep to-brand py-16 text-white md:py-20">
      <Container>
        <div className="space-y-16">
          {capabilities.map((cap, idx) => {
            const isEven = idx % 2 === 0;
            const size = imageSizes[idx];
            return (
              <div
                key={cap.id}
                className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 md:gap-16"
              >
                <div className={isEven ? 'order-1' : 'order-1 lg:order-2'}>
                  <h2 className="mb-4 text-2xl font-bold sm:text-3xl">{cap.title}</h2>
                  {cap.description && (
                    <p className="mb-6 text-base leading-relaxed text-blue-100">
                      {cap.description}
                    </p>
                  )}

                  <div className="space-y-5">
                    {cap.items.map((item, itemIndex) => {
                      const Icon = [Cloud, GitBranch, Database, ShieldCheck][itemIndex % 4];
                      return (
                        <div key={item.id} className="grid grid-cols-[32px_1fr] gap-3">
                          <Icon className="mt-0.5 h-6 w-6 text-white" />
                          <div>
                            <h3 className="mb-1 text-lg font-bold">{item.title}</h3>
                            {item.description && (
                              <p className="text-base leading-relaxed text-blue-100">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className={isEven ? 'order-2' : 'order-2 lg:order-1'}>
                  {cap.imageUrl ? (
                    <Image
                      src={cap.imageUrl}
                      alt={cap.title}
                      width={size?.width ?? 1200}
                      height={size?.height ?? 675}
                      sizes="(max-width: 1024px) 100vw, 448px"
                      className="mx-auto h-auto w-full max-w-md rounded-2xl border border-white/20 shadow-md"
                    />
                  ) : (
                    <div className="mx-auto flex aspect-square w-full max-w-md items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-sm font-medium text-white">
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
