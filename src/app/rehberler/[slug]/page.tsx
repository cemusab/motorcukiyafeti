import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const prisma = new PrismaClient();

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await prisma.article.findUnique({ where: { slug: params.slug } });
  if (!article) return { title: 'Bulunamadı' };
  
  return {
    title: `${article.title} | MotorcuKiyafeti`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug }
  });

  if (!article) notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link href="/rehberler" className="text-red-600 hover:text-red-700 font-semibold text-sm mb-6 inline-block">
          &larr; Tüm Rehberlere Dön
        </Link>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">{article.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 pb-8 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">
              M
            </div>
            <span className="font-semibold text-gray-900">{article.author}</span>
          </div>
          <span>•</span>
          <span>{new Date(article.createdAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {article.imageUrl && (
        <div className="w-full aspect-[2/1] relative rounded-2xl overflow-hidden mb-12 shadow-lg">
          <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="prose prose-lg prose-red max-w-none text-gray-800">
        {article.content.split('\n').map((paragraph, idx) => {
          if (!paragraph.trim()) return null;
          // Subheadings hack: if paragraph starts with a hyphen or is short, make it bold or something.
          // Since it's raw text, we just render paragraphs.
          if (paragraph.trim().startsWith('-')) {
            return <li key={idx} className="ml-6 mb-2">{paragraph.replace('-', '').trim()}</li>;
          }
          return <p key={idx} className="mb-6 leading-relaxed">{paragraph.trim()}</p>;
        })}
      </div>

      <div className="mt-16 pt-8 border-t border-gray-200">
        <h3 className="text-2xl font-bold mb-6">İlgili Ürünler</h3>
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col sm:flex-row gap-6 items-center justify-between">
          <div>
            <h4 className="font-bold text-gray-900">Kendine uygun kaskı veya montu mu arıyorsun?</h4>
            <p className="text-gray-600 text-sm mt-1">Gelişmiş filtrelerimizle en iyi motosiklet ekipmanını hemen bul.</p>
          </div>
          <Link href="/kask" className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold whitespace-nowrap hover:bg-red-700">
            Kaskları İncele
          </Link>
        </div>
      </div>
    </article>
  );
}
