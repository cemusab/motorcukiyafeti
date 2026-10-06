import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
  const products = await prisma.product.findMany({ include: { brand: true, category: true } });
  for (const p of products) {
    const text = encodeURIComponent(`${p.brand.name} ${p.name}`);
    const color = p.categoryId === 'kask' ? '1f2937' : 'dc2626'; // Gray for helmets, red for others
    const newUrl = `https://placehold.co/600x600/${color}/ffffff?text=${text}`;
    await prisma.product.update({ where: { id: p.id }, data: { imageUrl: newUrl } });
  }
  
  const articles = await prisma.article.findMany();
  for (let i = 0; i < articles.length; i++) {
    const a = articles[i];
    // Rotate through 3 working unsplash images
    const images = [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
      'https://images.unsplash.com/photo-1558980394-4c7c9299fe96?w=800&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80'
    ];
    await prisma.article.update({ where: { id: a.id }, data: { imageUrl: images[i % images.length] } });
  }
  console.log("Görseller placehold ve çalışan unsplash linkleriyle düzeltildi.");
}
run();
