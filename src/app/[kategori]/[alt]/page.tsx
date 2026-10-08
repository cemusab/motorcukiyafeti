import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ProductListing } from "@/components/ProductListing";
import { RelatedLinks } from "@/components/Related";
import { Container, Notice, PageHead } from "@/components/ui";
import { allSubcategories, getSubcategory } from "@/data/categories";
import { subSeoName } from "@/data/category-seo";
import { displayName, getGuides, productPath, productsIn } from "@/lib/data";
import { clip, itemListLd, meta } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => allSubcategories().map(({ category, sub }) => ({ kategori: category.slug, alt: sub.slug }));

export async function generateMetadata({ params }: PageProps<"/[kategori]/[alt]">) {
  const { kategori, alt } = await params;
  const s = getSubcategory(kategori, alt)!;
  const n = productsIn(kategori, alt).length;
  return meta({
    title: ((t) => (t.length <= 47 ? t : `${subSeoName(kategori, alt, s.sub.name)} Modelleri`))(`${subSeoName(kategori, alt, s.sub.name)} Modelleri ve Seçim Rehberi`),
    description: clip(`${s.sub.intro} ${n ? `${n} model teknik özellikleriyle.` : "Seçim kriterleri ve rehberler."}`),
    path: `/${kategori}/${alt}`,
    noindex: n === 0,
  });
}

export default async function SubcategoryPage({ params }: PageProps<"/[kategori]/[alt]">) {
  const { kategori, alt } = await params;
  const found = getSubcategory(kategori, alt);
  if (!found) notFound();
  const { category: c, sub } = found;
  const items = productsIn(c.slug, sub.slug);
  const guides = getGuides()
    .filter((g) => g.relatedCategories.includes(`${c.slug}/${sub.slug}`) || g.relatedCategories.includes(c.slug))
    .map((g) => g.slug);
  const siblings = c.groups.flatMap((g) => g.items).filter((i) => i.slug !== sub.slug);

  return (
    <>
      <PageHead title={subSeoName(c.slug, sub.slug, sub.name)} intro={sub.intro}>
        <Breadcrumbs items={[{ name: c.name, href: `/${c.slug}` }, { name: sub.name, href: `/${c.slug}/${sub.slug}` }]} />
      </PageHead>
      <JsonLd data={items.length ? itemListLd(sub.name, items.map((p) => ({ name: displayName(p), href: productPath(p) }))) : null} />
      <Container className="mt-8">
        {items.length ? (
          <ProductListing items={items} category={c.slug} />
        ) : (
          <Notice>
            Bu alt kategoriye henüz kaynaklarıyla doğrulanmış ürün eklenmedi.{" "}
            <Link href={`/${c.slug}`} className="font-semibold text-red underline">
              Tüm {c.name.toLocaleLowerCase("tr")} ürünlerine
            </Link>{" "}
            göz atabilir veya aşağıdaki rehberlerden seçim kriterlerini öğrenebilirsin.
          </Notice>
        )}
      </Container>
      <Container className="mt-12 grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="mb-3 font-display text-3xl font-bold">Diğer {c.name.toLocaleLowerCase("tr")} türleri</h2>
          <ul className="flex flex-wrap gap-2">
            {siblings.map((s) => (
              <li key={s.slug}>
                <Link href={`/${c.slug}/${s.slug}`} className="block rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold hover:border-ink hover:text-red">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <RelatedLinks guides={[...(c.guide ? [c.guide] : []), ...guides].slice(0, 6)} />
      </Container>
    </>
  );
}
