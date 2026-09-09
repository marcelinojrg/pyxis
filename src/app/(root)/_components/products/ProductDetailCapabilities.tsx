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

function getGridColumns(count: number) {
  if (count <= 1) return 'sm:grid-cols-1';
  if (count === 2 || count === 4) return 'sm:grid-cols-2';
  return 'sm:grid-cols-3';
}

interface ImageSize {
  width: number;
  height: number;
}

// Read local image dimensions so each image keeps its natural aspect ratio.
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
    <section className="bg-[#E8EEF9] py-20 text-brand-deep sm:py-24">
      <Container>
        <div className="space-y-20 sm:space-y-24">
          {capabilities.map((cap, idx) => {
            const isEven = idx % 2 === 0;
            const size = imageSizes[idx];
            return (
              <div
                key={cap.id}
                className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16"
              >
                <div
                  className={isEven ? 'order-1 lg:col-span-7' : 'order-1 lg:order-2 lg:col-span-7'}
                >
                  <h2 className="max-w-xl text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl">
                    {cap.title}
                  </h2>
                  {cap.description && (
                    <p className="mt-5 max-w-xl text-base leading-7 text-neutral-600">
                      {cap.description}
                    </p>
                  )}

                  <div
                    className={`mt-8 grid border-l border-t border-brand/20 ${getGridColumns(cap.items.length)}`}
                  >
                    {cap.items.map((item, itemIndex) => {
                      const Icon = [Cloud, GitBranch, Database, ShieldCheck][itemIndex % 4];
                      return (
                        <div
                          key={item.id}
                          className="border-b border-r border-brand/20 px-5 py-6 sm:px-6"
                        >
                          <Icon className="h-5 w-5 text-brand" />
                          <h3 className="mt-4 text-base font-semibold tracking-tight text-brand-deep">
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className="mt-2 text-sm leading-6 text-neutral-600">
                              {item.description}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div
                  className={isEven ? 'order-2 lg:col-span-5' : 'order-2 lg:order-1 lg:col-span-5'}
                >
                  {cap.imageUrl ? (
                    <Image
                      src={cap.imageUrl}
                      alt={cap.title}
                      width={size?.width ?? 1200}
                      height={size?.height ?? 675}
                      sizes="(max-width: 1024px) 100vw, 448px"
                      className="mx-auto h-auto w-full max-w-lg border border-brand/20"
                    />
                  ) : (
                    <div className="mx-auto aspect-[4/3] w-full max-w-lg border border-brand/20 bg-white/40" />
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
