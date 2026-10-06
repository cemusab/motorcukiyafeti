import { MetadataRoute } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://motorcukiyafeti.com';

  // Statik rotalar
  const staticRoutes = [
    '',
    '/kask', '/mont', '/pantolon', '/eldiven', '/bot', '/interkom', '/koruma', '/aksesuar',
    '/markalar', '/rehberler', '/yeni-baslayanlar', '/karsilastir', '/uyumluluk',
    '/hakkimizda', '/iletisim', '/gizlilik', '/kullanim-sartlari'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dinamik ürün (kask vb.) rotaları
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await prisma.product.findMany({ select: { slug: true } });
    productRoutes = products.map((product) => ({
      url: `${baseUrl}/kask/${product.slug}`, // Şimdilik hepsi kask kategorisinde varsayıldı
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch (e) {
    console.error("Sitemap: Veritabanına erişilemedi.");
  }

  // Dinamik marka rotaları
  let brandRoutes: MetadataRoute.Sitemap = [];
  try {
    const brands = await prisma.brand.findMany({ select: { slug: true } });
    brandRoutes = brands.map((brand) => ({
      url: `${baseUrl}/markalar/${brand.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch (e) {
    console.error("Sitemap: Veritabanına erişilemedi.");
  }

  return [...staticRoutes, ...productRoutes, ...brandRoutes];
}
