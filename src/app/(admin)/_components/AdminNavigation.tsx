'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Route } from 'next';
import {
  BriefcaseBusiness,
  ChevronRight,
  ExternalLink,
  LayoutDashboard,
  Newspaper,
  Package,
} from 'lucide-react';

const navigationGroups = [
  {
    title: 'Utama',
    items: [
      { label: 'Dashboard', href: '/admin' as Route, icon: LayoutDashboard },
      { label: 'Produk Layanan', href: '/admin/products' as Route, icon: Package },
    ],
  },
  {
    title: 'Konten & Publikasi',
    items: [
      { label: 'Artikel Blog', href: '/admin/blog' as Route, icon: Newspaper },
      { label: 'Karier & Lowongan', href: '/admin/careers' as Route, icon: BriefcaseBusiness },
    ],
  },
];

export function AdminNavigation({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-1 flex-col justify-between overflow-y-auto px-3 py-4">
      <div className="space-y-6">
        {navigationGroups.map((group) => (
          <div key={group.title} className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              {group.title}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onNavigate}
                    className={`group flex min-h-11 items-center justify-between rounded-lg px-3 py-2 text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 ${
                      isActive
                        ? 'bg-blue-600 font-semibold text-white shadow-xs'
                        : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <Icon
                        className={`size-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}
                      />
                      <span className="truncate">{item.label}</span>
                    </span>
                    {isActive ? <ChevronRight className="size-3.5 text-blue-200" /> : null}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-slate-800/80 pt-4">
        <Link
          href={'/' as Route}
          target="_blank"
          onClick={onNavigate}
          className="group flex min-h-11 items-center gap-2.5 rounded-lg border border-slate-800 bg-slate-900/50 p-2.5 text-xs font-medium text-slate-300 transition-colors hover:border-slate-700 hover:bg-slate-800/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          <ExternalLink className="size-3.5 shrink-0 text-slate-400 group-hover:text-blue-400" />
          <span className="truncate">Buka Website Publik</span>
          <span className="sr-only">di tab baru</span>
        </Link>
      </div>
    </div>
  );
}
