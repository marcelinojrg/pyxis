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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {products.map((product) => (
              <div
                key={product.id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#dbe6f7] bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                {product.image ? (
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/3] w-full bg-[#dbe6f7]" />
                )}
                <div className="flex flex-1 flex-col bg-[#eef4ff] p-7 sm:p-8">
                  <div>
                    <h3 className="mb-4 text-xl font-semibold tracking-tight text-[#001A53]">
                      {product.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#29456f]">
                      {product.description || 'Tidak ada deskripsi tersedia.'}
                    </p>
                  </div>
                  <div className="mt-auto pt-8">
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#004AEB] transition-colors hover:text-[#001A53]"
                    >
                      Pelajari Selengkapnya
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};
