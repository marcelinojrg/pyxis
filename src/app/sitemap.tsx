import type { MetadataRoute } from 'next';

import { siteMetadata } from '@/data/siteMetadata';
import { prisma } from '@/lib/prisma';

const STATIC_ROUTES = [
  '/',
  '/about',
  '/products',
  '/partners',
  '/careers',
  '/blog',
  '/contact',
  '/legal',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = siteMetadata.siteUrl || 'http://localhost:3000';
  const staticRoutes: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${siteUrl}${route === '/' ? '' : route}`,
  }));

  try {
    const [products, articles, careers] = await Promise.all([
      prisma.product.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.article.findMany({ select: { slug: true, id: true, updatedAt: true } }),
      prisma.career.findMany({
        where: { isActive: true },
        select: { slug: true, updatedAt: true },
      }),
    ]);

    return [
      ...staticRoutes,
      ...products.map((product) => ({
        url: `${siteUrl}/products/${product.slug}`,
        lastModified: product.updatedAt,
      })),
      ...articles.map((article) => ({
        url: `${siteUrl}/blog/${article.slug || article.id}`,
        lastModified: article.updatedAt,
      })),
      ...careers.map((career) => ({
        url: `${siteUrl}/careers/${career.slug}`,
        lastModified: career.updatedAt,
      })),
    ];
  } catch (error) {
    console.error('[sitemap] Failed to load dynamic routes:', error);
    return staticRoutes;
  }
}
