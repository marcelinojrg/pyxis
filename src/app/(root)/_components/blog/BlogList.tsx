import type { FC } from 'react';
import { Container } from '@/components/ui/container';
import { BlogCard, type BlogCardArticle } from './BlogCard';

export type ArticleItem = BlogCardArticle;

export interface BlogListProps {
  articles: ArticleItem[];
}

export const BlogList: FC<BlogListProps> = ({ articles }) => {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container>
        {!articles || articles.length === 0 ? (
          <div className="border-y border-neutral-200 py-12 sm:py-16">
            <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-4xl">
              No stories published yet.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-neutral-600">
              New perspectives on hospitality operations, technology, and the teams behind every
              stay will appear here.
            </p>
          </div>
        ) : (
          <>
            <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <BlogCard article={articles[0]} index={0} featured />
              </div>

              {articles.length > 1 && (
                <div className="space-y-12 lg:col-span-5">
                  {articles.slice(1, 3).map((article, index) => (
                    <BlogCard key={article.id} article={article} index={index + 1} />
                  ))}
                </div>
              )}
            </div>

            {articles.length > 3 && (
              <div className="mt-20 border-t border-neutral-200 pt-10 sm:mt-24">
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                  Latest stories
                </h2>
                <div className="mt-8 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                  {articles.slice(3).map((article, index) => (
                    <BlogCard key={article.id} article={article} index={index + 3} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
};
