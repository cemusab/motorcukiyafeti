import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductGrid } from "@/components/ProductCard";
import { RelatedLinks } from "@/components/Related";
import { Container } from "@/components/ui";
import { getSubcategory } from "@/data/categories";
import { MOTO_TYPES } from "@/data/riding";
import { productsIn } from "@/lib/data";
import { meta } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => MOTO_TYPES.map((m) => ({ tur: m.slug }));
const find = (s: string) => MOTO_TYPES.find((m) => m.slug === s);

export async function generateMetadata({ params }: PageProps<"/motosikletime-gore/[tur]">) {
  const m = find((await params).tur)!;
  return meta({ title: `${m.name} İçin Motosiklet Ekipmanı`, description: m.summary.slice(0, 158), path: `/motosikletime-gore/${m.slug}` });
}

export default async function MotoTypePage({ params }: PageProps<"/motosikletime-gore/[tur]">) {
  const m = find((await params).tur);
  if (!m) notFound();
  const subs = m.subs.map((s) => {
    const [c, sub] = s.split("/");
    return getSubcategory(c, sub)!;
  });
  const products = [...new Map(subs.flatMap((s) => productsIn(s.category.slug, s.sub.slug).slice(0, 2)).map((p) => [p.brand + p.slug, p])).values()].slice(0, 8);
  const blocks = [
    { t: "Kask", d: m.helmet },
    { t: "Mont ve giyim", d: m.jacket },
    { t: "Ayrıca", d: m.extra },
  ];
  return (
    <>
      <Container className="pt-6">
        <Breadcrumbs items={[{ name: "Motosikletime Göre", href: "/motosikletime-gore" }, { name: m.name, href: `/motosikletime-gore/${m.slug}` }]} />
        <h1 className="mt-4 font-display text-4xl leading-none font-bold sm:text-5xl">{m.name} için ekipman</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed">{m.summary}</p>
      </Container>
      <Container className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-8">
          <div className="grid gap-3 md:grid-cols-3">
            {blocks.map((b) => (
              <div key={b.t} className="rounded-lg border border-line bg-white p-5">
                <h2 className="font-display text-2xl font-bold">{b.t}</h2>
                <p className="mt-2 text-ink-2">{b.d}</p>
              </div>
            ))}
          </div>
          <section>
            <h2 className="mb-3 font-display text-3xl font-bold">Önerilen kategoriler</h2>
            <ul className="flex flex-wrap gap-2">
              {subs.map((s) => (
                <li key={s.sub.slug}>
                  <Link href={`/${s.category.slug}/${s.sub.slug}`} className="block rounded-full border border-line bg-white px-4 py-2 font-semibold hover:border-ink hover:text-red">
                    {s.sub.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          {products.length > 0 && (
            <section>
              <h2 className="mb-4 font-display text-3xl font-bold">Bu kullanıma uygun ürünler</h2>
              <ProductGrid items={products} />
            </section>
          )}
        </div>
        <aside className="space-y-6">
          <RelatedLinks guides={[m.guide]} title="Rehber" />
          <Link href="/yeni-baslayanlar" className="block rounded-lg bg-night p-5 text-white hover:bg-ink-2">
            <span className="block font-display text-xl font-bold">Kişisel ekipman setini çıkar</span>
            <span className="mt-1 block text-sm text-white/70">Mevsim ve bütçene göre önerileri gör.</span>
          </Link>
          <section className="rounded-lg border border-line bg-white p-5">
            <h2 className="mb-2 font-display text-xl font-bold">Diğer motor türleri</h2>
            <ul className="space-y-1">
              {MOTO_TYPES.filter((x) => x.slug !== m.slug).map((x) => (
                <li key={x.slug}>
                  <Link href={`/motosikletime-gore/${x.slug}`} className="font-semibold hover:text-red">
                    {x.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </Container>
    </>
  );
}
