import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard, ProductVisual } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { VideoList } from "@/components/VideoList";
import { Reviews } from "@/components/Reviews";
import { CompareButton, FavoriteButton } from "@/components/ProductActions";
import { RelatedLinks } from "@/components/Related";
import { Container, Notice } from "@/components/ui";
import { getCategory } from "@/data/categories";
import type { Product } from "@/data/schema";
import { compatForHelmet, compatForIntercom, compatSlug, pairsFor } from "@/lib/catalog";
import {
  brandHasPage,
  brandName,
  displayName,
  formatDate,
  formatTL,
  getBrand,
  getMedia,
  getGuides,
  getProductById,
  getProducts,
  priceLabel,
  productId,
  productPath,
} from "@/lib/data";
import { keyChips, productTypeLabel, specRows } from "@/lib/labels";
import { clip, faqLd, meta } from "@/lib/seo";
import { abs } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => getProducts().map((p) => ({ kategori: p.category, alt: p.brand, urun: p.slug }));

function find(kategori: string, marka: string, urun: string) {
  return getProducts().find((p) => p.category === kategori && p.brand === marka && p.slug === urun);
}

export async function generateMetadata({ params }: PageProps<"/[kategori]/[alt]/[urun]">) {
  const { kategori, alt: marka, urun } = await params;
  const p = find(kategori, marka, urun)!;
  const price = priceLabel(p);
  return meta({
    title: `${displayName(p)} İnceleme, Teknik Özellikler${price ? " ve Fiyat" : ""}`,
    description: clip(p.summary),
    path: productPath(p),
  });
}

const USAGE_LABEL: Record<string, string> = {
  sehir: "Şehir içi",
  uzunYol: "Uzun yol",
  otoban: "Otoban",
  sport: "Sportif kullanım",
  adventure: "Adventure",
  gozluk: "Gözlük kullananlar",
  interkom: "İnterkom kullanımı",
  tekSurucu: "Tek sürücü",
  ciftSurucu: "Sürücü + yolcu",
  grup: "Grup sürüşü",
  yaz: "Yaz",
  kis: "Kış",
  yagmur: "Yağmur",
  kurye: "Kurye kullanımı",
};

const COMPAT_LABEL = {
  ozel: { t: "Bu kaska özel", c: "bg-ok text-white" },
  entegre: { t: "Tam entegre", c: "bg-ok/15 text-ok" },
  standart: { t: "Standart montaj", c: "bg-paper text-ink-2" },
  adaptor: { t: "Adaptör gerekli", c: "bg-warn/15 text-warn" },
  uyumsuz: { t: "Uyumlu değil", c: "bg-red/10 text-red" },
};

function productLd(p: Product) {
  const offers = p.offers;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: displayName(p),
    brand: { "@type": "Brand", name: brandName(p.brand) },
    category: getCategory(p.category)?.name,
    description: p.summary,
    url: abs(productPath(p)),
    ...(getMedia(p).images.length ? { image: getMedia(p).images.map((i) => i.url) } : {}),
    ...(offers.length
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "TRY",
            lowPrice: Math.min(...offers.map((o) => o.salePrice ?? o.price)),
            highPrice: Math.max(...offers.map((o) => o.salePrice ?? o.price)),
            offerCount: offers.length,
          },
        }
      : {}),
  };
}

export default async function ProductPage({ params }: PageProps<"/[kategori]/[alt]/[urun]">) {
  const { kategori, alt: marka, urun } = await params;
  const p = find(kategori, marka, urun);
  if (!p) notFound();
  const c = getCategory(p.category)!;
  const id = productId(p);
  const name = displayName(p);
  const price = priceLabel(p);
  const brand = getBrand(p.brand);
  const rivals = p.rivals.map(getProductById).filter((x): x is Product => !!x);
  const pairs = pairsFor(p);
  const successor = p.successor ? getProductById(p.successor) : undefined;
  const compat = p.category === "kask" ? compatForHelmet(id) : p.category === "interkom" ? compatForIntercom(id) : [];
  const rows = specRows(p).filter((r) => r.value !== "—" || r.unverified);
  const guides = getGuides()
    .filter((g) => g.relatedCategories.some((r) => r === p.category || p.subcategories.some((s) => r === `${p.category}/${s}`)))
    .map((g) => g.slug);
  const sub = c.groups.flatMap((g) => g.items).find((i) => p.subcategories.includes(i.slug));
  const media = getMedia(p);

  const crumbs = [
    { name: c.name, href: `/${c.slug}` },
    ...(sub ? [{ name: sub.name, href: `/${c.slug}/${sub.slug}` }] : []),
    { name, href: productPath(p) },
  ];
  const sections = [
    ["genel", "Genel bakış"],
    ["teknik", "Teknik özellikler"],
    ["arti-eksi", "Artılar / Eksiler"],
    ["kimler-icin", "Kimler için?"],
    ...(compat.length ? [["uyumluluk", p.category === "kask" ? "Uyumlu interkomlar" : "Uyumlu kasklar"]] : []),
    ...(p.sizeChart.length ? [["beden", "Beden tablosu"]] : []),
    ["fiyat", "Fiyatlar"],
    ...(media.videos.length ? [["videolar", "Videolar"]] : []),
    ["yorumlar", "Yorumlar"],
    ...(p.faq.length ? [["sss", "Sık sorulanlar"]] : []),
    ["kaynaklar", "Kaynaklar"],
  ];

  return (
    <>
      <JsonLd data={[productLd(p), faqLd(p.faq)]} />
      <Container className="pt-6">
        <Breadcrumbs items={crumbs} />
      </Container>

      <Container className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <ProductGallery images={media.images} fallback={<ProductVisual p={p} className="aspect-square rounded-xl" />} />
        <div>
          {p.status === "discontinued" && (
            <div className="mb-4">
              <Notice tone="warn">
                Bu modelin üretimi sona erdi.{" "}
                {successor && (
                  <>
                    Yerine çıkan model:{" "}
                    <Link href={productPath(successor)} className="font-semibold underline">
                      {displayName(successor)}
                    </Link>
                  </>
                )}
              </Notice>
            </div>
          )}
          <p lang="en" className="text-sm font-semibold tracking-wide text-mute uppercase">
            {brandHasPage(p.brand) ? (
              <Link href={`/marka/${p.brand}`} className="hover:text-red">
                {brandName(p.brand)}
              </Link>
            ) : (
              brandName(p.brand)
            )}
          </p>
          <h1 className="mt-1 font-display text-4xl leading-none font-bold sm:text-5xl">{name}</h1>
          <p className="mt-2 text-lg text-mute">{productTypeLabel(p)}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {keyChips(p).map((k) => (
              <li key={k} className="rounded border border-line bg-white px-2.5 py-1 text-sm font-medium">
                {k}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[17px] leading-relaxed">{p.summary}</p>

          <div className="mt-6 rounded-lg border border-line bg-white p-4">
            {price ? (
              <>
                <p className="font-display text-3xl font-bold">{price}</p>
                <p className="text-sm text-mute">
                  Türkiye satış fiyatı · {p.offers.length} satıcı · son kontrol {formatDate(p.priceRange!.checkedAt)}. Fiyatlar canlı değildir, satıcıda değişmiş olabilir.
                </p>
              </>
            ) : (
              <p className="text-mute">Türkiye satış fiyatı henüz doğrulanmadı. Güncel fiyat için üreticinin veya yetkili satıcının sayfasına bak.</p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              {p.offers.length > 0 && (
                <a href="#fiyat" className="flex h-10 items-center rounded-md bg-red px-4 text-sm font-semibold text-white hover:bg-red-dark">
                  Fiyatları gör
                </a>
              )}
              <a
                href={p.manufacturerUrl}
                target="_blank"
                rel="noopener"
                className="flex h-10 items-center gap-1.5 rounded-md border border-ink px-4 text-sm font-semibold hover:bg-ink hover:text-white"
              >
                Üreticinin sayfası <Icon name="external" className="size-4" />
              </a>
              <FavoriteButton id={id} name={name} />
              <CompareButton id={id} name={name} category={p.category} />
            </div>
          </div>
        </div>
      </Container>

      <nav aria-label="Sayfa bölümleri" className="sticky top-16 z-20 mt-10 border-y border-line bg-white/95 backdrop-blur lg:top-[132px]">
        <Container className="flex gap-1 overflow-x-auto [scrollbar-width:none]">
          {sections.map(([h, l]) => (
            <a key={h} href={`#${h}`} className="shrink-0 px-3 py-3 text-sm font-semibold whitespace-nowrap text-mute hover:text-red">
              {l}
            </a>
          ))}
        </Container>
      </nav>

      <Container className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-12">
          <section id="genel">
            <h2 className="mb-4 font-display text-3xl font-bold">Genel bakış</h2>
            <div className="prose-mk max-w-3xl">
              {p.description.map((d, i) => (
                <p key={i}>{d}</p>
              ))}
            </div>
            <div className="mt-6 rounded-lg border-l-4 border-red bg-white p-5">
              <p className="font-display text-2xl font-bold">Motorcu Kıyafeti yorumu</p>
              <p className="mt-2 leading-relaxed">{p.verdict}</p>
            </div>
            {p.buyerInsights && (
              <div className="mt-6 rounded-lg border border-line bg-white p-5">
                <p className="font-display text-2xl font-bold">Alıcı yorumlarından</p>
                {p.buyerInsights.fitNote && <p className="mt-1 text-mute">{p.buyerInsights.fitNote}</p>}
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <ul className="space-y-1 text-sm">
                    {p.buyerInsights.positives.map((x) => (
                      <li key={x} className="flex gap-2">
                        <Icon name="check" className="size-4 shrink-0 text-ok" /> {x}
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-1 text-sm">
                    {p.buyerInsights.negatives.map((x) => (
                      <li key={x} className="flex gap-2">
                        <Icon name="x" className="size-4 shrink-0 text-red" /> {x}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="mt-3 text-xs text-mute">Kullanıcı yorumlarındaki eğilimlerin kendi cümlelerimizle özetidir; yorum metni aktarılmamıştır.</p>
              </div>
            )}
          </section>

          <section id="teknik">
            <h2 className="mb-4 font-display text-3xl font-bold">Teknik özellikler</h2>
            <div className="overflow-hidden rounded-lg border border-line bg-white">
              <table className="w-full text-[15px]">
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.key} className="border-b border-line last:border-0">
                      <th scope="row" className="w-2/5 bg-paper/60 px-4 py-2.5 text-left font-semibold">
                        {r.label}
                      </th>
                      <td className="px-4 py-2.5">
                        {r.unverified ? <span className="text-sm text-warn">Doğrulanıyor</span> : r.value}
                      </td>
                    </tr>
                  ))}
                  {p.sizes.length > 0 && (
                    <tr className="border-b border-line">
                      <th scope="row" className="bg-paper/60 px-4 py-2.5 text-left font-semibold">
                        Bedenler
                      </th>
                      <td className="px-4 py-2.5">{p.sizes.join(", ")}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {p.unverified.length > 0 && (
              <p className="mt-2 text-sm text-mute">“Doğrulanıyor” olarak işaretli alanlar için güvenilir bir kaynak bulana kadar değer göstermiyoruz.</p>
            )}
          </section>

          <section id="arti-eksi" className="grid gap-4 sm:grid-cols-2">
            <h2 className="sr-only">Artılar ve eksiler</h2>
            <div className="rounded-lg border border-line bg-white p-5">
              <p className="mb-3 font-display text-2xl font-bold text-ok">Artıları</p>
              <ul className="space-y-2">
                {p.pros.map((x) => (
                  <li key={x} className="flex gap-2">
                    <Icon name="check" className="mt-0.5 size-5 shrink-0 text-ok" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-line bg-white p-5">
              <p className="mb-3 font-display text-2xl font-bold text-red">Eksileri</p>
              <ul className="space-y-2">
                {p.cons.map((x) => (
                  <li key={x} className="flex gap-2">
                    <Icon name="x" className="mt-0.5 size-5 shrink-0 text-red" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="kimler-icin">
            <h2 className="mb-4 font-display text-3xl font-bold">Kimler için?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-2 font-semibold">Uygun olduğu sürücüler</p>
                <ul className="prose-mk">
                  {p.forWho.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 font-semibold">Uygun olmayabileceği sürücüler</p>
                <ul className="prose-mk">
                  {p.notFor.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>
            {Object.keys(p.usage).length > 0 && (
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                {Object.entries(p.usage).map(([k, v]) => (
                  <div key={k} className="rounded-lg border border-line bg-white p-4">
                    <dt className="font-display text-lg font-bold">{USAGE_LABEL[k] ?? k}</dt>
                    <dd className="mt-1 text-sm text-ink-2">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
          </section>

          {compat.length > 0 && (
            <section id="uyumluluk">
              <h2 className="mb-2 font-display text-3xl font-bold">{p.category === "kask" ? (compat.some((x) => x.verified && x.level !== "uyumsuz") ? "Bu kaskla uyumlu interkomlar" : "Takılabilecek interkomlar") : "Bu interkomun kask uyumluluğu"}</h2>
              <p className="mb-4 text-mute">
                Yeşil “doğrulandı” etiketi olan bilgiler üretici kaynağına dayanır; diğerleri genel beklentidir ve satın almadan önce teyit edilmelidir.
              </p>
              <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-white">
                {compat
                  .slice()
                  .sort((a, b) => Object.keys(COMPAT_LABEL).indexOf(a.level) - Object.keys(COMPAT_LABEL).indexOf(b.level))
                  .map((x) => {
                    const other = getProductById(p.category === "kask" ? x.intercom : x.helmet)!;
                    return (
                      <li key={x.helmet + x.intercom} className="flex flex-wrap items-start gap-3 p-4">
                        <div className="min-w-48 flex-1">
                          <Link href={productPath(other)} className="font-semibold hover:text-red">
                            {displayName(other)}
                          </Link>
                          <p className="text-sm text-mute">{x.note}</p>
                        </div>
                        <span className={`rounded px-2 py-1 text-xs font-bold ${COMPAT_LABEL[x.level].c}`}>{COMPAT_LABEL[x.level].t}</span>
                        <span className={`rounded px-2 py-1 text-xs font-semibold ${x.verified ? "bg-ok/10 text-ok" : "bg-paper text-mute"}`}>
                          {x.verified ? "Doğrulandı" : "Teyit edilmedi"}
                        </span>
                      </li>
                    );
                  })}
              </ul>
              {p.category === "kask" && (
                <Link href={`/interkom-uyumlulugu/${compatSlug(p)}`} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-red hover:underline">
                  {name} interkom uyumluluk sayfası <Icon name="arrow" className="size-4" />
                </Link>
              )}
            </section>
          )}

          {p.sizeChart.length > 0 && (
            <section id="beden">
              <h2 className="mb-2 font-display text-3xl font-bold">Beden tablosu</h2>
              <p className="mb-4 text-mute">Üreticinin resmi tablosuna göre. Ölçünü iki bedenin sınırına denk geliyorsa mağazada iki bedeni de dene.</p>
              <div className="overflow-x-auto rounded-lg border border-line bg-white">
                <table className="w-full text-center text-[15px]">
                  <thead className="bg-night text-white">
                    <tr>
                      <th scope="col" className="px-3 py-2 text-left">
                        Beden
                      </th>
                      {p.sizeChart.map((s) => (
                        <th key={s.size} scope="col" className="px-3 py-2">
                          {s.size}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row" className="px-3 py-2 text-left font-semibold whitespace-nowrap">
                        {p.sizeChartMeasure ?? "Ölçü (cm)"}
                      </th>
                      {p.sizeChart.map((s) => (
                        <td key={s.size} className="px-3 py-2 whitespace-nowrap">
                          {s.min}–{s.max}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              {p.category === "kask" && getGuides().some((g) => g.slug === "kask-bedeni-nasil-olculur") && (
                <Link href="/rehber/kask-bedeni-nasil-olculur" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-red hover:underline">
                  Kafa ölçüsü nasıl alınır? <Icon name="arrow" className="size-4" />
                </Link>
              )}
            </section>
          )}

          <section id="fiyat">
            <h2 className="mb-2 font-display text-3xl font-bold">Türkiye fiyatları</h2>
            {p.offers.length ? (
              <>
                <p className="mb-4 text-mute">Bu fiyatlar belirtilen tarihte satıcı sayfasında görülen değerlerdir; canlı fiyat değildir.</p>
                <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-white">
                  {p.offers
                    .slice()
                    .sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price))
                    .map((o) => (
                      <li key={o.url} className="flex flex-wrap items-center gap-3 p-4">
                        <div className="flex-1">
                          <p className="font-semibold">{o.seller}</p>
                          <p className="text-sm text-mute">
                            Kontrol: {formatDate(o.checkedAt)} · {o.inStock === true ? "Stokta" : o.inStock === false ? "Stokta yok" : "Stok bilgisi yok"}
                          </p>
                        </div>
                        <p className="font-display text-2xl font-bold">
                          {o.salePrice ? (
                            <>
                              <s className="mr-2 text-base font-normal text-mute">{formatTL(o.price)}</s>
                              {formatTL(o.salePrice)}
                            </>
                          ) : (
                            formatTL(o.price)
                          )}
                        </p>
                        <a href={o.url} target="_blank" rel="noopener nofollow" className="flex h-10 items-center gap-1.5 rounded-md bg-ink px-4 text-sm font-semibold text-white hover:bg-red">
                          Satıcıya git <Icon name="external" className="size-4" />
                        </a>
                      </li>
                    ))}
                </ul>
              </>
            ) : (
              <Notice>
                Bu ürün için henüz doğrulanmış bir Türkiye satıcı fiyatı yok. Tahmini fiyat göstermiyoruz.{" "}
                <a href={p.manufacturerUrl} target="_blank" rel="noopener" className="font-semibold underline">
                  Üreticinin sayfasından
                </a>{" "}
                yetkili satıcıları bulabilirsin.
              </Notice>
            )}
          </section>

          {media.videos.length > 0 && (
            <section id="videolar">
              <h2 className="mb-2 font-display text-3xl font-bold">Video incelemeler</h2>
              <p className="mb-4 text-sm text-mute">Videolar YouTube&apos;dan gelir ve yalnızca oynat düğmesine bastığında yüklenir.</p>
              <VideoList videos={media.videos} />
            </section>
          )}

          <Reviews p={p} />

          {p.faq.length > 0 && (
            <section id="sss">
              <h2 className="mb-4 font-display text-3xl font-bold">Sık sorulan sorular</h2>
              <div className="space-y-2">
                {p.faq.map((f) => (
                  <details key={f.q} className="group rounded-lg border border-line bg-white open:border-ink">
                    <summary className="cursor-pointer list-none p-4 font-semibold marker:hidden">
                      <span className="flex items-center justify-between gap-3">
                        {f.q}
                        <Icon name="chevron" className="size-4 shrink-0 transition group-open:rotate-90" />
                      </span>
                    </summary>
                    <p className="px-4 pb-4 text-ink-2">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <section id="kaynaklar">
            <h2 className="mb-2 font-display text-3xl font-bold">Kaynaklar</h2>
            <p className="mb-3 text-sm text-mute">
              Son kontrol: {formatDate(p.lastCheckedAt)} · Veri güveni: {p.dataConfidence === "high" ? "yüksek" : p.dataConfidence === "medium" ? "orta" : "düşük"} ·{" "}
              <Link href="/veri-politikasi" className="underline">
                Verileri nasıl doğruluyoruz?
              </Link>
            </p>
            <ul className="space-y-1.5 text-sm">
              {p.sources.map((s) => (
                <li key={s.url} className="flex gap-2">
                  <span className="shrink-0 rounded bg-paper px-1.5 py-0.5 text-xs font-semibold text-mute">
                    {{ manufacturer: "Üretici", homologation: "Homologasyon", distributor: "Distribütör", retailer: "Satıcı", review: "İnceleme" }[s.type]}
                  </span>
                  <a href={s.url} target="_blank" rel="noopener nofollow" className="break-all text-ink-2 underline hover:text-red">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-6">
          {pairs.length > 0 && (
            <section className="rounded-lg border border-line bg-white p-5">
              <h2 className="mb-3 font-display text-2xl font-bold">Karşılaştırmalar</h2>
              <ul className="space-y-2">
                {pairs.map((x) => {
                  const other = x.items.find((i) => productId(i) !== id)!;
                  return (
                    <li key={x.slug}>
                      <Link href={`/karsilastir/${x.slug}`} className="font-semibold hover:text-red">
                        {p.name} <span className="text-red">vs</span> {displayName(other)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
          {brand && (
            <section className="rounded-lg border border-line bg-white p-5">
              <h2 className="font-display text-2xl font-bold">{brand.name}</h2>
              <p className="mt-1 text-sm text-mute">{[brand.country, brand.founded ? `${brand.founded}'den beri` : null].filter(Boolean).join(" · ")}</p>
              <Link href={`/marka/${brand.slug}`} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-red hover:underline">
                Marka sayfası <Icon name="arrow" className="size-4" />
              </Link>
            </section>
          )}
          <RelatedLinks guides={guides.slice(0, 5)} categories={[p.category, ...p.subcategories.map((s) => `${p.category}/${s}`)]} />
        </aside>
      </Container>

      {rivals.length > 0 && (
        <Container className="mt-14">
          <h2 className="mb-4 font-display text-3xl font-bold">Rakipleri</h2>
          <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4">
            {rivals.slice(0, 4).map((r) => (
              <ProductCard key={productId(r)} p={r} />
            ))}
          </div>
        </Container>
      )}
    </>
  );
}
