import { genPageMetadata } from '@/app/seo';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { BlogList } from '@/app/(root)/_components/blog/BlogList';

export const metadata = genPageMetadata({
  title: 'News & Insights | PT. Pyxis Ultimate Solution',
  description:
    'Perspectives on hospitality operations, connected technology, and the systems behind better service.',
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
      articleCategories: { select: { name: true }, take: 1 },
    },
    orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
  });

  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_82%_24%,rgba(96,165,250,0.22),transparent_34%),linear-gradient(135deg,#004AEB_0%,#001A53_100%)] py-24 text-white md:py-32 lg:flex lg:min-h-[649px] lg:items-center">
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:translate-y-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="max-w-4xl border-t border-white/25 pt-9 lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100/75">
                News &amp; insights
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.06] tracking-[-0.035em] sm:text-5xl lg:text-[4rem]">
                News and insights from Pyxis.
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-7 text-blue-50/90 sm:text-base">
                Practical perspectives on hotel operations, hospitality technology, and the teams
                behind every stay.
              </p>
              <Link
                href="/contact"
                className="group mt-8 inline-flex items-center gap-3 border-b border-[#F59E0B] pb-2 text-sm font-semibold text-white transition-colors duration-200 hover:text-[#FBBF24]"
              >
                Talk to our team
                <span className="text-lg leading-none transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  ↗
                </span>
              </Link>
            </div>

            <div className="lg:col-span-5">
              <div className="border border-white/25 bg-white text-neutral-900">
                <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500 sm:px-6">
                  <span>Official platform brief</span>
                  <span className="text-[#1D4ED8]">Pyxis-X</span>
                </div>
                <div className="px-5 py-6 sm:px-6">
                  <p className="text-2xl font-semibold leading-tight tracking-tight text-neutral-950">
                    Trusted partner in business growth
                  </p>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-600">
                    The Next-Tech 5.0. Distributed data management &amp; Integration.
                  </p>
                </div>
                <div className="grid grid-cols-2 border-t border-neutral-200">
                  {[
                    ['232', 'Happy clients'],
                    ['521', 'Projects'],
                    ['60', 'Partners'],
                    ['15', 'Developers'],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      className="border-b border-r border-neutral-200 px-5 py-4 last:border-r-0 sm:px-6"
                    >
                      <p className="text-2xl font-semibold tracking-tight text-[#1D4ED8]">
                        {value}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.12em] text-neutral-500">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BlogList
        articles={articles.map(({ publishedAt, articleCategories, ...article }) => ({
          ...article,
          category: articleCategories[0]?.name || null,
          createdAt: publishedAt || article.createdAt,
        }))}
      />
    </div>
  );
}
