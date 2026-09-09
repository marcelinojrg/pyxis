import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';

/**
 * Helper for checking access on the server (Server Actions / Route Handlers).
 * Protects data from unauthorized client-side manipulation.
 */
export async function verifyPermission(permissionName: string): Promise<boolean> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return false;
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        roles: {
          include: {
            permissions: {
              select: { name: true },
            },
          },
        },
      },
    });

    if (!user) return false;

    const permissionsSet = new Set<string>();

    // Check permissions from the multi-role relation.
    user.roles.forEach((role) => {
      role.permissions.forEach((p) => permissionsSet.add(p.name));
    });

    // Check permissions from roleId when the legacy single-role relation exists.
    if (user.roleId) {
      const singleRole = await prisma.role.findUnique({
        where: { id: user.roleId },
        include: { permissions: { select: { name: true } } },
      });
      singleRole?.permissions.forEach((p) => permissionsSet.add(p.name));
    }

    return permissionsSet.has(permissionName);
  } catch (error) {
    console.error('Verify Permission Error:', error);
    return false;
  }
}

/**
 * Ensure the user is signed in.
 */
export async function verifySession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

/**
 * Record an audit log for each administrative or sensitive action.
 */
export async function createAuditLog(params: {
  userId?: string;
  action: string;
  table: string;
  recordId: string;
  oldValues?: string;
  newValues?: string;
}) {
  try {
    const session = params.userId ? null : await verifySession();
    return await prisma.auditLog.create({
      data: {
        userId: params.userId ?? session?.user.id,
        action: params.action,
        table: params.table,
        recordId: params.recordId,
        oldValues: params.oldValues,
        newValues: params.newValues,
      },
    });
  } catch (error) {
    console.error('Failed to create audit log:', error);
  }
}

/**
 * Fetch the user's roles and permissions through the service layer.
 */
export async function getUserPermissionsAndRoles(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        roles: {
          include: {
            permissions: {
              select: { name: true },
            },
          },
        },
      },
    });

    if (!user) return { roles: [], permissions: [] };

    const permissionsSet = new Set<string>();
    const roles: string[] = user.roles.map((r) => r.name);

    user.roles.forEach((role) => {
      role.permissions.forEach((p) => permissionsSet.add(p.name));
    });

    if (user.roleId) {
      const singleRole = await prisma.role.findUnique({
        where: { id: user.roleId },
        include: { permissions: { select: { name: true } } },
      });
      singleRole?.permissions.forEach((p) => permissionsSet.add(p.name));
    }

    return {
      roles,
      permissions: Array.from(permissionsSet),
    };
  } catch (error) {
    console.error('Get User Permissions and Roles Error:', error);
    return { roles: [], permissions: [] };
  }
}
