import type { FC } from 'react';
import type { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export interface BlogCardArticle {
  id: string;
  title: string;
  content: string;
  cover?: string | null;
  slug?: string | null;
  createdAt: Date;
  category?: string | null;
}

export const BLOG_COVER_FALLBACKS = [
  '/assets/img/blog/blog-operating-system.jpg',
  '/assets/img/blog/blog-guest-experience.jpg',
  '/assets/img/blog/blog-connected-operation.jpg',
  '/assets/img/blog/blog-team-technology.jpg',
  '/assets/img/blog/blog-service-detail.jpg',
  '/assets/img/blog/blog-pms-operations.jpg',
  '/assets/img/blog/blog-pos-service.jpg',
  '/assets/img/blog/blog-hospitality-trends.jpg',
] as const;

export function getBlogCover(cover: string | null | undefined, index = 0) {
  return cover || BLOG_COVER_FALLBACKS[index % BLOG_COVER_FALLBACKS.length];
}

export function getArticleExcerpt(content: string) {
  return content
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

interface BlogCardProps {
  article: BlogCardArticle;
  index?: number;
  featured?: boolean;
}

export const BlogCard: FC<BlogCardProps> = ({ article, index = 0, featured = false }) => {
  const date = new Date(article.createdAt);
  const targetUrl = `/blog/${article.slug || article.id}` as Route;

  return (
    <Link
      href={targetUrl}
      className="group block border-t border-neutral-300 pt-5 transition-colors hover:border-[#1D4ED8]"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-neutral-100">
        <Image
          src={getBlogCover(article.cover, index)}
          alt={article.title}
          fill
          sizes={featured ? '(max-width: 1024px) 100vw, 58vw' : '(max-width: 768px) 100vw, 33vw'}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="pt-5">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
          <span className="text-[#1D4ED8]">{article.category || 'Hospitality'}</span>
          <time dateTime={date.toISOString()}>
            {new Intl.DateTimeFormat('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }).format(date)}
          </time>
        </div>

        <h2
          className={`${featured ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'} mt-4 max-w-2xl font-semibold leading-[1.1] tracking-tight text-neutral-900 group-hover:text-[#1D4ED8]`}
        >
          {article.title}
        </h2>
        <p className="mt-3 line-clamp-3 max-w-2xl text-sm leading-6 text-neutral-600">
          {getArticleExcerpt(article.content) || 'Read the latest from Pyxis.'}
        </p>

        <span className="mt-5 inline-flex items-center gap-2 border-b border-[#F59E0B] pb-1 text-sm font-semibold text-neutral-900 transition-colors group-hover:text-[#1D4ED8]">
          Read story
          <ArrowUpRight className="h-4 w-4 rotate-90 transition-transform duration-300 group-hover:rotate-0" />
        </span>
      </div>
    </Link>
  );
};
