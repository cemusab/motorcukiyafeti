import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Motosiklet Kaskı Modelleri ve Fiyatları | MotorcuKiyafeti",
  description: "En iyi kapalı, çene açılır ve yarım kask markaları. Tüm Türkiye'ye online kask incelemeleri.",
  keywords: ["motosiklet kaskı", "kask modelleri", "çene açılır kask", "kapalı kask", "Shoei kask", "AGV kask", "İstanbul kask mağazası"],
};

import Link from "next/link";
import { PrismaClient } from '@prisma/client';
import FilterClient from '@/components/FilterClient';

const prisma = new PrismaClient();

export default async function Kask() {
  const helmets = await prisma.product.findMany({
    where: { category: { slug: 'kask' } },
    include: { brand: true, specs: true, prices: true },
    orderBy: { basePriceMin: 'desc' }
  });

  return (
    <div className="bg-[#f5f5f7] min-h-screen text-gray-900 font-sans pb-24">
      <main className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="text-xs text-gray-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-gray-900">Ana Sayfa</Link>
          <span>/</span><span className="font-bold text-gray-900">Kask</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 mb-2">Kapalı Kasklar</h1>
          <p className="text-gray-500">Günlük kullanım, sport sürüş ve uzun yol için en popüler kask tipleri.</p>
        </div>
        
        <FilterClient initialProducts={helmets} categorySlug="kask" />
      </main>
    </div>
  );
}
