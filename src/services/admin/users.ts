'use server';

import { z } from 'zod';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { userSchema } from '@/schemas/users';
import type { User, UserResponse, UserPaginationResponse } from '@/interfaces/features/users';
import { verifyPermission } from './security';
import type { ServiceResponse } from '@/types/service-response';

interface AdminAuthApi {
  createUser(args: {
    body: {
      email: string;
      password?: string;
      name: string;
    };
  }): Promise<{ user: { id: string } }>;
  setUserPassword(args: {
    body: {
      userId: string;
      newPassword: string;
    };
  }): Promise<void>;
}

const BASE_PATH = '/admin/managements/users';

export type UserValues = z.infer<typeof userSchema>;

/**
 * Fetch users with pagination and search.
 */
export async function getUsers(
  page: number = 1,
  limit: number = 10,
  search: string = ''
): Promise<UserPaginationResponse> {
  const hasAccess = await verifyPermission('user.read');
  if (!hasAccess) {
    return {
      success: false,
      data: [],
      meta: { total: 0, page: 1, lastPage: 0 },
      error: 'You do not have permission to view this data.',
    } satisfies UserPaginationResponse;
  }

  try {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          roles: {
            select: { id: true, name: true },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      success: true,
      data: data as unknown as User[],
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error('Get Users Error:', error);
    return {
      success: false,
      data: [],
      meta: { total: 0, page: 1, lastPage: 0 },
    };
  }
}

/**
 * Fetch a user by ID.
 */
export async function getUserById(id: string): Promise<UserResponse> {
  const hasAccess = await verifyPermission('user.read');
  if (!hasAccess) {
    return { success: false, error: 'You do not have permission.' };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        roles: {
          select: { id: true, name: true },
        },
      },
    });

    if (!user) {
      return { success: false, error: 'User not found.' };
    }

    return { success: true, data: user as unknown as User };
  } catch (error) {
    console.error('Get User By ID Error:', error);
    return { success: false, error: 'Failed to load the user.' };
  }
}

/**
 * Fetch a user for participant layout verification.
 */
export async function getParticipantUser(id: string) {
  try {
    if (!(await verifyPermission('user.read'))) return null;

    return await prisma.user.findUnique({
      where: { id },
      select: {
        banned: true,
        roles: { select: { name: true } },
      },
    });
  } catch (error) {
    console.error('Get Participant User Error:', error);
    return null;
  }
}

/**
 * Create a new user.
 */
export async function createUser(values: UserValues): Promise<UserResponse> {
  const hasAccess = await verifyPermission('user.create');
  if (!hasAccess) {
    return { success: false, error: 'You do not have permission to create data.' };
  }

  const validatedFields = userSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, error: 'The input is invalid.' };
  }

  if (!values.password) {
    return { success: false, error: 'Password is required for a new user.' };
  }

  try {
    const existing = await prisma.user.findUnique({
      where: { email: validatedFields.data.email },
    });

    if (existing) {
      return { success: false, error: 'That email is already in use.' };
    }

    // Use the Better Auth API to create the user and hash the password.
    const result = await (auth.api as unknown as AdminAuthApi).createUser({
      body: {
        email: validatedFields.data.email,
        password: values.password,
        name: validatedFields.data.name,
      },
    });

    if (!result || !result.user) {
      return { success: false, error: 'Failed to create the account through the auth provider.' };
    }

    // Update role dan status verifikasi
    await prisma.user.update({
      where: { id: result.user.id },
      data: {
        emailVerified: true,
        roles: {
          connect: { id: validatedFields.data.roleId },
        },
        roleId: validatedFields.data.roleId, // Keep roleId for compatibility.
      },
    });

    revalidatePath(BASE_PATH);

    return {
      success: true,
      message: 'User created.',
    };
  } catch (error) {
    console.error('Create User Error:', error);
    return { success: false, error: 'Failed to create the user.' };
  }
}

/**
 * Update User
 */
export async function updateUser(id: string, values: UserValues): Promise<UserResponse> {
  const hasAccess = await verifyPermission('user.update');
  if (!hasAccess) {
    return { success: false, error: 'You do not have permission to update data.' };
  }

  const validatedFields = userSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, error: 'The input is invalid.' };
  }

  try {
    const existing = await prisma.user.findUnique({
      where: { id },
    });

    if (!existing) {
      return { success: false, error: 'User not found.' };
    }

    // Update data dasar via Prisma
    await prisma.user.update({
      where: { id },
      data: {
        name: validatedFields.data.name,
        email: validatedFields.data.email,
        image: validatedFields.data.image,
        roles: {
          set: [{ id: validatedFields.data.roleId }],
        },
        roleId: validatedFields.data.roleId,
      },
    });

    // Reset the password when provided; only superadmins can send this field.
    if (validatedFields.data.newPassword && validatedFields.data.newPassword.trim() !== '') {
      await (auth.api as unknown as AdminAuthApi).setUserPassword({
        body: {
          userId: id,
          newPassword: validatedFields.data.newPassword,
        },
      });
    }

    revalidatePath(BASE_PATH);

    return {
      success: true,
      message: 'User updated.',
    };
  } catch (error) {
    console.error('Update User Error:', error);
    return { success: false, error: 'Failed to update the user.' };
  }
}

/**
 * Delete a user.
 */
export async function deleteUser(id: string): Promise<UserResponse> {
  const hasAccess = await verifyPermission('user.delete');
  if (!hasAccess) {
    return { success: false, error: 'You do not have permission to delete data.' };
  }

  try {
    // Use the Better Auth admin API when possible, or delete through Prisma.
    // Better Auth handles expired sessions automatically.
    await prisma.user.delete({
      where: { id },
    });

    revalidatePath(BASE_PATH);

    return { success: true, message: 'User deleted.' };
  } catch (error) {
    console.error('Delete User Error:', error);
    return { success: false, error: 'Failed to delete the user.' };
  }
}

/**
 * Fetch permissions and roles for the signed-in user.
 */
export async function getCurrentUserData(): Promise<{ permissions: string[]; roles: string[] }> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) return { permissions: [], roles: [] };

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

    const permissionsSet = new Set<string>();
    const roles: string[] = user?.roles.map((r) => r.name) || [];

    user?.roles.forEach((role) => {
      role.permissions.forEach((p) => permissionsSet.add(p.name));
    });

    if (user?.roleId) {
      const singleRole = await prisma.role.findUnique({
        where: { id: user.roleId },
        include: { permissions: { select: { name: true } } },
      });
      if (singleRole) {
        if (!roles.includes(singleRole.name)) roles.push(singleRole.name);
        singleRole.permissions.forEach((p) => permissionsSet.add(p.name));
      }
    }

    return {
      permissions: Array.from(permissionsSet),
      roles,
    };
  } catch (error) {
    console.error('Get Current User Data Error:', error);
    return { permissions: [], roles: [] };
  }
}
