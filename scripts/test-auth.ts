import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { prisma } from '../src/lib/prisma';

async function testAuth() {
  console.log('🧪 Testing Authentication Logic...');

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@pyxis.co.id';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin';

  // 1. Fetch admin
  const admin = await prisma.admin.findUnique({
    where: { email: adminEmail },
  });

  if (!admin) {
    throw new Error('Admin not found in database!');
  }
  console.log('✅ 1. Admin record exists:', admin.email);

  // 2. Test valid password bcrypt compare
  const isMatch = await bcrypt.compare(adminPassword, admin.password);
  if (!isMatch) {
    throw new Error('Password mismatch on correct credentials!');
  }
  console.log('✅ 2. Valid password correctly verified');

  // 3. Test invalid password bcrypt compare
  const isWrongMatch = await bcrypt.compare('wrong-password', admin.password);
  if (isWrongMatch) {
    throw new Error('Invalid password was accepted!');
  }
  console.log('✅ 3. Invalid password correctly rejected');

  // 4. Test nonexistent user
  const nonexistent = await prisma.admin.findUnique({
    where: { email: 'nobody@pyxis.co.id' },
  });
  if (nonexistent !== null) {
    throw new Error('Nonexistent user returned data!');
  }
  console.log('✅ 4. Nonexistent user correctly handled');

  console.log('\n🎉 ALL AUTH TESTS PASSED SUCCESSFULLY!');
}

testAuth()
  .catch((err) => {
    console.error('❌ Auth test failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
