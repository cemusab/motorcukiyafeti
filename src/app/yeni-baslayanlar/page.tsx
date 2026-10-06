import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

// İstemci tarafı formu ayrı bir dosyaya ayırıyoruz
import WizardClientForm from "@/components/WizardClientForm";

export default async function WizardPage({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) {
  const params = await searchParams;
  const bike = params.bike || '';
  const usage = params.usage || '';
  const budget = params.budget || '';

  // Eğer parametre yoksa formu göster
  if (!bike) {
    return (
      <div className="bg-[#f5f5f7] min-h-screen text-gray-900 font-sans pb-24">
        <main className="max-w-4xl mx-auto px-4 py-12">
           <WizardClientForm />
        </main>
      </div>
    );
  }

  // Akıllı Tavsiye Motoru (Kural Motoru)
  let kaskKeyword = 'NXR 2'; // Default (Naked)
  let kaskTypeDesc = 'Günlük / Sokak Kaskı';
  
  let montKeyword = 'T-GP Plus';
  let montTypeDesc = 'Korumalı Sokak Montu';
  
  const bikeLower = bike.toLowerCase();
  
  if (bikeLower.match(/ninja|zx|r25|r7|cbr|panigale|s1000rr|sr/)) {
    // Supersport
    kaskKeyword = 'Pista'; 
    if (budget.includes('Ekonomik')) kaskKeyword = 'K1 S';
    if (budget.includes('Orta')) kaskKeyword = 'RPHA 11';
    kaskTypeDesc = 'Aerodinamik Yarış Kaskı';
    montKeyword = 'Racing 4';
    montTypeDesc = 'Deri Pist Montu';
  } else if (bikeLower.match(/gs|africa|tenere|tracer|v-strom|mt|adventure/)) {
    // Adventure
    kaskKeyword = 'Hornet';
    if (budget.includes('Orta')) kaskKeyword = 'Tourmodular';
    kaskTypeDesc = 'Adventure / Touring Kaskı';
    montKeyword = 'Gore-Tex';
    montTypeDesc = '4 Mevsim Touring Montu';
  } else if (bikeLower.match(/pcx|dio|forza|nmax|xmax|vespa|scooter/)) {
    // Scooter
    kaskKeyword = 'Neotec';
    if (budget.includes('Ekonomik')) kaskKeyword = 'Valiant';
    kaskTypeDesc = 'Çene Açılır / Şehir İçi Kask';
    montKeyword = 'Fileli';
    montTypeDesc = 'Hafif Şehir Montu';
  }

  // Veritabanından gerçek ürünleri bul
  let recommendedKask = await prisma.product.findFirst({ 
    where: { category: { slug: 'kask' }, name: { contains: kaskKeyword } },
    include: { brand: true, category: true }
  });

  // Eğer bulamazsa yedek (fallback) kask ver
  if (!recommendedKask) {
    recommendedKask = await prisma.product.findFirst({
      where: { category: { slug: 'kask' } },
      include: { brand: true, category: true }
    });
  }

  // Montlar için (şimdilik statik mock, gerçek veritabanı montlarla doluysa oradan alırız)
  const recommendedMont = await prisma.product.findFirst({
    where: { category: { slug: 'mont' } },
    include: { brand: true, category: true }
  });

  return (
    <div className="bg-[#f5f5f7] min-h-screen text-gray-900 font-sans pb-24 py-12">
      <main className="max-w-5xl mx-auto px-4">
         <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center mb-8">
           <h2 className="text-3xl font-black mb-2 text-green-600">🎉 Sizin İçin En İdeal Ekipman Seti Hazır!</h2>
           <p className="text-gray-500"><strong className="text-gray-800">{bike}</strong> model motosiklet, {usage} ve {budget} bütçe tercihinize göre akıllı algoritmamız tarafından gerçek ürünlerle eşleştirildi.</p>
         </div>
         
         <div className="grid md:grid-cols-3 gap-6">
           
           {/* Dinamik Kask Kartı */}
           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition relative overflow-hidden group">
             <span className="text-4xl mb-2">🏍️</span>
             <div className="h-40 w-full flex items-center justify-center mb-4">
                <img src={recommendedKask?.imageUrl || ''} alt={recommendedKask?.name} className="h-full object-contain transform scale-110 group-hover:scale-125 transition" />
             </div>
             <h3 className="font-black text-xl mb-1">{recommendedKask?.brand.name} {recommendedKask?.name}</h3>
             <div className="text-lg font-bold text-gray-900 mb-1">{recommendedKask?.basePriceMin?.toLocaleString('tr-TR')} TL</div>
             <p className="text-xs text-gray-500 mb-4">{kaskTypeDesc}</p>
             <Link href={`/kask/${recommendedKask?.slug}`} className="mt-auto w-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white font-bold py-2 rounded-lg transition">İncele</Link>
           </div>
           
           {/* Mont Kartı */}
           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition">
             <span className="text-4xl mb-4">🧥</span>
             <h3 className="font-black text-xl mb-1">{recommendedMont?.brand?.name || 'Alpinestars'} {recommendedMont?.name || montKeyword}</h3>
             <div className="text-lg font-bold text-gray-900 mb-1">{recommendedMont?.basePriceMin?.toLocaleString('tr-TR') || '15.000'} TL</div>
             <p className="text-xs text-gray-500 mb-4">{montTypeDesc}</p>
             <Link href="/mont" className="mt-auto w-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white font-bold py-2 rounded-lg transition">İncele</Link>
           </div>
           
           {/* İnterkom Kartı */}
           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition">
             <span className="text-4xl mb-4">🎧</span>
             <h3 className="font-black text-xl mb-1">Cardo Packtalk Edge</h3>
             <div className="text-lg font-bold text-gray-900 mb-1">32.990 TL</div>
             <p className="text-xs text-gray-500 mb-4">Uyumlu Premium İnterkom</p>
             <Link href="/interkom" className="mt-auto w-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white font-bold py-2 rounded-lg transition">İncele</Link>
           </div>

         </div>
         
         <div className="text-center mt-12">
           <Link href="/yeni-baslayanlar" className="text-gray-500 hover:text-gray-900 font-bold underline">Tekrar Test Çöz</Link>
         </div>
      </main>
    </div>
  );
}
