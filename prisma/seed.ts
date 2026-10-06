import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.helmetIntercomCompatibility.deleteMany()
  await prisma.productSpec.deleteMany()
  await prisma.product.deleteMany()
  await prisma.brand.deleteMany()
  await prisma.category.deleteMany()

  // Categories
  const categoryNames = ['Kask', 'Mont', 'Pantolon', 'Eldiven', 'Bot', 'Interkom']
  const categories: Record<string, any> = {}
  
  for (const name of categoryNames) {
    categories[name] = await prisma.category.create({
      data: {
        slug: name.toLowerCase().replace(/ı/g, 'i').replace(/[^a-z0-9]/g, '-'),
        name
      }
    })
  }

  // Brands
  const brandNames = ['Shoei', 'Schuberth', 'AGV', 'HJC', 'LS2', 'Cardo', 'Sena', 'Alpinestars', 'Dainese', 'Tech90']
  const brands: Record<string, any> = {}
  
  for (const name of brandNames) {
    brands[name] = await prisma.brand.create({
      data: {
        slug: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        name
      }
    })
  }

  // Products
  const createProduct = async (name: string, brandName: string, categoryName: string, price: number) => {
    const slugName = `${brandName} ${name}`;
    return await prisma.product.create({
      data: {
        slug: slugName.toLowerCase().replace(/ı/g, 'i').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        name,
        brandId: brands[brandName].id,
        categoryId: categories[categoryName].id,
        description: `${brandName} ${name} - Harika bir ${categoryName.toLowerCase()} seçeneği.`,
        basePriceMin: price,
        basePriceMax: price + 1000,
        imageUrl: `https://via.placeholder.com/300?text=${encodeURIComponent(name)}`,
        rating: 4.5,
        reviewCount: Math.floor(Math.random() * 100)
      }
    })
  }

  // 10 Helmets
  const helmet1 = await createProduct('Neotec 3', 'Shoei', 'Kask', 25000)
  const helmet2 = await createProduct('C5', 'Schuberth', 'Kask', 22000)
  const helmet3 = await createProduct('K6 S', 'AGV', 'Kask', 18000)
  const helmet4 = await createProduct('RPHA 11', 'HJC', 'Kask', 15000)
  const helmet5 = await createProduct('Valiant II', 'LS2', 'Kask', 8000)
  const helmet6 = await createProduct('GT-Air 3', 'Shoei', 'Kask', 23000)
  const helmet7 = await createProduct('S3', 'Schuberth', 'Kask', 21000)
  const helmet8 = await createProduct('Pista GP RR', 'AGV', 'Kask', 45000)
  const helmet9 = await createProduct('C70', 'HJC', 'Kask', 6000)
  const helmet10 = await createProduct('Storm', 'LS2', 'Kask', 5000)

  // 5 Intercoms
  const intercom1 = await createProduct('Packtalk Edge', 'Cardo', 'Interkom', 12000)
  const intercom2 = await createProduct('50S', 'Sena', 'Interkom', 11000)
  const intercom3 = await createProduct('SRL3', 'Sena', 'Interkom', 10000)
  const intercom4 = await createProduct('Freecom 4x', 'Cardo', 'Interkom', 8000)
  const intercom5 = await createProduct('Spider ST1', 'Sena', 'Interkom', 7000)

  // 5 Jackets
  await createProduct('Andes v3 Drystar', 'Alpinestars', 'Mont', 9000)
  await createProduct('Super Speed 3', 'Dainese', 'Mont', 15000)
  await createProduct('T-GP Plus R v3', 'Alpinestars', 'Mont', 8500)
  await createProduct('Racing 4', 'Dainese', 'Mont', 14000)
  await createProduct('Missile v2', 'Alpinestars', 'Mont', 12000)

  // 5 Gloves
  await createProduct('SP-8 v3', 'Alpinestars', 'Eldiven', 4500)
  await createProduct('Full Metal 6', 'Dainese', 'Eldiven', 9000)
  await createProduct('SMX-1 Air v2', 'Alpinestars', 'Eldiven', 2500)
  await createProduct('Carbon 3', 'Dainese', 'Eldiven', 5000)
  await createProduct('Kevlar City', 'Tech90', 'Eldiven', 1500)

  // 5 Boots
  await createProduct('SMX-6 v2', 'Alpinestars', 'Bot', 8000)
  await createProduct('Torque 3 Out', 'Dainese', 'Bot', 11000)
  await createProduct('Tech 7', 'Alpinestars', 'Bot', 12000)
  await createProduct('Nexus 2', 'Dainese', 'Bot', 9000)
  await createProduct('J-6 Waterproof', 'Alpinestars', 'Bot', 6000)

  // HelmetIntercomCompatibility for Shoei Neotec 3
  await prisma.helmetIntercomCompatibility.create({
    data: {
      productId: helmet1.id,
      intercomId: intercom3.id,
      status: 'Tam Entegre Uyumlu'
    }
  })

  await prisma.helmetIntercomCompatibility.create({
    data: {
      productId: helmet1.id,
      intercomId: intercom1.id,
      status: 'Standart Montaj'
    }
  })

  console.log('Database seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
