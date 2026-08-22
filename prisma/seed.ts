import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { hashPassword } from 'better-auth/crypto';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is not set');

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// Semua permission yang dipakai di src/proxy.ts dan src/services/admin/*
const PERMISSIONS = [
  'admin.access',
  'user.read',
  'user.create',
  'user.update',
  'user.delete',
  'role.read',
  'role.create',
  'role.update',
  'role.delete',
  'article.read',
  'article.create',
  'article.update',
  'article.delete',
  'article.category.read',
  'article.category.create',
  'article.category.update',
  'article.category.delete',
];

async function main() {
  console.log('🌱 Seeding database...');

  for (const name of PERMISSIONS) {
    await prisma.permission.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('✅ Permissions seeded:', PERMISSIONS.length);

  const superadmin = await prisma.role.upsert({
    where: { name: 'superadmin' },
    update: {
      permissions: { set: PERMISSIONS.map((name) => ({ name })) },
    },
    create: {
      name: 'superadmin',
      description: 'Akses penuh ke seluruh fitur admin',
      permissions: { connect: PERMISSIONS.map((name) => ({ name })) },
    },
  });

  console.log('✅ Role seeded:', superadmin.name);

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@pyxis.co.id';
  const rawPassword = process.env.ADMIN_PASSWORD || 'admin';

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: 'admin',
      roles: { connect: { name: 'superadmin' } },
    },
    create: {
      email: adminEmail,
      name: 'Administrator',
      emailVerified: true,
      role: 'admin',
      roles: { connect: { name: 'superadmin' } },
    },
  });

  console.log('✅ Admin user seeded:', admin.email);

  // Credential account Better Auth: hash scrypt dari better-auth/crypto (bukan bcrypt)
  const password = await hashPassword(rawPassword);
  const existingAccount = await prisma.account.findFirst({
    where: { userId: admin.id, providerId: 'credential' },
  });

  if (existingAccount) {
    await prisma.account.update({
      where: { id: existingAccount.id },
      data: { password },
    });
  } else {
    await prisma.account.create({
      data: {
        userId: admin.id,
        providerId: 'credential',
        accountId: admin.id,
        password,
      },
    });
  }

  console.log('✅ Admin credential account seeded');

  console.log('\n✨ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
