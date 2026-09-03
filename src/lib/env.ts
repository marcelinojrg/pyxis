export function validateProductionEnvironment() {
  if (process.env.NODE_ENV !== 'production' || process.env.NEXT_PHASE) return;

  const required = [
    'DATABASE_URL',
    'BETTER_AUTH_SECRET',
    'BETTER_AUTH_URL',
    'NEXT_PUBLIC_APP_URL',
    'IMAGEKIT_PRIVATE_KEY',
  ];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing production environment variables: ${missing.join(', ')}`);
  }
}
