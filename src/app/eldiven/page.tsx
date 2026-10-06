import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yazlık ve Kışlık Motosiklet Eldiveni | MotorcuKiyafeti',
  description: 'En iyi korumalı motorcu eldivenleri. Deri, yazlık fileli ve kışlık su geçirmez Gore-Tex motosiklet eldiveni modelleri.',
  keywords: ["motosiklet eldiveni", "yazlık motor eldiveni", "kışlık motor eldiveni", "korumalı motor eldiveni", "deri eldiven"],
};

import Link from "next/link";

export default function Eldiven() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600 hover:underline">← Ana Sayfaya Dön</Link>
          <span className="font-bold text-slate-700">MOTORCUKIYAFETİ.COM</span>
        </div>
      </div>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-black text-slate-900 mb-6">Motosiklet Eldivenleri</h1>
        <p className="text-lg text-slate-700 mb-6">Alman devi <strong>Held</strong> eldiven konusunda tartışmasız dünya lideridir. Yazlık fileli, kışlık Gore-Tex veya pist için titanyum/karbon korumalı eldiven incelemeleri çok yakında burada olacak.</p>
        <Link href="/markalar" className="text-blue-600 font-bold hover:underline">Tüm Markaları İncele →</Link>
      </main>
    </div>
  );
}
