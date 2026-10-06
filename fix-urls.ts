import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
  const products = await prisma.product.findMany();
  for (const p of products) {
    if (p.imageUrl && p.imageUrl.includes('wsrv.nl/?url=')) {
      const newUrl = p.imageUrl.replace('https://wsrv.nl/?url=', '');
      await prisma.product.update({ where: { id: p.id }, data: { imageUrl: decodeURIComponent(newUrl) } });
    }
  }
  
  const articles = await prisma.article.findMany();
  for (const a of articles) {
    if (a.imageUrl && a.imageUrl.includes('wsrv.nl/?url=')) {
      const newUrl = a.imageUrl.replace('https://wsrv.nl/?url=', '');
      await prisma.article.update({ where: { id: a.id }, data: { imageUrl: decodeURIComponent(newUrl) } });
    }
  }
  console.log("URLs fixed.");
}
run();
