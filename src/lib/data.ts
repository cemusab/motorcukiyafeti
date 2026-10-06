/**
 * Veri erişim katmanı. Şimdilik src/data altındaki doğrulanmış JSON dosyalarını okur.
 * PostgreSQL'e geçildiğinde yalnızca bu dosyanın içi değişir; sayfalar aynı fonksiyonları kullanmaya devam eder.
 */
import "server-only";
import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { z } from "zod";
import {
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

export const getProducts = cache((): Product[] => {
  const helmets = readArray("products/kask.json", HelmetSchema);
  const intercoms = readArray("products/interkom.json", IntercomSchema);
  const apparel = ["mont", "eldiven", "bot", "pantolon", "koruma"].flatMap((c) => readArray(`products/${c}.json`, ApparelSchema));
  // Kayıtlarda model adı marka ile başlıyorsa marka kısmı atılır; marka adı ayrıca gösterilir.
  const alnum = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  return [...helmets, ...intercoms, ...apparel].map((p) => {
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
export const isApparel = (p: Product): p is Apparel => p.category !== "kask" && p.category !== "interkom";

export function productsIn(category: string, sub?: string) {
  return getProducts().filter((p) => p.category === category && (!sub || p.subcategories.includes(sub)));
}

export const getBrands = cache((): Brand[] =>
  fs
    .readdirSync(DATA)
    .filter((f) => /^brands.*\.json$/.test(f))
    .flatMap((f) => readArray(f, BrandSchema))
    .sort((a, b) => a.name.localeCompare(b.name, "tr")));
export const getBrand = (slug: string) => getBrands().find((b) => b.slug === slug);
export const brandName = (slug: string) => getBrand(slug)?.name ?? slug.toUpperCase();
/** Sadece kayıtlı markalara link verilir; diğerleri düz metin gösterilir. */
export const brandHasPage = (slug: string) => !!getBrand(slug);

export const getGuides = cache((): Guide[] => {
  const dir = path.join(DATA, "guides");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .flatMap((f) => readArray(`guides/${f}`, GuideSchema))
    .sort((a, b) => a.title.localeCompare(b.title, "tr"));
});
export const getGuide = (slug: string) => getGuides().find((g) => g.slug === slug);

export const getCompat = cache((): Compat[] => {
  const ids = new Set(getProducts().map(productId));
  return readArray("compat.json", CompatSchema).filter((c) => ids.has(c.helmet) && ids.has(c.intercom));
});

const getMediaMap = cache(() => new Map(readArray("media.json", MediaSchema).map((m) => [m.product, m])));
const EMPTY_MEDIA = (id: string): Media => ({ product: id, images: [], videos: [] });
/** Üretici görselleri ve YouTube videoları; kayıt yoksa boş döner. */
export const getMedia = (p: Pick<Product, "brand" | "slug">): Media => getMediaMap().get(productId(p)) ?? EMPTY_MEDIA(productId(p));

export function displayName(p: Pick<Product, "brand" | "name">) {
  return `${brandName(p.brand)} ${p.name}`;
}

export function formatTL(n: number) {
  return new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 }).format(n) + " TL";
}

export function priceLabel(p: Product) {
  if (!p.priceRange) return null;
  const { min, max } = p.priceRange;
  return min === max ? formatTL(min) : `${formatTL(min)} – ${formatTL(max)}`;
}

export function formatDate(iso: string) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}
