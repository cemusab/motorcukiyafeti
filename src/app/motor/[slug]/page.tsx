import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import { ProductGrid } from "@/components/ProductCard";
import { RelatedLinks } from "@/components/Related";
import { Container } from "@/components/ui";
import { getSubcategory } from "@/data/categories";
import { GEAR, MOTO_TYPES, wizardSet } from "@/data/riding";
import { getGuide, getMotorcycles, isApparel, productsIn } from "@/lib/data";
import { clip, faqLd, meta } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const dynamicParams = false;
export const generateStaticParams = () => getMotorcycles().map((m) => ({ slug: m.slug }));
const find = (s: string) => getMotorcycles().find((m) => m.slug === s);
const sentence = (n: string) => (/[.!?]$/.test(n) ? n : n + ".");

export async function generateMetadata({ params }: PageProps<"/motor/[slug]">) {
  const m = find((await params).slug)!;
  const t = MOTO_TYPES.find((x) => x.slug === m.type)!;
  return meta({
    title: `${m.brand} ${m.model} İçin Kask, Mont ve Ekipman`,
    description: clip(`${m.brand} ${m.model} (${t.name.toLocaleLowerCase("tr")}${m.cc ? `, ${m.cc} cc` : ""}) kullananlar için kask, mont, eldiven ve bot önerileri; modele özel notlar ve ehliyet bilgisi.`),
    path: `/motor/${m.slug}`,
    // Modele özel not yoksa sayfa büyük ölçüde motor türü sayfasıyla aynıdır; indekslenmez.
    noindex: m.notes.length < 2,
  });
}

export default async function BikePage({ params }: PageProps<"/motor/[slug]">) {
  const m = find((await params).slug);
  if (!m) notFound();
  const t = MOTO_TYPES.find((x) => x.slug === m.type)!;
  const name = `${m.brand} ${m.model}`;
  const keys = wizardSet({ tur: m.type, kullanim: m.courierCommon ? "is" : "sehir", mevsim: "4-mevsim", butce: "orta" });
  const subs = t.subs.map((s) => getSubcategory(s.split("/")[0], s.split("/")[1])!).filter(Boolean);
  const products = [
    ...new Map(
      subs
        .flatMap((s) => productsIn(s.category.slug, s.sub.slug).filter((p) => !(isApparel(p) && p.specs.gender === "kadin") && !p.subcategories.includes("kaska-ozel-interkom")).slice(0, 2))
        .map((p) => [p.brand + p.slug, p]),
    ).values(),
  ].slice(0, 8);
  const siblings = getMotorcycles().filter((x) => x.type === m.type && x.slug !== m.slug).slice(0, 8);
  const faq = [
    { q: `${name} için hangi kask uygun?`, a: t.helmet },
    { q: `${name} kullanırken hangi mont giyilmeli?`, a: t.jacket },
    ...(m.licence ? [{ q: `${name} için hangi ehliyet gerekir?`, a: `${name} için ${m.licence} sınıfı ehliyet gerekir.` }] : []),
  ];
  return (
    <>
      <JsonLd data={faqLd(faq)} />
      <Container className="pt-6">
        <Breadcrumbs items={[{ name: "Motoruna Göre", href: "/motor" }, { name, href: `/motor/${m.slug}` }]} />
        <h1 className="mt-4 font-display text-4xl leading-none font-bold sm:text-5xl">{name} için ekipman</h1>
        <p className="mt-2 text-lg text-mute">
          {t.name}
          {m.cc ? ` · ${m.cc} cc` : ""}
          {m.licence ? ` · ${m.licence} ehliyet` : ""}
          {m.generationFrom ? ` · ${m.generationFrom}+ kuşak` : ""}
        </p>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed">
          {name} bir {t.name.toLocaleLowerCase("tr")} modeli. {t.summary}
        </p>
        {m.notes.length > 0 && (
          <ul className="mt-4 max-w-3xl space-y-1">
            {m.notes.map((n) => (
              <li key={n} className="flex gap-2">
                <Icon name="info" className="mt-1 size-4 shrink-0 text-red" /> {sentence(n)}
              </li>
            ))}
          </ul>
        )}
        {m.officialUrl && (
          <a href={m.officialUrl} target="_blank" rel="noopener" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-red hover:underline">
            {m.brand} resmi model sayfası <Icon name="external" className="size-4" />
          </a>
        )}
      </Container>
      <Container className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-10">
          <section>
            <h2 className="mb-4 font-display text-3xl font-bold">Önerilen ekipman seti</h2>
            <ul className="grid gap-3 md:grid-cols-2">
              {keys.map((k) => (
                <li key={k} className="rounded-lg border border-line bg-white p-4">
                  <Link href={GEAR[k].href} className="font-display text-xl font-bold hover:text-red">
                    {GEAR[k].name}
                  </Link>
                  <p className="mt-1 text-sm text-ink-2">{GEAR[k].why}</p>
                  <p className="mt-1 text-sm text-mute">{GEAR[k].safety}</p>
                </li>
              ))}
            </ul>
          </section>
          {products.length > 0 && (
            <section>
              <h2 className="mb-4 font-display text-3xl font-bold">{t.name} sürücüleri için ürünler</h2>
              <ProductGrid items={products} />
            </section>
          )}
        </div>
        <aside className="space-y-6">
          <Link href="/yeni-baslayanlar" className="block rounded-lg bg-night p-5 text-white hover:bg-ink-2">
            <span className="block font-display text-xl font-bold">Sana özel seti çıkar</span>
            <span className="mt-1 block text-sm text-white/70">Mevsim, bütçe ve kullanımına göre önerileri gör.</span>
          </Link>
          <RelatedLinks guides={[t.guide, ...(m.courierCommon && getGuide("kurye-motosiklet-ekipmanlari") ? ["kurye-motosiklet-ekipmanlari"] : [])]} categories={t.subs.slice(0, 3)} title="İlgili rehberler" />
          <section className="rounded-lg border border-line bg-white p-5">
            <h2 className="mb-2 font-display text-xl font-bold">
              <Link href={`/motosikletime-gore/${t.slug}`} className="hover:text-red">
                {t.name} ekipman rehberi
              </Link>
            </h2>
            {siblings.length > 0 && (
              <ul className="mt-2 space-y-1 text-sm">
                {siblings.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/motor/${s.slug}`} className="font-semibold hover:text-red">
                      {s.brand} {s.model}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </aside>
      </Container>
    </>
  );
}
