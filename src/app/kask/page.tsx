import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Motosiklet Kaskı Modelleri ve Fiyatları | MotorcuKiyafeti',
  description: 'En iyi kapalı, çene açılır ve yarım motosiklet kaskı markaları. Kadıköy, İstanbul ve tüm Türkiye'ye online motosiklet kaskı incelemeleri.',
  keywords: ["motosiklet kaskı", "kask modelleri", "çene açılır kask", "kapalı kask", "Shoei kask", "AGV kask", "İstanbul kask mağazası"],
};

import Link from "next/link";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Kask() {
  const helmets = await prisma.product.findMany({
    where: { category: { slug: 'kask' } },
    include: { brand: true },
    orderBy: { basePriceMin: 'desc' }
  });

  return (
    <div className="bg-[#f5f5f7] min-h-screen text-gray-900 font-sans pb-24">
      <main className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="text-xs text-gray-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-gray-900">Ana Sayfa</Link>
          <span>/</span><span className="font-bold text-gray-900">Kask</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 mb-2">Kapalı Kasklar</h1>
          <p className="text-gray-500">Günlük kullanım, sport sürüş ve uzun yol için en popüler kask tipleri.</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* SOL SIDEBAR (Filtreler - Statik Mock) */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="mb-6">
                <div className="flex items-center justify-between font-bold mb-3"><span>Marka</span></div>
                <div className="space-y-2 text-sm text-gray-600">
                  {['Shoei', 'AGV', 'Arai', 'HJC', 'LS2'].map(b => (
                    <label key={b} className="flex items-center gap-2"><input type="checkbox" className="rounded text-red-600" /> {b}</label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* SAĞ TARAF (Dinamik Ürün Listesi) */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm font-medium text-gray-500">{helmets.length} ürün bulundu</div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">Sıralama:</span>
                <select className="border border-gray-200 rounded bg-white px-3 py-1.5 focus:outline-none">
                  <option>En Popüler</option>
                  <option>Fiyata Göre Artan</option>
                  <option>Fiyata Göre Azalan</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {helmets.map(helmet => (
                <Link href={`/kask/${helmet.slug}`} key={helmet.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative group hover:shadow-lg transition flex flex-col">
                  <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 z-10">🤍</button>
                  <div className="h-56 bg-white rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                    <img src={helmet.imageUrl!} alt={helmet.name} className="w-full h-full object-cover transform scale-110" />
                  </div>
                  <h4 className="font-bold text-gray-900 mt-2 line-clamp-1">{helmet.brand.name} {helmet.name}</h4>
                  <p className="text-xs text-gray-500 mb-2">Kapalı Kask</p>
                  <div className="text-lg font-black text-gray-900 mt-auto">{helmet.basePriceMin?.toLocaleString('tr-TR')} TL</div>
                  <div className="text-xs text-yellow-500 mt-1">⭐⭐⭐⭐⭐ {helmet.rating} ({helmet.reviewCount})</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
