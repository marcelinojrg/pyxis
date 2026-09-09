import { z } from 'zod';

const BLOCKED_DOMAINS = [
  'yopmail.com',
  'ethermail.io',
  'ethermail.com',
  'mailinator.com',
  'tempmail.com',
  '10minutemail.com',
  'guerrillamail.com',
  'sharklasers.com',
  'dispostable.com',
  'getairmail.com',
  'maildrop.cc',
  'mailnesia.com',
];

export const loginSchema = z.object({
  email: z.email('Email format is invalid'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z
    .string()
    .email('Email format is invalid')
    .refine(
      (email) => {
        const domain = email.split('@')[1]?.toLowerCase();
        return !BLOCKED_DOMAINS.includes(domain);
      },
      {
        message: 'This email domain is not allowed for registration',
      }
    ),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
