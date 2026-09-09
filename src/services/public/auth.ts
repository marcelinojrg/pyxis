'use server';
import { z } from 'zod';
import { headers, cookies } from 'next/headers';

import { auth } from '@/lib/auth';
import type { AuthResponse, User } from '@/interfaces/features/auth';
import { prisma } from '@/lib/prisma';
import { loginSchema, registerSchema } from '@/schemas/auth';
import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;

/**
 * Map Better Auth errors to user-facing messages.
 */
const mapAuthError = (message: string): string => {
  const lowerMessage = message.toLowerCase();

  switch (lowerMessage) {
    case 'invalid email or password':
      return 'Incorrect email or password.';
    case 'user not found':
      return 'User not found.';
    case 'email not verified':
      return 'Your email has not been verified.';
    case 'too many requests':
      return 'Too many sign-in attempts. Please try again later.';
    default:
      return 'Something went wrong while signing in. Check your details and try again.';
  }
};

/**
 * Server Action to handle user login using Better Auth.
 */
export async function loginAction(values: LoginValues): Promise<AuthResponse> {
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { success: false, error: 'The submitted data is invalid.' };
  }

  try {
    const response = await auth.api.signInEmail({
      body: {
        email: validatedFields.data.email,
        password: validatedFields.data.password,
      },
      headers: await headers(),
      asResponse: true,
    });

    const setCookies = response.headers.getSetCookie();

    if (setCookies.length > 0) {
      const cookieStore = await cookies();

      for (const cookieStr of setCookies) {
        // Parse the cookie attributes explicitly so Next.js receives the original settings.
        const parts = cookieStr.split(';').map((s) => s.trim());
        const [nameValue] = parts;
        const firstEq = nameValue.indexOf('=');
        if (firstEq === -1) continue;

        const name = nameValue.substring(0, firstEq);
        const value = nameValue.substring(firstEq + 1);

        const cookieOptions: Partial<ResponseCookie> = {
          path: '/',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        };

        // Preserve Max-Age and Expires when present.
        parts.slice(1).forEach((opt) => {
          const [key, val] = opt.split('=').map((s) => s.trim());
          const lowerKey = key.toLowerCase();
          if (lowerKey === 'max-age') cookieOptions.maxAge = parseInt(val);
          if (lowerKey === 'expires') cookieOptions.expires = new Date(val);
          if (lowerKey === 'domain') cookieOptions.domain = val;
          if (lowerKey === 'samesite')
            cookieOptions.sameSite = val.toLowerCase() as 'strict' | 'lax' | 'none';
        });

        // Apply the cookie to Next.js' cookie store.
        cookieStore.set(name, value, cookieOptions);
      }
    }

    const data = await response.json();
    return {
      success: true,
      data: {
        user: data.user,
        token: data.token,
      },
    };
  } catch (error: Error | unknown) {
    const rawMessage = error instanceof Error ? error.message : '';
    return {
      success: false,
      error: mapAuthError(rawMessage),
    };
  }
}

export async function logoutAction(): Promise<AuthResponse> {
  try {
    const response = await auth.api.signOut({
      headers: await headers(),
      asResponse: true,
    });

    const setCookies = response.headers.getSetCookie();
    if (setCookies.length > 0) {
      const cookieStore = await cookies();
      for (const cookieStr of setCookies) {
        const parts = cookieStr.split(';')[0];
        const firstEq = parts.indexOf('=');
        if (firstEq !== -1) {
          const name = parts.substring(0, firstEq).trim();
          cookieStore.delete(name);
        }
      }
    }

    return { success: true };
  } catch (error: Error | unknown) {
    return {
      success: false,
      error: 'Something went wrong while signing out.',
    };
  }
}

/**
 * Server Action to register a new user with default role "Peserta".
 */
export async function registerAction(values: RegisterValues): Promise<AuthResponse> {
  const validatedFields = registerSchema.safeParse(values);
  if (!validatedFields.success) {
    return { success: false, error: 'The submitted data is invalid.' };
  }

  try {
    // Look up or create "Peserta" role from database
    let pesertaRole = await prisma.role.findFirst({
      where: { name: { equals: 'Peserta', mode: 'insensitive' } },
      select: { id: true },
    });

    if (!pesertaRole) {
      pesertaRole = await prisma.role.create({
        data: {
          name: 'Peserta',
          description: 'Role default untuk peserta event',
        },
        select: { id: true },
      });
    }

    const response = await auth.api.signUpEmail({
      body: {
        name: validatedFields.data.name,
        email: validatedFields.data.email,
        password: validatedFields.data.password,
        roleId: pesertaRole.id,
      },
      headers: await headers(),
      asResponse: true,
    });

    const data = await response.json();

    if (!response.ok) {
      const msg = (data as { message?: string }).message ?? '';
      const lower = msg.toLowerCase();
      if (lower.includes('email') && lower.includes('exist')) {
        return { success: false, error: 'That email is already registered. Use another email.' };
      }
      return {
        success: false,
        error: 'Something went wrong during registration. Check your details and try again.',
      };
    }

    interface SignUpResponseBody {
      user: User;
    }
    const body = data as SignUpResponseBody;

    if (body.user?.id) {
      await prisma.user.update({
        where: { id: body.user.id },
        data: {
          roleId: pesertaRole.id,
          roles: {
            connect: { id: pesertaRole.id },
          },
        },
      });
    }

    // Send the welcome email.
    const { queueEmail } = await import('./emails');
    const userName = body.user.name || 'Pyxis user';
    const welcomeBody = `
      <h2 style="color: #141413; font-family: Georgia, serif; margin-top: 0;">Welcome to Pyxis</h2>
      <p>Hello <strong>${userName}</strong>,</p>
      <p>Thank you for signing up for <strong>Pyxis</strong>. Your account is active and ready to use.</p>
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 24px 0;">
        <tr>
          <td align="center" style="border-radius: 8px; background-color: #D97757;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login" target="_blank" style="font-size: 14px; font-weight: bold; color: #FFFFFF; text-decoration: none; display: inline-block; padding: 12px 24px; border-radius: 8px;">Open your account &rarr;</a>
          </td>
        </tr>
      </table>
      <p style="font-size: 13px; color: #87867F; margin-bottom: 0;">
        If you did not sign up for Pyxis, you can ignore this email.
      </p>
    `;
    await queueEmail(body.user.email, 'Welcome to Pyxis - Registration confirmation', welcomeBody);

    return {
      success: true,
      data: { user: body.user },
    };
  } catch (error: Error | unknown) {
    const rawMessage = error instanceof Error ? error.message : '';
    const lower = rawMessage.toLowerCase();
    if (lower.includes('email') && (lower.includes('exist') || lower.includes('taken'))) {
      return { success: false, error: 'That email is already registered. Use another email.' };
    }
    return { success: false, error: 'Something went wrong during registration.' };
  }
}

/**
 * Send a password-change notification email.
 */
async function sendPasswordChangeNotificationEmail(
  email: string,
  name?: string
): Promise<{ success: boolean }> {
  try {
    const { queueEmail } = await import('./emails');
    const body = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #E3DACC; border-radius: 12px; background-color: #FAF9F5;">
        <h2 style="color: #D97757; font-family: serif;">Account security: password changed</h2>
        <p>Hello ${name || email},</p>
        <p>Your Pyxis account password was recently changed.</p>
        <p>If you did not make this change, contact our support team immediately.</p>
      </div>
    `;
    await queueEmail(email, 'Pyxis password-change notification', body);
    return { success: true };
  } catch (error) {
    console.error('Send Password Change Email Error:', error);
    return { success: false };
  }
}

export async function getMeAction(): Promise<{ isAdmin: boolean; session: any }> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
      return { isAdmin: false, session: null };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        role: true,
        roleId: true,
        roles: { select: { name: true } },
      },
    });

    if (!user) return { isAdmin: false, session };

    const ADMIN_ROLES = ['admin', 'superadmin'];

    // Check many-to-many roles
    const hasAdminRole = user.roles.some((r) => ADMIN_ROLES.includes(r.name.toLowerCase()));
    if (hasAdminRole) return { isAdmin: true, session };

    // Check single roleId
    if (user.roleId) {
      const role = await prisma.role.findUnique({
        where: { id: user.roleId },
        select: { name: true },
      });
      if (role && ADMIN_ROLES.includes(role.name.toLowerCase())) {
        return { isAdmin: true, session };
      }
    }

    // Check role string field
    if (user.role && ADMIN_ROLES.includes(user.role.toLowerCase())) {
      return { isAdmin: true, session };
    }

    return { isAdmin: false, session };
  } catch {
    return { isAdmin: false, session: null };
  }
}
