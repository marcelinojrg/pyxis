import { ArrowDown } from 'lucide-react';
import { genPageMetadata } from '@/app/seo';
import { prisma } from '@/lib/prisma';
import PageHero from '@/components/Common/PageHero';
import { ProductsList } from '@/app/(root)/_components/products/ProductsList';
import CTASection from '@/components/Common/CTASection';

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
      <PageHero
        title="Solusi Hospitality Terintegrasi"
        description="Berdayakan operasional hotel Anda dengan teknologi modern yang dirancang untuk efisiensi, skalabilitas, dan pengalaman tamu yang tak terlupakan."
        ctaText="Lihat Produk"
        ctaHref="#products-list"
        ctaIcon={<ArrowDown className="w-4 h-4" />}
      />
      <ProductsList products={products} />
      <CTASection />
    </div>
  );
}
