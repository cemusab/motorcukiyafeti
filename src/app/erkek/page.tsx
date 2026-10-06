import Link from "next/link";

export default function Erkek() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600 hover:underline">← Ana Sayfaya Dön</Link>
          <span className="font-bold text-slate-700">MOTORCUKIYAFETİ.COM</span>
        </div>
      </div>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-black text-slate-900 mb-6">Erkek Motorcu Kıyafetleri: Agresif, Dayanıklı ve Ergonomik</h1>
        <div className="prose prose-lg text-slate-700">
          <p>Motosiklet tarzınıza (Racing, Enduro, Chopper, Scooter) göre ekipman seçimi tamamen değişir. Bir yarış tulumuyla Enduro motora binmek ne kadar yanlışsa, deri yelek ve kot pantolonla 300 km/h hıza çıkmak da o kadar ölümcüldür.</p>
          
          <h2>Tarzlara Göre Erkek Ekipman Seçimi</h2>
          <h3>1. Racing / SuperSport (Hız Tutkunları)</h3>
          <p>Mutlaka <strong>Dainese</strong> veya <strong>Alpinestars</strong> gibi markaların tek veya iki parça deri tulumları, titanyum/karbon karışımlı tam korumalı uzun konçlu eldivenleri ve pist standartlarına uygun agresif kasklar (Örn: Shoei X-Spirit, AGV Pista) kullanılmalıdır.</p>
          
          <h3>2. Touring / Adventure (Uzun Yol ve Off-Road)</h3>
          <p>Dünyayı gezmeyi sevenler için <strong>Klim, Rukka, Clover veya Revit</strong>'in 4 mevsim tekstil montları. Su geçirmez Gore-Tex özellikler, bolca havalandırma cebi (zipper) ve rahat oturuş pozisyonu sunan pantolonlar şarttır.</p>
          
          <h3>3. Şehir İçi ve Scooter</h3>
          <p>Pratiklik ön plandadır. Üzerinize yapışmayan ancak korumalı olan <strong>Riderdenim Kevlar kotlar</strong>, mevsimlik ince mafsallı montlar ve kolay giyilen kısa motosiklet botları (Örn: TCX Street serisi) idealdir.</p>
        </div>
      </main>
    </div>
  );
}
