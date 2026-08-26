import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { LogOut, Settings } from 'lucide-react';
import { requireAdmin } from '@/lib/requireAdmin';
import { AdminNavigation } from '@/app/(admin)/_components/AdminNavigation';

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

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#172033]">
      <header className="sticky top-0 z-40 flex h-16 border-b border-neutral-200 bg-white">
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

      <div className="min-h-[calc(100vh-4rem)] overflow-x-hidden">
        <aside className="fixed bottom-0 left-0 top-16 z-30 hidden w-64 flex-col bg-[#111827] text-white md:flex">
          <AdminNavigation />
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-4 px-1 py-3 text-sm text-neutral-300">
              <Settings className="h-5 w-5" />
              <span>Pengaturan</span>
            </div>
          </div>
        </aside>

        <main className="min-w-0 max-w-full overflow-x-hidden p-5 sm:p-8 md:ml-64">{children}</main>
      </div>
    </div>
  );
}
