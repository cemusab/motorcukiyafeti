import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Satıcılar ve fiyatlar ekleniyor...");

  const m1 = await prisma.merchant.upsert({
    where: { id: "motomax" },
    update: {},
    create: { id: "motomax", name: "Motomax", logoUrl: "https://www.motomax.com.tr/Assets/images/logo.png" }
  });

  const m2 = await prisma.merchant.upsert({
    where: { id: "feyizoglu" },
    update: {},
    create: { id: "feyizoglu", name: "Feyizoğlu", logoUrl: "https://www.feyizoglu.com/images/logo.png" }
  });

  const m3 = await prisma.merchant.upsert({
    where: { id: "mototas" },
    update: {},
    create: { id: "mototas", name: "Mototaş", logoUrl: "https://www.mototas.com.tr/logo.png" }
  });

  // Find Shoei Neotec 3
  const neotec3 = await prisma.product.findFirst({
    where: { name: { contains: "Neotec 3" } }
  });

  if (neotec3) {
    console.log("Shoei Neotec 3 bulundu, fiyatlar ekleniyor...");
    await prisma.productPrice.createMany({
      data: [
        { productId: neotec3.id, merchantId: m1.id, price: 28500, url: "https://www.motomax.com.tr", stockStatus: true },
        { productId: neotec3.id, merchantId: m2.id, price: 29000, campaignPrice: 28200, url: "https://www.feyizoglu.com", stockStatus: true },
        { productId: neotec3.id, merchantId: m3.id, price: 28750, url: "https://www.mototas.com.tr", stockStatus: false },
      ]
    });
  }

  // Find Schuberth C5
  const c5 = await prisma.product.findFirst({
    where: { name: { contains: "C5" } }
  });

  if (c5) {
    console.log("Schuberth C5 bulundu, fiyatlar ekleniyor...");
    await prisma.productPrice.createMany({
      data: [
        { productId: c5.id, merchantId: m1.id, price: 31000, url: "https://www.motomax.com.tr", stockStatus: true },
        { productId: c5.id, merchantId: m2.id, price: 30500, url: "https://www.feyizoglu.com", stockStatus: true },
      ]
    });
  }

  console.log("İşlem tamamlandı.");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
