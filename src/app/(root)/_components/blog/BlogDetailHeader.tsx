import type { FC } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Container } from '@/components/ui/container';

export interface BlogDetailHeaderProps {
  title: string;
  createdAt: Date;
  authorName?: string | null;
}

export const BlogDetailHeader: FC<BlogDetailHeaderProps> = ({ title, createdAt }) => {
  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(createdAt));

  return (
    <section className="bg-[#f7f8fa] pt-28 pb-5 md:pt-32 md:pb-8">
      <Container className="max-w-5xl">
        <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#07358b] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali ke Blog
        </Link>
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#07358b] leading-tight mb-4">
            {title}
          </h1>
          <div className="flex items-center text-xs sm:text-sm text-neutral-500">
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formattedDate}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
};
