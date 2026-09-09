import { genPageMetadata } from '@/app/seo';
import { prisma } from '@/lib/prisma';
import { ProductsList } from '@/app/(root)/_components/products/ProductsList';
import CTASection from '@/components/Common/CTASection';
import EditorialHero from '@/components/Common/EditorialHero';

export const metadata = genPageMetadata({
  title: 'Products | Integrated Hospitality Systems',
  description:
    'Explore Pyxis systems for front office, food and beverage, finance, inventory, distribution, and connected hotel operations.',
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
    <div className="flex min-h-screen flex-col bg-neutral-50/50">
      <EditorialHero
        eyebrow="Products"
        title="Systems that keep hospitality moving."
        description="Connected tools for the front desk, restaurants, finance, and every operation in between."
        ctaText="Explore the suite"
        ctaHref="#products-list"
      >
        <div aria-hidden="true" className="min-h-56" />
      </EditorialHero>
      <ProductsList products={products} />
      <CTASection />
    </div>
  );
}
