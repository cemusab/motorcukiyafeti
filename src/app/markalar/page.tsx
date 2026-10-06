import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Container, PageHead } from "@/components/ui";
import { CATEGORIES } from "@/data/categories";
import { getBrands, getProducts } from "@/lib/data";
import { itemListLd, meta } from "@/lib/seo";
import { norm } from "@/lib/search-core";

const anchorId = (c: string) => "ulke-" + norm(c).replace(/[^a-z0-9]+/g, "-");

export const metadata = meta({
  title: "Motosiklet Ekipmanı Markaları – Yerli ve Global Markalar",
  description: "Kask, mont, eldiven, bot ve interkom markaları menşe ülkelerine göre: Japon, İtalyan, Alman, Hollanda, Amerikan ve yerli Türk üreticiler.",
  path: "/markalar",
});

export default function BrandsPage() {
  const brands = getBrands();
  const counts = new Map<string, number>();
  getProducts().forEach((p) => counts.set(p.brand, (counts.get(p.brand) ?? 0) + 1));
  const byCountry = new Map<string, typeof brands>();
  for (const b of brands) {
    const k = b.country ?? "Diğer";
    byCountry.set(k, [...(byCountry.get(k) ?? []), b]);
  }
  const countries = [...byCountry.keys()].sort((a, b) => (a === "Türkiye" ? -1 : b === "Türkiye" ? 1 : (byCountry.get(b)!.length - byCountry.get(a)!.length) || a.localeCompare(b, "tr")));
  const catName = (s: string) => CATEGORIES.find((c) => c.slug === s)?.short ?? s;

  return (
    <>
      <PageHead title="Markalar" intro="Motosiklet ekipmanı markalarını menşe ülkelerine ve güçlü oldukları ürün gruplarına göre keşfet. Her marka sayfasında markanın resmi sitesine ve öne çıkan ürünlerine doğrudan bağlantılar bulunur.">
        <Breadcrumbs items={[{ name: "Markalar", href: "/markalar" }]} />
      </PageHead>
      <JsonLd data={itemListLd("Motosiklet ekipmanı markaları", brands.map((b) => ({ name: b.name, href: `/marka/${b.slug}` })))} />
      <Container className="mt-6">
        <nav aria-label="Ülkeler" className="flex flex-wrap gap-2">
          {countries.map((c) => (
            <a key={c} href={`#${anchorId(c)}`} className="rounded-full border border-line bg-white px-3 py-1.5 text-sm font-semibold hover:border-ink">
              {c} <span className="text-mute">({byCountry.get(c)!.length})</span>
            </a>
          ))}
        </nav>
      </Container>
      <Container className="mt-8 space-y-12">
        {countries.map((country) => (
          <section key={country} id={anchorId(country)}>
            <h2 className="mb-4 font-display text-3xl font-bold">{country === "Türkiye" ? "Yerli markalar (Türkiye)" : `${country} markaları`}</h2>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {byCountry.get(country)!.map((b) => (
                <li key={b.slug}>
                  <Link href={`/marka/${b.slug}`} className="group flex h-full flex-col rounded-lg border border-line bg-white p-5 hover:border-ink hover:shadow-md">
                    <span lang="en" className="font-display text-2xl font-bold tracking-wide uppercase group-hover:text-red">{b.name}</span>
                    <span className="mt-1 text-sm text-mute">{b.categories.map(catName).join(" · ")}</span>
                    <span className="mt-2 line-clamp-2 text-sm text-ink-2">{b.strengths.slice(0, 2).join(", ")}</span>
                    {counts.get(b.slug) ? <span className="mt-auto pt-3 text-xs font-semibold text-red">{counts.get(b.slug)} ürün incelendi</span> : null}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </Container>
    </>
  );
}
