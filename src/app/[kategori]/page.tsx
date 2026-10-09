import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ProductListing } from "@/components/ProductListing";
import { RelatedLinks } from "@/components/Related";
import { Container, Notice, PageHead } from "@/components/ui";
import { CATEGORIES, getCategory } from "@/data/categories";
import { CATEGORY_SEO, TYPE_TABLES, categorySeoName } from "@/data/category-seo";
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
  const subs = new Set(c.groups.flatMap((g) => g.items).map((s) => s.slug));
  const typeTable = TYPE_TABLES[c.slug];

  return (
    <>
      <PageHead title={seoName} intro={c.intro}>
        <Breadcrumbs items={[{ name: c.name, href: `/${c.slug}` }]} />
      </PageHead>
      <JsonLd data={[items.length ? itemListLd(seoName, items.map((p) => ({ name: displayName(p), href: productPath(p) }))) : null, faq.length ? faqLd(faq) : null]} />
      <Container className="mt-6">
        <nav aria-label={`${c.name} alt kategorileri`} className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          {c.groups.flatMap((g) => g.items).map((s) => (
            <Link key={s.slug} href={`/${c.slug}/${s.slug}`} className="shrink-0 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold whitespace-nowrap hover:border-ink hover:text-red">
              {s.name}
            </Link>
          ))}
        </nav>
      </Container>
      {c.slug === "kask" && (
        <Container className="mt-6">
          <Notice>
            <strong>Güvenlik onayı:</strong> ECE 22.06 onayı üreticinin resmi kaynağıyla doğrulanan kasklarda yeşil <strong>ECE 22.06</strong>, doğrulanamayanlarda turuncu <strong>ECE doğrulanıyor</strong> etiketi bulunur. Filtrelerden yalnız ECE 22.06 onaylıları seçebilirsin. Çene kayışında güvenlik onayı etiketi olmayan kask alma.
            {getGuide("kask-sertifikalari-ne-anlama-gelir") && (
              <>
                {" "}
                <Link href="/rehber/kask-sertifikalari-ne-anlama-gelir" className="font-semibold underline">
                  Sertifikalar ne anlama gelir?
                </Link>
              </>
            )}
          </Notice>
        </Container>
      )}
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
      {typeTable && (
        <Container className="mt-12">
          <section aria-labelledby="turler-tablo">
            <h2 id="turler-tablo" className="mb-4 font-display text-3xl font-bold">
              {typeTable.title}
            </h2>
            <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[640px] border-collapse overflow-hidden rounded-lg border border-line bg-white text-left text-sm">
                <thead className="bg-paper">
                  <tr>
                    <th scope="col" className="p-3 font-semibold">Tür</th>
                    <th scope="col" className="p-3 font-semibold">Diğer adları</th>
                    <th scope="col" className="p-3 font-semibold">En uygun kullanım</th>
                    <th scope="col" className="p-3 font-semibold">Güçlü yanı</th>
                    <th scope="col" className="p-3 font-semibold">Sınırlaması</th>
                  </tr>
                </thead>
                <tbody>
                  {typeTable.rows.map((r) => (
                    <tr key={r.sub} className="border-t border-line align-top">
                      <th scope="row" className="p-3 font-semibold">
                        {subs.has(r.sub) && productsIn(c.slug, r.sub).length ? (
                          <Link href={`/${c.slug}/${r.sub}`} className="text-red hover:underline">
                            {r.name}
                          </Link>
                        ) : (
                          r.name
                        )}
                      </th>
                      <td className="p-3 text-ink-2">{r.aka}</td>
                      <td className="p-3 text-ink-2">{r.bestFor}</td>
                      <td className="p-3 text-ink-2">{r.plus}</td>
                      <td className="p-3 text-ink-2">{r.minus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </Container>
      )}
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
