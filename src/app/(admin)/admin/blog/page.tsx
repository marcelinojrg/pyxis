import { ArticleTable } from '@/app/(admin)/_components/blog/ArticleTable';
import { CategoryManager } from '@/app/(admin)/_components/blog/CategoryManager';
import { getArticles, getCategories } from '@/services/admin/articles';

export const metadata = { title: 'Manage blog — Pyxis Admin' };

export default async function AdminBlogPage() {
  const [articles, categories] = await Promise.all([getArticles(), getCategories()]);
  const error = articles.error || categories.error;

  return (
    <div className="w-full min-w-0 space-y-6">
      {error && (
        <p role="alert" className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}
      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <ArticleTable articles={articles.data} />
        <CategoryManager categories={categories.data} />
      </div>
    </div>
  );
}
