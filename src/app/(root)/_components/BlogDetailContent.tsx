import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import { Container } from '@/components/ui/container';

export interface RelatedArticle {
  id: string;
  title: string;
  slug?: string | null;
  cover?: string | null;
  createdAt: Date;
}

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
  return (
    <section className="py-12 md:py-16 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          {cover && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10 shadow-lg bg-neutral-100">
              <Image src={cover} alt={title} fill className="object-cover" priority />
            </div>
          )}

          {/* Body Rich Text Article Content */}
          <div
            className="article-content leading-relaxed mb-16"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <div className="border-t border-neutral-200 pt-12">
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Artikel Terkait</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((art) => {
                  const targetUrl = `/blog/${art.slug || art.id}` as Route;
                  return (
                    <Link
                      key={art.id}
                      href={targetUrl}
                      className="group bg-neutral-50 rounded-xl p-4 border border-neutral-200/80 hover:border-blue-300 transition-all flex flex-col justify-between"
                    >
                      {art.cover ? (
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-3 bg-neutral-100">
                          <Image
                            src={art.cover}
                            alt={art.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                      ) : (
                        <div className="w-full aspect-video bg-neutral-200 rounded-lg mb-3" />
                      )}
                      <h4 className="text-sm font-bold text-neutral-900 group-hover:text-blue-600 line-clamp-2 transition-colors">
                        {art.title}
                      </h4>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};
