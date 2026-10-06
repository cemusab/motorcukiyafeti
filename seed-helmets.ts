import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
  const cat = await prisma.category.findUnique({ where: { slug: 'kask' } });
  if (!cat) return;
  
  async function getBrand(name: string) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return await prisma.brand.upsert({
      where: { slug },
      update: {},
      create: { name, slug }
    });
  }

  const helmets = [
    { name: 'Neotec 3', brand: 'Shoei', price: 28500, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0891/2605/shoei_neotec_3_helmet_matte_black_750x750.jpg' },
    { name: 'C5', brand: 'Schuberth', price: 31000, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0885/8447/schuberth_c5_helmet_matte_black_750x750.jpg' },
    { name: 'GT-Air 3', brand: 'Shoei', price: 26000, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0890/5832/shoei_gt_air_3_helmet_matte_black_750x750.jpg' },
    { name: 'Pista GP RR', brand: 'AGV', price: 58000, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0430/4348/agv_pista_gp_rr_carbon_helmet_750x750.jpg' },
    { name: 'K6 S', brand: 'AGV', price: 18500, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0885/6561/agv_k6_s_helmet_matte_black_750x750.jpg' },
    { name: 'RPHA 11 Pro', brand: 'HJC', price: 17500, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0172/5698/hjc_rpha11_pro_solid_helmet_semi_flat_black_750x750.jpg' },
    { name: 'NXR 2', brand: 'Shoei', price: 21500, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0358/7625/shoei_rf1400_helmet_matte_black_750x750.jpg' },
    { name: 'Spartan GT', brand: 'Shark', price: 15500, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0887/7542/shark_spartan_rs_helmet_matte_black_750x750.jpg' },
    { name: 'Exo-1400 Evo', brand: 'Scorpion', price: 14500, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0887/1887/scorpion_exo_1400_evo_air_helmet_matte_black_750x750.jpg' },
    { name: 'FF327 Challenger', brand: 'LS2', price: 8500, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0401/1000/ls2_challenger_helmet_matte_black_750x750.jpg' }
  ];

  for (const h of helmets) {
    const b = await getBrand(h.brand);
    const slug = `${b.slug}-${h.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    await prisma.product.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        name: h.name,
        brandId: b.id,
        categoryId: cat.id,
        description: `${b.name} ${h.name} mükemmel özelliklere sahip bir motosiklet kaskıdır.`,
        basePriceMin: h.price,
        imageUrl: h.img,
      }
    });
  }
}
run();
