import type { FC } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/container';

export interface BlogDetailHeaderProps {
  title: string;
  createdAt: Date;
  authorName?: string | null;
  category?: string | null;
}

export const BlogDetailHeader: FC<BlogDetailHeaderProps> = ({
  title,
  createdAt,
  authorName,
  category,
}) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(createdAt));

  return (
    <section className="border-b border-neutral-200 bg-[#F8FAFC] py-16 sm:py-20">
      <Container className="max-w-6xl">
        <Link
          href="/blog"
          className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-deep"
        >
          <ArrowLeft className="h-4 w-4" /> All stories
        </Link>
        <div className="mt-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
            <span className="text-[#1D4ED8]">{category || 'Hospitality'}</span>
            <span>{formattedDate}</span>
            {authorName && <span>By {authorName}</span>}
          </div>
          <h1 className="mt-5 text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-brand-deep sm:text-5xl md:text-6xl">
            {title}
          </h1>
        </div>
      </Container>
    </section>
  );
};
