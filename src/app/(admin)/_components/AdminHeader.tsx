'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Route } from 'next';
import { ChevronRight, Home, LogOut, Menu } from 'lucide-react';
import { AdminNavigation } from './AdminNavigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface AdminHeaderProps {
  adminName: string;
  adminEmail: string;
  initials: string;
  onSignOut: () => Promise<void>;
}

const TITLES: Array<[string, string]> = [
  ['/admin/products/new', 'Tambah Produk'],
  ['/admin/blog/new', 'Tambah Artikel'],
  ['/admin/careers/new', 'Tambah Lowongan'],
  ['/admin/products/', 'Edit Produk'],
  ['/admin/blog/', 'Edit Artikel'],
  ['/admin/careers/', 'Edit Lowongan'],
  ['/admin/products', 'Kelola Produk'],
  ['/admin/blog', 'Kelola Blog'],
  ['/admin/careers', 'Kelola Karier'],
  ['/admin', 'Dashboard'],
];

export function AdminHeader({ adminName, adminEmail, initials, onSignOut }: AdminHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const title = TITLES.find(([path]) =>
    path === '/admin' ? pathname === path : pathname.startsWith(path)
  )?.[1];

  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200/90 bg-white/95 px-4 backdrop-blur-sm sm:px-6 lg:left-64 lg:px-8">
      <div className="flex min-w-0 items-center gap-2">
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-11 lg:hidden"
              aria-label="Buka navigasi admin"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-72 gap-0 border-slate-200 bg-white p-0 text-slate-900 [&_[data-slot=sheet-close]]:text-slate-500"
          >
            <SheetHeader className="h-16 justify-center border-b border-slate-200 px-5 py-0 text-left">
              <SheetTitle className="text-sm font-bold text-slate-900">Pyxis Admin</SheetTitle>
            </SheetHeader>
            <AdminNavigation onNavigate={() => setMenuOpen(false)} />
          </SheetContent>
        </Sheet>

        <nav
          aria-label="Breadcrumb"
          className="flex min-w-0 items-center gap-1.5 text-xs font-medium text-slate-500"
        >
          <Link
            href={'/admin' as Route}
            className="flex shrink-0 items-center gap-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Home className="size-3.5" />
            <span className="hidden sm:inline">Admin</span>
          </Link>
          <ChevronRight className="size-3.5 shrink-0 text-slate-300" />
          <span className="truncate font-semibold text-slate-900">{title ?? 'Admin Panel'}</span>
        </nav>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <div className="hidden max-w-48 text-right md:block">
          <p className="truncate text-xs font-bold leading-tight text-slate-900">{adminName}</p>
          <p className="truncate text-[10px] font-medium leading-tight text-slate-500">
            {adminEmail}
          </p>
        </div>
        <div
          className="flex size-8 items-center justify-center rounded-md bg-blue-600 text-xs font-bold text-white shadow-xs"
          aria-hidden="true"
        >
          {initials}
        </div>
        <form action={onSignOut}>
          <Button
            type="submit"
            variant="outline"
            size="sm"
            className="h-11 gap-1.5 px-3 text-xs text-slate-700 hover:border-red-300 hover:text-red-700"
            aria-label="Keluar dari admin"
          >
            <LogOut className="size-3.5" />
            <span className="hidden sm:inline">Keluar</span>
          </Button>
        </form>
      </div>
    </header>
  );
}
