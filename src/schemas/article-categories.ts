import { z } from 'zod';

export const articleCategorySchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be 100 characters or fewer'),
});

export type ArticleCategoryValues = z.infer<typeof articleCategorySchema>;
