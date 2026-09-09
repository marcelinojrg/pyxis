'use server';

import type { CareerApplicationInput } from '@/schemas/careers';

export async function submitCareerApplication(data: CareerApplicationInput) {
  void data;
  return {
    success: false,
    error:
      'Online applications are not available yet. Please use the official Pyxis recruitment channel.',
  };
}
