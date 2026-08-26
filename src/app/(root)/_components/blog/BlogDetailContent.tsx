import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SanitizedHtml } from '@/components/Common/SanitizedHtml';

export interface RelatedArticle {
  id: string;
  title: string;
  content: string;
  slug?: string | null;
  cover?: string | null;
  createdAt: Date;
  articleCategories: { name: string }[];
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
    <section className="bg-[#f7f8fa] pb-14 md:pb-20">
      <Container className="max-w-5xl">
        <div className="max-w-4xl mx-auto">
          {cover && (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8 bg-neutral-300">
              <Image src={cover} alt={title} fill className="object-cover" priority />
            </div>
          )}

          <SanitizedHtml content={content} className="article-content pyxis-article mb-12" />

          <div className="rounded-lg border border-[#dbe3ff] bg-[#eff2ff] px-6 py-7 text-center mb-14">
            <h2 className="text-base font-bold text-[#07358b]">Tertarik dengan produk Pyxis?</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Jadwalkan sesi konsultasi gratis dengan tim ahli kami untuk melihat bagaimana Pyxis
              dapat mentransformasi operasional hotel Anda.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex rounded-md bg-[#07358b] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#052769]"
            >
              Hubungi Kami
            </Link>
          </div>

          {relatedArticles.length > 0 && (
            <div>
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-[#07358b]">Artikel Lainnya</h3>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#07358b] hover:underline"
                >
                  Lihat Semua <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {relatedArticles.map((art) => {
                  const targetUrl = `/blog/${art.slug || art.id}` as Route;
                  const excerpt = art.content.replace(/<[^>]+>/g, '').trim();
                  return (
                    <Link
                      key={art.id}
                      href={targetUrl}
                      className="group overflow-hidden rounded-lg border border-neutral-200 bg-white hover:border-[#9fb7ee] transition-colors"
                    >
                      {art.cover ? (
                        <div className="relative w-full aspect-video overflow-hidden bg-neutral-400">
                          <Image
                            src={art.cover}
                            alt={art.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                      ) : (
                        <div className="w-full aspect-video bg-neutral-400" />
                      )}
                      <div className="p-4">
                        <span className="text-[11px] font-medium uppercase text-[#b27a22]">
                          {art.articleCategories[0]?.name || 'Wawasan Industri'}
                        </span>
                        <h4 className="mt-2 text-sm font-bold leading-snug text-[#07358b] group-hover:underline line-clamp-3">
                          {art.title}
                        </h4>
                        <p className="mt-3 text-xs leading-relaxed text-neutral-500 line-clamp-2">
                          {excerpt}
                        </p>
                      </div>
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
