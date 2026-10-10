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
import { motorPairs, oilsForBike, tiresForBike } from "@/lib/catalog";
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
  const pairs = motorPairs().filter((p) => p.items.some((x) => x.slug === m.slug));
  const fit = tiresForBike(m);
  const oils = oilsForBike(m);
  const siblings = getMotorcycles().filter((x) => x.type === m.type && x.slug !== m.slug).slice(0, 8);
  const faq = [
    { q: `${name} için hangi kask uygun?`, a: t.helmet },
    { q: `${name} kullanırken hangi mont giyilmeli?`, a: t.jacket },
    ...(m.licence ? [{ q: `${name} için hangi ehliyet gerekir?`, a: `${name} için ${m.licence} sınıfı ehliyet gerekir.` }] : []),
    ...(m.tires ? [{ q: `${name} lastik ebatı nedir?`, a: `Üreticinin teknik bilgisine göre fabrika lastik ebatları ön ${m.tires.front}, arka ${m.tires.rear}. Lastik alırken aynı ebat ve en az aynı yük/hız endeksini seç; kılavuz esastır.` }] : []),
    ...(m.oil && (m.oil.viscosity || m.oil.spec) ? [{ q: `${name} hangi motor yağını kullanır?`, a: `Üreticinin önerisi: ${[m.oil.viscosity, m.oil.spec].filter(Boolean).join(", ")}${m.oil.capacityL ? `; yağ miktarı yaklaşık ${String(m.oil.capacityL).replace(".", ",")} L` : ""}. Değişim aralığı ve sıcaklığa göre viskozite için kılavuza bak.` }] : []),
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
        {m.tech && (
          <p className="mt-4 max-w-3xl text-sm text-ink-2">
            <strong>Üretici verileri:</strong>{" "}
            {[
              m.tech.powerKw != null ? `${String(m.tech.powerKw).replace(".", ",")} kW` : null,
              m.tech.powerHp != null ? `${String(m.tech.powerHp).replace(".", ",")} hp` : null,
              m.tech.torqueNm != null ? `${String(m.tech.torqueNm).replace(".", ",")} Nm` : null,
              m.tech.weightKg != null ? `${m.tech.weightKg} kg${m.tech.weightType ? ` (${{ islak: "ıslak", kuru: "kuru", "surushe-hazir": "sürüşe hazır" }[m.tech.weightType]})` : ""}` : null,
              m.tech.seatHeightMm != null ? `sele ${m.tech.seatHeightMm} mm` : null,
              m.tech.fuelTankL != null ? `depo ${String(m.tech.fuelTankL).replace(".", ",")} L` : null,
            ]
              .filter(Boolean)
              .join(" · ")}{" "}
            (
            <a href={m.tech.source.url} target="_blank" rel="noopener nofollow" className="underline">
              kaynak
            </a>
            )
          </p>
        )}
        {(m.tires || (m.oil && (m.oil.viscosity || m.oil.spec))) && (
          <dl className="mt-5 grid max-w-3xl gap-3 sm:grid-cols-2">
            {m.tires && (
              <div className="rounded-lg border border-line bg-white p-4">
                <dt className="text-sm font-semibold text-mute">Fabrika lastik ebatı</dt>
                <dd className="mt-1 font-display text-xl font-bold">
                  Ön {m.tires.front} · Arka {m.tires.rear}
                </dd>
                <dd className="mt-1 text-xs text-mute">
                  Kaynak:{" "}
                  <a href={m.tires.source.url} target="_blank" rel="noopener nofollow" className="underline">
                    {m.tires.source.label}
                  </a>
                </dd>
              </div>
            )}
            {m.oil && (m.oil.viscosity || m.oil.spec) && (
              <div className="rounded-lg border border-line bg-white p-4">
                <dt className="text-sm font-semibold text-mute">Üreticinin önerdiği motor yağı</dt>
                <dd className="mt-1 font-display text-xl font-bold">{[m.oil.viscosity, m.oil.spec].filter(Boolean).join(" · ")}</dd>
                {m.oil.capacityL && <dd className="text-sm">Yağ miktarı: yaklaşık {String(m.oil.capacityL).replace(".", ",")} L</dd>}
                <dd className="mt-1 text-xs text-mute">
                  Kaynak:{" "}
                  <a href={m.oil.source.url} target="_blank" rel="noopener nofollow" className="underline">
                    {m.oil.source.label}
                  </a>
                </dd>
              </div>
            )}
          </dl>
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
          {(fit.front.length > 0 || fit.rear.length > 0) && m.tires && (
            <section>
              <h2 className="mb-1 font-display text-3xl font-bold">{name} için uygun lastikler</h2>
              <p className="mb-4 text-sm text-mute">
                Fabrika ebadına (ön {m.tires.front}, arka {m.tires.rear}) göre, lastik üreticisinin ebat listesinde bu ebatla sunulan modeller. Yük ve hız endeksini kılavuzla karşılaştır.
              </p>
              {fit.front.length > 0 && (
                <>
                  <h3 className="mb-2 font-display text-xl font-bold">Ön lastik</h3>
                  <ProductGrid items={fit.front.slice(0, 8)} />
                </>
              )}
              {fit.rear.length > 0 && (
                <>
                  <h3 className="mt-6 mb-2 font-display text-xl font-bold">Arka lastik</h3>
                  <ProductGrid items={fit.rear.slice(0, 8)} />
                </>
              )}
            </section>
          )}
          {oils.length > 0 && m.oil && (
            <section>
              <h2 className="mb-1 font-display text-3xl font-bold">{name} için uygun motor yağları</h2>
              <p className="mb-4 text-sm text-mute">
                Üreticinin önerisi ({[m.oil.viscosity, m.oil.spec].filter(Boolean).join(", ")}) ile viskozitesi ve JASO sınıfı uyuşan yağlar. Değişim aralığı için kılavuza bak.
              </p>
              <ProductGrid items={oils.slice(0, 8)} />
            </section>
          )}
          {products.length > 0 && (
            <section>
              <h2 className="mb-4 font-display text-3xl font-bold">{t.name} sürücüleri için ürünler</h2>
              <ProductGrid items={products} />
            </section>
          )}
        </div>
        <aside className="space-y-6">
          {pairs.length > 0 && (
            <section className="rounded-lg border border-line bg-white p-5">
              <h2 className="mb-2 font-display text-xl font-bold">Rakipleriyle karşılaştır</h2>
              <ul className="space-y-1 text-sm">
                {pairs.map((p) => {
                  const o = p.items.find((x) => x.slug !== m.slug)!;
                  return (
                    <li key={p.slug}>
                      <Link href={`/motor/karsilastir/${p.slug}`} className="font-semibold hover:text-red">
                        {m.model} vs {o.brand} {o.model}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
          {m.tech && (
            <Link href={`/motor/karsilastir?m=${m.slug}`} className="block rounded-lg border border-line bg-white p-5 hover:border-ink">
              <span className="block font-display text-xl font-bold">{name} modelini karşılaştır</span>
              <span className="mt-1 block text-sm text-mute">Güç, tork, ağırlık ve sele yüksekliğini başka motorlarla yan yana gör.</span>
            </Link>
          )}
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
