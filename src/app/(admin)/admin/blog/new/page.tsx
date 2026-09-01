import { ArticleForm } from '@/app/(admin)/_components/blog/ArticleForm';
import { getCategories } from '@/services/admin/articles';

export const metadata = { title: 'Tulis Artikel — Pyxis Admin' };

export default async function NewArticlePage() {
  const categories = await getCategories();
  return <ArticleForm categories={categories.data} />;
}
