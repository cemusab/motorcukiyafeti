import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Motosiklet İnterkom Sistemleri ve Fiyatları | MotorcuKiyafeti',
  description: 'En iyi kask içi iletişim (interkom) sistemleri. Cardo, Sena modelleri ve kask uyumluluk rehberi.',
  keywords: ["motosiklet interkom", "kask kamerası", "Cardo interkom", "Sena interkom", "kask içi kulaklık"],
};

import Link from "next/link";

export default function Interkom() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600 hover:underline">← Ana Sayfaya Dön</Link>
          <span className="font-bold text-slate-700">MOTORCUKIYAFETİ.COM</span>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 text-center">Kask İnterkomunda Zirve Savaşları: Cardo vs Sena</h1>
        <p className="text-lg text-slate-600 mb-12 text-center max-w-3xl mx-auto">
          Motosiklet kıyafetlerinde pazar nasıl dağınıksa, premium interkom pazarında durum tam tersidir. Zirve <strong>Cardo ve Sena</strong> arasında paylaşılır. İşte kask interkomu seçerken bilmeniz gereken her şey.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          
          {/* CARDO */}
          <div className="bg-white p-8 rounded-3xl border-2 border-blue-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-600 text-white font-bold px-4 py-1 rounded-bl-xl">1 Numara</div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">Cardo Systems</h2>
            <p className="text-slate-700 mb-6">
              Premium tarafta piyasanın 1 numarasıdır. En büyük avantajı <strong>DMC (Dynamic Mesh Communication)</strong> sistemi ve <strong>JBL</strong> ile olan partnerliğidir. Grup sürüşlerinde gruptan kopan birinin tekrar menzile girdiğinde otomatik olarak ağa bağlanması, Cardo'yu rakipsiz kılar.
            </p>
            <div className="bg-blue-50 p-4 rounded-xl">
              <h4 className="font-bold text-blue-900 mb-2">Öne Çıkan Modeller:</h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Packtalk Pro</li>
                <li>• Packtalk Edge (Manyetik montaj harikası)</li>
                <li>• Packtalk Neo</li>
                <li>• Freecom 4X</li>
              </ul>
            </div>
          </div>

          {/* SENA */}
          <div className="bg-white p-8 rounded-3xl border-2 border-slate-200 shadow-sm">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Sena</h2>
            <p className="text-slate-700 mb-6">
              Sena'nın en büyük ve kırılamayan gücü: <strong>OEM Entegrasyonu</strong>. Sena, kask markalarıyla doğrudan işbirliği yaparak kaskın içine gizlenen interkomlar üretir. Dışarıda hiçbir cihaz kalabalığı görünmez. Ses sistemi olarak Harman Kardon ile çalışır.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl">
              <h4 className="font-bold text-slate-800 mb-2">Sena ile Anlaşmalı Devler (Tak-Çalıştır):</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Shoei (SRL sistemi), Schuberth (SC sistemi), HJC, AGV, Nolan, LS2, NEXX, BMW Motorrad, Triumph, Harley-Davidson.
              </p>
            </div>
          </div>

        </div>

        {/* DİĞER MARKALAR TABLOSU */}
        <section>
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Piyasadaki Diğer Güçlü Alternatifler</h3>
          <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-100 text-slate-900">
                <tr>
                  <th className="px-6 py-4 font-bold border-b">Marka</th>
                  <th className="px-6 py-4 font-bold border-b">Seviye</th>
                  <th className="px-6 py-4 font-bold border-b">Öne Çıkan Özellik</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-6 py-4 font-bold">3. Midland</td>
                  <td className="px-6 py-4 text-orange-500">⭐⭐⭐⭐½</td>
                  <td className="px-6 py-4">Mesh, touring, Avrupa pazarının gizli devi</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold">4. Interphone / Cellularline</td>
                  <td className="px-6 py-4 text-orange-500">⭐⭐⭐⭐</td>
                  <td className="px-6 py-4">Touring ve yüksek kaliteli Bluetooth</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold">5. UClear Digital</td>
                  <td className="px-6 py-4 text-orange-500">⭐⭐⭐½</td>
                  <td className="px-6 py-4">Boom mikrofonsuz teknoloji, grup iletişimi</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold">6. Lexin</td>
                  <td className="px-6 py-4 text-orange-500">⭐⭐⭐</td>
                  <td className="px-6 py-4">Fiyat/performans kralı</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold">7. KNMASTER</td>
                  <td className="px-6 py-4 text-orange-500">⭐⭐⭐</td>
                  <td className="px-6 py-4">Türkiye'de kuryelerin ve f/p arayanların en çok tercih ettiği marka</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
}
