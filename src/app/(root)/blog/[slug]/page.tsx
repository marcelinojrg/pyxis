import { notFound } from 'next/navigation';
import { genPageMetadata } from '@/app/seo';
import { prisma } from '@/lib/prisma';
import { BlogDetailHeader } from '@/app/(root)/_components/BlogDetailHeader';
import { BlogDetailContent } from '@/app/(root)/_components/BlogDetailContent';

export const revalidate = 60;

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const article = await prisma.article.findFirst({
    where: { OR: [{ slug }, { id: slug }] },
  });

  if (!article) return genPageMetadata({ title: 'Artikel Tidak Ditemukan' });

  return genPageMetadata({
    title: `${article.title} — Blog PT. Pyxis Ultimate Solution`,
    description: article.content.replace(/<[^>]+>/g, '').slice(0, 160),
    image: article.cover || undefined,
  });
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  const article = await prisma.article.findFirst({
    where: { OR: [{ slug }, { id: slug }] },
    include: {
      createdBy: { select: { name: true } },
    },
  });

  if (!article) {
    notFound();
  }

  const relatedArticles = await prisma.article.findMany({
    where: { id: { not: article.id } },
    take: 3,
    select: {
      id: true,
      title: true,
      slug: true,
      cover: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <BlogDetailHeader
        title={article.title}
        createdAt={article.createdAt}
        authorName={article.createdBy?.name}
      />
      <BlogDetailContent
        title={article.title}
        content={article.content}
        cover={article.cover}
        relatedArticles={relatedArticles}
      />
    </div>
  );
}
