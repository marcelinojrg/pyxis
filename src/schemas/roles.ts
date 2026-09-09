import { z } from 'zod';

export const roleSchema = z.object({
  name: z
    .string()
    .min(3, 'Role name must be at least 3 characters')
    .max(50, 'Role name must be 50 characters or fewer'),
  description: z
    .string()
    .max(1000, 'Description must be 1,000 characters or fewer')
    .optional()
    .or(z.literal('')),
  permissions: z.array(z.string()),
});
