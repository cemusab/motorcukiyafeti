import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory } from "@/data/categories";
import { GENDERS, genderCategories, productsForGender, type GenderSlug } from "@/lib/catalog";
import { getGuide } from "@/lib/data";
import { meta } from "@/lib/seo";
import { Breadcrumbs } from "./Breadcrumbs";
import { Icon } from "./Icon";
import { ProductListing } from "./ProductListing";
import { Container, Notice, PageHead } from "./ui";

const INTRO: Record<GenderSlug, string> = {
  kadin:
    "Kadın sürücüler için kalıbı kadın vücut ölçülerine göre tasarlanmış montlar, eldivenler ve botlar. Kasklar ve interkomlar cinsiyetten bağımsızdır; doğru kask için kafa ölçüsü ve şekli belirleyicidir.",
  erkek: "Erkek kalıbı ve unisex motosiklet giyimi; mont, eldiven ve bot. Kasklar ve interkomlar cinsiyetten bağımsız listelenir.",
};

export function genderMeta(g: GenderSlug, cat?: string) {
  const gd = GENDERS.find((x) => x.slug === g)!;
  const c = cat ? getCategory(cat) : undefined;
  return meta({
    title: c ? `${gd.name} Motosiklet ${c.name} Modelleri` : gd.long,
    description: (c ? `${gd.name} sürücüler için ${c.name.toLocaleLowerCase("tr")} modelleri: teknik özellikler, koruma sınıfları ve Türkiye fiyatları.` : INTRO[g]).slice(0, 160),
    // Kask ve interkom listeleri cinsiyetten bağımsız olduğu için canonical ana kategoriyi gösterir (yinelenen içerik önlemi).
    path: c ? (c.slug === "kask" || c.slug === "interkom" ? `/${c.slug}` : `/${g}/${c.slug}`) : `/${g}`,
  });
}

export function GenderHub({ g }: { g: GenderSlug }) {
  const gd = GENDERS.find((x) => x.slug === g)!;
  const cats = genderCategories(g);
  const other = GENDERS.find((x) => x.slug !== g)!;
  return (
    <>
      <PageHead title={gd.long} intro={INTRO[g]}>
        <Breadcrumbs items={[{ name: gd.name, href: `/${g}` }]} />
      </PageHead>
      <Container className="mt-8">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {cats.map((c) => (
            <li key={c.slug}>
              <Link href={`/${g}/${c.slug}`} className="group flex h-full flex-col items-center gap-2 rounded-lg border border-line bg-white p-4 text-center font-semibold hover:border-ink">
                <Icon name={c.icon} className="size-10 group-hover:text-red" />
                {gd.name} {c.short.toLocaleLowerCase("tr")}
                <span className="text-xs font-normal text-mute">{productsForGender(g, c.slug).length} model</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
      <Container className="mt-10">
        <h2 className="mb-4 font-display text-3xl font-bold">Tüm {gd.name.toLocaleLowerCase("tr")} ekipmanları</h2>
        <GenderList g={g} />
      </Container>
      <Container className="mt-8 flex flex-wrap gap-4 text-sm font-semibold">
        <Link href={`/${other.slug}`} className="text-red hover:underline">
          {other.long} →
        </Link>
        {getGuide("ilk-motosiklet-ekipmanlari") && (
          <Link href="/rehber/ilk-motosiklet-ekipmanlari" className="text-red hover:underline">
            Yeni başlayan ekipman listesi →
          </Link>
        )}
      </Container>
    </>
  );
}

function GenderList({ g, cat }: { g: GenderSlug; cat?: string }) {
  const apparel = productsForGender(g, cat).filter((p) => p.category !== "kask" && p.category !== "interkom");
  const items = cat ? productsForGender(g, cat) : apparel;
  if (!items.length) return <Notice>Bu bölümde henüz doğrulanmış ürün yok.</Notice>;
  // Tek kategoride filtre gösterilir; karma listede düz grid yeterli.
  return <ProductListing items={items} category={cat ?? "mont"} />;
}

export function GenderCategory({ g, cat }: { g: GenderSlug; cat: string }) {
  const gd = GENDERS.find((x) => x.slug === g)!;
  const c = getCategory(cat);
  if (!c || !genderCategories(g).some((x) => x.slug === cat)) notFound();
  const unisex = c.slug === "kask" || c.slug === "interkom";
  return (
    <>
      <PageHead
        title={`${gd.name} ${c.name.toLocaleLowerCase("tr")}`}
        intro={unisex ? `${c.name} modelleri cinsiyete göre ayrılmaz; aynı modeller ${gd.name.toLocaleLowerCase("tr")} ve erkek sürücüler için geçerlidir. Belirleyici olan beden ve kafa şeklidir.` : c.intro}
      >
        <Breadcrumbs items={[{ name: gd.name, href: `/${g}` }, { name: c.name, href: `/${g}/${c.slug}` }]} />
      </PageHead>
      <Container className="mt-8">
        <GenderList g={g} cat={c.slug} />
      </Container>
      <Container className="mt-8">
        <Link href={`/${c.slug}`} className="text-sm font-semibold text-red hover:underline">
          Tüm {c.name.toLocaleLowerCase("tr")} modelleri →
        </Link>
      </Container>
    </>
  );
}
