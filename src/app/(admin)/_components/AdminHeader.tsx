'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  ['/admin/products/new', 'Add product'],
  ['/admin/blog/new', 'Add article'],
  ['/admin/careers/new', 'Add opening'],
  ['/admin/products/', 'Edit product'],
  ['/admin/blog/', 'Edit article'],
  ['/admin/careers/', 'Edit opening'],
  ['/admin/products', 'Manage products'],
  ['/admin/blog', 'Manage blog'],
  ['/admin/careers', 'Manage careers'],
  ['/admin', 'Dashboard'],
];

export function AdminHeader({ adminName, adminEmail, initials, onSignOut }: AdminHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const title = TITLES.find(([path]) =>
    path === '/admin' ? pathname === path : pathname.startsWith(path)
  )?.[1];

  return (
    <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200/90 bg-white/95 px-3 backdrop-blur-sm sm:px-6 lg:left-64 lg:px-8">
      <div className="flex min-w-0 items-center gap-2">
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-11 lg:hidden"
              aria-label={menuOpen ? 'Close admin navigation' : 'Open admin navigation'}
              aria-expanded={menuOpen}
              aria-controls="admin-mobile-navigation"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            id="admin-mobile-navigation"
            className="z-[60] w-[min(86vw,20rem)] max-w-[20rem] gap-0 border-slate-200 bg-white p-0 text-slate-900 [&_[data-slot=sheet-close]]:text-slate-500"
          >
            <SheetHeader className="h-20 justify-center border-b border-slate-200 px-5 py-0 text-left">
              <SheetTitle className="flex items-center gap-3 text-sm font-bold text-slate-900">
                <Image
                  src="/assets/img/Pyxis_logo.png"
                  alt="Pyxis"
                  width={112}
                  height={32}
                  className="mobile-logo-motion h-auto w-28"
                />
                <span className="sr-only">Admin</span>
              </SheetTitle>
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
            aria-label="Sign out of admin"
          >
            <LogOut className="size-3.5" />
            <span className="hidden sm:inline">Sign out</span>
          </Button>
        </form>
      </div>
    </header>
  );
}
