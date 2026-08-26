import { genPageMetadata } from '@/app/seo';
import { prisma } from '@/lib/prisma';
import { ProductsHero } from '@/app/(root)/_components/products/ProductsHero';
import { ProductsList } from '@/app/(root)/_components/products/ProductsList';
import HomeCTA from '@/app/(root)/_components/home/HomeCTA';

export const metadata = genPageMetadata({
  title: 'Produk — Solusi Software Hotel & Restoran Terintegrasi',
  description:
    'Katalog lengkap produk software PT. Pyxis Ultimate Solution: Alcor PMS, POS, Booking Engine, Channel Manager, dan modul terintegrasi lainnya.',
  path: '/products',
});

export const revalidate = 60;

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: {
      id: true,
      name: true,
      description: true,
      image: true,
      slug: true,
    },
    orderBy: {
      order: 'asc',
    },
  });

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50/50">
      <ProductsHero />
      <ProductsList products={products} />
      <HomeCTA />
    </div>
  );
}
