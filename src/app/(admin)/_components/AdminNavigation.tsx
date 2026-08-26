'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Route } from 'next';
import { BriefcaseBusiness, LayoutDashboard, Mail, Newspaper, Package } from 'lucide-react';

const navigation = [
  { label: 'Dashboard', href: '/admin' as Route, icon: LayoutDashboard },
  { label: 'Produk', href: '/admin/products' as Route, icon: Package },
  { label: 'Karir', icon: BriefcaseBusiness },
  { label: 'Blog', icon: Newspaper },
  { label: 'Pesan Masuk', icon: Mail, badge: 0 },
];

export function AdminNavigation() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-1 py-4">
      {navigation.map((item) => {
        const Icon = item.icon;
        const active = item.href
          ? item.href === '/admin'
            ? pathname === item.href
            : pathname.startsWith(item.href)
          : false;
        const className = `mx-0 flex items-center gap-4 border-l-4 px-5 py-3 text-sm transition-colors ${
          active
            ? 'border-[#AFC2FF] bg-[#24428F] font-semibold text-white'
            : 'border-transparent text-neutral-300 hover:bg-white/5 hover:text-white'
        }`;
        const content = (
          <>
            <Icon className="h-5 w-5 shrink-0" />
            <span>{item.label}</span>
            {item.badge ? (
              <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-[11px] font-bold text-white">
                {item.badge}
              </span>
            ) : null}
          </>
        );
        return item.href ? (
          <Link key={item.label} href={item.href} className={className}>
            {content}
          </Link>
        ) : (
          <div key={item.label} className={className}>
            {content}
          </div>
        );
      })}
    </nav>
  );
}
