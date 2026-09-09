import { z } from 'zod';

const listItemSchema = z.string().trim().min(1, 'Item cannot be empty.').max(500);

export const careerSchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least 3 characters.').max(160),
  categoryId: z.string().uuid('Category is invalid.').or(z.literal('')),
  location: z.string().trim().min(2, 'Location is required.').max(160),
  type: z.string().trim().min(2, 'Employment type is required.').max(80),
  department: z.string().trim().max(120).optional(),
  description: z.string().trim().min(20, 'Description must be at least 20 characters.').max(10000),
  responsibilities: z.array(listItemSchema).min(1, 'Add at least one responsibility.').max(30),
  requirements: z.array(listItemSchema).min(1, 'Add at least one requirement.').max(30),
  order: z.number().int().min(0, 'Order cannot be negative.').max(10000),
  isActive: z.boolean(),
});

export const careerCategorySchema = z.object({
  name: z.string().trim().min(2, 'Category name must be at least 2 characters.').max(100),
});

export type CareerValues = z.infer<typeof careerSchema>;
export type CareerCategoryValues = z.infer<typeof careerCategorySchema>;

export const careerApplicationSchema = z.object({
  careerId: z.string().min(1, 'Opening ID is invalid.'),
  fullName: z.string().min(3, 'Full name must be at least 3 characters.'),
  email: z.string().email('Email format is invalid.'),
  phone: z.string().min(8, 'Phone number must be at least 8 digits.'),
  portfolioUrl: z
    .string()
    .url('Portfolio or LinkedIn URL is invalid.')
    .optional()
    .or(z.literal('')),
  resumeUrl: z.string().url('CV URL is invalid.'),
});

export type CareerApplicationInput = z.infer<typeof careerApplicationSchema>;
