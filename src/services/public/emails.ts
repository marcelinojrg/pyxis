'use server';
import nodemailer from 'nodemailer';
import { prisma } from '@/lib/prisma';
import { EmailStatus } from '@/generated/prisma/enums';

const getTransporter = () => {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass || user.includes('username@ethereal.email') || pass === 'password') {
    console.warn('⚠️ SMTP credentials not found or placeholder used. Emails will be simulated.');
    return null;
  }

  /**
   * Resend
   */
  // return nodemailer.createTransport({
  //   host,
  //   port,
  //   secure: port === 465,
  //   auth: {
  //     user,
  //     pass,
  //   },
  // });

  /**
   * Google App Password (2FA needed)
   */
  return nodemailer.createTransport({
    service: 'gmail',
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
};

export async function createEmailHtmlWrapper(title: string, contentHtml: string): Promise<string> {
  const currentYear = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF9F5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #141413;">
  <span style="display: none; font-size: 1px; color: #FAF9F5; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    ${title} - SITIVENT Platform Event
  </span>
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FAF9F5; padding: 30px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #FFFFFF; border: 1px solid #E3DACC; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <tr>
            <td style="background-color: #FFFFFF; padding: 24px 32px; text-align: left; border-bottom: 1px solid #E3DACC;">
              <span style="color: #D97757; font-size: 22px; font-weight: 800; letter-spacing: 1px; font-family: Georgia, serif;">SITIVENT</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px; font-size: 15px; line-height: 1.6; color: #3D3D3A;">
              ${contentHtml}
            </td>
          </tr>
          <tr>
            <td style="background-color: #FAF9F5; padding: 20px 32px; border-top: 1px solid #E3DACC; font-size: 12px; color: #87867F; text-align: center; line-height: 1.5;">
              <p style="margin: 0 0 4px 0;">&copy; ${currentYear} Sitivent. Hak cipta dilindungi.</p>
              <p style="margin: 0;">Email ini dikirim secara otomatis oleh sistem pendaftaran Sitivent Platform.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function queueEmail(to: string, subject: string, body: string, attachments?: string) {
  try {
    const finalBody = body.trim().startsWith('<!DOCTYPE html>')
      ? body
      : await createEmailHtmlWrapper(subject, body);

    const queueItem = await prisma.emailQueue.create({
      data: {
        to,
        subject,
        body: finalBody,
        attachments,
        status: EmailStatus.PENDING,
      },
    });

    await processEmailQueue();

    return { success: true, data: queueItem };
  } catch (error) {
    console.error('Queue Email Error:', error);
    return { success: false, error: 'Gagal mengantrekan email.' };
  }
}

let isProcessing = false;

export async function processEmailQueue() {
  if (isProcessing) return;
  isProcessing = true;

  try {
    const transporter = getTransporter();

    const pendingEmails = await prisma.emailQueue.findMany({
      where: {
        status: {
          in: [EmailStatus.PENDING, EmailStatus.FAILED],
        },
        attempts: {
          lt: 3,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
      take: 10,
    });

    for (const email of pendingEmails) {
      await prisma.emailQueue.update({
        where: { id: email.id },
        data: {
          status: EmailStatus.PROCESSING,
          attempts: { increment: 1 },
        },
      });

      try {
        if (!transporter) {
          console.log(
            `\n========================================\n[SIMULATED EMAIL]\nTo: ${email.to}\nSubject: ${email.subject}\nBody: ${email.body}\n========================================\n`
          );
          await prisma.emailQueue.update({
            where: { id: email.id },
            data: {
              status: EmailStatus.SENT,
            },
          });
          continue;
        }

        let parsedAttachments = [];
        if (email.attachments) {
          try {
            parsedAttachments = JSON.parse(email.attachments, (key, value) =>
              key === '__proto__' || key === 'constructor' ? undefined : value
            );
          } catch {
            // ignore
          }
        }

        const senderEmail = process.env.SMTP_USER || '';

        // Strip HTML tags for plain text fallback (reduces spam score)
        const plainText = email.body.replace(/<[^>]*>?/gm, '').trim();

        await transporter.sendMail({
          from: `"Sitivent" <${senderEmail}>`,
          replyTo: senderEmail,
          to: email.to,
          subject: email.subject,
          text: plainText,
          html: email.body,
          headers: {
            'X-Mailer': 'Sitivent Platform App',
            'X-Priority': '3',
          },
          attachments: parsedAttachments,
        });

        await prisma.emailQueue.update({
          where: { id: email.id },
          data: {
            status: EmailStatus.SENT,
          },
        });
      } catch (err: unknown) {
        console.error(`Failed to send email ID ${email.id}:`, err);
        const finalStatus = email.attempts >= 2 ? EmailStatus.FAILED : EmailStatus.PENDING;
        await prisma.emailQueue.update({
          where: { id: email.id },
          data: {
            status: finalStatus,
            error: err instanceof Error ? err.message : String(err),
          },
        });
      }
    }
  } catch (error) {
    console.error('Process Email Queue Error:', error);
  } finally {
    isProcessing = false;
    try {
      const hasMore = await prisma.emailQueue.findFirst({
        where: {
          status: { in: [EmailStatus.PENDING, EmailStatus.FAILED] },
          attempts: { lt: 3 },
        },
      });
      if (hasMore) {
        void processEmailQueue();
      }
    } catch (err) {
      console.error('Check remaining emails error:', err);
    }
  }
}
