import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Settings } from 'lucide-react';
import { requireAdmin } from '@/lib/requireAdmin';
import { AdminNavigation } from '@/app/(admin)/_components/AdminNavigation';
import { AdminHeader } from '@/app/(admin)/_components/AdminHeader';
import { AdminIdleTracker } from '@/app/(admin)/_components/AdminIdleTracker';

interface AdminLayoutProps {
  children: ReactNode;
}

export const dynamic = 'force-dynamic';

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

  async function handleSignOut() {
    'use server';
    const { headers } = await import('next/headers');
    const { auth } = await import('@/lib/auth');
    await auth.api.signOut({ headers: await headers() });
    redirect('/login');
  }

  return (
    <div
      data-admin-shell
      className="flex min-h-screen w-full max-w-full overflow-x-hidden bg-slate-50 text-slate-900 antialiased"
    >
      {/* Desktop Fixed Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col overflow-hidden border-r border-slate-200 bg-white text-slate-900 shadow-sm lg:flex">
        {/* Brand Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-5">
          <div className="flex items-center gap-3">
            <div>
              <span className="text-sm font-bold tracking-tight text-slate-900">Pyxis Admin</span>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <AdminNavigation />

        {/* Sidebar Bottom / Version info */}
        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-slate-400" />
              <span>Pyxis Core</span>
            </div>
            <span className="rounded bg-slate-200/70 px-1.5 py-0.5 text-[10px] font-mono text-slate-600">
              v1.0
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        {/* Inactivity Auto Logout Tracker */}
        <AdminIdleTracker />

        {/* Top Header */}
        <AdminHeader
          adminName={admin.name || 'Admin Pyxis'}
          adminEmail={admin.email}
          initials={initials}
          onSignOut={handleSignOut}
        />

        {/* Page Main Content */}
        <main className="min-w-0 max-w-full flex-1 overflow-x-hidden px-4 pb-8 pt-20 sm:px-6 lg:px-8 lg:pt-24">
          <div className="mx-auto w-full max-w-6xl min-w-0">{children}</div>
        </main>
      </div>
    </div>
  );
}
