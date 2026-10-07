import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { RelatedLinks } from "@/components/Related";
import { PrevNext } from "@/components/PrevNext";
import { Container } from "@/components/ui";
import { formatDate, getGuide, getGuides, getProducts, productId } from "@/lib/data";
import { faqLd, meta } from "@/lib/seo";
import { SITE, abs } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => getGuides().map((g) => ({ slug: g.slug }));

export async function generateMetadata({ params }: PageProps<"/rehber/[slug]">) {
  const { slug } = await params;
  const g = getGuide(slug)!;
  return meta({ title: g.title, description: g.description, path: `/rehber/${slug}`, type: "article" });
}

const anchor = (s: string) =>
  s
    .toLocaleLowerCase("tr")
    .replace(/[çğıöşü]/g, (c) => ({ ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u" })[c] ?? c)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export default async function GuidePage({ params }: PageProps<"/rehber/[slug]">) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();
  const cats = g.relatedCategories;
  const products = getProducts()
    .filter((p) => cats.some((r) => r === p.category || p.subcategories.some((s) => r === `${p.category}/${s}`)))
    .slice(0, 4);
  const related = g.relatedGuides.filter((r) => getGuide(r));
  const sameTopic = getGuides().filter((x) => x.topic === g.topic);
  const gi = sameTopic.findIndex((x) => x.slug === g.slug);
  const gnav = (x?: (typeof sameTopic)[number]) => (x ? { href: `/rehber/${x.slug}`, title: x.title } : undefined);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: g.title,
            description: g.description,
            dateModified: g.updatedAt,
            inLanguage: "tr-TR",
            mainEntityOfPage: abs(`/rehber/${g.slug}`),
            author: { "@type": "Organization", name: `${SITE.name} Editör Ekibi`, url: abs("/hakkimizda") },
            publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
          },
          faqLd(g.faq),
        ]}
      />
      <Container className="pt-6">
        <Breadcrumbs items={[{ name: "Rehberler", href: "/rehber" }, { name: g.title, href: `/rehber/${g.slug}` }]} />
      </Container>
      <Container className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="min-w-0 max-w-3xl">
          <h1 className="font-display text-4xl leading-none font-bold sm:text-5xl">{g.title}</h1>
          <p className="mt-3 text-sm text-mute">
            Güncelleme: <time dateTime={g.updatedAt}>{formatDate(g.updatedAt)}</time> · {g.readingMinutes} dk okuma · {SITE.name} editör ekibi
          </p>
          <p className="mt-6 rounded-lg border-l-4 border-red bg-white p-5 text-lg leading-relaxed">{g.intro}</p>
          <nav aria-label="İçindekiler" className="mt-6 rounded-lg border border-line bg-white p-5">
            <p className="mb-2 font-display text-lg font-bold">İçindekiler</p>
            <ol className="list-decimal space-y-1 pl-5 text-[15px]">
              {g.sections.map((s) => (
                <li key={s.heading}>
                  <a href={`#${anchor(s.heading)}`} className="hover:text-red hover:underline">
                    {s.heading}
                  </a>
                </li>
              ))}
              {g.faq.length > 0 && (
                <li>
                  <a href="#sss" className="hover:text-red hover:underline">
                    Sık sorulan sorular
                  </a>
                </li>
              )}
            </ol>
          </nav>
          <div className="prose-mk mt-4">
            {g.sections.map((s) => (
              <section key={s.heading}>
                <h2 id={anchor(s.heading)}>{s.heading}</h2>
                {s.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {s.bullets.length > 0 && (
                  <ul>
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
          {g.faq.length > 0 && (
            <section id="sss" className="mt-10">
              <h2 className="mb-4 font-display text-3xl font-bold">Sık sorulan sorular</h2>
              <div className="space-y-2">
                {g.faq.map((f) => (
                  <details key={f.q} className="rounded-lg border border-line bg-white open:border-ink">
                    <summary className="cursor-pointer p-4 font-semibold">{f.q}</summary>
                    <p className="px-4 pb-4 text-ink-2">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}
          {g.sources.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-2 font-display text-2xl font-bold">Kaynaklar</h2>
              <ul className="space-y-1 text-sm">
                {g.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener nofollow" className="break-all text-ink-2 underline hover:text-red">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <div className="mt-10">
            <PrevNext label="Rehberler arasında gezin" prev={gnav(sameTopic[gi - 1])} next={gnav(sameTopic[gi + 1])} />
          </div>
        </article>
        <aside className="space-y-6 lg:sticky lg:top-32 lg:self-start">
          <RelatedLinks guides={related} categories={cats} />
          <Link href="/yeni-baslayanlar" className="block rounded-lg bg-night p-5 text-white hover:bg-ink-2">
            <span className="block font-display text-xl font-bold">Yeni motor mu aldın?</span>
            <span className="mt-1 block text-sm text-white/70">Dört soruda sana uygun ekipman setini çıkaralım.</span>
          </Link>
        </aside>
      </Container>
      {products.length > 0 && (
        <Container className="mt-14">
          <h2 className="mb-4 font-display text-3xl font-bold">Bu rehberle ilgili ürünler</h2>
          <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={productId(p)} p={p} />
            ))}
          </div>
        </Container>
      )}
    </>
  );
}
