import { genPageMetadata } from '@/app/seo';
import { prisma } from '@/lib/prisma';
import { BlogHero } from '@/app/(root)/_components/blog/BlogHero';
import { BlogList } from '@/app/(root)/_components/blog/BlogList';

export const metadata = genPageMetadata({
  title: 'Blog & Kegiatan — Berita Terbaru PT. Pyxis Ultimate Solution',
  description:
    'Ikuti perkembangan terbaru, rilis fitur software hotel Alcor PMS & POS, serta liputan kegiatan PT. Pyxis Ultimate Solution.',
  path: '/blog',
});

export const revalidate = 60;

export default async function BlogPage() {
  const now = new Date();
  const articles = await prisma.article.findMany({
    where: {
      isPublished: true,
      publishedAt: { not: null, lte: now },
    },
    select: {
      id: true,
      title: true,
      content: true,
      cover: true,
      slug: true,
      createdAt: true,
      publishedAt: true,
    },
    orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
  });

  return (
    <div className="flex min-h-screen flex-col">
      <BlogHero />
      <BlogList
        articles={articles.map(({ publishedAt, ...article }) => ({
          ...article,
          createdAt: publishedAt || article.createdAt,
        }))}
      />
    </div>
  );
}
