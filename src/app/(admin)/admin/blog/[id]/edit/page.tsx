import { notFound } from 'next/navigation';
import { ArticleForm } from '@/app/(admin)/_components/blog/ArticleForm';
import { getArticleById, getCategories } from '@/services/admin/articles';

interface EditArticlePageProps {
  params: Promise<{ id: string }>;
}

export const metadata = { title: 'Edit article — Pyxis Admin' };

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const { id } = await params;
  const [article, categories] = await Promise.all([getArticleById(id), getCategories()]);
  if (!article.success || !article.data) notFound();

  return <ArticleForm article={article.data} categories={categories.data} />;
}
