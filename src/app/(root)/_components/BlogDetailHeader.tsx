import type { FC } from 'react';
import Link from 'next/link';
import { ChevronRight, Calendar, User } from 'lucide-react';
import { Container } from '@/components/ui/container';

export interface BlogDetailHeaderProps {
  title: string;
  createdAt: Date;
  authorName?: string | null;
}

export const BlogDetailHeader: FC<BlogDetailHeaderProps> = ({ title, createdAt, authorName }) => {
  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(createdAt));

  return (
    <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-gradient-to-r from-[#001A53] to-[#004AEB] text-white">
      <Container>
        <nav className="flex items-center gap-2 text-xs text-blue-200 mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            Beranda
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-blue-300" />
          <Link href="/blog" className="hover:text-white transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-blue-300" />
          <span className="text-white font-medium truncate max-w-xs">{title}</span>
        </nav>

        <div className="max-w-4xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white leading-tight mb-6">
            {title}
          </h1>
          <div className="flex items-center gap-6 text-xs sm:text-sm text-blue-100">
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-300" />
              {formattedDate}
            </span>
            {authorName && (
              <span className="inline-flex items-center gap-2">
                <User className="w-4 h-4 text-blue-300" />
                {authorName}
              </span>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
