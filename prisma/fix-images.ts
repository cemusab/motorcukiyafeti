import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fixImages() {
  const products = await prisma.product.findMany();
  
  for (const product of products) {
    let newUrl = 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800'; // Default helmet/moto image
    
    const name = product.name.toLowerCase();
    const cat = product.categoryId; // Actually we can just check the name/slug
    if (product.slug.includes('interkom') || name.includes('packtalk') || name.includes('sena')) {
      newUrl = 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=800'; // Headphone/intercom vibe
    } else if (name.includes('mont') || name.includes('jacket') || name.includes('alpinestars t-') || name.includes('racing 4') || name.includes('missile')) {
      newUrl = 'https://images.unsplash.com/photo-1520975954732-57dd22299614?auto=format&fit=crop&q=80&w=800'; // Leather jacket
    } else if (name.includes('eldiven') || name.includes('glove') || name.includes('sp-8') || name.includes('metal 6')) {
      newUrl = 'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?auto=format&fit=crop&q=80&w=800'; // Gloves
    } else if (name.includes('bot') || name.includes('tech 7') || name.includes('smx')) {
      newUrl = 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=800'; // Boots
    }

    await prisma.product.update({
      where: { id: product.id },
      data: { imageUrl: newUrl }
    });
  }
  console.log('Images fixed');
}

fixImages().catch(console.error).finally(() => prisma.$disconnect());
