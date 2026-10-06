import { PrismaClient } from '@prisma/client';
import { image_search } from 'duckduckgo-images-api';

const prisma = new PrismaClient();

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchRealImages() {
  const helmets = await prisma.product.findMany({ 
    where: { category: { slug: 'kask' } },
    include: { brand: true }
  });
  
  console.log(`Bulunan kask sayısı: ${helmets.length}`);

  for (let i = 0; i < helmets.length; i++) {
    const helmet = helmets[i];
    const query = `${helmet.brand.name} ${helmet.name} helmet white background`;
    
    try {
      console.log(`[${i+1}/${helmets.length}] Aranıyor: ${query}`);
      const results = await image_search({ query, moderate: true, iterations: 1 });
      
      if (results && results.length > 0) {
        // En uygun resmi bul (tercihen png veya jpg)
        const bestImage = results.find((r: any) => r.image.endsWith('.png') || r.image.endsWith('.jpg')) || results[0];
        const originalUrl = bestImage.image;
        
        // wsrv.nl kullanarak resmi önbellekle ve boyutlandır (hotlink korumasını aşar ve arka planı beyaz yapar)
        const proxiedUrl = `https://wsrv.nl/?url=${encodeURIComponent(originalUrl)}&w=600&h=600&fit=contain&bg=white`;

        await prisma.product.update({
          where: { id: helmet.id },
          data: { imageUrl: proxiedUrl }
        });
        console.log(`=> Başarılı: ${proxiedUrl}`);
      } else {
        console.log(`=> Bulunamadı: ${query}`);
      }
    } catch (e: any) {
      console.error(`=> Hata (${query}): ${e.message}`);
    }
    
    // DuckDuckGo API banlamaması için bekle
    await delay(1000);
  }
  
  console.log('Tüm gerçek görseller başarıyla güncellendi!');
}

fetchRealImages().catch(console.error).finally(() => prisma.$disconnect());
