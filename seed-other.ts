import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
  const getCat = async (slug: string) => prisma.category.upsert({ where: { slug }, update: {}, create: { name: slug.toUpperCase(), slug } });
  const getBrand = async (name: string) => prisma.brand.upsert({ where: { slug: name.toLowerCase() }, update: {}, create: { name, slug: name.toLowerCase() } });
  
  const cMont = await getCat('mont');
  const cBot = await getCat('bot-ayakkabi');
  const cEldiven = await getCat('eldiven');
  const bRevit = await getBrand('Revit');
  const bDainese = await getBrand('Dainese');

  const prods = [
    { cat: cMont, brand: bRevit, name: 'Sand 4 H2O', price: 15000 },
    { cat: cMont, brand: bDainese, name: 'Racing 4', price: 18000 },
    { cat: cBot, brand: bRevit, name: 'Pioneer', price: 9000 },
    { cat: cEldiven, brand: bDainese, name: 'Carbon 4', price: 5000 },
  ];

  for (const p of prods) {
    const slug = `${p.brand.slug}-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    const url = `https://placehold.co/600x600/dc2626/ffffff?text=${encodeURIComponent(p.brand.name + ' ' + p.name)}`;
    await prisma.product.upsert({
      where: { slug },
      update: {},
      create: { slug, name: p.name, brandId: p.brand.id, categoryId: p.cat.id, description: 'Test', basePriceMin: p.price, imageUrl: url }
    });
  }
}
run();
