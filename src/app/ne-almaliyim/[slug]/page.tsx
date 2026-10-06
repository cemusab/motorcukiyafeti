import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ProductVisual } from "@/components/ProductCard";
import { Container, Notice } from "@/components/ui";
import { activeLists } from "@/lib/catalog";
import { displayName, priceLabel, productPath } from "@/lib/data";
import { keyChips, productTypeLabel } from "@/lib/labels";
import { itemListLd, meta } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => activeLists().map((l) => ({ slug: l.slug }));
const find = (s: string) => activeLists().find((l) => l.slug === s);

export async function generateMetadata({ params }: PageProps<"/ne-almaliyim/[slug]">) {
  const l = find((await params).slug)!;
  return meta({ title: l.title, description: l.description, path: `/ne-almaliyim/${l.slug}`, type: "article" });
}

export default async function ListPage({ params }: PageProps<"/ne-almaliyim/[slug]">) {
  const l = find((await params).slug);
  if (!l) notFound();
  const items = l.pick();
  return (
    <>
      <JsonLd data={itemListLd(l.title, items.map((p) => ({ name: displayName(p), href: productPath(p) })))} />
      <Container className="pt-6">
        <Breadcrumbs items={[{ name: "Ne Almalıyım?", href: "/ne-almaliyim" }, { name: l.title, href: `/ne-almaliyim/${l.slug}` }]} />
        <h1 className="mt-4 font-display text-4xl leading-none font-bold sm:text-5xl">{l.title}</h1>
        <p className="mt-4 max-w-3xl text-lg">{l.intro}</p>
        <div className="mt-4 max-w-3xl">
          <Notice>
            <strong>Seçim kriteri:</strong> {l.criteria}
          </Notice>
        </div>
      </Container>
      <Container className="mt-8">
        <ol className="space-y-4">
          {items.map((p, i) => (
            <li key={p.brand + p.slug} className="grid gap-4 overflow-hidden rounded-lg border border-line bg-white sm:grid-cols-[180px_1fr]">
              <ProductVisual p={p} className="aspect-[4/3] sm:aspect-auto sm:h-full" />
              <div className="p-5">
                <p className="text-sm font-semibold text-red">#{i + 1}</p>
                <h2 className="font-display text-2xl font-bold">
                  <Link href={productPath(p)} className="hover:text-red">
                    {displayName(p)}
                  </Link>
                </h2>
                <p className="text-sm text-mute">{productTypeLabel(p)}</p>
                <p className="mt-2 text-ink-2">{p.summary}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {keyChips(p).map((c) => (
                    <li key={c} className="rounded bg-paper px-2 py-0.5 text-xs font-medium">
                      {c}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                  <span className="font-semibold">{priceLabel(p) ?? <span className="font-normal text-mute">TR fiyatı doğrulanmadı</span>}</span>
                  <Link href={productPath(p)} className="font-semibold text-red hover:underline">
                    İncelemeyi oku →
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </>
  );
}
