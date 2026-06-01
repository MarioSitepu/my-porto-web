import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('✅ Berhasil terhubung ke database Neon!');
  } catch (error) {
    console.error('❌ Gagal terhubung ke database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
