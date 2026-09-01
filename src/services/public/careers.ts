'use server';

import type { CareerApplicationInput } from '@/schemas/careers';

export async function submitCareerApplication(data: CareerApplicationInput) {
  void data;
  return {
    success: false,
    error: 'Lamaran online belum tersedia. Silakan gunakan kanal rekrutmen resmi Pyxis.',
  };
}
