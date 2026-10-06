import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { ProductGrid } from "@/components/ProductCard";
import { RelatedLinks } from "@/components/Related";
import { Container } from "@/components/ui";
import { CATEGORIES } from "@/data/categories";
import { comparePairs } from "@/lib/catalog";
import { displayName, formatDate, getBrand, getBrands, getGuides, getProducts } from "@/lib/data";
import { clip, meta } from "@/lib/seo";
import { abs } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => getBrands().map((b) => ({ slug: b.slug }));

export async function generateMetadata({ params }: PageProps<"/marka/[slug]">) {
  const { slug } = await params;
  const b = getBrand(slug)!;
  return meta({
    title: `${b.name} – Marka Rehberi, Öne Çıkan Ürünler${b.country ? `, ${b.country}` : ""}`,
    description: clip(`${b.name}${b.country ? ` (${b.country})` : ""} hakkında: güçlü olduğu ürünler, ürün aileleri, Türkiye'deki modeller ve alternatif markalar.`),
    path: `/marka/${slug}`,
  });
}

export default async function BrandPage({ params }: PageProps<"/marka/[slug]">) {
  const { slug } = await params;
  const b = getBrand(slug);
  if (!b) notFound();
  const products = getProducts().filter((p) => p.brand === b.slug);
  const alts = b.alternatives.map(getBrand).filter((x) => !!x);
  const pairs = comparePairs().filter((c) => c.items.some((i) => i.brand === b.slug));
  const guides = getGuides().filter((g) => g.relatedCategories.some((r) => b.categories.includes(r.split("/")[0]))).map((g) => g.slug);

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Brand", name: b.name, url: abs(`/marka/${b.slug}`), sameAs: [b.website] }} />
      <div className="bg-night text-white">
        <Container className="py-10">
          <div className="[&_a]:text-white/70 [&_span]:text-white">
            <Breadcrumbs items={[{ name: "Markalar", href: "/markalar" }, { name: b.name, href: `/marka/${b.slug}` }]} />
          </div>
          <h1 lang={b.country === "Türkiye" ? "tr" : "en"} className="mt-4 font-display text-5xl font-bold tracking-wide uppercase sm:text-6xl">{b.name}</h1>
          <p className="mt-2 text-lg text-white/70">
            {[b.country, b.founded ? `${b.founded}'den beri` : null, b.categories.map((c) => CATEGORIES.find((x) => x.slug === c)?.short ?? c).join(", ")]
              .filter(Boolean)
              .join(" · ")}
          </p>
          <a href={b.website} target="_blank" rel="noopener" className="mt-5 inline-flex h-11 items-center gap-2 rounded-md bg-red px-5 font-semibold hover:bg-red-dark">
            {b.name} resmi sitesi <Icon name="external" className="size-4" />
          </a>
        </Container>
      </div>

      <Container className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-12">
          <section>
            <h2 className="mb-4 font-display text-3xl font-bold">{b.name} hakkında</h2>
            <div className="prose-mk max-w-3xl">
              {b.about.map((x, i) => (
                <p key={i}>{x}</p>
              ))}
            </div>
            <h3 className="mt-4 mb-2 font-display text-xl font-bold">Güçlü olduğu alanlar</h3>
            <ul className="flex flex-wrap gap-2">
              {b.strengths.map((s) => (
                <li key={s} className="rounded bg-white px-3 py-1.5 text-sm font-medium ring-1 ring-line">
                  {s}
                </li>
              ))}
            </ul>
          </section>

          {b.highlights.length > 0 && (
            <section>
              <h2 className="mb-1 font-display text-3xl font-bold">En iddialı {b.name} ürünleri</h2>
              <p className="mb-4 text-mute">Markanın en güçlü olduğu ürünlere üreticinin kendi sayfasından ulaş.</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {b.highlights.map((h) => (
                  <li key={h.url}>
                    <a href={h.url} target="_blank" rel="noopener" className="group flex h-full flex-col rounded-lg border border-line bg-white p-5 hover:border-red">
                      <span className="flex items-start justify-between gap-2 font-display text-xl font-bold group-hover:text-red">
                        {h.label} <Icon name="external" className="mt-1 size-4 shrink-0" />
                      </span>
                      <span className="mt-1 text-sm text-ink-2">{h.reason}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {products.length > 0 && (
            <section>
              <h2 className="mb-4 font-display text-3xl font-bold">İncelediğimiz {b.name} ürünleri</h2>
              <ProductGrid items={products} />
            </section>
          )}

          {b.families.length > 0 && (
            <section>
              <h2 className="mb-4 font-display text-3xl font-bold">Ürün aileleri</h2>
              <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-white">
                {b.families.map((f) => (
                  <li key={f.url}>
                    <a href={f.url} target="_blank" rel="noopener" className="flex items-start justify-between gap-4 p-4 hover:bg-paper">
                      <span>
                        <span className="block font-semibold">{f.name}</span>
                        <span className="block text-sm text-mute">{f.note}</span>
                      </span>
                      <Icon name="external" className="mt-1 size-4 shrink-0 text-mute" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {pairs.length > 0 && (
            <section>
              <h2 className="mb-4 font-display text-3xl font-bold">Karşılaştırmalar</h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {pairs.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/karsilastir/${c.slug}`} className="block rounded-lg border border-line bg-white p-4 font-semibold hover:border-ink">
                      {displayName(c.items[0])} <span className="text-red">vs</span> {displayName(c.items[1])}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <p className="text-sm text-mute">
            Kaynaklar:{" "}
            {b.sources.map((s, i) => (
              <span key={s.url}>
                {i > 0 && ", "}
                <a href={s.url} target="_blank" rel="noopener nofollow" className="underline">
                  {s.label}
                </a>
              </span>
            ))}{" "}
            · Son kontrol {formatDate(b.sources[0].checkedAt)}
          </p>
        </div>
        <aside className="space-y-6">
          {alts.length > 0 && (
            <section className="rounded-lg border border-line bg-white p-5">
              <h2 className="mb-3 font-display text-2xl font-bold">Alternatif markalar</h2>
              <ul className="space-y-2">
                {alts.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/marka/${a.slug}`} className="font-semibold hover:text-red">
                      {a.name} <span className="text-sm font-normal text-mute">{a.country}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <RelatedLinks guides={guides.slice(0, 5)} categories={b.categories} title="İlgili rehberler" />
        </aside>
      </Container>
    </>
  );
}
