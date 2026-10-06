import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export const metadata = {
  title: 'Motosiklet Rehberi ve Blog | MotorcuKiyafeti',
  description: 'Motosiklet montu nasıl seçilir? ECE 22.06 nedir? Kuryeler hangi kaskı takar? Tüm motosiklet ekipmanı rehberleri.',
};

export default async function RehberlerPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 border-b pb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-4">Motosiklet Ekipman Rehberi</h1>
        <p className="text-xl text-gray-600">Sokak efsaneleri değil, gerçek motosiklet sürücülerinin tecrübelerinden süzülmüş net bilgiler.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Link key={article.id} href={`/rehberler/${article.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col">
            <div className="aspect-video w-full overflow-hidden bg-gray-200">
              {article.imageUrl && (
                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              )}
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">{article.title}</h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">{article.excerpt}</p>
              <div className="flex items-center text-xs text-gray-400 mt-auto pt-4 border-t">
                <span>{new Date(article.createdAt).toLocaleDateString('tr-TR')}</span>
                <span className="mx-2">•</span>
                <span>{article.author}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
