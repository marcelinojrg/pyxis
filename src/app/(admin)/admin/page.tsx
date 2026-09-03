import Link from 'next/link';
import type { Route } from 'next';
import {
  ArrowRight,
  BriefcaseBusiness,
  ExternalLink,
  Newspaper,
  Package,
  Plus,
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Dashboard Admin — PT. Pyxis Ultimate Solution',
};

export default async function AdminDashboardPage() {
  const [
    productTotal,
    activeProducts,
    articleTotal,
    publishedArticles,
    careerTotal,
    activeCareers,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { isActive: true } }),
    prisma.article.count(),
    prisma.article.count({ where: { isPublished: true } }),
    prisma.career.count(),
    prisma.career.count({ where: { isActive: true } }),
  ]);

  const statistics = [
    {
      label: 'Produk',
      value: productTotal,
      detail: `${activeProducts} aktif · ${productTotal - activeProducts} nonaktif`,
      icon: Package,
      href: '/admin/products' as Route,
    },
    {
      label: 'Artikel Blog',
      value: articleTotal,
      detail: `${publishedArticles} terbit · ${articleTotal - publishedArticles} draft`,
      icon: Newspaper,
      href: '/admin/blog' as Route,
    },
    {
      label: 'Lowongan Karier',
      value: careerTotal,
      detail: `${activeCareers} aktif · ${careerTotal - activeCareers} nonaktif`,
      icon: BriefcaseBusiness,
      href: '/admin/careers' as Route,
    },
  ];

  const actions = [
    { label: 'Tambah produk', href: '/admin/products/new' as Route, icon: Package },
    { label: 'Tulis artikel', href: '/admin/blog/new' as Route, icon: Newspaper },
    { label: 'Buat lowongan', href: '/admin/careers/new' as Route, icon: BriefcaseBusiness },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Console Administrasi</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Kelola katalog produk, publikasi blog, dan lowongan karier dari satu tempat.
          </p>
        </div>
        <Button asChild variant="outline" className="h-11 w-full sm:w-auto">
          <Link href={'/' as Route} target="_blank">
            <ExternalLink className="size-4" />
            Lihat website
          </Link>
        </Button>
      </div>

      <section aria-labelledby="ringkasan-konten">
        <h2 id="ringkasan-konten" className="mb-3 text-sm font-semibold text-slate-700">
          Ringkasan konten
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {statistics.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.label}
                href={stat.href}
                className="group rounded-md bg-white p-5 shadow-sm outline-none ring-1 ring-slate-200 transition hover:ring-slate-300 focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                    <p className="mt-2 text-3xl font-bold tabular-nums text-slate-900">
                      {stat.value}
                    </p>
                  </div>
                  <span className="flex size-10 items-center justify-center rounded-lg bg-slate-100 text-blue-700 transition-colors group-hover:bg-blue-50">
                    <Icon className="size-5" />
                  </span>
                </div>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
                  <span className="text-xs text-slate-500">{stat.detail}</span>
                  <ArrowRight className="size-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section
        aria-labelledby="aksi-cepat"
        className="rounded-md bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6"
      >
        <div className="mb-4">
          <h2 id="aksi-cepat" className="text-base font-semibold text-slate-900">
            Aksi cepat
          </h2>
          <p className="mt-1 text-sm text-slate-500">Buat konten baru pada tiga kanal publik.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.label}
                asChild
                variant="outline"
                className="h-12 justify-between px-4"
              >
                <Link href={action.href}>
                  <span className="flex items-center gap-2">
                    <Icon className="size-4 text-slate-500" />
                    {action.label}
                  </span>
                  <Plus className="size-4" />
                </Link>
              </Button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
