import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { verifyPermission } from '@/services/admin/security';

/**
 * Server-side guard for admin pages.
 * Ensures a valid session exists; otherwise, redirects to the login page.
 */
export async function requireAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect('/login');
  }

  if (!(await verifyPermission('admin.access'))) {
    redirect('/');
  }

  return session.user;
}
