import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

/**
 * Guard sisi server untuk halaman admin.
 * Memastikan ada session yang valid; jika tidak, arahkan ke halaman login.
 */
export async function requireAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect('/login');
  }

  return session.user;
}
