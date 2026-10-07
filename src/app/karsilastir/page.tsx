import Link from "next/link";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CompareTool } from "@/components/CompareTool";
import { BudgetLinks } from "@/components/BudgetLinks";
import { Container, PageHead } from "@/components/ui";
import { comparePairs } from "@/lib/catalog";
import { displayName } from "@/lib/data";
import { meta } from "@/lib/seo";

export const metadata = meta({
  title: "Motosiklet Kask, İnterkom ve Ekipman Karşılaştırma",
  description: "En fazla 4 kaskı, interkomu, montu veya eldiveni teknik özellikleriyle yan yana karşılaştır; farklar vurgulanır, hangisinin kime uygun olduğu açıklanır.",
  path: "/karsilastir",
});

export default function ComparePage() {
  // Hazır ikili karşılaştırmalar: uygun fiyatlı (yeni başlayan/kurye) çiftler önce.
  const avg = (c: ReturnType<typeof comparePairs>[number]) => c.items.reduce((s, p) => s + (p.priceRange?.min ?? 1e6), 0) / c.items.length;
  const pairs = comparePairs()
    .slice()
    .sort((a, b) => avg(a) - avg(b))
    .slice(0, 30)
    .map((c) => ({ slug: c.slug, title: `${displayName(c.items[0])} vs ${displayName(c.items[1])}` }));
  return (
    <>
      <PageHead title="Karşılaştır" intro="Aynı kategoriden 2 ile 4 ürünü yan yana koy. Farklı olan özellikler vurgulanır; kısa cevap bölümü kararın gerekçesini açıkça yazar.">
        <Breadcrumbs items={[{ name: "Karşılaştır", href: "/karsilastir" }]} />
      </PageHead>
      <Container className="mt-8">
        <h2 className="mb-3 font-display text-3xl font-bold">Bütçene göre hazır karşılaştırmalar</h2>
        <BudgetLinks limit={12} />
      </Container>
      <Container className="mt-10">
        <h2 className="mb-3 font-display text-3xl font-bold">Kendi karşılaştırmanı yap</h2>
        <Suspense
          fallback={
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {pairs.map((p) => (
                <li key={p.slug}>
                  <Link href={`/karsilastir/${p.slug}`} className="block rounded-lg border border-line bg-white p-4 font-semibold">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          }
        >
          <CompareTool pairs={pairs} />
        </Suspense>
      </Container>
    </>
  );
}
