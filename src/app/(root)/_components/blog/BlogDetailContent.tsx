import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SanitizedHtml } from '@/components/Common/SanitizedHtml';
import { BlogCard, getBlogCover, type BlogCardArticle } from './BlogCard';

export interface RelatedArticle extends BlogCardArticle {}

export interface BlogDetailContentProps {
  content: string;
  cover?: string | null;
  title: string;
  relatedArticles: RelatedArticle[];
}

export const BlogDetailContent: FC<BlogDetailContentProps> = ({
  content,
  cover,
  title,
  relatedArticles,
}) => {
  const articleCover = getBlogCover(cover);

  return (
    <section className="bg-white pb-16 sm:pb-24">
      <Container className="max-w-6xl">
        <div className="relative aspect-[16/8] overflow-hidden border-b border-neutral-300 bg-neutral-100">
          <Image src={articleCover} alt={title} fill className="object-cover" priority />
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <article className="lg:col-span-8 lg:col-start-2">
            <SanitizedHtml content={content} className="blog-article-content" />
          </article>
        </div>

        <div className="mt-16 grid gap-6 border-y border-neutral-200 py-8 md:grid-cols-[1fr_auto] md:items-end md:gap-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-3xl">
              See what a connected operation can change.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-600">
              Talk to the Pyxis team about the systems behind your property.
            </p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 border-b border-[#F59E0B] pb-2 text-sm font-semibold text-neutral-900 transition-colors hover:text-[#1D4ED8]"
          >
            Talk to our team
            <ArrowUpRight className="h-5 w-5 rotate-90 transition-transform duration-300 group-hover:rotate-0" />
          </Link>
        </div>

        {relatedArticles.length > 0 && (
          <div className="mt-20 border-t border-neutral-200 pt-10 sm:mt-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                More stories
              </h2>
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 border-b border-[#F59E0B] pb-1 text-sm font-semibold text-neutral-900 transition-colors hover:text-[#1D4ED8]"
              >
                View all
                <ArrowUpRight className="h-4 w-4 rotate-90 transition-transform duration-300 group-hover:rotate-0" />
              </Link>
            </div>
            <div className="mt-8 grid gap-x-8 gap-y-12 md:grid-cols-3">
              {relatedArticles.map((article, index) => (
                <BlogCard key={article.id} article={article} index={index + 1} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};
