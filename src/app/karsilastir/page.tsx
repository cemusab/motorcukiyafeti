import { PrismaClient } from '@prisma/client';
import Link from "next/link";
import CompareTool from "@/components/CompareTool";

const prisma = new PrismaClient();

export default async function ComparePage() {
  const helmets = await prisma.product.findMany({
    where: { category: { slug: 'kask' } },
    include: { brand: true, category: true },
    orderBy: { basePriceMin: 'desc' }
  });

  return (
    <div className="bg-[#f5f5f7] min-h-screen text-gray-900 font-sans pb-24">
      <main className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="text-xs text-gray-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-gray-900">Ana Sayfa</Link>
          <span>/</span><span className="font-bold text-gray-900">Karşılaştırma Motoru</span>
        </div>
        
        <CompareTool helmets={helmets} />
      </main>
    </div>
  );
}
