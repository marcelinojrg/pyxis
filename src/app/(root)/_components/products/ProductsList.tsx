'use client';

import { useMemo, useState, type FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, PackageOpen, Search, X } from 'lucide-react';
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
  const [search, setSearch] = useState('');
  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return products;

    return products.filter((product) =>
      `${product.name} ${product.description || ''}`.toLowerCase().includes(query)
    );
  }, [products, search]);

  return (
    <section id="products-list" className="border-t border-neutral-200/70 bg-white py-20 sm:py-24">
      <Container>
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <h2 className="max-w-3xl text-3xl font-bold leading-[1.08] tracking-tight text-neutral-900 sm:text-4xl">
              One operating layer for every part of hospitality.
            </h2>
          </div>
          <div className="w-full max-w-md lg:col-span-4 lg:justify-self-end">
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <div className="group flex items-center gap-3 border-b border-neutral-300 pb-3 transition-colors focus-within:border-[#1D4ED8]">
              <Search
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-neutral-500 transition-colors group-focus-within:text-[#1D4ED8]"
              />
              <input
                id="product-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products or capabilities"
                className="min-w-0 flex-1 bg-transparent text-base text-neutral-900 outline-none placeholder:text-neutral-400"
              />
              {search && (
                <button
                  type="button"
                  aria-label="Clear product search"
                  onClick={() => setSearch('')}
                  className="rounded-full p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] focus-visible:ring-offset-2"
                >
                  <X aria-hidden="true" className="h-4 w-4" />
                </button>
              )}
            </div>
            <p aria-live="polite" className="mt-3 text-xs text-neutral-500">
              {search
                ? `${filteredProducts.length} ${filteredProducts.length === 1 ? 'match' : 'matches'}`
                : `${products.length} systems`}
            </p>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="mx-auto mt-12 flex max-w-xl flex-col items-center justify-center border border-dashed border-neutral-300 bg-neutral-50 p-12 text-center md:mt-16 md:p-16">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-neutral-500">
              <PackageOpen className="h-6 w-6" />
            </div>
            <h3 className="mb-1 text-lg font-bold text-neutral-800">
              {products.length === 0 ? 'Products are being prepared.' : 'No matching systems.'}
            </h3>
            <p className="max-w-sm text-sm text-neutral-500">
              {products.length === 0
                ? 'Contact our team to discuss the right setup for your property.'
                : 'Try a different product name or capability.'}
            </p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group flex h-full flex-col border-t border-neutral-300 pt-4"
              >
                {product.image ? (
                  <Link
                    href={`/products/${product.slug}`}
                    aria-label={`View ${product.name}`}
                    className="relative mb-6 block aspect-[16/10] w-full overflow-hidden bg-[#E8EEF8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] focus-visible:ring-offset-4"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </Link>
                ) : (
                  <div className="mb-6 aspect-[16/10] w-full bg-[#E8EEF8]" />
                )}
                <div className="flex flex-1 flex-col">
                  <h3 className="max-w-sm text-xl font-semibold leading-tight tracking-[-0.02em] text-[#001A53] sm:text-2xl">
                    <Link
                      href={`/products/${product.slug}`}
                      className="rounded-sm transition-colors hover:text-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] focus-visible:ring-offset-4"
                    >
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-4 max-w-sm text-sm leading-7 text-neutral-600">
                    {product.description || 'No product description available.'}
                  </p>
                  <Link
                    href={`/products/${product.slug}`}
                    className="product-card-action mt-auto inline-flex w-fit items-center gap-2 border-b border-[#1D4ED8] pb-1 pt-6 text-sm font-semibold text-[#1D4ED8] transition-colors hover:border-[#001A53] hover:text-[#001A53]"
                  >
                    View product
                    <ArrowUpRight className="product-card-action-icon h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};
