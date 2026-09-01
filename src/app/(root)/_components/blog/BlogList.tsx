import type { FC } from 'react';
import type { Route } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Newspaper } from 'lucide-react';
import { Container } from '@/components/ui/container';

export interface ArticleItem {
  id: string;
  title: string;
  content: string;
  cover?: string | null;
  slug?: string | null;
  createdAt: Date;
}

export interface BlogListProps {
  articles: ArticleItem[];
}

export const BlogList: FC<BlogListProps> = ({ articles }) => {
  return (
    <section className="py-16 bg-neutral-50/50">
      <Container>
        {!articles || articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 md:p-16 rounded-2xl border border-dashed border-neutral-300 bg-white text-center max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Newspaper className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-800 mb-1">Belum ada artikel saat ini.</h3>
            <p className="text-sm text-neutral-500 max-w-sm">
              Kami sedang menyiapkan berita dan artikel terbaru. Kunjungi kembali nanti untuk
              informasi dan wawasan menarik seputar industri perhotelan.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
              {articles.map((article) => {
                const formattedDate = new Intl.DateTimeFormat('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }).format(new Date(article.createdAt));

                // Strip HTML tags for clean excerpt
                const plainText = article.content.replace(/<[^>]+>/g, '').trim();
                const targetUrl = `/blog/${article.slug || article.id}` as Route;

                return (
                  <div
                    key={article.id}
                    className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      {article.cover ? (
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-5 bg-neutral-100">
                          <Image
                            src={article.cover}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-full aspect-video bg-neutral-400 rounded-xl mb-5" />
                      )}

                      <span className="block text-xs font-medium text-neutral-400 mb-2">
                        {formattedDate}
                      </span>

                      <h3 className="text-base sm:text-lg font-bold text-neutral-900 mb-2 line-clamp-2 leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed mb-4">
                        {plainText || 'Tidak ada ringkasan.'}
                      </p>
                    </div>

                    <div>
                      <Link
                        href={targetUrl}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D4ED8] hover:text-[#1E40AF] transition-colors"
                      >
                        Baca Selengkapnya
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </Container>
    </section>
  );
};
