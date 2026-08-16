import { requireAdmin } from '@/lib/requireAdmin';

export const metadata = {
  title: 'Dashboard Admin — PT. Pyxis Ultimate Solution',
};

export default async function AdminDashboardPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
        <h1 className="text-2xl font-bold text-neutral-900">Dashboard Utama</h1>
        <p className="text-neutral-600 mt-1 text-sm">
          Selamat datang di panel pengelolaan konten website PT. Pyxis Ultimate Solution.
        </p>
      </div>
    </div>
  );
}
