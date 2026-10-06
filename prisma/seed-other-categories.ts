import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Veritabanına diğer kategoriler (Mont, Eldiven, Bot, İnterkom) ekleniyor...');

  // Ensure categories exist
  const catMont = await prisma.category.upsert({ where: { slug: 'mont' }, update: {}, create: { name: 'Mont', slug: 'mont' } });
  const catEldiven = await prisma.category.upsert({ where: { slug: 'eldiven' }, update: {}, create: { name: 'Eldiven', slug: 'eldiven' } });
  const catBot = await prisma.category.upsert({ where: { slug: 'bot' }, update: {}, create: { name: 'Bot', slug: 'bot' } });
  const catInterkom = await prisma.category.upsert({ where: { slug: 'interkom' }, update: {}, create: { name: 'İnterkom', slug: 'interkom' } });

  // Helper for Brand
  async function getBrand(name: string) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return await prisma.brand.upsert({
      where: { slug },
      update: {},
      create: { name, slug }
    });
  }

  // Define Products
  const products = [
    // --- MONT ---
    { name: 'Eclipse 2', brand: 'Revit', catId: catMont.id, price: 5500, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0927/6559/revit_eclipse_2_jacket_black_750x750.jpg', specs: [{name: 'Mevsim', value: 'Yazlık'}, {name: 'Malzeme', value: 'File / Tekstil'}, {name: 'Koruma Seviyesi', value: 'CE A Sınıfı'}, {name: 'Sırt Koruması', value: 'Opsiyonel (Seesoft)'}] },
    { name: 'Andes v3 Drystar', brand: 'Alpinestars', catId: catMont.id, price: 9200, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0833/2798/alpinestars_andes_v3_drystar_jacket_black_750x750.jpg', specs: [{name: 'Mevsim', value: '4 Mevsim'}, {name: 'Su Geçirmezlik', value: 'Drystar (Sabit)'}, {name: 'Koruma Seviyesi', value: 'CE A Sınıfı'}] },
    { name: 'Super Speed 3', brand: 'Dainese', catId: catMont.id, price: 28500, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0411/1781/dainese_super_speed_3_perforated_leather_jacket_750x750.jpg', specs: [{name: 'Mevsim', value: 'Yazlık / Bahar'}, {name: 'Malzeme', value: 'D-Skin 2.0 Deri'}, {name: 'Koruma Seviyesi', value: 'CE AA Sınıfı'}, {name: 'Omuz Slider', value: 'Alüminyum'}] },
    { name: 'Sand 4 H2O', brand: 'Revit', catId: catMont.id, price: 18500, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0854/2200/revit_sand_4_h2o_jacket_silver_black_750x750.jpg', specs: [{name: 'Mevsim', value: '4 Mevsim (Katmanlı)'}, {name: 'Kullanım', value: 'Adventure'}, {name: 'Koruma Seviyesi', value: 'CE AA Sınıfı'}] },
    { name: '4 Season Evo', brand: 'Spidi', catId: catMont.id, price: 17000, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0890/6936/spidi_4_season_evo_jacket_750x750.jpg', specs: [{name: 'Mevsim', value: '4 Mevsim'}, {name: 'Kullanım', value: 'Touring'}, {name: 'Koruma Seviyesi', value: 'CE A Sınıfı'}] },
    
    // --- ELDİVEN ---
    { name: 'Sand 4', brand: 'Revit', catId: catEldiven.id, price: 3800, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0853/6584/revit_sand_4_gloves_750x750.jpg', specs: [{name: 'Mevsim', value: 'Yazlık'}, {name: 'Malzeme', value: 'Deri / File'}, {name: 'Ekran Dokunma', value: 'Var (Connect Finger Tip)'}] },
    { name: 'SMX-1 Air v2', brand: 'Alpinestars', catId: catEldiven.id, price: 2900, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0356/3941/alpinestars_smx1_air_v2_gloves_750x750.jpg', specs: [{name: 'Mevsim', value: 'Yazlık'}, {name: 'Koruma', value: 'Sert Karbon Yumruk'}] },
    { name: 'Carbon 4 Long', brand: 'Dainese', catId: catEldiven.id, price: 6500, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0885/8863/dainese_carbon_4_long_gloves_750x750.jpg', specs: [{name: 'Tip', value: 'Uzun Konçlu'}, {name: 'Kullanım', value: 'Sport / Pist'}, {name: 'Koruma', value: 'Karbon Fiber'}] },
    { name: 'RFX1', brand: 'Five Gloves', catId: catEldiven.id, price: 8900, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0856/8018/five_rfx_race_gloves_black_750x750.jpg', specs: [{name: 'Tip', value: 'Uzun Konçlu'}, {name: 'Kullanım', value: 'Pist (Racing)'}, {name: 'Malzeme', value: 'Kevlar Destekli Deri'}] },
    { name: 'Handroid Pod Mk4', brand: 'Knox', catId: catEldiven.id, price: 7200, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0890/8157/knox_handroid_pod_mk4_gloves_750x750.jpg', specs: [{name: 'Bağlama Sistemi', value: 'BOA Closure'}, {name: 'Koruma', value: 'SPS (Kafes Sistemi)'}, {name: 'Tip', value: 'Kısa Konç'}] },
    
    // --- BOT ---
    { name: 'Vibe WP', brand: 'TCX', catId: catBot.id, price: 6000, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0375/1990/tcx_vibe_wp_boots_750x750.jpg', specs: [{name: 'Kullanım', value: 'Şehir İçi / Günlük'}, {name: 'Su Geçirmezlik', value: 'Var (WP)'}] },
    { name: 'SMX-6 v2', brand: 'Alpinestars', catId: catBot.id, price: 10500, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0285/1199/alpinestars_smx6_v2_vented_boots_750x750.jpg', specs: [{name: 'Tip', value: 'Uzun Çizme'}, {name: 'Kullanım', value: 'Sport / Touring'}, {name: 'Slider', value: 'Değiştirilebilir TPU'}] },
    { name: 'Adventure 2 Gore-Tex', brand: 'Sidi', catId: catBot.id, price: 16000, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0244/8525/sidi_adventure2_gore_tex_boots_750x750.jpg', specs: [{name: 'Kullanım', value: 'Adventure / Enduro'}, {name: 'Su Geçirmezlik', value: 'Gore-Tex (Garantili)'}, {name: 'Koruma', value: 'Gelişmiş Bilek Torsiyon'}] },
    { name: 'York Air', brand: 'Dainese', catId: catBot.id, price: 5800, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0409/4933/dainese_york_air_shoes_dark_carbon_anthracite_750x750.jpg', specs: [{name: 'Mevsim', value: 'Yazlık'}, {name: 'Tip', value: 'Sneaker Tipi Günlük'}, {name: 'Vites Koruma', value: 'Var'}] },
    { name: 'Terrain TX', brand: 'Forma', catId: catBot.id, price: 9500, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0179/0423/forma_terrain_tx_boots_750x750.jpg', specs: [{name: 'Kullanım', value: 'Cross / Off-Road'}, {name: 'Menteşe Sistemi', value: 'F.C.S.'}, {name: 'Taban', value: 'Dikişli Enduro'}] },
    
    // --- İNTERKOM ---
    { name: 'Packtalk Edge', brand: 'Cardo', catId: catInterkom.id, price: 14500, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0890/6548/cardo_pack_talk_edge_headset_750x750.jpg', specs: [{name: 'Teknoloji', value: 'Mesh (DMC 2.0) & Bluetooth 5.2'}, {name: 'Bağlantı Şekli', value: 'Manyetik (Air Mount)'}, {name: 'Hoparlör', value: '40mm JBL'}, {name: 'Grup Sayısı', value: '15 Kişiye Kadar'}] },
    { name: 'Freecom 4x', brand: 'Cardo', catId: catInterkom.id, price: 9500, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0887/7841/cardo_freecom_4x_headset_750x750.jpg', specs: [{name: 'Teknoloji', value: 'Bluetooth 5.2'}, {name: 'Hoparlör', value: '40mm JBL'}, {name: 'Grup Sayısı', value: '4 Kişiye Kadar'}, {name: 'Sesli Komut', value: 'Var (Natural Voice)'}] },
    { name: '50S', brand: 'Sena', catId: catInterkom.id, price: 14000, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0891/2569/sena50_s_mesh20_intercom_headset_with_harman_kardon_dual_pack_750x750.jpg', specs: [{name: 'Teknoloji', value: 'Mesh 2.0 & Bluetooth 5.0'}, {name: 'Hoparlör', value: 'Harman Kardon'}, {name: 'Kontrol', value: 'Jog Dial (Tekerlek)'}] },
    { name: 'SRL3', brand: 'Sena', catId: catInterkom.id, price: 13500, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0890/6479/sena_srl_mesh_communication_system_for_shoei_helmets_750x750.jpg', specs: [{name: 'Uyumlu Kasklar', value: 'Shoei Neotec 3, GT-Air 3'}, {name: 'Teknoloji', value: 'Mesh & Bluetooth'}, {name: 'Tasarım', value: 'Kaska Tam Entegre (Görünmez)'}] },
    { name: 'U-Com 16', brand: 'Interphone', catId: catInterkom.id, price: 10500, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0861/2241/interphone_u_com_16_headset_750x750.jpg', specs: [{name: 'Teknoloji', value: 'Sena Mesh Altyapısı'}, {name: 'Tasarım', value: 'Çok İnce Profil'}, {name: 'Hoparlör', value: '40mm HD'}] },
  ];

  for (const item of products) {
    const brand = await getBrand(item.brand);
    const slug = `${brand.slug}-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    
    console.log(`Ekleniyor: ${brand.name} ${item.name}`);
    
    const createdProduct = await prisma.product.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        name: item.name,
        brandId: brand.id,
        categoryId: item.catId,
        description: `${brand.name} ${item.name}, Türkiye motosiklet pazarındaki en popüler ekipmanlardan biridir. Sürüş güvenliğiniz ve konforunuz için tasarlanmıştır.`,
        basePriceMin: item.price,
        imageUrl: item.img,
        rating: 4.5 + Math.random() * 0.5,
        reviewCount: Math.floor(Math.random() * 50) + 10,
      }
    });

    for (const spec of item.specs) {
      await prisma.productSpec.create({
        data: {
          productId: createdProduct.id,
          name: spec.name,
          value: spec.value
        }
      });
    }
  }

  console.log('Başarıyla tamamlandı!');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
