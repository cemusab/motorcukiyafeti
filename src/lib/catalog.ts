/**
 * Türetilmiş katalog yapıları: karşılaştırma çiftleri, "ne almalıyım" listeleri, cinsiyet sayfaları
 * ve merkezi route manifest'i. Sitemap, arama indeksi ve testler hep bu dosyadaki listeleri kullanır.
 */
import "server-only";
import { CATEGORIES, allSubcategories } from "@/data/categories";
import { MOTO_TYPES } from "@/data/riding";
import type { Helmet, Product } from "@/data/schema";
import {
  displayName,
  getBrands,
  getCompat,
  getGuides,
  getHelmets,
  getProductById,
  getProducts,
  isApparel,
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
export function comparePairs() {
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
}

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
    intro: "Kask ağırlığı özellikle uzun yolda boyun yorgunluğunu belirler. Ağırlık değerleri bedene göre değiştiği için her modelde ölçümün hangi bedene ait olduğunu da yazdık.",
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
    criteria: "Kriterler: güneş vizörü var, interkom hazırlığı var. Sessizlik bağımsız test verisi olmadan sıralamaya katılmadı.",
    pick: () => helmetsBy((h) => h.specs.sunVisor === true && h.specs.intercomReady === true),
  },
  {
    slug: "yeni-baslayanlar-icin-kask",
    title: "Yeni Başlayanlar İçin Kask",
    description: "İlk kaskını alacaklar için ECE 22.06 onaylı, kapalı veya çene açılır ve fiyat/performans odaklı kask seçenekleri.",
    intro: "İlk kaskta en önemli üç şey doğru beden, ECE 22.06 onayı ve çene korumasıdır. Pahalı kask her zaman daha iyi oturan kask değildir.",
    criteria: "Kriterler: ECE 22.06 doğrulanmış, kapalı veya çene açılır tip; Türkiye fiyatı bulunan modeller fiyata göre sıralandı.",
    pick: () =>
      helmetsBy((h) => h.specs.ece2206 === true && ["kapali", "cene-acilir"].includes(h.specs.helmetType)).sort(
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
    pick: () => productsIn("mont", "touring-mont"),
  },
];

export function listItems(slug: string) {
  return LIST_DEFS.find((l) => l.slug === slug)?.pick() ?? [];
}
/** En az 2 ürünü olmayan liste yayınlanmaz. */
export const activeLists = () => LIST_DEFS.filter((l) => l.pick().length >= 2);

/* ---------- Cinsiyet sayfaları ---------- */

export const GENDERS = [
  { slug: "kadin", name: "Kadın", long: "Kadın Motosiklet Ekipmanları" },
  { slug: "erkek", name: "Erkek", long: "Erkek Motosiklet Ekipmanları" },
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
  return CATEGORIES.filter((c) => productsForGender(g, c.slug).length > 0);
}

/* ---------- İnterkom uyumluluk ---------- */

export function compatForHelmet(id: string) {
  return getCompat().filter((c) => c.helmet === id);
}
export function compatForIntercom(id: string) {
  return getCompat().filter((c) => c.intercom === id);
}
export const compatSlug = (p: Product) => `${p.brand}-${p.slug}`;
export const helmetsWithCompat = () => getHelmets().filter((h) => compatForHelmet(productId(h)).length > 0);

/* ---------- Route manifest ---------- */

export type RouteEntry = { path: string; group: "statik" | "kategori" | "urun" | "marka" | "rehber" | "karsilastirma"; index: boolean };

export function routeManifest(): RouteEntry[] {
  const r: RouteEntry[] = [];
  const add = (path: string, group: RouteEntry["group"], index = true) => r.push({ path, group, index });
  ["/", "/markalar", "/rehber", "/karsilastir", "/interkom-uyumlulugu", "/yeni-baslayanlar", "/motosikletime-gore", "/ne-almaliyim", "/hakkimizda", "/veri-politikasi"].forEach((p) =>
    add(p, "statik"),
  );
  add("/favoriler", "statik", false);
  add("/arama", "statik", false);
  for (const g of GENDERS) {
    add(`/${g.slug}`, "kategori");
    for (const c of genderCategories(g.slug)) add(`/${g.slug}/${c.slug}`, "kategori");
  }
  for (const c of CATEGORIES) add(`/${c.slug}`, "kategori");
  for (const { category, sub } of allSubcategories()) add(`/${category.slug}/${sub.slug}`, "kategori", productsIn(category.slug, sub.slug).length > 0);
  for (const m of MOTO_TYPES) add(`/motosikletime-gore/${m.slug}`, "kategori");
  for (const p of getProducts()) add(productPath(p), "urun");
  for (const b of getBrands()) add(`/marka/${b.slug}`, "marka");
  for (const g of getGuides()) add(`/rehber/${g.slug}`, "rehber");
  for (const l of activeLists()) add(`/ne-almaliyim/${l.slug}`, "rehber");
  for (const c of comparePairs()) add(`/karsilastir/${c.slug}`, "karsilastirma");
  for (const h of helmetsWithCompat()) add(`/interkom-uyumlulugu/${compatSlug(h)}`, "karsilastirma");
  return r;
}



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
