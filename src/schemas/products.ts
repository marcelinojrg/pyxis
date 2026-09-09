import { z } from 'zod';

const optionalText = (max: number, message: string) =>
  z.string().trim().max(max, message).optional();

const imageSchema = z
  .string()
  .trim()
  .max(2048, 'Image URL is too long.')
  .refine(
    (value) => !value || /^\/(?!\/)/.test(value) || /^https?:\/\/\S+$/i.test(value),
    'Image URL is invalid.'
  )
  .optional();

const contentItemSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required.')
    .max(120, 'Title must be 120 characters or fewer.'),
  description: optionalText(500, 'Description must be 500 characters or fewer.'),
  icon: optionalText(80, 'Icon name must be 80 characters or fewer.'),
});

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Product name is required.')
    .max(120, 'Product name must be 120 characters or fewer.'),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .max(120, 'Slug must be 120 characters or fewer.')
    .refine(
      (value) => !value || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value),
      'Slug may contain only lowercase letters, numbers, and hyphens.'
    )
    .optional(),
  description: optionalText(150, 'Short description must be 150 characters or fewer.'),
  featureSubtitle: optionalText(3000, 'Full description must be 3,000 characters or fewer.'),
  image: imageSchema,
  order: z
    .number()
    .int('Order must be a whole number.')
    .min(0, 'Order cannot be negative.')
    .max(9999),
  isActive: z.boolean(),
  benefits: z.array(contentItemSchema).max(30, 'You can add no more than 30 benefits.'),
  features: z.array(contentItemSchema).max(30, 'You can add no more than 30 features.'),
  capabilities: z
    .array(
      z.object({
        title: z
          .string()
          .trim()
          .min(1, 'Capability group title is required.')
          .max(120, 'Group title must be 120 characters or fewer.'),
        description: optionalText(3000, 'Group description must be 3,000 characters or fewer.'),
        imageUrl: imageSchema,
        items: z
          .array(contentItemSchema)
          .max(30, 'You can add no more than 30 items per capability group.'),
      })
    )
    .max(10, 'You can add no more than 10 capability groups.'),
});

export type ProductValues = z.infer<typeof productSchema>;
