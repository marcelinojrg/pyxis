import { notFound } from 'next/navigation';
import { CareerForm } from '@/app/(admin)/_components/careers/CareerForm';
import { getAdminCareerById, getCareerCategories } from '@/services/admin/careers';

interface EditCareerPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = { title: 'Edit opening — Pyxis Admin' };

export default async function EditCareerPage({ params }: EditCareerPageProps) {
  const { id } = await params;
  const [career, categories] = await Promise.all([getAdminCareerById(id), getCareerCategories()]);
  if (!career.success || !career.data) notFound();

  return <CareerForm career={career.data} categories={categories.data || []} />;
}
