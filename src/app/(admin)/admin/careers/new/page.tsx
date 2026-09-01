import { CareerForm } from '@/app/(admin)/_components/careers/CareerForm';
import { getCareerCategories } from '@/services/admin/careers';

export const metadata = { title: 'Tambah Lowongan — Pyxis Admin' };

export default async function NewCareerPage() {
  const categories = await getCareerCategories();
  return <CareerForm categories={categories.data || []} />;
}
