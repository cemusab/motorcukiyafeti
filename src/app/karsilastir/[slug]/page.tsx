import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CompareView } from "@/components/CompareView";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/ui";
import { comparePairs } from "@/lib/catalog";
import { compareEntry, pairIndexable } from "@/lib/compare";
import { verdicts } from "@/lib/compare-core";
import { displayName, formatDate } from "@/lib/data";
import { faqLd, clip, meta } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => comparePairs().map((c) => ({ slug: c.slug }));

const pair = (slug: string) => comparePairs().find((c) => c.slug === slug);

export async function generateMetadata({ params }: PageProps<"/karsilastir/[slug]">) {
  const { slug } = await params;
  const [a, b] = pair(slug)!.items;
  return meta({
    title: `${displayName(a)} vs ${displayName(b)}`.length > 48 ? `${displayName(a)} vs ${displayName(b)}` : `${displayName(a)} vs ${displayName(b)}: Hangisi Daha İyi?`,
    description: clip(`${displayName(a)} ile ${displayName(b)} karşılaştırması: ağırlık, güvenlik standartları, özellikler, Türkiye fiyatı ve hangi sürücüye hangisinin uygun olduğu.`),
    path: `/karsilastir/${slug}`,
    noindex: !pairIndexable([a, b]),
  });
}

export default async function ComparePairPage({ params }: PageProps<"/karsilastir/[slug]">) {
  const { slug } = await params;
  const c = pair(slug);
  if (!c) notFound();
  const [a, b] = c.items;
  const items = c.items.map(compareEntry);
  const v = verdicts(items);
  const title = `${displayName(a)} vs ${displayName(b)}`;
  const decided = v.filter((x) => x.winner);
  const faq = v.map((x) => ({ q: `${displayName(a)} mı ${displayName(b)} mi? ${x.q}`, a: `${x.winner ? `${x.winner}. ` : ""}${x.why}` }));
  const checked = [a.lastCheckedAt, b.lastCheckedAt].sort().pop()!;

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `${title}: Hangisi Daha İyi?`,
            dateModified: checked,
            inLanguage: "tr-TR",
            about: [displayName(a), displayName(b)].map((n) => ({ "@type": "Product", name: n })),
          },
          faqLd(faq),
        ]}
      />
      <Container className="pt-6">
        <Breadcrumbs items={[{ name: "Karşılaştır", href: "/karsilastir" }, { name: title, href: `/karsilastir/${slug}` }]} />
      </Container>
      <Container className="mt-6">
        <h1 className="font-display text-4xl leading-none font-bold sm:text-5xl">
          {displayName(a)} <span className="text-red">vs</span> {displayName(b)}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed">
          {decided.length
            ? `${decided.map((x) => `${x.q.replace(" için hangisi?", "").replace("?", "")} açısından ${x.winner}`).join("; ")} öne çıkıyor. Aşağıda kararımızın gerekçelerini ve tüm teknik farkları kaynaklı verilerle görebilirsin.`
            : `İki model teknik olarak birbirine yakın; seçim kullanım şekline ve kafa/vücut uyumuna göre yapılmalı. Aşağıda farkları kaynaklı verilerle görebilirsin.`}
        </p>
        <p className="mt-2 text-sm text-mute">Veriler son kontrol: {formatDate(checked)} · Kaynaklar ürün sayfalarında listelenir.</p>
      </Container>
      <Container className="mt-10">
        <CompareView items={items} />
      </Container>
      <Container className="mt-10">
        <Link href={`/karsilastir?urunler=${items.map((i) => i.id).join(",")}`} className="font-semibold text-red hover:underline">
          Bu karşılaştırmaya başka bir model ekle →
        </Link>
      </Container>
    </>
  );
}
