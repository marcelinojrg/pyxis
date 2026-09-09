import { notFound } from 'next/navigation';
import { ProductForm } from '@/app/(admin)/_components/products/ProductForm';
import { getAdminProductById } from '@/services/admin/products';

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = { title: 'Edit product — Pyxis Admin' };

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const result = await getAdminProductById(id);
  if (!result.success || !result.data) notFound();

  return <ProductForm product={result.data} />;
}
