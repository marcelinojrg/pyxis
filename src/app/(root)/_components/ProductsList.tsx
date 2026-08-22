import type { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, PackageOpen } from 'lucide-react';
import { Container } from '@/components/ui/container';

export interface ProductItem {
  id: string;
  name: string;
  description?: string | null;
  image?: string | null;
  slug: string;
}

export interface ProductsListProps {
  products: ProductItem[];
}

export const ProductsList: FC<ProductsListProps> = ({ products }) => {
  return (
    <section id="products-list" className="py-16">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Pyxis Ultimate Solutions
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            The ultimate solution for your hotel operations. Offers the freedom of choices to help
            you get what you need with a basic cost effective and add modules any time.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 md:p-16 rounded-2xl border border-dashed border-neutral-300 bg-white text-center max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 mb-4">
              <PackageOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-800 mb-1">
              Maaf, produk kosong saat ini.
            </h3>
            <p className="text-sm text-neutral-500 max-w-sm">
              Kami sedang menyiapkan katalog produk terbaru. Silakan hubungi kami untuk informasi
              lebih lanjut.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {product.image ? (
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 bg-neutral-100">
                      <Image src={product.image} alt={product.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-full aspect-video bg-neutral-400 rounded-xl mb-6" />
                  )}
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-3">
                    {product.name}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                    {product.description || 'Tidak ada deskripsi tersedia.'}
                  </p>
                </div>
                <div>
                  <Link
                    href={`/contact?product=${product.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Pelajari Selengkapnya
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};
