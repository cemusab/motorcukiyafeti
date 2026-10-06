import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

export async function generateStaticParams() {
  const items = await prisma.brand.findMany({ select: { slug: true } });
  return items.map((item) => ({ slug: item.slug }));
}
export const dynamicParams = false;


// Sahte (Mock) Marka Bilgileri Veritabanı
const brandInfo: Record<string, any> = {
  'shoei': { hq: 'Japonya 🇯🇵', distributor: 'Özen Motor', strongCats: ['Kapalı Kask', 'Modüler Kask'], retailers: ['Motomax', 'Feyizoğlu', 'Özen Motor'], officialSite: 'shoei.com' },
  'agv': { hq: 'İtalya 🇮🇹', distributor: 'Motomax', strongCats: ['Yarış Kaskı', 'Karbon Kask'], retailers: ['Motomax', 'Motosikletim'], officialSite: 'agv.com' },
  'arai': { hq: 'Japonya 🇯🇵', distributor: 'Mototaş', strongCats: ['Premium Kask', 'Touring Kask'], retailers: ['Mototaş', 'Kalyoncu Motor'], officialSite: 'araihelmet.eu' },
  'hjc': { hq: 'Güney Kore 🇰🇷', distributor: 'Motomax', strongCats: ['Fiyat/Performans Kask'], retailers: ['Motomax', 'Feyizoğlu'], officialSite: 'hjchelmets.eu' },
  'ls2': { hq: 'İspanya 🇪🇸', distributor: 'Motoruma.com', strongCats: ['Başlangıç Kaskı', 'Açık Kask'], retailers: ['Motoruma', 'N11', 'Trendyol'], officialSite: 'ls2helmets.com' },
  'sena': { hq: 'Güney Kore 🇰🇷', distributor: 'Motomax', strongCats: ['Mesh İnterkom', 'Kask İçi İletişim'], retailers: ['Motomax', 'Feyizoğlu'], officialSite: 'sena.com' },
  'cardo': { hq: 'ABD 🇺🇸', distributor: 'Özen Motor', strongCats: ['Premium Mesh İnterkom'], retailers: ['Özen Motor', 'Mototas'], officialSite: 'cardosystems.com' },
  'dainese': { hq: 'İtalya 🇮🇹', distributor: 'Mototaş', strongCats: ['Deri Mont', 'Yarış Tulumu', 'Eldiven'], retailers: ['Mototaş'], officialSite: 'dainese.com' },
  'alpinestars': { hq: 'İtalya 🇮🇹', distributor: 'Motomax', strongCats: ['Touring Mont', 'Motosiklet Botu'], retailers: ['Motomax', 'Feyizoğlu'], officialSite: 'alpinestars.com' }
};

export default async function BrandDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const brand = await prisma.brand.findUnique({
    where: { slug },
    include: {
      products: {
        include: { category: true }
      }
    }
  });

  if (!brand) notFound();

  const info = brandInfo[slug] || { hq: 'Küresel', distributor: 'Bilinmiyor', strongCats: ['Genel Ekipman'], retailers: ['Çeşitli Bayiler'], officialSite: '#' };

  return (
    <div className="bg-[#f5f5f7] min-h-screen text-gray-900 font-sans pb-24">
      
      {/* Marka Header Alanı */}
      <div className="bg-[#111111] text-white pt-24 pb-16 border-b border-gray-800">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex text-xs text-gray-500 mb-8 items-center gap-2">
            <Link href="/" className="hover:text-white">Ana Sayfa</Link>
            <span>/</span><Link href="/markalar" className="hover:text-white">Markalar</Link>
            <span>/</span><span className="font-bold text-gray-300">{brand.name}</span>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center p-4 shadow-xl">
               <span className="text-4xl font-black text-black">{brand.name.substring(0, 2)}</span>
            </div>
            <div>
              <h1 className="text-5xl font-black mb-2 tracking-tight">{brand.name}</h1>
              <p className="text-gray-400 text-lg mb-6">{info.hq} menşeli premium motosiklet ekipman üreticisi.</p>
              <div className="flex flex-wrap gap-4">
                <a href={`https://${info.officialSite}`} target="_blank" className="bg-white text-black font-bold px-6 py-2 rounded-lg hover:bg-gray-200 transition">🌐 Resmi Web Sitesi</a>
                <button className="border border-gray-700 text-gray-300 font-bold px-6 py-2 rounded-lg hover:bg-gray-800 transition">🤍 Markayı Takip Et</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sol Kolon (Bilgiler) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Distribütör & Satış</h3>
              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-1">Türkiye Resmi Distribütörü</div>
                <div className="font-black text-red-600 bg-red-50 inline-block px-3 py-1 rounded-lg">{info.distributor}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-2">Satış Noktaları ({info.retailers.length} Mağaza)</div>
                <div className="flex flex-col gap-2">
                  {info.retailers.map((r: string) => (
                    <div key={r} className="text-sm font-medium border border-gray-200 px-3 py-2 rounded flex justify-between items-center">
                       <span>{r}</span>
                       <span className="text-xs text-gray-400">🔗 Git</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">En Güçlü Olduğu Kategoriler</h3>
              <div className="flex flex-wrap gap-2">
                 {info.strongCats.map((cat: string) => (
                    <span key={cat} className="bg-gray-100 text-gray-700 font-medium text-xs px-3 py-1.5 rounded-full">{cat}</span>
                 ))}
              </div>
            </div>
          </div>

          {/* Sağ Kolon (Ürünler) */}
          <div className="lg:col-span-3">
             <div className="flex justify-between items-end mb-6">
               <h2 className="text-2xl font-black">{brand.name} Ürünleri ({brand.products.length})</h2>
               <select className="border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none">
                 <option>En Popüler</option>
                 <option>Fiyata Göre Azalan</option>
               </select>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
               {brand.products.map(product => (
                 <Link href={`/${product.category.slug}/${product.slug}`} key={product.id} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm relative group hover:shadow-lg transition flex flex-col">
                   <div className="h-48 bg-gray-50 rounded-2xl mb-4 flex items-center justify-center overflow-hidden p-4">
                     <img src={product.imageUrl!} alt={product.name} className="h-full object-contain mix-blend-multiply group-hover:scale-110 transition duration-500" />
                   </div>
                   <div className="text-xs text-red-600 font-bold mb-1 uppercase tracking-wider">{product.category.name}</div>
                   <h4 className="font-black text-gray-900 text-lg mb-2 leading-tight">{product.name}</h4>
                   <div className="text-xl font-black text-gray-900 mt-auto pt-4 border-t border-gray-100">{product.basePriceMin?.toLocaleString('tr-TR')} TL</div>
                 </Link>
               ))}
               {brand.products.length === 0 && (
                 <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-3xl border border-gray-100">
                    Henüz bu markaya ait veritabanında ürün bulunmuyor.
                 </div>
               )}
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}
