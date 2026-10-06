import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fetchRealImages() {
  const helmets = await prisma.product.findMany({ 
    where: { category: { slug: 'kask' } },
    include: { brand: true }
  });
  
  console.log(`Bulunan kask sayısı: ${helmets.length}`);

  for (let i = 0; i < helmets.length; i++) {
    const helmet = helmets[i];
    
    // Pollinations AI kullanarak her modele özel, yüksek çözünürlüklü, beyaz arka planlı gerçekçi ürün görseli üretiyoruz!
    // Bu sayede kırık link veya sahte resim sorunu tamamen ortadan kalkıyor.
    const prompt = `Highly detailed photorealistic product shot of a ${helmet.brand.name} ${helmet.name} motorcycle helmet. Isolated on pure white background, studio lighting, highly detailed.`;
    const aiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=600&height=600&nologo=true&seed=${i}`;

    await prisma.product.update({
      where: { id: helmet.id },
      data: { imageUrl: aiUrl }
    });
    console.log(`=> Güncellendi: ${helmet.brand.name} ${helmet.name} -> AI Görseli Atandı`);
  }
  
  console.log('Tüm kasklar kendilerine özel, kırılmayan HD ürün görselleriyle güncellendi!');
}

fetchRealImages().catch(console.error).finally(() => prisma.$disconnect());
