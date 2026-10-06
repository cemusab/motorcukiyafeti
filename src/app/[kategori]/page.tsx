import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ProductListing } from "@/components/ProductListing";
import { RelatedLinks } from "@/components/Related";
import { Container, Notice, PageHead } from "@/components/ui";
import { CATEGORIES, getCategory } from "@/data/categories";
import { displayName, getBrands, getGuides, productPath, productsIn } from "@/lib/data";
import { itemListLd, meta } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => CATEGORIES.map((c) => ({ kategori: c.slug }));

export async function generateMetadata({ params }: PageProps<"/[kategori]">) {
  const { kategori } = await params;
  const c = getCategory(kategori)!;
  const n = productsIn(kategori).length;
  return meta({
    title: `Motosiklet ${c.name} Rehberi, Modeller ve Karşılaştırma`,
    description: `${c.intro.slice(0, 120)}${n ? ` ${n} model kaynaklı teknik veriyle.` : ""}`.slice(0, 160),
    path: `/${kategori}`,
  });
}

export default async function CategoryPage({ params }: PageProps<"/[kategori]">) {
  const { kategori } = await params;
  const c = getCategory(kategori);
  if (!c) notFound();
  const items = productsIn(c.slug);
  const brands = getBrands().filter((b) => b.categories.includes(c.slug));
  const guides = getGuides().filter((g) => g.relatedCategories.some((r) => r.split("/")[0] === c.slug)).map((g) => g.slug);

  return (
    <>
      <PageHead title={c.name} intro={c.intro}>
        <Breadcrumbs items={[{ name: c.name, href: `/${c.slug}` }]} />
      </PageHead>
      <JsonLd data={items.length ? itemListLd(`Motosiklet ${c.name}`, items.map((p) => ({ name: displayName(p), href: productPath(p) }))) : null} />
      <Container className="mt-6">
        <nav aria-label={`${c.name} alt kategorileri`} className="flex gap-2 overflow-x-auto pb-2">
          {c.groups.flatMap((g) => g.items).map((s) => (
            <Link key={s.slug} href={`/${c.slug}/${s.slug}`} className="shrink-0 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold whitespace-nowrap hover:border-ink hover:text-red">
              {s.name}
            </Link>
          ))}
        </nav>
      </Container>
      <Container className="mt-6">
        {items.length ? (
          <ProductListing items={items} category={c.slug} />
        ) : (
          <Notice>
            Bu kategoride henüz kaynaklarıyla doğrulanmış ürün yok. Ürünleri üretici verileriyle tek tek doğrulayarak ekliyoruz; o zamana kadar aşağıdaki rehberler seçim yapmana yardımcı olur.
          </Notice>
        )}
      </Container>
      <Container className="mt-12 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-3 font-display text-3xl font-bold">{c.name} türleri</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {c.groups.flatMap((g) => g.items).map((s) => (
              <Link key={s.slug} href={`/${c.slug}/${s.slug}`} className="rounded-lg border border-line bg-white p-4 hover:border-ink">
                <span className="block font-display text-xl font-bold">{s.name}</span>
                <span className="mt-1 block text-sm text-mute">{s.intro}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <RelatedLinks guides={[...(c.guide ? [c.guide] : []), ...guides].slice(0, 6)} title={`${c.name} rehberleri`} />
          {brands.length > 0 && (
            <section className="rounded-lg border border-line bg-white p-5">
              <h2 className="mb-3 font-display text-2xl font-bold">{c.name} markaları</h2>
              <ul className="flex flex-wrap gap-2">
                {brands.map((b) => (
                  <li key={b.slug}>
                    <Link href={`/marka/${b.slug}`} className="block rounded border border-line px-3 py-1.5 text-sm font-semibold hover:border-ink hover:text-red">
                      {b.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </Container>
    </>
  );
}
