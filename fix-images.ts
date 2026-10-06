import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
  const badProducts = await prisma.product.findMany({ where: { imageUrl: { contains: 'pollinations' } } });
  console.log(`Found ${badProducts.length} bad products. Deleting them...`);
  for (const p of badProducts) {
    await prisma.helmetIntercomCompatibility.deleteMany({ where: { productId: p.id } });
    await prisma.productSpec.deleteMany({ where: { productId: p.id } });
    await prisma.productPrice.deleteMany({ where: { productId: p.id } });
    await prisma.product.delete({ where: { id: p.id } });
  }
  console.log("Done.");
}
run();
