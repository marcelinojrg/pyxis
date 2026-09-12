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
      { label: 'Products and services', href: '/admin/products' as Route, icon: Package },
    ],
  },
  {
    title: 'Content and publishing',
    items: [
      { label: 'Blog articles', href: '/admin/blog' as Route, icon: Newspaper },
      { label: 'Careers and openings', href: '/admin/careers' as Route, icon: BriefcaseBusiness },
    ],
  },
];

export function AdminNavigation({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-0 flex-1 flex-col justify-between overflow-y-auto overscroll-contain px-4 py-5">
      <div className="space-y-8">
        {navigationGroups.map((group) => (
          <div key={group.title} className="space-y-2">
            <p className="px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              {group.title}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onNavigate}
                    className={`group flex min-h-12 items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium outline-none transition-[background-color,color,box-shadow] focus-visible:ring-2 focus-visible:ring-blue-400 ${
                      isActive
                        ? 'bg-blue-600 font-semibold text-white shadow-sm shadow-blue-600/20'
                        : 'text-blue-950 hover:bg-blue-50 hover:text-blue-700'
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <Icon
                        className={`size-[18px] shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'}`}
                      />
                      <span className="truncate">{item.label}</span>
                    </span>
                    {isActive ? <ChevronRight className="size-3.5 text-blue-100" /> : null}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-slate-200 pt-5">
        <Link
          href={'/' as Route}
          target="_blank"
          onClick={onNavigate}
          className="group flex min-h-12 items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-blue-950 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          <ExternalLink className="size-3.5 shrink-0 text-slate-400 group-hover:text-blue-600" />
          <span className="truncate">Open public website</span>
          <span className="sr-only">di tab baru</span>
        </Link>
      </div>
    </div>
  );
}
