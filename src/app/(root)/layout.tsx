import type { ReactNode } from 'react';
import { headers } from 'next/headers';

import Footer from '@/components/Mixins/Footer';
import Navbar from '@/components/Mixins/Navbar';
import PublicReveal from '@/components/Common/PublicReveal';
import ScrollToTop from '@/components/Common/ScrollToTop';
import { cn } from '@/lib/utils';
import { auth } from '@/lib/auth';
import { getUserPermissionsAndRoles } from '@/services/admin/security';
import { PermissionProvider } from '@/providers/PermissionProvider';

type Props = {
  children: ReactNode;
};

const LandingPageLayout = async ({ children }: Props) => {
  // 1. Read the session on the server.
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 2. Read permissions and roles through the service layer.
  const { roles, permissions } = session?.user?.id
    ? await getUserPermissionsAndRoles(session.user.id)
    : { roles: [], permissions: [] };

  return (
    <div className={cn('font-sans')}>
      <PermissionProvider initialPermissions={permissions} initialRoles={roles}>
        <Navbar />
        <main className="min-h-screen">
          <PublicReveal />
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </PermissionProvider>
    </div>
  );
};

export default LandingPageLayout;
