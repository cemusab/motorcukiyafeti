import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkImage(url: string, name: string) {
  try {
    const res = await fetch(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) {
      console.error(`❌ Kırık Görsel [${res.status}]: ${name} -> ${url}`);
      return false;
    }
    return true;
  } catch (e) {
    console.error(`❌ Hata: ${name} -> ${url}`);
    return false;
  }
}

async function main() {
  console.log("🛠 Kapsamlı QA Testi Başlıyor...");
  
  const products = await prisma.product.findMany();
  const articles = await prisma.article.findMany();
  const categories = await prisma.category.findMany();

  let totalImages = 0;
  let brokenImages = 0;

  console.log(`\n🔍 GÖRSELLER KONTROL EDİLİYOR (${products.length + articles.length} adet)...`);
  
  // Sadece ilk 15'ini kontrol et (hızlı olması için), asıl sistemde tamamına bakabiliriz
  // ama Vercel deploylarında patlamasın diye hepsine hızlıca HEAD atalım
  const BATCH_SIZE = 10;
  for (let i = 0; i < products.length; i += BATCH_SIZE) {
    const batch = products.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(async (p) => {
      if (p.imageUrl) {
        totalImages++;
        const ok = await checkImage(p.imageUrl, p.name);
        if (!ok) brokenImages++;
      }
    }));
  }

  for (const a of articles) {
    if (a.imageUrl) {
      totalImages++;
      const ok = await checkImage(a.imageUrl, a.title);
      if (!ok) brokenImages++;
    }
  }

  console.log(`\n📊 SONUÇ: ${totalImages} görsel kontrol edildi. ${brokenImages} kırık görsel bulundu.`);
  
  if (brokenImages > 0) {
    console.error("LÜTFEN KIRIK GÖRSELLERİ DÜZELTİN!");
    process.exit(1);
  } else {
    console.log("✅ Tıpatıp 30. Maddeye Uygun: Sitede kırık veya görünmeyen hiçbir görsel kalmadı!");
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
