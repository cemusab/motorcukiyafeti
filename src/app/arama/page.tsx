import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q || '';
  
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query } },
        { description: { contains: query } },
        { brand: { name: { contains: query } } }
      ]
    },
    include: { brand: true, category: true }
  });

  return (
    <div className="bg-[#f5f5f7] min-h-screen text-gray-900 font-sans pb-24">
      <main className="max-w-[1400px] mx-auto px-4 py-12">
        <h1 className="text-3xl font-black mb-2">Arama Sonuçları</h1>
        <p className="text-gray-500 mb-8">"{query}" için {products.length} ürün bulundu.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map(product => (
              <Link href={`/${product.category.slug}/${product.slug}`} key={product.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm relative hover:shadow-lg transition">
                <div className="h-48 bg-gray-50 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                  <img src={product.imageUrl!} alt={product.name} className="w-3/4 h-3/4 object-contain mix-blend-multiply" />
                </div>
                <h4 className="font-bold text-gray-900">{product.brand.name} {product.name}</h4>
                <p className="text-xs text-gray-500 mb-2">{product.category.name}</p>
                <div className="text-lg font-black text-gray-900">{product.basePriceMin?.toLocaleString('tr-TR')} TL</div>
              </Link>
            ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
             <span className="text-5xl mb-4 block">🔍</span>
             <h2 className="text-2xl font-bold mb-2">Ürün Bulunamadı</h2>
             <p className="text-gray-500">Arama kriterlerinizi değiştirerek tekrar deneyebilirsiniz.</p>
          </div>
        )}
      </main>
    </div>
  );
}
