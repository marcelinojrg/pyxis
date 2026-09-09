import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin } from 'better-auth/plugins';
import { prisma } from './prisma';

export const auth = betterAuth({
  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'],
  rateLimit: {
    enabled: true,
    window: 60,
    max: 20,
    customRules: {
      '/sign-in/email': { window: 60, max: 5 },
      '/request-password-reset': { window: 60, max: 3 },
    },
  },
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  user: {
    additionalFields: {
      roleId: {
        type: 'string',
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    sendResetPassword: async ({
      user,
      url,
    }: {
      user: { name?: string | null; email: string };
      url: string;
    }) => {
      const { queueEmail } = await import('@/services/public/emails');
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const safeUrl = url.replace(/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?/, baseUrl);
      const userName = user.name || 'Pyxis user';

      const body = `
        <h2 style="color: #141413; font-family: Georgia, serif; margin-top: 0;">Reset Password</h2>
        <p>Hello <strong>${userName}</strong>,</p>
        <p>We received a request to reset your Pyxis account password. Click the button below to continue:</p>
        <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 24px 0;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #D97757;">
              <a href="${safeUrl}" target="_blank" style="font-size: 14px; font-weight: bold; color: #FFFFFF; text-decoration: none; display: inline-block; padding: 12px 24px; border-radius: 8px;">Reset my password &rarr;</a>
            </td>
          </tr>
        </table>
        <p style="font-size: 13px; color: #87867F; margin-bottom: 0;">
          If you did not request a password reset, you can safely ignore this email.
        </p>
      `;
      await queueEmail(user.email, 'Reset your Pyxis password', body);
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({
      user,
      url,
    }: {
      user: { name?: string | null; email: string };
      url: string;
    }) => {
      const { queueEmail } = await import('@/services/public/emails');
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const safeUrl = url.replace(/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?/, baseUrl);
      const userName = user.name || 'Pyxis user';

      const body = `
        <h2 style="color: #141413; font-family: Georgia, serif; margin-top: 0;">Verify your Pyxis account</h2>
        <p>Hello <strong>${userName}</strong>,</p>
        <p>Thank you for signing up for <strong>Pyxis</strong>. Click the button below to verify your email address:</p>
        <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 24px 0;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #D97757;">
              <a href="${safeUrl}" target="_blank" style="font-size: 14px; font-weight: bold; color: #FFFFFF; text-decoration: none; display: inline-block; padding: 12px 24px; border-radius: 8px;">Verify my account &rarr;</a>
            </td>
          </tr>
        </table>
        <p style="font-size: 13px; color: #87867F; margin-bottom: 0;">
          If you did not sign up for Pyxis, you can ignore this email.
        </p>
      `;
      await queueEmail(user.email, 'Verify your Pyxis account', body);
    },
  },
  session: {
    expiresIn: 60 * 60 * 24, // 1 Day
    freshAge: 0, // Admin session does not require a fresh login for each action
    updateAge: 60 * 60, // Refresh at most once per hour to avoid concurrent refresh races
  },
  plugins: [admin()],
  databaseHooks: {
    user: {
      update: {
        after: async (user) => {
          if (user.emailVerified) {
            const { prisma: localPrisma } = await import('./prisma');
            const subject = 'Your Pyxis account has been verified';
            const alreadySent = await localPrisma.emailQueue.findFirst({
              where: {
                to: user.email,
                subject,
              },
            });
            if (!alreadySent) {
              const { queueEmail } = await import('@/services/public/emails');
              const body = `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #E3DACC; border-radius: 12px; background-color: #FAF9F5;">
                  <h2 style="color: #D97757; font-family: serif;">Your account has been verified</h2>
                  <p>Hello ${user.name || user.email},</p>
                  <p>Your email address has been verified. You now have full access to Pyxis.</p>
                  <p>Thank you for verifying your account.</p>
                </div>
              `;
              await queueEmail(user.email, subject, body);
            }
          }
        },
      },
    },
  },
});
