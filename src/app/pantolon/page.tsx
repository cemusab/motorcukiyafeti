import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Korumalı Motosiklet Pantolonu ve Kevlar Kot | MotorcuKiyafeti",
  description: "Erkek ve kadın motosiklet pantolonu, kevlar kot ve kışlık su geçirmez motorcu pantolonları.",
  keywords: ["motosiklet pantolonu", "kevlar motor kotu", "korumalı motor pantolonu", "kışlık motor pantolonu"],
};

import Link from "next/link";

export default function Pantolon() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600 hover:underline">← Ana Sayfaya Dön</Link>
          <span className="font-bold text-slate-700">MOTORCUKIYAFETİ.COM</span>
        </div>
      </div>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* PANTOLON HERO BANNER */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 mb-12 shadow-xl border border-slate-200">
          <img 
            src="https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&q=80&w=1200" 
            alt="Motosiklet Pantolonu Kevlar" 
            className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
          />
          <div className="relative p-12 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-md">Motosiklet Pantolonları: Dyneema ve Kevlar</h1>
            <p className="text-lg md:text-xl text-slate-200 drop-shadow">Kevlar kotlardan tek katmanlı Dyneema teknolojisine kadar en dayanıklı bacak korumaları.</p>
          </div>
        </div>
        <div className="prose prose-lg text-slate-700 max-w-none">
          <h2>Kevlar Pantolonlar</h2>
          <p>Yıllardır standart olan aramid fiber yapısıdır. Türk üreticisi <strong>Riderdenim</strong> bu alanda günlük görünümlü ancak çok yüksek korumalı harika kevlar kotlar üretmektedir.</p>
          
          <h2>Yeni Nesil Teknoloji: Dyneema</h2>
          <p><strong>Dyneema</strong>, aynı ağırlıktaki çelikten 15 kat daha güçlü olan dünyanın en dayanıklı elyafıdır. Dyneema ile dokunmuş motosiklet pantolonları genellikle "tek katmanlıdır" (single layer). Bu sayede hem bir yazlık pantolon kadar hafif ve serindir, hem de sürtünme testlerinde deri pantolonları bile geride bırakır.</p>

          <h2>Korumalar (Dizlik ve Kalça)</h2>
          <p>D3O veya Sas-Tec gibi yumuşak ancak darbe anında sertleşen akıllı molekül korumalar, pantolonların olmazsa olmazıdır. Özellikle CE Level 2 korumalar tercih edilmelidir.</p>

          <Link href="/markalar" className="inline-block mt-8 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700">
            En İyi Pantolon Üreticileri →
          </Link>
        </div>
      </main>
    </div>
  );
}
