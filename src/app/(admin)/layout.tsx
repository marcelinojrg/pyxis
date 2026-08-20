import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/requireAdmin';

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const admin = await requireAdmin();

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col">
      <header className="bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg text-primary">Pyxis Admin</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-neutral-600">
            Halo, <strong>{admin.name || admin.email}</strong>
          </span>
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
              className="px-3 py-1.5 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold transition-colors"
            >
              Logout
            </button>
          </form>
        </div>
      </header>
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">{children}</main>
    </div>
  );
}
