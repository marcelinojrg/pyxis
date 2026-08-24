import { genPageMetadata } from '@/app/seo';
import { prisma } from '@/lib/prisma';
import { BlogHero } from '@/app/(root)/_components/blog/BlogHero';
import { BlogList } from '@/app/(root)/_components/blog/BlogList';

export const metadata = genPageMetadata({
  title: 'Blog & Kegiatan — Berita Terbaru PT. Pyxis Ultimate Solution',
  description:
    'Ikuti perkembangan terbaru, rilis fitur software hotel Alcor PMS & POS, serta liputan kegiatan PT. Pyxis Ultimate Solution.',
});

export const revalidate = 60;

export default async function BlogPage() {
  const articles = await prisma.article.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      cover: true,
      slug: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <BlogHero />
      <BlogList articles={articles} />
    </div>
  );
}
