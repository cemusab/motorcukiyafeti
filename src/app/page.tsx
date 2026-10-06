import Link from "next/link";
import { PrismaClient } from '@prisma/client';
import WizardWidget from "@/components/WizardWidget";

const prisma = new PrismaClient();

export default async function Home() {
  const editorPicks = await prisma.product.findMany({
    take: 4,
    orderBy: { rating: 'desc' },
    include: { category: true, brand: true }
  });

  return (
    <main className="bg-[#f5f5f7] min-h-screen text-gray-900 pb-24">
      {/* HERO SECTION */}
      <section className="relative pt-24 pb-48 overflow-hidden bg-black text-white">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&q=80&w=2070" 
            alt="Motosiklet Sürücüsü" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        
        <div className="relative max-w-[1000px] mx-auto px-4 text-center z-10">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4 leading-tight">
            Erkek ve Kadın <br/>
            <span className="text-red-600">Motorcu Kıyafeti</span><br/>
            ve Güvenli Ekipmanlar
          </h1>
          <p className="mt-6 text-lg text-gray-300 mb-10 font-medium">
            Kurye motorcu kıyafetlerinden touring ekipmanlarına kadar, motosiklet dünyasının en kapsamlı bağımsız inceleme rehberi.
          </p>
          
          {/* Arama Çubuğu (Hero İçinde) */}
          <form action="/arama" method="GET" className="relative w-full max-w-3xl mx-auto mb-16 shadow-2xl">
            <input 
              type="text" 
              name="q"
              placeholder="Kask, mont, interkom, marka veya rehber ara..." 
              className="w-full bg-white text-gray-900 rounded-lg px-6 py-5 text-lg font-medium focus:outline-none placeholder-gray-400"
            />
            <button type="submit" className="absolute right-2 top-2 bottom-2 bg-red-600 hover:bg-red-700 w-12 rounded-md transition-colors flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
          </form>

          {/* Özellik İkonları */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-xs md:text-sm font-medium text-gray-300">
            <div className="flex flex-col items-center gap-3">
               <div className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-600 bg-black/50 text-yellow-400">⭐</div>
               <span>Uzman İncelemeleri</span>
            </div>
            <div className="flex flex-col items-center gap-3">
               <div className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-600 bg-black/50 text-blue-400">📊</div>
               <span>Gerçek Teknik Bilgiler</span>
            </div>
            <div className="flex flex-col items-center gap-3">
               <div className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-600 bg-black/50 text-green-400">🔄</div>
               <span>Kask + İnterkom<br/>Uyumluluğu</span>
            </div>
            <div className="flex flex-col items-center gap-3">
               <div className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-600 bg-black/50 text-gray-200">⚖️</div>
               <span>Karşılaştırma Araçları</span>
            </div>
            <div className="flex flex-col items-center gap-3">
               <div className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-600 bg-black/50 text-purple-400">📖</div>
               <span>Yeni Başlayanlar için Rehberler</span>
            </div>
          </div>
        </div>
      </section>

      {/* YENİ MOTOR ALDIM WIZARD (Overlapping Hero) */}
      <div className="max-w-[1200px] mx-auto px-4 -mt-24 relative z-20 mb-16">
        <WizardWidget />
      </div>

      {/* KATEGORİ KARTLARI */}
      <section className="max-w-[1200px] mx-auto px-4 mb-20 mt-8">
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { name: "Kask", url: "/kask", img: "https://wsrv.nl/?url=https://www.revzilla.com/product_images/0352/2048/shoei_rf1400_helmet_black.jpg&w=200&h=200&fit=contain&bg=white" }, 
            { name: "Mont", url: "/mont", img: "https://wsrv.nl/?url=https://www.revzilla.com/product_images/0369/0713/alpinestars_gp_plus_r_v3_rideknit_leather_jacket_black_white_red.jpg&w=200&h=200&fit=contain&bg=white" },
            { name: "Pantolon", url: "/pantolon", img: "https://wsrv.nl/?url=https://www.revzilla.com/product_images/0126/6656/alpinestars_missile_v2_leather_pants.jpg&w=200&h=200&fit=contain&bg=white" }, 
            { name: "Eldiven", url: "/eldiven", img: "https://wsrv.nl/?url=https://www.revzilla.com/product_images/0126/6692/alpinestars_sp8_v3_gloves.jpg&w=200&h=200&fit=contain&bg=white" },
            { name: "Bot", url: "/bot", img: "https://wsrv.nl/?url=https://www.revzilla.com/product_images/0177/3494/alpinestars_smx6_v2_vented_boots.jpg&w=200&h=200&fit=contain&bg=white" }, 
            { name: "İnterkom", url: "/interkom", img: "https://wsrv.nl/?url=https://www.revzilla.com/product_images/0481/3180/cardo_packtalk_edge_headset.jpg&w=200&h=200&fit=contain&bg=white" },
            { name: "Koruma", url: "/koruma", img: "https://wsrv.nl/?url=https://www.revzilla.com/product_images/0126/6822/alpinestars_nucleon_kr1_cell_back_protector.jpg&w=200&h=200&fit=contain&bg=white" }, 
            { name: "Yağmurluk", url: "/yagmurluk", img: "https://wsrv.nl/?url=https://www.revzilla.com/product_images/0177/3626/nelson_rigg_stormrider_rain_suit_black.jpg&w=200&h=200&fit=contain&bg=white" }
          ].map(cat => (
            <Link href={cat.url} key={cat.name} className="w-[120px] h-[130px] bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center hover:border-red-500 hover:shadow-md transition group">
              <div className="w-16 h-16 mb-2 flex items-center justify-center overflow-hidden">
                <img src={cat.img} alt={cat.name} className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition" />
              </div>
              <span className="text-[13px] font-bold text-gray-800">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* POPÜLER MARKALAR */}
      <section className="max-w-[1200px] mx-auto px-4 mb-20 text-center">
        <h3 className="text-xl font-bold mb-8 text-gray-900">Popüler Markalar</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { name: "SHOEI" }, { name: "AGV" }, { name: "ARAI" }, { name: "HJC" }, { name: "LS2" }, 
            { name: "SENA" }, { name: "CARDO" }, { name: "DAINESE" }, { name: "ALPINESTARS" }, { name: "REV'IT!" }
          ].map(brand => (
            <Link href={`/markalar/${brand.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`} key={brand.name} className="bg-white border border-gray-200 w-36 h-20 rounded-xl flex items-center justify-center hover:border-red-500 shadow-sm transition p-4">
              <span className="font-black text-gray-800 tracking-wider text-sm">{brand.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* EDİTÖRÜN SEÇİMLERİ (DİNAMİK PRİSMA VERİSİ) */}
      <section className="max-w-[1200px] mx-auto px-4">
        <h3 className="text-xl font-bold mb-6 text-gray-900">Editörün Seçimleri</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {editorPicks.map((product, idx) => (
            <Link href={`/${product.category.slug}/${product.slug}`} key={product.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative group hover:shadow-lg transition">
              <span className="absolute top-4 left-4 z-10 bg-red-50 text-red-600 text-[10px] font-bold px-2 py-1 rounded">
                {idx === 0 ? 'En Popüler' : idx === 1 ? 'Yeni' : idx === 2 ? 'Fiyat/Performans' : 'Editör Seçimi'}
              </span>
              <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 z-10 transition">🤍</button>
              
              <div className="h-48 bg-transparent mb-4 flex items-center justify-center overflow-hidden">
                <img src={product.imageUrl!} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition duration-500" />
              </div>
              
              <div className="text-xs text-gray-500 mb-1">{product.brand.name}</div>
              <h4 className="font-bold text-gray-900 mb-1 line-clamp-1">{product.name}</h4>
              <p className="text-[10px] text-gray-400 mb-3">{product.category.name}</p>
              
              <div className="text-lg font-black text-gray-900 mb-1">{product.basePriceMin?.toLocaleString('tr-TR')} TL</div>
              <div className="text-[11px] text-yellow-500 flex items-center gap-1">
                ⭐⭐⭐⭐⭐ <span className="font-bold">{product.rating}</span> <span className="text-gray-400">({product.reviewCount})</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
