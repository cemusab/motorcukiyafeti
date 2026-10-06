import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
  await prisma.helmetIntercomCompatibility.deleteMany({});
  console.log("Deleted all orphaned compatibilities.");
}
run();
