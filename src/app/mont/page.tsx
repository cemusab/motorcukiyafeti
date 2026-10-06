import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kışlık ve Yazlık Motorcu Montu Modelleri | MotorcuKiyafeti',
  description: 'En iyi yazlık motorcu montu, kışlık motorcu montu ve deri korumalı motosiklet ceketleri. Ankara, İzmir ve tüm Türkiye için ekipman rehberi.',
  keywords: ["motorcu montu", "kışlık motorcu montu", "yazlık motorcu montu", "korumalı motosiklet montu", "deri motor ceket", "Dainese mont"],
};

import Link from "next/link";

export default function Mont() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600 hover:underline">← Ana Sayfaya Dön</Link>
          <span className="font-bold text-slate-700">MOTORCUKIYAFETİ.COM</span>
        </div>
      </div>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* MONT HERO BANNER */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 mb-12 shadow-xl border border-slate-200">
          <img 
            src="https://images.unsplash.com/photo-1520975954732-57dd22299614?auto=format&fit=crop&q=80&w=1200" 
            alt="Motosiklet Montu ve Deri Ceket" 
            className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
          />
          <div className="relative p-12 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-md">Motosiklet Montları: Kapsamlı Rehber</h1>
            <p className="text-lg md:text-xl text-slate-200 drop-shadow">Deri mi, tekstil mi? Yazlık fileli mi, kışlık Gore-Tex mi? En doğru seçimi yapın.</p>
          </div>
        </div>
        <div className="prose prose-lg text-slate-700 max-w-none">
          <h2>1. Yazlık Motosiklet Montları</h2>
          <p>Genellikle geniş <strong>file (mesh)</strong> panellere sahiptir. Sürüş esnasında rüzgarı doğrudan içeri alarak terlemeyi önler. Alpinestars, Rev'it ve Dainese'in yazlık serileri en çok tercih edilenler arasındadır.</p>
          
          <h2>2. Kışlık ve 4 Mevsim Montlar</h2>
          <p>İçerisinde su ve rüzgar geçirmeyen membranlar (Gore-Tex, D-Dry, H2Out) ve termal içlikler bulunur. <strong>Clover</strong> ve <strong>Rukka</strong> bu kategorinin en ağır toplarındandır.</p>

          <h2>Deri vs Tekstil</h2>
          <p>Deri montlar (özellikle Dainese ve iXS) sürtünmeye karşı en yüksek dayanımı sunar. Asfaltta kayma durumunda hayat kurtarır ancak ağırdır ve yağmurda suyu emer. Tekstil montlar ise günlük kullanımda daha rahattır, cepleri fazladır ve su geçirmez membranlar barındırabilir.</p>

          <Link href="/markalar" className="inline-block mt-8 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700">
            Tüm Mont Markalarını İncele →
          </Link>
        </div>
      </main>
    </div>
  );
}
