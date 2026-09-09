'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

const emailSchema = z.string().trim().toLowerCase().email().max(254);

export async function updateUserName(name: string): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return { success: false, error: 'Invalid session.' };
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { name: name.trim() },
    });

    return { success: true };
  } catch (error) {
    console.error('Update User Name Error:', error);
    return { success: false, error: 'Failed to update the name because of a server error.' };
  }
}

export async function updateUserEmail(
  newEmail: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const parsedEmail = emailSchema.safeParse(newEmail);
    if (!parsedEmail.success) {
      return { success: false, error: 'Email format is invalid.' };
    }

    const cleanEmail = parsedEmail.data;
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return { success: false, error: 'Invalid session.' };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return { success: false, error: 'User not found.' };
    }

    // Check if new email is already in use by another user
    const emailExists = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (emailExists) {
      return { success: false, error: 'That email is already used by another user.' };
    }

    // Update email
    await prisma.user.update({
      where: { id: user.id },
      data: {
        email: cleanEmail,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Update User Email Error:', error);
    return { success: false, error: 'Failed to update the email because of a server error.' };
  }
}
