import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
  const p = await prisma.product.count();
  console.log(`Products left: ${p}`);
}
run();
