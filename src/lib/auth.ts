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
      const userName = user.name || 'Peserta';

      const body = `
        <h2 style="color: #141413; font-family: Georgia, serif; margin-top: 0;">Reset Password</h2>
        <p>Halo <strong>${userName}</strong>,</p>
        <p>Kami menerima permintaan untuk menyetel ulang kata sandi akun Pyxis Anda. Klik tombol di bawah untuk melanjutkan:</p>
        <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 24px 0;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #D97757;">
              <a href="${safeUrl}" target="_blank" style="font-size: 14px; font-weight: bold; color: #FFFFFF; text-decoration: none; display: inline-block; padding: 12px 24px; border-radius: 8px;">Reset Password Saya &rarr;</a>
            </td>
          </tr>
        </table>
        <p style="font-size: 13px; color: #87867F; margin-bottom: 0;">
          Jika Anda tidak meminta reset password, Anda dapat mengabaikan email ini secara aman.
        </p>
      `;
      await queueEmail(user.email, 'Reset Password Akun Pyxis', body);
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
      const userName = user.name || 'Peserta';

      const body = `
        <h2 style="color: #141413; font-family: Georgia, serif; margin-top: 0;">Verifikasi Akun Pyxis</h2>
        <p>Halo <strong>${userName}</strong>,</p>
        <p>Terima kasih telah mendaftar di <strong>Pyxis</strong>. Klik tombol di bawah ini untuk memverifikasi alamat email Anda:</p>
        <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 24px 0;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #D97757;">
              <a href="${safeUrl}" target="_blank" style="font-size: 14px; font-weight: bold; color: #FFFFFF; text-decoration: none; display: inline-block; padding: 12px 24px; border-radius: 8px;">Verifikasi Akun Saya &rarr;</a>
            </td>
          </tr>
        </table>
        <p style="font-size: 13px; color: #87867F; margin-bottom: 0;">
          Jika Anda merasa tidak mendaftar di Pyxis, abaikan email ini.
        </p>
      `;
      await queueEmail(user.email, 'Verifikasi Akun Pyxis Anda', body);
    },
  },
  session: {
    expiresIn: 60 * 60 * 24, // 1 Day
    freshAge: 0, // Disable auto-renewal for strict testing
    updateAge: 0, // Force update check on every request
  },
  plugins: [admin()],
  databaseHooks: {
    user: {
      update: {
        after: async (user) => {
          if (user.emailVerified) {
            const { prisma: localPrisma } = await import('./prisma');
            const subject = 'Akun Anda Berhasil Diverifikasi! - Pyxis';
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
                  <h2 style="color: #D97757; font-family: serif;">Akun Berhasil Diverifikasi!</h2>
                  <p>Halo ${user.name || user.email},</p>
                  <p>Selamat! Alamat email Anda telah berhasil diverifikasi. Sekarang Anda memiliki akses penuh ke seluruh fitur di Pyxis.</p>
                  <p>Terima kasih telah memverifikasi akun Anda!</p>
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
