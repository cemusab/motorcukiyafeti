/**
 * Türetilmiş katalog yapıları: karşılaştırma çiftleri, "ne almalıyım" listeleri, cinsiyet sayfaları
 * ve merkezi route manifest'i. Sitemap, arama indeksi ve testler hep bu dosyadaki listeleri kullanır.
 */
import "server-only";
import { pairIndexable } from "./compare";
import { memo } from "./memo";
import { budgetGroups } from "./budget";
import { LEGAL_SLUGS, legalReady } from "./legal";
import { CATEGORIES, allSubcategories } from "@/data/categories";
import { MOTO_TYPES } from "@/data/riding";
import type { Care, Compat, Helmet, Product, Tire } from "@/data/schema";
import {
  displayName,
  getBrands,
  getCompat,
  getGuides,
  getHelmets,
  getMotorcycles,
  getProductById,
  getProducts,
  isApparel,
  isLocal,
  productId,
  productPath,
  productsIn,
} from "./data";

/* ---------- Karşılaştırma ---------- */

export const pairSlug = (a: Product, b: Product) => {
  const [x, y] = [a, b].sort((m, n) => productId(m).localeCompare(productId(n)));
  return `${x.brand}-${x.slug}-vs-${y.brand}-${y.slug}`;
};

/** Yalnızca editoryal olarak rakip işaretlenmiş ürünler için statik karşılaştırma sayfası üretilir (thin content önlemi). */
export const comparePairs = memo(() => {
  const seen = new Map<string, [Product, Product]>();
  for (const p of getProducts()) {
    for (const rid of p.rivals) {
      const r = getProductById(rid);
      if (!r || r.category !== p.category) continue;
      const s = pairSlug(p, r);
      if (!seen.has(s)) seen.set(s, [p, r].sort((m, n) => productId(m).localeCompare(productId(n))) as [Product, Product]);
    }
  }
  return [...seen.entries()].map(([slug, items]) => ({ slug, items }));
});

export function pairsFor(p: Product) {
  return comparePairs().filter((x) => x.items.some((i) => productId(i) === productId(p)));
}

/* ---------- Ne almalıyım listeleri ---------- */

type ListDef = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  criteria: string;
  pick: () => Product[];
};

const helmetsBy = (f: (h: Helmet) => boolean) => getHelmets().filter(f);

export const LIST_DEFS: ListDef[] = [
  {
    slug: "en-iyi-cene-acilir-kasklar",
    title: "En İyi Çene Açılır Kasklar",
    description: "Uzun yol ve şehir içi için veri tabanımızdaki çene açılır kaskların teknik karşılaştırması ve kime uygun oldukları.",
    intro: "Çene açılır kasklar, durduğunda kaskı çıkarmadan konuşup su içebilmeni sağlar. Aşağıdaki modeller kaynaklı teknik verilerine göre sıralandı.",
    criteria: "Listeye yalnızca üreticisi tarafından çene açılır (modüler) olarak tanımlanan ve ECE 22.06 onayı doğrulanan kasklar alındı.",
    pick: () => helmetsBy((h) => h.specs.helmetType === "cene-acilir"),
  },
  {
    slug: "en-hafif-kasklar",
    title: "En Hafif Motosiklet Kaskları",
    description: "Üretici verisine göre ağırlığı doğrulanmış kaskların hafiften ağıra sıralaması ve ağırlığın hangi bedene ait olduğu.",
    intro: "Kask ağırlığı özellikle uzun yolda boyun yorgunluğunu belirler. Ağırlık bedene göre değişir; üretici belirttiyse ölçümün hangi bedene ait olduğunu da yazdık.",
    criteria: "Yalnızca ağırlığı kaynakla doğrulanmış kasklar listelenir; sıralama ağırlığa göredir, farklı beden ölçümleri birebir kıyaslanamaz.",
    pick: () =>
      helmetsBy((h) => h.specs.weightGrams != null && !h.unverified.includes("specs.weightGrams")).sort(
        (a, b) => (a.specs.weightGrams ?? 0) - (b.specs.weightGrams ?? 0),
      ),
  },
  {
    slug: "uzun-yol-icin-en-iyi-kask",
    title: "Uzun Yol İçin Kask Önerileri",
    description: "Güneş vizörü, Pinlock ve interkom hazırlığı olan, uzun yolda konfor sunan kaskların listesi ve seçim kriterleri.",
    intro: "Uzun yolda konfor, sessizlik ve pratiklik güvenlik kadar önemlidir. Bu listede güneş vizörü ve interkom hazırlığı doğrulanmış kasklar yer alıyor.",
    criteria: "Güneş vizörü ve interkom hazırlığı olan kasklar. Sessizlik, bağımsız test verisi olmadan sıralamaya katılmadı.",
    pick: () => helmetsBy((h) => h.specs.sunVisor === true && h.specs.intercomReady === true),
  },
  {
    slug: "yeni-baslayanlar-icin-kask",
    title: "Yeni Başlayanlar İçin Kask",
    description: "İlk kaskını alacaklar için ECE 22.06 onaylı, kapalı veya çene açılır ve fiyat/performans odaklı kask seçenekleri.",
    intro: "İlk kaskta en önemli üç şey doğru beden, ECE 22.06 onayı ve çene korumasıdır. Pahalı kask her zaman daha iyi oturan kask değildir.",
    criteria: "ECE 22.06 doğrulanmış, kapalı veya çene açılır tip ve yeni başlayanlar için uygun değil diye işaretlenmemiş kasklar; Türkiye fiyatına göre ucuzdan pahalıya sıralandı.",
    pick: () =>
      helmetsBy(
        (h) =>
          h.specs.ece2206 === true &&
          ["kapali", "cene-acilir"].includes(h.specs.helmetType) &&
          !/yeni başla|acemi|ilk kask/.test(h.notFor.join(" ").toLocaleLowerCase("tr")),
      ).sort(
        (a, b) => (a.priceRange?.min ?? 9e9) - (b.priceRange?.min ?? 9e9),
      ),
  },
  {
    slug: "karbon-kasklar",
    title: "Karbon Kask Önerileri",
    description: "Karbon fiber kabuklu kaskların teknik özellikleri, ağırlıkları ve hangi sürücüye uygun oldukları.",
    intro: "Karbon kabuk aynı dayanımı daha az ağırlıkla sağlamayı hedefler; fiyatı ise belirgin şekilde yüksektir.",
    criteria: "Yalnızca üreticisinin karbon kabuk olarak tanımladığı kasklar.",
    pick: () => helmetsBy((h) => h.specs.materialClass === "karbon"),
  },
  {
    slug: "mesh-interkomlar",
    title: "Grup Sürüşü İçin Mesh İnterkomlar",
    description: "Grup sürüşlerinde kopmayan bağlantı için Mesh destekli interkomların kapasite, menzil ve batarya karşılaştırması.",
    intro: "Grupla sürüyorsan Mesh desteği büyük fark yaratır: araya giren sürücü gruptan düşse bile bağlantı devam eder.",
    criteria: "Üreticisi tarafından Mesh desteği doğrulanmış interkomlar.",
    pick: () => getProducts().filter((p) => p.category === "interkom" && p.specs.mesh === true),
  },
  {
    slug: "yazlik-motosiklet-montlari",
    title: "Yazın Hangi Motosiklet Montu Giyilir?",
    description: "Sıcak havada serin tutan, korumadan ödün vermeyen yazlık ve file motosiklet montları; sınıf ve koruyucu bilgileriyle.",
    intro: "Yazın en büyük hata korumasız giyinmektir. File montlar havayı geçirirken koruyucularını korur.",
    criteria: "Üreticinin yaz kullanımı için tanımladığı montlar; EN 17092 sınıfları kaynaklı gösterilir.",
    pick: () => productsIn("mont").filter((p) => isApparel(p) && p.specs.season === "yaz"),
  },
  {
    slug: "adventure-icin-mont",
    title: "Adventure İçin Hangi Mont?",
    description: "Asfalt, toprak ve değişken hava için katmanlı, havalandırmalı touring ve adventure motosiklet montları.",
    intro: "Adventure montu aynı gün sıcak, yağmur ve tozla başa çıkmalıdır. Çıkarılabilir katmanlar ve bol havalandırma temel beklentidir.",
    criteria: "Touring / adventure alt kategorisindeki montlar.",
    pick: () => productsIn("mont", "touring-mont").sort((a, b) => Number(isApparel(a) && a.specs.gender === "kadin") - Number(isApparel(b) && b.specs.gender === "kadin")),
  },
];

export function listItems(slug: string) {
  return LIST_DEFS.find((l) => l.slug === slug)?.pick() ?? [];
}
/** En az 2 ürünü olmayan liste yayınlanmaz. */
export const activeLists = memo(() => LIST_DEFS.filter((l) => l.pick().length >= 2));

/* ---------- Cinsiyet sayfaları ---------- */

export const GENDERS = [
  { slug: "kadin", name: "Kadın", long: "Kadın Motosiklet Kıyafetleri ve Ekipmanları" },
  { slug: "erkek", name: "Erkek", long: "Erkek Motosiklet Kıyafetleri ve Ekipmanları" },
] as const;
export type GenderSlug = (typeof GENDERS)[number]["slug"];

/** Kasklar ve interkomlar cinsiyetsizdir; giyim ürünlerinde unisex her iki sayfada da görünür. */
export function productsForGender(g: GenderSlug, category?: string) {
  return getProducts().filter((p) => {
    if (category && p.category !== category) return false;
    if (!isApparel(p)) return true;
    return p.specs.gender === "unisex" || p.specs.gender === g;
  });
}
export function genderCategories(g: GenderSlug) {
  // Kask ve interkom cinsiyetsizdir; ayrı cinsiyet sayfası yinelenen içerik olur.
  return CATEGORIES.filter((c) => !["kask", "interkom", "lastik", "yag-bakim"].includes(c.slug) && productsForGender(g, c.slug).length > 0);
}

/* ---------- İnterkom uyumluluk ---------- */

/** Kaska özel (belirli kask modelleri için) interkomlar evrensel öneri listesine girmez. */
const isUniversalIntercom = (p: Product) => p.category === "interkom" && !p.subcategories.includes("kaska-ozel-interkom");

/**
 * Bir kaskın uyumluluk listesi: kayıtlı (kaynaklı) eşleşmeler + kayıt olmayan evrensel interkomlar için
 * otomatik "standart montaj, teyit edilmedi" satırları. Otomatik satırlar hiçbir zaman "doğrulandı" sayılmaz.
 */
export function compatForHelmet(id: string): Compat[] {
  const stored = getCompat().filter((c) => c.helmet === id);
  const helmet = getHelmets().find((h) => productId(h) === id);
  if (!helmet || helmet.specs.intercomReady === false) return stored;
  const have = new Set(stored.map((c) => c.intercom));
  const own = helmet.specs.intercomNotes ? ` Üreticinin notu: ${helmet.specs.intercomNotes}` : "";
  const generated = getProducts()
    .filter((p) => isUniversalIntercom(p) && !have.has(productId(p)))
    .map(
      (p): Compat => ({
        helmet: id,
        intercom: productId(p),
        level: "standart",
        verified: false,
        source: null,
        note: `Evrensel kelepçe veya yapışkan aparatla takılan bir ünite olduğu için genelde kullanılabilir; hoparlör cebi ve montaj yerini satın almadan önce satıcıyla teyit et.${own}`,
      }),
    );
  return [...stored, ...generated];
}
export const hasVerifiedCompat = (id: string) => getCompat().some((c) => c.helmet === id && c.verified);
export function compatForIntercom(id: string) {
  return getCompat().filter((c) => c.intercom === id);
}
export const compatSlug = (p: Product) => `${p.brand}-${p.slug}`;
export const helmetsWithCompat = memo(() => getHelmets().filter((h) => compatForHelmet(productId(h)).length > 0));

/* ---------- Route manifest ---------- */

export type RouteEntry = { path: string; group: "statik" | "kategori" | "urun" | "marka" | "rehber" | "karsilastirma"; index: boolean };

export const routeManifest = memo((): RouteEntry[] => {
  const r: RouteEntry[] = [];
  const add = (path: string, group: RouteEntry["group"], index = true) => r.push({ path, group, index });
  ["/", "/markalar", "/rehber", "/karsilastir", "/interkom-uyumlulugu", "/yeni-baslayanlar", "/motosikletime-gore", "/ne-almaliyim", "/hakkimizda", "/veri-politikasi", "/iletisim"].forEach((p) =>
    add(p, "statik"),
  );
  if (legalReady()) LEGAL_SLUGS.forEach((s) => add(`/${s}`, "statik"));
  add("/favoriler", "statik", false);
  add("/arama", "statik", false);
  for (const g of GENDERS) {
    add(`/${g.slug}`, "kategori");
    for (const c of genderCategories(g.slug)) add(`/${g.slug}/${c.slug}`, "kategori");
  }
  for (const c of CATEGORIES) add(`/${c.slug}`, "kategori", productsIn(c.slug).length > 0);
  for (const { category, sub } of allSubcategories()) add(`/${category.slug}/${sub.slug}`, "kategori", productsIn(category.slug, sub.slug).length > 0);
  for (const m of MOTO_TYPES) add(`/motosikletime-gore/${m.slug}`, "kategori");
  if (getMotorcycles().length) add("/motor", "statik");
  if (getMotorcycles().some((m) => m.tech)) add("/motor/karsilastir", "statik");
  if (getMotorcycles().filter((m) => m.tech?.seatHeightMm != null).length >= 10) add("/motor/sele-yuksekligi", "statik");
  for (const p of motorPairs()) add(`/motor/karsilastir/${p.slug}`, "karsilastirma", p.indexable);
  for (const b of getMotorcycles()) add(`/motor/${b.slug}`, "kategori", b.notes.length >= 2);
  for (const p of getProducts()) add(productPath(p), "urun");
  for (const b of getBrands()) add(`/marka/${b.slug}`, "marka");
  for (const g of getGuides()) add(`/rehber/${g.slug}`, "rehber");
  for (const l of activeLists()) add(`/ne-almaliyim/${l.slug}`, "rehber");
  for (const c of comparePairs()) add(`/karsilastir/${c.slug}`, "karsilastirma", pairIndexable(c.items));
  for (const g of budgetGroups()) add(`/karsilastir/butce/${g.slug}`, "karsilastirma");
  for (const h of helmetsWithCompat()) add(`/interkom-uyumlulugu/${compatSlug(h)}`, "karsilastirma", hasVerifiedCompat(productId(h)));
  return r;
});



/* ---------- Sihirbaz için hafif ürün listesi ---------- */
export function wizardProducts() {
  return getProducts().map((p) => ({
    id: productId(p),
    name: displayName(p),
    href: productPath(p),
    category: p.category,
    subs: p.subcategories,
    price: p.priceRange?.min ?? null,
    season: isApparel(p) ? p.specs.season : null,
    gender: isApparel(p) ? p.specs.gender : null,
    local: isLocal(p),
    notFor: p.notFor.join(" ").toLocaleLowerCase("tr"),
  }));
}

/** Ana sayfa "editörün seçimleri": her kategoriden en eksiksiz veriye sahip ürünler. */
export function editorPicks(n = 8) {
  const score = (p: Product) => (p.dataConfidence === "high" ? 3 : p.dataConfidence === "medium" ? 2 : 1) * 10 - p.unverified.length + (p.priceRange ? 3 : 0);
  const byCat = new Map<string, Product[]>();
  for (const p of [...getProducts()].sort((a, b) => score(b) - score(a))) byCat.set(p.category, [...(byCat.get(p.category) ?? []), p]);
  const out: Product[] = [];
  for (let i = 0; out.length < n && i < 10; i++) for (const list of byCat.values()) if (list[i] && out.length < n) out.push(list[i]);
  return out;
}
export { displayName };

/** Sihirbazın ilk adımı için motor listesi: çok satanlar önce. */
export function wizardBikes() {
  return getMotorcycles()
    .slice()
    .sort((a, b) => (a.salesRank ?? 999) - (b.salesRank ?? 999) || a.brand.localeCompare(b.brand, "tr"))
    .map((m) => ({
      slug: m.slug,
      label: `${m.brand} ${m.model}${m.generationFrom ? ` (${m.generationFrom}+)` : ""}`,
      type: m.type,
      cc: m.cc,
      licence: m.licence,
      notes: m.notes,
      courierCommon: m.courierCommon,
    }));
}

/* ---------- Fiyat alternatifleri (ürün sayfası) ---------- */

/**
 * Aynı kategori ve aynı ana alt kategorideki, Türkiye fiyatı doğrulanmış ürünlerden fiyatça en yakın
 * "daha uygun" ve "bir üst segment" alternatifi. En az %15 fiyat farkı aranır; veri güveni düşük ürünler önerilmez.
 */
export function priceAlternatives(p: Product) {
  const min = p.priceRange?.min;
  if (min == null) return { cheaper: undefined, upper: undefined };
  const sub = p.subcategories[0];
  const pool = getProducts().filter(
    (x) => x.category === p.category && productId(x) !== productId(p) && x.priceRange && x.dataConfidence !== "low" && x.status !== "discontinued" && (!sub || x.subcategories.includes(sub)),
  );
  const cheaper = pool.filter((x) => x.priceRange!.min <= min * 0.85).sort((a, b) => b.priceRange!.min - a.priceRange!.min)[0];
  const upper = pool.filter((x) => x.priceRange!.min >= min * 1.15).sort((a, b) => a.priceRange!.min - b.priceRange!.min)[0];
  return { cheaper, upper };
}

/* ---------- Motor ↔ lastik / yağ eşleşmesi (yalnız üretici verisiyle) ---------- */

/** Lastik ebadını karşılaştırılabilir biçime getirir: "110/70-14M/C 50P" → "110/70-14", "120/70 ZR 17" → "120/70-17", "3.00-10" → "3.00-10". */
export function normTireSize(size: string) {
  const s = size.replace(/\s+/g, " ").toUpperCase();
  const metric = s.match(/(\d{2,3})\s?\/\s?(\d{2,3})\s?(?:Z?R|B|-)?\s?-?\s?(\d{2})(?!\d)/);
  if (metric) return `${metric[1]}/${metric[2]}-${metric[3]}`;
  const inch = s.match(/(\d\.\d{2})\s?-\s?(\d{2})(?!\d)/);
  return inch ? `${inch[1]}-${inch[2]}` : null;
}

/** Motor tipine uygun lastik kullanım tipleri: ebat tutsa bile örneğin naked motora çivili arazi lastiği önerilmez. */
const TIRE_USAGE_FOR: Record<string, Tire["specs"]["usage"][]> = {
  scooter: ["scooter", "sehir"],
  naked: ["sport", "hypersport", "sport-touring", "touring", "sehir"],
  sport: ["sport", "hypersport", "sport-touring"],
  touring: ["touring", "sport-touring"],
  adventure: ["adventure", "touring", "sport-touring"],
  enduro: ["arazi", "adventure"],
  cruiser: ["custom", "touring", "sehir"],
};

export function tiresForBike(m: { type?: string; tires: { front: string; rear: string } | null }) {
  if (!m.tires) return { front: [] as Product[], rear: [] as Product[] };
  const allowed = m.type ? TIRE_USAGE_FOR[m.type] : undefined;
  const f = normTireSize(m.tires.front);
  const r = normTireSize(m.tires.rear);
  const tires = getProducts().filter((p): p is Tire => p.category === "lastik" && p.status !== "discontinued" && (!allowed || allowed.includes(p.specs.usage)));
  const has = (list: string[], n: string | null) => !!n && list.some((x) => normTireSize(x) === n);
  return { front: tires.filter((t) => has(t.specs.sizesFront, f)), rear: tires.filter((t) => has(t.specs.sizesRear, r)) };
}

/** Üreticinin önerdiği JASO sınıfı ve viskoziteyle birebir uyumlu yağlar. MA isteyen motorda MA ve MA2 uyar; MA2 ve MB birebir. */
export function oilsForBike(m: { oil: { viscosity: string | null; spec: string | null } | null }) {
  const visc = m.oil?.viscosity?.toUpperCase().match(/(\d{1,2}W-?\d{2})/)?.[1].replace(/W(\d)/, "W-$1") ?? null;
  // Kılavuz birden çok sınıfa izin verebilir ("JASO MA veya MB"): JASO'dan sonraki tüm sınıflar okunur.
  const spec = m.oil?.spec?.toUpperCase() ?? "";
  const after = spec.includes("JASO") ? spec.slice(spec.indexOf("JASO")) : "";
  const req = new Set([...after.matchAll(/\b(MA2|MA1|MA|MB)\b/g)].map((x) => x[1]));
  if (!visc || !req.size) return [] as Product[];
  const ok = (j: string | null) => !!j && (req.has(j) || (req.has("MA") && (j === "MA2" || j === "MA1")));
  return getProducts().filter(
    (p): p is Care => p.category === "yag-bakim" && p.specs.productType === "motor-yagi" && p.specs.viscosity?.toUpperCase().replace(/W(\d)/, "W-$1") === visc && ok(p.specs.jaso),
  );
}

/** Ürün sayfası için ters yön: bu lastiği/yağı fabrika verisine göre kullanabilecek motorlar. */
export function bikesForProduct(p: Product) {
  const id = productId(p);
  if (p.category === "lastik") return getMotorcycles().filter((m) => [...tiresForBike(m).front, ...tiresForBike(m).rear].some((t) => productId(t) === id));
  if (p.category === "yag-bakim") return getMotorcycles().filter((m) => oilsForBike(m).some((o) => productId(o) === id));
  return [];
}

/* ---------- Motor çiftleri (hazır motor karşılaştırma sayfaları) ---------- */

type Bike = ReturnType<typeof getMotorcycles>[number];
const techScore = (m: Bike) => (m.tech ? [m.tech.powerKw ?? m.tech.powerHp, m.tech.torqueNm, m.tech.weightKg, m.tech.seatHeightMm].filter((x) => x != null).length : 0);

/** Her motor için aynı tipte, motor hacmi en yakın 2 rakip; ikisinde de teknik veri olan çiftler. */
export const motorPairs = memo(() => {
  const bikes = getMotorcycles().filter((m) => m.tech && m.cc && techScore(m) >= 3);
  const seen = new Map<string, [Bike, Bike]>();
  for (const a of bikes) {
    const near = bikes
      .filter((b) => b.slug !== a.slug && b.type === a.type && Math.abs(b.cc! - a.cc!) / a.cc! <= 0.35)
      .sort((x, y) => Math.abs(x.cc! - a.cc!) - Math.abs(y.cc! - a.cc!))
      .slice(0, 2);
    for (const b of near) {
      const [x, y] = [a, b].sort((m, n) => m.slug.localeCompare(n.slug));
      seen.set(`${x.slug}-vs-${y.slug}`, [x, y]);
    }
  }
  return [...seen.entries()].map(([slug, items]) => ({
    slug,
    items,
    // Dizine yalnız iki modelde de 4 ana veri varsa ve ağırlık aynı tanımla verilmişse eklenir.
    indexable: items.every((m) => techScore(m) === 4) && !!items[0].tech!.weightType && items[0].tech!.weightType === items[1].tech!.weightType,
  }));
});
