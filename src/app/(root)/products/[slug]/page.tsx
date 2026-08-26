import { notFound } from 'next/navigation';
import { genPageMetadata } from '@/app/seo';
import { prisma } from '@/lib/prisma';
import { ProductDetailHero } from '@/app/(root)/_components/products/ProductDetailHero';
import { ProductDetailBenefits } from '@/app/(root)/_components/products/ProductDetailBenefits';
import { ProductDetailDescription } from '@/app/(root)/_components/products/ProductDetailDescription';
import { ProductDetailFeatures } from '@/app/(root)/_components/products/ProductDetailFeatures';
import { ProductDetailCapabilities } from '@/app/(root)/_components/products/ProductDetailCapabilities';
import HomeCTA from '@/app/(root)/_components/home/HomeCTA';

export const revalidate = 60;

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await prisma.product.findFirst({ where: { slug, isActive: true } });
  if (!product) return genPageMetadata({ title: 'Produk Tidak Ditemukan' });

  return genPageMetadata({
    title: `${product.name} — Pyxis Ultimate Solution`,
    description: product.description || undefined,
    image: product.image || undefined,
    path: `/products/${product.slug}`,
  });
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findFirst({
    where: { slug, isActive: true },
    include: {
      benefits: { orderBy: { order: 'asc' } },
      features: { orderBy: { order: 'asc' } },
      capabilities: {
        include: {
          items: { orderBy: { order: 'asc' } },
        },
      },
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <ProductDetailHero
        name={product.name}
        description={product.description}
        image={product.image}
        slug={product.slug}
      />
      <ProductDetailBenefits benefits={product.benefits} />
      <ProductDetailDescription content={product.featureSubtitle} />
      <ProductDetailFeatures features={product.features} />
      <ProductDetailCapabilities capabilities={product.capabilities} />
      <HomeCTA />
    </div>
  );
}
