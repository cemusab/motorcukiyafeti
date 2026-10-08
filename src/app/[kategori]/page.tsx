import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ProductListing } from "@/components/ProductListing";
import { RelatedLinks } from "@/components/Related";
import { Container, Notice, PageHead } from "@/components/ui";
import { CATEGORIES, getCategory } from "@/data/categories";
import { CATEGORY_SEO, categorySeoName } from "@/data/category-seo";
import { categoryFaq, displayName, getBrands, getGuide, getGuides, productPath, productsIn } from "@/lib/data";
import { clip, faqLd, itemListLd, meta } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => CATEGORIES.map((c) => ({ kategori: c.slug }));

export async function generateMetadata({ params }: PageProps<"/[kategori]">) {
  const { kategori } = await params;
  const c = getCategory(kategori)!;
  const n = productsIn(kategori).length;
  const name = categorySeoName(c.slug, c.name);
  // Başlık şablonu " | Motorcu Kıyafeti" ekler; toplam ~65 karakteri geçmemesi için uzun adlarda kısa kalıp.
  const title = `${name} Modelleri ve Seçim Rehberi`.length <= 47 ? `${name} Modelleri ve Seçim Rehberi` : `${name} Modelleri`;
  return meta({
    title,
    description: CATEGORY_SEO[c.slug]?.description ?? clip(c.intro),
    path: `/${kategori}`,
    noindex: n === 0,
  });
}

export default async function CategoryPage({ params }: PageProps<"/[kategori]">) {
  const { kategori } = await params;
  const c = getCategory(kategori);
  if (!c) notFound();
  const items = productsIn(c.slug);
  const brands = getBrands().filter((b) => b.categories.includes(c.slug));
  const guides = getGuides().filter((g) => g.relatedCategories.some((r) => r.split("/")[0] === c.slug)).map((g) => g.slug);
  const seoName = categorySeoName(c.slug, c.name);
  const faq = categoryFaq(c.slug);
  const pillar = getGuide("motosiklet-kiyafeti-nasil-secilir");

  return (
    <>
      <PageHead title={seoName} intro={c.intro}>
        <Breadcrumbs items={[{ name: c.name, href: `/${c.slug}` }]} />
      </PageHead>
      <JsonLd data={[items.length ? itemListLd(seoName, items.map((p) => ({ name: displayName(p), href: productPath(p) }))) : null, faq.length ? faqLd(faq) : null]} />
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
      {faq.length > 0 && (
        <Container className="mt-12">
          <section id="sss" className="max-w-3xl">
            <h2 className="mb-4 font-display text-3xl font-bold">{seoName} hakkında sık sorulanlar</h2>
            <div className="space-y-2">
              {faq.map((f) => (
                <details key={f.q} className="rounded-lg border border-line bg-white open:border-ink">
                  <summary className="cursor-pointer p-4 font-semibold">{f.q}</summary>
                  <p className="px-4 pb-4 text-ink-2">{f.a}</p>
                </details>
              ))}
            </div>
            {pillar && (
              <p className="mt-4 text-sm">
                <Link href={`/rehber/${pillar.slug}`} className="font-semibold text-red hover:underline">
                  {pillar.title} →
                </Link>
              </p>
            )}
          </section>
        </Container>
      )}
    </>
  );
}
