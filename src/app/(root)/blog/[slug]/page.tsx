import { cache } from 'react';
import { notFound } from 'next/navigation';
import { genPageMetadata } from '@/app/seo';
import { prisma } from '@/lib/prisma';
import { BlogDetailHeader } from '@/app/(root)/_components/blog/BlogDetailHeader';
import { BlogDetailContent } from '@/app/(root)/_components/blog/BlogDetailContent';

export const revalidate = 60;

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

const getPublishedArticle = cache(async (slug: string) =>
  prisma.article.findFirst({
    where: {
      slug,
      isPublished: true,
      publishedAt: { not: null, lte: new Date() },
    },
    include: {
      createdBy: { select: { name: true } },
      articleCategories: { select: { id: true, name: true } },
    },
  })
);

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);

  if (!article) return genPageMetadata({ title: 'Article not found' });

  return genPageMetadata({
    title: `${article.title} — Blog PT. Pyxis Ultimate Solution`,
    description: article.content
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 160),
    image: article.cover || undefined,
    path: `/blog/${article.slug}`,
  });
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  if (!article) notFound();

  const databaseRelatedArticles = await prisma.article.findMany({
    where: {
      id: { not: article.id },
      isPublished: true,
      publishedAt: { not: null, lte: new Date() },
    },
    take: 3,
    select: {
      id: true,
      title: true,
      content: true,
      slug: true,
      cover: true,
      createdAt: true,
      publishedAt: true,
      articleCategories: { select: { name: true }, take: 1 },
    },
    orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
  });

  return (
    <div className="flex min-h-screen flex-col">
      <BlogDetailHeader
        title={article.title}
        createdAt={article.publishedAt || article.createdAt}
        authorName={article.createdBy?.name}
        category={article.articleCategories[0]?.name}
      />
      <BlogDetailContent
        title={article.title}
        content={article.content}
        cover={article.cover}
        relatedArticles={databaseRelatedArticles.map(
          ({ publishedAt, articleCategories, ...related }) => ({
            ...related,
            category: articleCategories[0]?.name || null,
            createdAt: publishedAt || related.createdAt,
          })
        )}
      />
    </div>
  );
}
