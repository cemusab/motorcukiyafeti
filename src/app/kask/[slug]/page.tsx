import Link from "next/link";
import { notFound } from "next/navigation";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await prisma.product.findUnique({ where: { slug: resolvedParams.slug }, include: { brand: true } });
  if (!product) return { title: "Ürün Bulunamadı" };
  return {
    title: `${product.brand?.name || ""} ${product.name} Kask İncelemesi ve Fiyatı | MotorcuKiyafeti`,
    description: `${product.brand?.name} ${product.name} teknik özellikleri, uyumlu interkomlar ve kullanıcı yorumları. Türkiye motosiklet kaskı rehberi.`,
    keywords: [product.name, product.brand?.name || "", "motosiklet kaskı", "kapalı kask", "kask fiyatları", "motor kaskı inceleme"],
  };
}

export default async function KaskDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      brand: true
    }
  });

  if (!product) {
    notFound();
  }

  const compatibilities = await prisma.helmetIntercomCompatibility.findMany({
    where: { productId: product.id }
  });
  
  const intercomIds = compatibilities.map(c => c.intercomId);
  const intercoms = await prisma.product.findMany({
    where: { id: { in: intercomIds } },
    include: { brand: true }
  });

  const fullCompatibilities = compatibilities.map(c => ({
    ...c,
    intercom: intercoms.find(i => i.id === c.intercomId)
  }));

  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans pb-24">
      <main className="max-w-[1400px] mx-auto px-4 py-8">
        
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-gray-900">Ana Sayfa</Link>
          <span>/</span><Link href="/kask" className="hover:text-gray-900">Kask</Link>
          <span>/</span><Link href={`/markalar/${product.brand.slug}`} className="hover:text-gray-900">{product.brand.name}</Link>
          <span>/</span><span className="font-bold text-gray-900">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* SOL KOLON (Büyük Resim, Tablar, Yorum, Artı/Eksi) */}
          <div className="flex-1">
            {/* Büyük Ürün Görseli */}
            <div className="bg-white border border-gray-100 rounded-3xl h-[500px] flex items-center justify-center mb-8 shadow-sm p-12">
              <img src={product.imageUrl!} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
            </div>

            {/* Tab Navigasyonu */}
            <div className="flex border-b border-gray-200 mb-8 overflow-x-auto text-sm font-bold text-gray-500">
              <button className="px-4 py-3 text-red-600 border-b-2 border-red-600 whitespace-nowrap">Genel Bakış</button>
              <button className="px-4 py-3 hover:text-gray-900 whitespace-nowrap">Teknik Özellikler</button>
              <button className="px-4 py-3 hover:text-gray-900 whitespace-nowrap">Artılar / Eksiler</button>
              <button className="px-4 py-3 hover:text-gray-900 whitespace-nowrap">Kimler İçin?</button>
              <button className="px-4 py-3 hover:text-gray-900 whitespace-nowrap">İnceleme</button>
              <button className="px-4 py-3 hover:text-gray-900 whitespace-nowrap">Yorumlar</button>
            </div>

            {/* MotorcuKiyafeti Yorumu */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 mb-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">MotorcuKiyafeti Yorumu</h3>
                <div className="text-2xl font-black text-blue-600">9.2 <span className="text-sm text-gray-500 font-medium">/ 10</span></div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description} Sınıfının en sessiz ve en aerodinamik çene açılır kasklarından biri. Entegre interkom hazırlığı sayesinde iletişim sistemlerini kaskın dışına taşmadan kusursuzca yerleştirebilirsiniz.
              </p>
            </div>

            {/* Artılar Eksiler */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white border border-green-100 p-6 rounded-2xl shadow-sm">
                <h4 className="font-bold text-green-700 mb-4 flex items-center gap-2"><span>👍</span> Artıları</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✔</span> Çok iyi sessizlik</li>
                  <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✔</span> Konforlu iç yapı</li>
                  <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✔</span> Kusursuz interkom uyumu</li>
                </ul>
              </div>
              <div className="bg-white border border-red-100 p-6 rounded-2xl shadow-sm">
                <h4 className="font-bold text-red-700 mb-4 flex items-center gap-2"><span>👎</span> Eksileri</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">✖</span> Yüksek fiyat</li>
                  <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">✖</span> Sport kullanıma uygun değil</li>
                </ul>
              </div>
            </div>
          </div>

          {/* SAĞ KOLON (Başlık, Fiyat, Satın Alma, Özellik Tablosu) */}
          <aside className="w-full lg:w-[400px]">
            <div className="sticky top-24">
              
              <div className="mb-6">
                <h1 className="text-3xl font-black">{product.brand.name} {product.name}</h1>
                <p className="text-gray-500 text-sm mb-2">Çene Açılır Kask</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-yellow-500 text-sm font-bold flex items-center gap-1">⭐⭐⭐⭐⭐ {product.rating} <span className="text-gray-400 font-normal">({product.reviewCount} değerlendirme)</span></span>
                  <button className="text-gray-400 hover:text-red-500 flex items-center gap-1 text-sm border border-gray-200 px-3 py-1 rounded-lg">
                     <span>⚖️</span> Karşılaştır
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 mb-6">
                <div className="text-4xl font-black text-gray-900 mb-1">{product.basePriceMin?.toLocaleString('tr-TR')} TL <span className="text-lg text-gray-400 font-medium">- {product.basePriceMax?.toLocaleString('tr-TR')} TL</span></div>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-red-600/30 mt-4 text-lg">
                  Fiyatları Gör
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded border border-gray-200">ECE 22.06</span>
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded border border-gray-200">Pinlock</span>
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded border border-gray-200">Güneş Vizörü</span>
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded border border-gray-200">İnterkom Hazır</span>
              </div>

              <table className="w-full text-sm text-left text-gray-600">
                <tbody>
                  <tr className="border-b border-gray-100"><th className="py-3 font-medium text-gray-500">Marka</th><td className="py-3 font-bold text-gray-900">{product.brand.name}</td></tr>
                  <tr className="border-b border-gray-100"><th className="py-3 font-medium text-gray-500">Model</th><td className="py-3 font-bold text-gray-900">{product.name}</td></tr>
                  <tr className="border-b border-gray-100"><th className="py-3 font-medium text-gray-500">Kask Tipi</th><td className="py-3 font-bold text-gray-900">Çene Açılır (Modüler)</td></tr>
                  <tr className="border-b border-gray-100"><th className="py-3 font-medium text-gray-500">Malzeme</th><td className="py-3 font-bold text-gray-900">AIM (Fiber)</td></tr>
                  <tr className="border-b border-gray-100"><th className="py-3 font-medium text-gray-500">Ağırlık</th><td className="py-3 font-bold text-gray-900">1.650 g (M beden)</td></tr>
                </tbody>
              </table>
              <button className="text-blue-600 text-sm font-bold mt-4">Tüm Teknik Özellikler ▾</button>
            </div>
          </aside>
        </div>

        {/* ALT BÖLÜM (Kask + İnterkom Uyumluluğu Widget'ı) */}
        <div className="mt-16 bg-[#161616] text-white border border-gray-800 rounded-3xl p-8 shadow-xl">
           <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-6">
             <div>
               <h3 className="text-2xl font-black mb-2 flex items-center gap-2">🎧 Kask + İnterkom Uyumluluğu</h3>
               <p className="text-sm text-gray-400">Kaskınızı seçin, uyumlu interkomları görün.</p>
             </div>
             <div className="flex items-center gap-4 bg-black/50 border border-gray-800 p-2 rounded-xl">
                <img src={product.imageUrl!} className="w-12 h-12 bg-white rounded-lg p-1 object-contain" />
                <div className="pr-4">
                  <div className="text-xs text-gray-400">{product.brand.name}</div>
                  <div className="font-bold">{product.name}</div>
                </div>
                <button className="bg-gray-800 hover:bg-gray-700 text-xs px-4 py-2 rounded-lg font-bold transition">Değiştir</button>
             </div>
           </div>
           
           <div className="flex gap-2 mb-8 overflow-x-auto text-xs font-bold">
             <button className="bg-green-600 text-white px-6 py-3 rounded-xl whitespace-nowrap shadow-lg shadow-green-600/20 border border-green-500">Tam Entegre Uyumlu</button>
             <button className="bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white px-6 py-3 rounded-xl whitespace-nowrap transition border border-gray-700">Standart Montaj</button>
             <button className="bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white px-6 py-3 rounded-xl whitespace-nowrap transition border border-gray-700">Adaptör Gerekli</button>
             <button className="bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white px-6 py-3 rounded-xl whitespace-nowrap transition border border-gray-700">Uyumlu Değil</button>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {fullCompatibilities.map(comp => (
               <div key={comp.id} className="bg-white text-gray-900 border border-gray-200 rounded-2xl p-6 flex flex-col hover:shadow-lg transition">
                 <div className="h-32 mb-4 flex items-center justify-center p-2 bg-gray-50 rounded-xl">
                    <img src={comp.intercom?.imageUrl!} alt={comp.intercom?.name} className="h-full object-contain mix-blend-multiply" />
                 </div>
                 <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">{comp.intercom?.brand.name}</div>
                 <h4 className="font-black text-lg mb-2 leading-tight">{comp.intercom?.name}</h4>
                 <div className={`text-[10px] font-bold px-2 py-1 rounded inline-block w-max mb-4 ${comp.status === 'Tam Entegre Uyumlu' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-700 border border-gray-200'}`}>{comp.status}</div>
                 <div className="text-xl font-black mt-auto pt-4 border-t border-gray-100">{comp.intercom?.basePriceMin?.toLocaleString('tr-TR')} TL</div>
               </div>
             ))}
             {fullCompatibilities.length === 0 && <p className="text-sm text-gray-400 col-span-full">Bu kaska uygun interkom eşleşmesi veri tabanında bulunmuyor.</p>}
           </div>
        </div>

      </main>
    </div>
  );
}
