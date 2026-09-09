import { CareerCategoryManager } from '@/app/(admin)/_components/careers/CareerCategoryManager';
import { CareerListHeader, CareerTable } from '@/app/(admin)/_components/careers/CareerTable';
import { getAdminCareers, getCareerCategories } from '@/services/admin/careers';

export const metadata = { title: 'Manage openings — Pyxis Admin' };

export default async function AdminCareersPage() {
  const [careers, categories] = await Promise.all([getAdminCareers(), getCareerCategories()]);

  return (
    <div className="w-full min-w-0 space-y-8">
      <CareerListHeader />
      <CareerTable careers={careers.data || []} />
      <CareerCategoryManager categories={categories.data || []} />
    </div>
  );
}
