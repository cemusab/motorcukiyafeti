import Link from "next/link";

export default function Yagmurluk() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600 hover:underline">← Ana Sayfaya Dön</Link>
          <span className="font-bold text-slate-700">MOTORCUKIYAFETİ.COM</span>
        </div>
      </div>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-black text-slate-900 mb-6">Motosiklet Yağmurlukları</h1>
        <p className="text-lg text-slate-700 mb-6">Özellikle kuryelerin ve uzun yol touring sürücülerinin hayat kurtarıcısı %100 su geçirmez, reflektörlü yağmurluk modelleri (Prosev, Tex Motor vb.) incelemeleri yakında burada.</p>
      </main>
    </div>
  );
}
