import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import {
  BriefcaseBusiness,
  LayoutDashboard,
  LogOut,
  Mail,
  Newspaper,
  Package,
  Settings,
} from 'lucide-react';
import { requireAdmin } from '@/lib/requireAdmin';

interface AdminLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const admin = await requireAdmin();
  const initials = (admin.name || admin.email)
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const navigation = [
    { label: 'Dashboard', icon: LayoutDashboard, active: true },
    { label: 'Produk', icon: Package },
    { label: 'Karir', icon: BriefcaseBusiness },
    { label: 'Blog', icon: Newspaper },
    { label: 'Pesan Masuk', icon: Mail, badge: 0 },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#172033]">
      <header className="flex h-16 border-b border-neutral-200 bg-white">
        <div className="flex w-full items-center bg-[#111827] px-6 md:w-64 md:shrink-0">
          <span className="text-xl font-bold tracking-tight text-white">Pyxis Admin</span>
        </div>
        <div className="hidden flex-1 items-center justify-end gap-4 px-8 md:flex">
          <div className="text-right text-sm leading-tight">
            <p className="font-semibold text-[#172033]">{admin.name || 'Administrator'}</p>
            <form
              action={async () => {
                'use server';
                const { headers } = await import('next/headers');
                const { auth } = await import('@/lib/auth');
                await auth.api.signOut({ headers: await headers() });
                redirect('/login');
              }}
            >
              <button type="submit" className="font-medium text-[#946200] hover:underline">
                Keluar
              </button>
            </form>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DCE6FF] text-sm font-bold text-[#1D4ED8] ring-2 ring-white shadow-sm">
            {initials}
          </div>
        </div>
        <div className="flex items-center justify-end px-4 md:hidden">
          <form
            action={async () => {
              'use server';
              const { headers } = await import('next/headers');
              const { auth } = await import('@/lib/auth');
              await auth.api.signOut({ headers: await headers() });
              redirect('/login');
            }}
          >
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-md bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-200"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>
          </form>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)]">
        <aside className="hidden w-64 shrink-0 flex-col bg-[#111827] text-white md:flex">
          <nav className="flex-1 space-y-1 py-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className={`mx-0 flex items-center gap-4 border-l-4 px-5 py-3 text-sm ${
                    item.active
                      ? 'border-[#AFC2FF] bg-[#24428F] font-semibold text-white'
                      : 'border-transparent text-neutral-300'
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                  {item.badge ? (
                    <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-[11px] font-bold text-white">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
              );
            })}
          </nav>
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-4 px-1 py-3 text-sm text-neutral-300">
              <Settings className="h-5 w-5" />
              <span>Pengaturan</span>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
