/**
 * Veri erişim katmanı. Şimdilik src/data altındaki doğrulanmış JSON dosyalarını okur.
 * PostgreSQL'e geçildiğinde yalnızca bu dosyanın içi değişir; sayfalar aynı fonksiyonları kullanmaya devam eder.
 */
import "server-only";
import fs from "node:fs";
import path from "node:path";
import { memo } from "./memo";
import { z } from "zod";
import {
  AccessorySchema,
  CareSchema,
  TireSchema,
  ApparelSchema,
  BrandSchema,
  CompatSchema,
  GuideSchema,
  HelmetSchema,
  IntercomSchema,
  type Apparel,
  type Brand,
  type Compat,
  type Guide,
  type Helmet,
  type Intercom,
  type Media,
  type Product,
  MediaSchema,
  MotorcycleSchema,
  ReviewSchema,
} from "@/data/schema";

const DATA = path.join(process.cwd(), "src", "data");

function readArray<T>(rel: string, schema: z.ZodType<T>): T[] {
  const file = path.join(DATA, rel);
  if (!fs.existsSync(file)) return [];
  const raw = JSON.parse(fs.readFileSync(file, "utf8")) as unknown[];
  // Şemaya uymayan kayıt sitede gösterilmez; validate-data betiği bunu hata olarak raporlar.
  return raw.flatMap((r) => {
    const p = schema.safeParse(r);
    return p.success ? [p.data] : [];
  });
}

export const getProducts = memo((): Product[] => {
  // Her kategori birden fazla dosyaya bölünebilir: products/mont.json, products/mont-kadin.json …
  const files = (cat: string) => fs.readdirSync(path.join(DATA, "products")).filter((f) => f === `${cat}.json` || f.startsWith(`${cat}-`));
  const helmets = files("kask").flatMap((f) => readArray(`products/${f}`, HelmetSchema));
  const intercoms = files("interkom").flatMap((f) => readArray(`products/${f}`, IntercomSchema));
  const apparel = ["mont", "eldiven", "bot", "pantolon", "koruma", "yagmurluk", "termal"].flatMap((c) => files(c).flatMap((f) => readArray(`products/${f}`, ApparelSchema)));
  const accessories = files("aksesuar").flatMap((f) => readArray(`products/${f}`, AccessorySchema));
  const tires = files("lastik").flatMap((f) => readArray(`products/${f}`, TireSchema));
  const care = files("yag-bakim").flatMap((f) => readArray(`products/${f}`, CareSchema));
  // Kayıtlarda model adı marka ile başlıyorsa marka kısmı atılır; marka adı ayrıca gösterilir.
  const alnum = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  return [...helmets, ...intercoms, ...apparel, ...accessories, ...tires, ...care].map((p) => {
    const words = p.name.split(" ");
    for (let i = 1; i < words.length; i++)
      if (alnum(words.slice(0, i).join(" ")) === alnum(p.brand)) return { ...p, name: words.slice(i).join(" ") };
    return p;
  });
});

export const productId = (p: Pick<Product, "brand" | "slug">) => `${p.brand}/${p.slug}`;
export const productPath = (p: Pick<Product, "brand" | "slug" | "category">) => `/${p.category}/${p.brand}/${p.slug}`;

export function getProduct(category: string, brand: string, slug: string) {
  return getProducts().find((p) => p.category === category && p.brand === brand && p.slug === slug);
}
export function getProductById(id: string) {
  return getProducts().find((p) => productId(p) === id);
}
export const getHelmets = () => getProducts().filter((p): p is Helmet => p.category === "kask");
export const getIntercoms = () => getProducts().filter((p): p is Intercom => p.category === "interkom");
export const APPAREL_CATEGORIES = ["mont", "eldiven", "bot", "pantolon", "koruma", "yagmurluk", "termal"] as const;
export const isApparel = (p: Product): p is Apparel => (APPAREL_CATEGORIES as readonly string[]).includes(p.category);

export function productsIn(category: string, sub?: string) {
  return getProducts().filter((p) => p.category === category && (!sub || p.subcategories.includes(sub)));
}

export const getBrands = memo((): Brand[] =>
  fs
    .readdirSync(DATA)
    .filter((f) => /^brands.*\.json$/.test(f))
    .flatMap((f) => readArray(f, BrandSchema))
    .sort((a, b) => a.name.localeCompare(b.name, "tr")));
export const getBrand = (slug: string) => getBrands().find((b) => b.slug === slug);
export const brandName = (slug: string) => getBrand(slug)?.name ?? slug.toUpperCase();
/** Yerli (Türkiye menşeli) marka mı? Öneri sıralamasında öne alınır, kartlarda rozetle gösterilir. */
export const isLocalBrand = (slug: string) => getBrand(slug)?.country === "Türkiye";
export const isLocal = (p: Pick<Product, "brand">) => isLocalBrand(p.brand);
/** Yerli ürünleri öne alan kararlı sıralama. */
export const localFirst = <T extends Pick<Product, "brand">>(list: T[]) => [...list].sort((a, b) => Number(isLocal(b)) - Number(isLocal(a)));

/** Sadece kayıtlı markalara link verilir; diğerleri düz metin gösterilir. */
export const brandHasPage = (slug: string) => !!getBrand(slug);

export const getGuides = memo((): Guide[] => {
  const dir = path.join(DATA, "guides");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .flatMap((f) => readArray(`guides/${f}`, GuideSchema))
    .sort((a, b) => a.title.localeCompare(b.title, "tr"));
});
export const getGuide = (slug: string) => getGuides().find((g) => g.slug === slug);

export const getCompat = memo((): Compat[] => {
  const ids = new Set(getProducts().map(productId));
  const all = fs
    .readdirSync(DATA)
    .filter((f) => /^compat.*\.json$/.test(f))
    .flatMap((f) => readArray(f, CompatSchema));
  // Aynı kask–interkom çifti birden fazla dosyada varsa doğrulanmış olan kazanır.
  const best = new Map<string, Compat>();
  for (const c of all) {
    if (!ids.has(c.helmet) || !ids.has(c.intercom)) continue;
    const k = c.helmet + "|" + c.intercom;
    const cur = best.get(k);
    if (!cur || (!cur.verified && c.verified)) best.set(k, c);
  }
  return [...best.values()];
});

const getMediaMap = memo(
  () =>
    new Map(
      fs
        .readdirSync(DATA)
        .filter((f) => /^media.*\.json$/.test(f))
        .flatMap((f) => readArray(f, MediaSchema))
        .map((m) => [m.product, m]),
    ),
);
const EMPTY_MEDIA = (id: string): Media => ({ product: id, images: [], videos: [] });
/** Üretici görselleri ve YouTube videoları; kayıt yoksa boş döner. */
export const getMedia = (p: Pick<Product, "brand" | "slug">): Media => getMediaMap().get(productId(p)) ?? EMPTY_MEDIA(productId(p));

/** Site sahibinin onayladığı kullanıcı yorumları. */
export const getReviews = memo(() => readArray("reviews.json", ReviewSchema));
export const reviewsFor = (p: Pick<Product, "brand" | "slug">) => getReviews().filter((r) => r.product === productId(p)).sort((a, b) => b.approvedAt.localeCompare(a.approvedAt));

/** Türkiye'de çok satan / ilgi gören motosiklet modelleri. */
export const getMotorcycles = memo(() => {
  const file = path.join(DATA, "motorcycles.json");
  if (!fs.existsSync(file)) return [];
  const raw = JSON.parse(fs.readFileSync(file, "utf8")) as { models?: unknown[] };
  return (raw.models ?? []).flatMap((m) => {
    const r = MotorcycleSchema.safeParse(m);
    return r.success ? [r.data] : [];
  });
});

export function displayName(p: Pick<Product, "brand" | "name">) {
  const brand = brandName(p.brand);
  // Alt markalı ürünler: "Tex Motor (Forte GT / Sway)" + "Sway SW 868" → "Sway SW 868"
  const sub = brand.match(/\(([^)]+)\)/)?.[1].split("/").map((x) => x.trim().toLocaleLowerCase("tr")) ?? [];
  if (sub.some((s) => p.name.toLocaleLowerCase("tr").startsWith(s))) return p.name;
  return `${brand} ${p.name}`;
}

export function formatTL(n: number) {
  return new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 }).format(n) + " TL";
}

export function priceLabel(p: Product) {
  if (!p.priceRange) return null;
  const { min, max } = p.priceRange;
  return min === max ? formatTL(min) : `${formatTL(min)} – ${formatTL(max)}`;
}

/** Kısa tarih: "7 Eki" (kart üzerindeki fiyat kontrol ipucu için). */
export function formatShortDate(iso: string) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("tr-TR", { day: "numeric", month: "short" });
}

export function formatDate(iso: string) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

const CategoryFaqSchema = z.record(z.string(), z.array(z.object({ q: z.string().min(5), a: z.string().min(20) })));

/** Kategori sayfalarındaki sık sorulan sorular (src/data/category-faq.json). */
export const getCategoryFaq = memo(() => {
  const file = path.join(DATA, "category-faq.json");
  if (!fs.existsSync(file)) return {} as Record<string, { q: string; a: string }[]>;
  const p = CategoryFaqSchema.safeParse(JSON.parse(fs.readFileSync(file, "utf8")));
  return p.success ? p.data : {};
});
export const categoryFaq = (slug: string) => getCategoryFaq()[slug] ?? [];
