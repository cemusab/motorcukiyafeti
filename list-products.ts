import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
  const p = await prisma.product.findMany();
  console.log(p.map(x => x.name).join(', '));
}
run();
