import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ProductGrid } from "@/components/ProductCard";
import { Container, PageHead } from "@/components/ui";
import { CATEGORIES } from "@/data/categories";
import { brandCountries, countryAdj } from "@/lib/brand-country";
import { getProducts } from "@/lib/data";
import { itemListLd, meta } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => brandCountries().map((c) => ({ ulke: c.slug }));
const find = (s: string) => brandCountries().find((c) => c.slug === s);

export async function generateMetadata({ params }: PageProps<"/markalar/[ulke]">) {
  const c = find((await params).ulke)!;
  const adj = countryAdj(c.country);
  return meta({
    title: `${adj} Motosiklet Ekipmanı Markaları`,
    description:
      c.country === "Türkiye"
        ? `Türk motosiklet ekipmanı markaları: ${c.brands.length} yerli marka, ürettikleri mont, pantolon, kask, eldiven ve bot modelleri; sertifika ve Türkiye fiyatlarıyla.`
        : `${c.country} kökenli ${c.brands.length} motosiklet ekipmanı markası: güçlü oldukları ürün grupları, öne çıkan modeller ve Türkiye'de bulunan ürünleri.`,
    path: `/markalar/${c.slug}`,
  });
}

export default async function CountryBrandsPage({ params }: PageProps<"/markalar/[ulke]">) {
  const c = find((await params).ulke);
  if (!c) notFound();
  const adj = countryAdj(c.country);
  const slugs = new Set(c.brands.map((b) => b.slug));
  const products = getProducts().filter((p) => slugs.has(p.brand) && p.status !== "discontinued");
  const priced = products.filter((p) => p.priceRange).slice(0, 12);
  const catName = (s: string) => CATEGORIES.find((x) => x.slug === s)?.short ?? s;
  const counts = new Map<string, number>();
  products.forEach((p) => counts.set(p.brand, (counts.get(p.brand) ?? 0) + 1));
  return (
    <>
      <JsonLd data={itemListLd(`${adj} motosiklet ekipmanı markaları`, c.brands.map((b) => ({ name: b.name, href: `/marka/${b.slug}` })))} />
      <PageHead
        title={`${adj} motosiklet ekipmanı markaları`}
        intro={
          c.country === "Türkiye"
            ? `Türkiye'de üretim yapan veya merkezi Türkiye'de olan ${c.brands.length} motosiklet ekipmanı markası ve sitemizdeki ${products.length} ürünü. Sertifika bilgileri yalnız markanın kendi kaynağında yazıyorsa gösterilir.`
            : `${c.country} kökenli ${c.brands.length} marka ve sitemizdeki ${products.length} ürünü. Menşe bilgisi markanın resmi kaynağından.`
        }
      >
        <Breadcrumbs items={[{ name: "Markalar", href: "/markalar" }, { name: adj, href: `/markalar/${c.slug}` }]} />
      </PageHead>
      <Container className="mt-8">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {c.brands.map((b) => (
            <li key={b.slug}>
              <Link href={`/marka/${b.slug}`} className="group flex h-full flex-col rounded-lg border border-line bg-white p-5 hover:border-ink hover:shadow-md">
                <span className="font-display text-2xl font-bold tracking-wide uppercase group-hover:text-red">{b.name}</span>
                <span className="mt-1 text-sm text-mute">{b.categories.map(catName).join(" · ")}</span>
                <span className="mt-2 line-clamp-2 text-sm text-ink-2">{b.strengths.slice(0, 2).join(", ")}</span>
                {counts.get(b.slug) ? <span className="mt-auto pt-3 text-xs font-semibold text-red">{counts.get(b.slug)} ürün</span> : null}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
      {priced.length > 0 && (
        <Container className="mt-12">
          <h2 className="mb-4 font-display text-3xl font-bold">{adj} markalardan fiyatı belli ürünler</h2>
          <ProductGrid items={priced} />
        </Container>
      )}
    </>
  );
}
