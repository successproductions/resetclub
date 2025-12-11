import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create test user
  const testPassword = await bcrypt.hash('Test123!', 12);
  
  const user = await prisma.user.upsert({
    where: { email: 'test@resetclub.ma' },
    update: {},
    create: {
      email: 'test@resetclub.ma',
      passwordHash: testPassword,
      firstName: 'Test',
      lastName: 'User',
      role: 'CLIENT',
      isActive: true,
      emailVerified: true,
    },
  });

  console.log('✅ Created test user:', user.email);

  // Create user profile
  await prisma.userProfile.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
    },
  });

  console.log('✅ Created user profile');

  console.log('\n🎉 Seed completed!');
  console.log('\n📧 Login credentials:');
  console.log('   Email: test@resetclub.ma');
  console.log('   Password: Test123!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
