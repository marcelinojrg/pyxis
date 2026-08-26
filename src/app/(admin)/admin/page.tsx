import { ArrowUpRight, BriefcaseBusiness, Mail, Newspaper, Package } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Dashboard Admin — PT. Pyxis Ultimate Solution',
};

export default async function AdminDashboardPage() {
  const [productTotal, partnerTotal, articleTotal] = await Promise.all([
    prisma.product.count(),
    prisma.client.count(),
    prisma.article.count(),
  ]);

  const statistics = [
    {
      label: 'Total Produk',
      value: productTotal,
      icon: Package,
      iconClass: 'bg-[#DCE6FF] text-[#123A91]',
    },
    {
      label: 'Total Partner',
      value: partnerTotal,
      icon: BriefcaseBusiness,
      iconClass: 'bg-[#D6F8E7] text-[#13A36B]',
    },
    {
      label: 'Artikel Blog',
      value: articleTotal,
      icon: Newspaper,
      iconClass: 'bg-[#F0E1FF] text-[#8A2BE2]',
    },
    {
      label: 'Pesan Belum Dibaca',
      value: 0,
      icon: Mail,
      iconClass: 'bg-[#FFE2BC] text-[#F59E0B]',
      valueClass: 'text-[#F59E0B]',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#172033]">Dashboard</h1>
        <p className="mt-1 text-base text-[#5A6272]">Selamat datang kembali, Admin Pyxis</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((statistic) => {
          const Icon = statistic.icon;
          return (
            <div
              key={statistic.label}
              className="flex min-h-30 items-center gap-4 rounded-xl border border-[#C7CFDF] bg-white px-6 py-5 shadow-[0_8px_24px_rgba(30,41,59,0.05)]"
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${statistic.iconClass}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#4D5361]">{statistic.label}</p>
                <p
                  className={`mt-1 text-2xl font-bold ${statistic.valueClass || 'text-[#172033]'}`}
                >
                  {statistic.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <section className="overflow-hidden rounded-xl border border-[#C7CFDF] bg-white shadow-[0_8px_24px_rgba(30,41,59,0.05)]">
        <div className="flex items-center justify-between border-b border-[#D5DAE4] px-6 py-5">
          <h2 className="text-xl font-bold text-[#172033]">Aktivitas Terbaru: Pesan Masuk</h2>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#123A91]">
            Lihat Semua <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
        <div className="flex min-h-48 items-center justify-center px-6 py-12 text-center">
          <div>
            <Mail className="mx-auto h-8 w-8 text-[#AAB3C3]" />
            <p className="mt-3 text-sm font-medium text-[#5A6272]">Belum ada pesan masuk</p>
            <p className="mt-1 text-xs text-[#8992A3]">
              Pesan dari pengunjung akan muncul di sini.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
