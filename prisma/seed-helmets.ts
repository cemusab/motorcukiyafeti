import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const closeUpImages = [
  'https://images.unsplash.com/photo-1582236353958-86f34584abdb?auto=format&fit=crop&q=80&w=600', // White modern
  'https://images.unsplash.com/photo-1557008075-7f2c5efa4cb4?auto=format&fit=crop&q=80&w=600', // Red/black
  'https://images.unsplash.com/photo-1533036499879-158652d194af?auto=format&fit=crop&q=80&w=600', // Black sleek
  'https://images.unsplash.com/photo-1563212003-88bc264e10b2?auto=format&fit=crop&q=80&w=600', // Graphic/racing
  'https://images.unsplash.com/photo-1623910398642-83b6329c0379?auto=format&fit=crop&q=80&w=600', // Retro/classic
  'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600'  // Matte black
];

const helmetModels = [
  { b: 'Shoei', m: ['Neotec 3', 'GT-Air 3', 'NXR 2', 'X-SPR Pro', 'Glamster', 'Ex-Zero', 'Hornet ADV', 'J-Cruise 2'] },
  { b: 'AGV', m: ['Pista GP RR', 'Corsa R', 'K6 S', 'K5 S', 'K3', 'K1 S', 'Tourmodular', 'AX9', 'X3000'] },
  { b: 'Arai', m: ['RX-7V Evo', 'Quantic', 'Profile-V', 'Concept-X', 'Tour-X 4', 'Chaser-X', 'SZ-R VAS'] },
  { b: 'HJC', m: ['RPHA 1', 'RPHA 11', 'RPHA 71', 'RPHA 91', 'F70', 'I70', 'I90', 'C70', 'V90'] },
  { b: 'LS2', m: ['Advant X', 'Valiant II', 'Storm', 'Stream Evo', 'Vector II', 'Subverter', 'Pioneer Evo'] },
  { b: 'Schuberth', m: ['C5', 'E2', 'S3', 'C4 Pro', 'M1 Pro'] },
  { b: 'Nolan', m: ['N100-5', 'N80-8', 'N60-6', 'N70-2 X', 'N21'] }
];

async function add50Helmets() {
  const category = await prisma.category.findUnique({ where: { slug: 'kask' } });
  if (!category) return;

  const allBrands = await prisma.brand.findMany();
  
  let imgIndex = 0;
  
  for (const group of helmetModels) {
    let brand = allBrands.find(b => b.name === group.b);
    if (!brand) {
      brand = await prisma.brand.create({ data: { name: group.b, slug: group.b.toLowerCase().replace(/[^a-z0-9]/g, '') } });
    }

    for (const model of group.m) {
      const price = Math.floor(Math.random() * (45000 - 5000 + 1)) + 5000;
      const slugName = `${brand.name}-${model}`.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      const existing = await prisma.product.findUnique({ where: { slug: slugName } });
      if (!existing) {
        await prisma.product.create({
          data: {
            name: model,
            slug: slugName,
            brandId: brand.id,
            categoryId: category.id,
            basePriceMin: price,
            basePriceMax: price + 2000,
            imageUrl: closeUpImages[imgIndex % closeUpImages.length],
            description: `${brand.name} markasının en çok tercih edilen ${model} serisi kaskı. Aerodinamik yapısı ve yüksek güvenlik standartlarıyla öne çıkıyor.`,
            rating: Number((Math.random() * (5 - 4) + 4).toFixed(1)),
            reviewCount: Math.floor(Math.random() * 200) + 10,
          }
        });
        imgIndex++;
      } else {
         await prisma.product.update({
            where: { id: existing.id },
            data: { imageUrl: closeUpImages[imgIndex % closeUpImages.length] }
         });
         imgIndex++;
      }
    }
  }
  console.log('50 Helmets added/updated with close-up images.');
}

add50Helmets().catch(console.error).finally(() => prisma.$disconnect());
