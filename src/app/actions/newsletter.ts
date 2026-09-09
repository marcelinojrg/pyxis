'use server';

import { prisma } from '@/lib/prisma';
import { queueEmail } from '@/services/public/emails';
import { verifyPermission } from '@/services/admin/security';
import { headers } from 'next/headers';
import { z } from 'zod';

const newsletterEmailSchema = z.string().trim().toLowerCase().email().max(254);
const newsletterRateLimit = new Map<string, number[]>();
const NEWSLETTER_RATE_LIMIT = 5;
const NEWSLETTER_RATE_WINDOW_MS = 10 * 60 * 1000;
const eventNewsletterSchema = z.object({
  title: z.string().trim().min(1).max(200),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]+$/)
    .max(200),
  startDate: z.coerce.date(),
  location: z.string().trim().min(1).max(200),
  eventType: z.string().trim().min(1).max(100),
});

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] ||
      character
  );
}

export async function subscribeNewsletter(email: string) {
  try {
    const requestHeaders = await headers();
    const forwardedFor = requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim();
    const clientKey = forwardedFor || requestHeaders.get('x-real-ip') || 'unknown';
    const now = Date.now();
    const recentAttempts = (newsletterRateLimit.get(clientKey) || []).filter(
      (timestamp) => now - timestamp < NEWSLETTER_RATE_WINDOW_MS
    );

    if (recentAttempts.length >= NEWSLETTER_RATE_LIMIT) {
      return {
        success: false,
        message: 'Too many attempts. Please try again in a few minutes.',
      };
    }

    recentAttempts.push(now);
    newsletterRateLimit.set(clientKey, recentAttempts);

    if (newsletterRateLimit.size > 10_000) {
      for (const [key, timestamps] of newsletterRateLimit) {
        if (timestamps.every((timestamp) => now - timestamp >= NEWSLETTER_RATE_WINDOW_MS)) {
          newsletterRateLimit.delete(key);
        }
      }
    }

    const parsedEmail = newsletterEmailSchema.safeParse(email);
    if (!parsedEmail.success) {
      return { success: false, message: 'Please enter a valid email address.' };
    }

    const cleanEmail = parsedEmail.data;

    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email: cleanEmail },
      select: { id: true },
    });

    if (existingSubscriber) {
      return { success: true, message: 'This email is already subscribed to our newsletter.' };
    }

    // Store subscriber in database
    await prisma.newsletterSubscriber.create({
      data: { email: cleanEmail },
    });

    const subject = 'Welcome to the Pyxis newsletter! 🎉';
    const body = `
      <div style="font-family: Arial, sans-serif; padding: 24px; color: #141413; background-color: #FAF9F5; border-radius: 16px; max-width: 600px; margin: 0 auto; border: 1px solid #E3DACC;">
        <div style="margin-bottom: 20px;">
          <span style="background-color: #D97757; color: #ffffff; padding: 6px 12px; border-radius: 6px; font-weight: bold; font-size: 14px;">PYXIS</span>
        </div>
        <h2 style="color: #141413; margin-top: 10px;">Thank you for subscribing.</h2>
        <p style="color: #3D3D3A; font-size: 14px; line-height: 1.6;">
          Your email address (<strong>${cleanEmail}</strong>) has been added to the Pyxis newsletter.
        </p>
        <p style="color: #3D3D3A; font-size: 14px; line-height: 1.6;">
          You will be among the first to receive the latest updates from Pyxis.
        </p>
        <hr style="border: none; border-top: 1px solid #E3DACC; margin: 24px 0;" />
        <p style="font-size: 12px; color: #87867F; text-align: center;">
          &copy; ${new Date().getFullYear()} Pyxis Ultimate Solution
        </p>
      </div>
    `;

    const res = await queueEmail(cleanEmail, subject, body);
    if (!res.success) {
      return { success: false, message: res.error || 'Failed to subscribe to the newsletter.' };
    }

    return { success: true, message: 'You are subscribed. Check your email for confirmation.' };
  } catch (error) {
    console.error('Subscribe Newsletter Error:', error);
    return {
      success: false,
      message: 'A system error occurred while subscribing to the newsletter.',
    };
  }
}

export async function sendNewEventNewsletter(event: {
  title: string;
  slug: string;
  startDate: Date;
  location: string;
  eventType: string;
}) {
  try {
    if (!(await verifyPermission('admin.access'))) {
      return { success: false, message: 'Access denied.' };
    }

    const parsedEvent = eventNewsletterSchema.safeParse(event);
    if (!parsedEvent.success) {
      return { success: false, message: 'The newsletter data is invalid.' };
    }

    const safeEvent = {
      ...parsedEvent.data,
      title: escapeHtml(parsedEvent.data.title),
      slug: encodeURIComponent(parsedEvent.data.slug),
      location: escapeHtml(parsedEvent.data.location),
      eventType: escapeHtml(parsedEvent.data.eventType),
    };

    const [subscribers, users] = await Promise.all([
      prisma.newsletterSubscriber.findMany({ select: { email: true } }),
      prisma.user.findMany({ where: { banned: false }, select: { email: true } }),
    ]);

    const emailSet = new Set<string>();
    subscribers.forEach((s) => emailSet.add(s.email));
    users.forEach((u) => emailSet.add(u.email));

    const recipientEmails = Array.from(emailSet);
    if (recipientEmails.length === 0) return;

    const dateStr = safeEvent.startDate.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Jakarta',
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    for (const recipientEmail of recipientEmails) {
      const body = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #E3DACC; border-radius: 16px; background-color: #FAF9F5;">
          <div style="margin-bottom: 16px;">
            <span style="background-color: #D97757; color: #ffffff; padding: 6px 12px; border-radius: 6px; font-weight: bold; font-size: 14px;">LATEST UPDATE</span>
          </div>
          <h2 style="color: #D97757; margin-top: 8px;">Latest from Pyxis 🎉</h2>
          <p style="color: #3D3D3A; font-size: 14px; line-height: 1.6;">A new event has just been published. Register soon before places fill up.</p>
          
          <div style="background-color: #ffffff; border: 1px solid #E3DACC; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #141413;">${safeEvent.title}</h3>
            <p style="margin: 8px 0; font-size: 14px; color: #3D3D3A;"><strong>Date:</strong> ${dateStr}</p>
            <p style="margin: 8px 0; font-size: 14px; color: #3D3D3A;"><strong>Location:</strong> ${safeEvent.location}</p>
            <p style="margin: 8px 0; font-size: 14px; color: #3D3D3A;"><strong>Event type:</strong> ${safeEvent.eventType}</p>
          </div>
          
          <p style="margin: 24px 0; text-align: center;">
            <a href="${appUrl}/events/${safeEvent.slug}" style="background-color: #D97757; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">View details and register</a>
          </p>
          <hr style="border: none; border-top: 1px solid #E3DACC; margin: 24px 0;" />
          <p style="font-size: 12px; color: #87867F; text-align: center;">
            You are receiving this email because you are subscribed to the Pyxis newsletter.
          </p>
        </div>
      `;

      await queueEmail(recipientEmail, `Info Terbaru: ${safeEvent.title}`, body);
    }
  } catch (error) {
    console.error('Send New Event Newsletter Error:', error);
  }
}
