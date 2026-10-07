import Link from "next/link";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CompareTool } from "@/components/CompareTool";
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
  const pairs = comparePairs().map((c) => ({ slug: c.slug, title: `${displayName(c.items[0])} vs ${displayName(c.items[1])}` }));
  return (
    <>
      <PageHead title="Karşılaştır" intro="Aynı kategoriden 2 ile 4 ürünü yan yana koy. Farklı olan özellikler vurgulanır; kısa cevap bölümü kararın gerekçesini açıkça yazar.">
        <Breadcrumbs items={[{ name: "Karşılaştır", href: "/karsilastir" }]} />
      </PageHead>
      <Container className="mt-8">
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
