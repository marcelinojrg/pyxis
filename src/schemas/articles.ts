import { z } from 'zod';

const imageUrl = z
  .string()
  .trim()
  .max(2048, 'Cover URL is too long.')
  .refine(
    (value) => !value || value.startsWith('/') || /^https:\/\/[^\s]+$/i.test(value),
    'Cover URL is invalid.'
  );

export const articleSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Article title must be at least 3 characters.')
    .max(160, 'Article title must be 160 characters or fewer.'),
  content: z
    .string()
    .max(200_000, 'Article content is too long.')
    .refine(
      (value) =>
        value
          .replace(/<[^>]*>/g, ' ')
          .replace(/&nbsp;/gi, ' ')
          .trim().length >= 20,
      'Article content must be at least 20 characters.'
    ),
  cover: imageUrl.optional(),
  categoryIds: z
    .array(z.string().uuid('Category is invalid.'))
    .min(1, 'Choose at least one category.')
    .max(8, 'Choose no more than 8 categories per article.')
    .refine((ids) => new Set(ids).size === ids.length, 'Categories cannot be duplicated.'),
  isPublished: z.boolean(),
});

export const articleCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Category name must be at least 2 characters.')
    .max(60, 'Category name must be 60 characters or fewer.')
    .regex(
      /^[\p{L}\p{N}][\p{L}\p{N}\s&/-]*$/u,
      'Category names may contain letters, numbers, spaces, &, /, or -.'
    ),
});

export type ArticleValues = z.infer<typeof articleSchema>;
export type ArticleCategoryValues = z.infer<typeof articleCategorySchema>;
