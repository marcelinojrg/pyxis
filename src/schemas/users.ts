import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters.',
  }),
  email: z.string().email({
    message: 'Email is invalid.',
  }),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters.',
    })
    .optional()
    .or(z.literal('')),
  newPassword: z
    .string()
    .min(8, {
      message: 'New password must be at least 8 characters.',
    })
    .optional()
    .or(z.literal('')),
  roleId: z.string().min(1, {
    message: 'Role is required.',
  }),
  image: z.string().optional().nullable(),
});
