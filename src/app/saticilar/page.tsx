import Link from "next/link";

export default function Saticilar() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600 hover:underline">← Ana Sayfaya Dön</Link>
          <span className="font-bold text-slate-700">MOTORCUKIYAFETİ.COM</span>
        </div>
      </div>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-black text-slate-900 mb-6">Türkiye'nin En İyi Motosiklet Ekipmanı Mağazaları</h1>
        <div className="prose prose-lg text-slate-700">
          <p>Dünyanın en iyi markalarını internetten sipariş etmeden önce denemeniz ve bedeninizi bulmanız kritik bir adımdır. Türkiye'de (özellikle İstanbul Hasanpaşa, Şirinevler ve İzmir gibi lokasyonlarda) sektörün nabzını tutan güvenilir mağazaları sizler için listeledik.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 not-prose">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Motomax</h3>
              <p className="text-sm text-slate-600">İstanbul Hasanpaşa'nın en büyüklerinden. Özellikle iXS, Scorpion kasklar, Held eldivenler ve kendi ithalatları olan uygun fiyatlı markalar ile geniş bir ürün yelpazesi sunar.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Enduro Market</h3>
              <p className="text-sm text-slate-600">Özellikle Adventure, Touring ve Enduro tutkunlarının adresi. Klim, Rukka gibi çok üst segment markaların Türkiye'deki buluşma noktası.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Feyizoğlu</h3>
              <p className="text-sm text-slate-600">Yılların köklü esnafı. İnternet satışında e-ticaretin ilklerinden. LS2, Revit, Prohel gibi markalarda güvenle alışveriş yapılabilecek bir adres.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Mototas & DRD Motorbikes</h3>
              <p className="text-sm text-slate-600">Dainese, Arai, AGV gibi İtalyan ve Japon devlerinin premium distribütörleri. Bütçe sorunu olmayan premium kullanıcılar için.</p>
            </div>
          </div>
          
          <h2>Google Yorumlarına Neden Bakmalısınız?</h2>
          <p>Bir mağazaya gitmeden veya online sipariş vermeden önce Google İşletme Yorumları çok önemlidir. Bir ekipmanın garanti sürecinde satıcının nasıl bir tavır sergilediği (Örn: su alan bir montun iadesi), o mağazanın gerçek kalitesini belirler.</p>
        </div>
      </main>
    </div>
  );
}
