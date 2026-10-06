import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Motosiklet Botu ve Korumalı Ayakkabı Modelleri | MotorcuKiyafeti',
  description: 'Korumalı motosiklet botu, günlük motorcu ayakkabısı ve touring çizme incelemeleri. İstanbul Hasanpaşa mağazaları ve online rehber.',
  keywords: ["motosiklet botu", "motorcu ayakkabısı", "korumalı motor botu", "gore-tex motosiklet botu"],
};

import Link from "next/link";

export default function Bot() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600 hover:underline">← Ana Sayfaya Dön</Link>
          <span className="font-bold text-slate-700">MOTORCUKIYAFETİ.COM</span>
        </div>
      </div>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-black text-slate-900 mb-6">Motosiklet Botları ve Ayakkabıları</h1>
        <p className="text-lg text-slate-700 mb-6">Alpinestars ve yerli üretim gururumuz Duratech (Tex Motor) başta olmak üzere en güvenli ayak/bilek korumalarına sahip bot incelemeleri çok yakında burada olacak.</p>
      </main>
    </div>
  );
}
