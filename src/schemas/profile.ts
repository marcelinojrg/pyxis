import { z } from 'zod';

export const updateNameSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Password confirmation does not match',
    path: ['confirmPassword'],
  });

export type UpdateNameValues = z.infer<typeof updateNameSchema>;
export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;
