import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CompareView } from "@/components/CompareView";
import { JsonLd } from "@/components/JsonLd";
import { ProductGrid } from "@/components/ProductCard";
import { Container, Notice } from "@/components/ui";
import { getCategory } from "@/data/categories";
import { budgetGroup, budgetGroups } from "@/lib/budget";
import { compareEntry } from "@/lib/compare";
import { displayName, formatDate, isLocal, priceLabel, productPath } from "@/lib/data";
import { clip, faqLd, itemListLd, meta } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => budgetGroups().map((g) => ({ slug: g.slug }));

export async function generateMetadata({ params }: PageProps<"/karsilastir/butce/[slug]">) {
  const g = budgetGroup((await params).slug)!;
  const c = getCategory(g.category)!;
  return meta({
    title: `${g.label} ${c.name} Karşılaştırması: Hangisini Almalı?`,
    description: clip(
      `${g.label} fiyatlı ${g.items.length} ${c.name.toLocaleLowerCase("tr")} modeli: teknik özellikler, Türkiye fiyatları ve kime uygun oldukları. ${g.compare.map(displayName).slice(0, 3).join(", ")} karşılaştırması.`,
    ),
    path: `/karsilastir/butce/${g.slug}`,
  });
}

export default async function BudgetComparePage({ params }: PageProps<"/karsilastir/butce/[slug]">) {
  const g = budgetGroup((await params).slug);
  if (!g) notFound();
  const c = getCategory(g.category)!;
  const entries = g.compare.map(compareEntry);
  const cheapest = g.items[0];
  const checked = g.items.map((p) => p.priceRange!.checkedAt).sort().pop()!;
  const siblings = budgetGroups().filter((x) => x.category === g.category && x.slug !== g.slug);
  const local = g.items.filter(isLocal);
  const faq = [
    { q: `${g.label} en uygun ${c.name.toLocaleLowerCase("tr")} hangisi?`, a: `Kontrol ettiğimiz Türkiye satıcılarında bu dilimdeki en uygun fiyatlı model ${displayName(cheapest)} (${priceLabel(cheapest)}). Seçimde fiyattan önce beden uyumu ve güvenlik sertifikasına bak.` },
    { q: `Bu bütçede kaç model var?`, a: `Veri tabanımızda Türkiye fiyatı doğrulanmış ${g.items.length} model bu dilimde yer alıyor${local.length ? `; bunların ${local.length} tanesi yerli marka` : ""}.` },
  ];

  return (
    <>
      <JsonLd data={[itemListLd(g.title, g.items.map((p) => ({ name: displayName(p), href: productPath(p) }))), faqLd(faq)]} />
      <Container className="pt-6">
        <Breadcrumbs items={[{ name: "Karşılaştır", href: "/karsilastir" }, { name: `${g.label} ${c.name.toLocaleLowerCase("tr")}`, href: `/karsilastir/butce/${g.slug}` }]} />
        <h1 className="mt-4 font-display text-4xl leading-none font-bold sm:text-5xl">
          {g.label} {c.name.toLocaleLowerCase("tr")}: hangisini almalı?
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed">
          Bu bütçede Türkiye fiyatı doğrulanmış <strong>{g.items.length} model</strong> var. Aşağıda bu dilimden seçtiğimiz {entries.length} modeli yan yana koyduk; en uygun fiyatlı seçenek{" "}
          <Link href={productPath(cheapest)} className="font-semibold text-red hover:underline">
            {displayName(cheapest)}
          </Link>{" "}
          ({priceLabel(cheapest)}).
        </p>
        <p className="mt-2 text-sm text-mute">Fiyatlar canlı değildir; satıcı sayfasında görülen değerlerdir · son kontrol {formatDate(checked)}.</p>
        {siblings.length > 0 && (
          <nav aria-label="Diğer bütçeler" className="mt-4 flex flex-wrap gap-2">
            {siblings.map((s) => (
              <Link key={s.slug} href={`/karsilastir/butce/${s.slug}`} className="rounded-full border border-line bg-white px-3 py-1.5 text-sm font-semibold hover:border-ink hover:text-red">
                {s.label}
              </Link>
            ))}
          </nav>
        )}
      </Container>

      <Container className="mt-8">
        <h2 className="mb-4 font-display text-3xl font-bold">Kime uygun?</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {g.compare.map((p) => (
            <div key={p.brand + p.slug} className="rounded-lg border border-line bg-white p-4">
              <Link href={productPath(p)} className="font-display text-xl font-bold hover:text-red">
                {displayName(p)}
              </Link>
              <p className="text-sm font-semibold">{priceLabel(p)}</p>
              <p className="mt-2 text-sm text-ink-2">
                <strong className="text-ok">Uygun:</strong> {p.forWho[0]}
              </p>
              {p.notFor[0] && (
                <p className="mt-1 text-sm text-ink-2">
                  <strong className="text-red">Uygun değil:</strong> {p.notFor[0]}
                </p>
              )}
            </div>
          ))}
        </div>
      </Container>

      <Container className="mt-10">
        <CompareView items={entries} />
      </Container>

      <Container className="mt-12">
        <h2 className="mb-2 font-display text-3xl font-bold">Bu bütçedeki tüm modeller ({g.items.length})</h2>
        <p className="mb-4 text-mute">Ucuzdan pahalıya sıralı. Yerli markalar rozetle işaretli.</p>
        {g.items.length ? <ProductGrid items={g.items} /> : <Notice>Bu bütçede fiyatı doğrulanmış ürün yok.</Notice>}
      </Container>
    </>
  );
}
