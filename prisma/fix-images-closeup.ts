import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// These are images of helmets isolated on white/neutral backgrounds, not distant lifestyle shots.
const closeUpImages = [
  'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800', // Yellow Helmet Close
  'https://images.unsplash.com/photo-1572049091811-90a4dfb7df8d?auto=format&fit=crop&q=80&w=800', // Black Helmet Isolated
  'https://images.unsplash.com/photo-1582236353958-86f34584abdb?auto=format&fit=crop&q=80&w=800', // White Helmet Close
  'https://images.unsplash.com/photo-1533036499879-158652d194af?auto=format&fit=crop&q=80&w=800'  // Black Helmet Side
];

async function fixImages() {
  const helmets = await prisma.product.findMany({ where: { category: { slug: 'kask' } } });
  
  for (let i = 0; i < helmets.length; i++) {
     const newImg = closeUpImages[i % closeUpImages.length];
     await prisma.product.update({
        where: { id: helmets[i].id },
        data: { imageUrl: newImg }
     });
  }
  console.log('Images fixed to close-ups');
}

fixImages().catch(console.error).finally(() => prisma.$disconnect());
