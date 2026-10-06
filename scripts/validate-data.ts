/**
 * Veri kalitesi kontrolü (data-quality agent'ın otomatik kısmı).
 * Çalıştır: npx tsx scripts/validate-data.ts
 * Şema hatası, yinelenen kayıt, kırık çapraz referans veya kaynaksız fiyat varsa çıkış kodu 1 olur.
 */
import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { ApparelSchema, BrandSchema, CompatSchema, GuideSchema, HelmetSchema, IntercomSchema, MediaSchema, ReviewSchema } from "../src/data/schema";
import { allSubcategories } from "../src/data/categories";

const root = path.join(__dirname, "..", "src", "data");
const errors: string[] = [];
const warn: string[] = [];

function load<T>(file: string, schema: z.ZodType<T>): T[] {
  const p = path.join(root, file);
  if (!fs.existsSync(p)) {
    warn.push(`${file} henüz yok`);
    return [];
  }
  const raw = JSON.parse(fs.readFileSync(p, "utf8"));
  const arr = z.array(z.unknown()).parse(raw);
  const out: T[] = [];
  arr.forEach((item, i) => {
    const r = schema.safeParse(item);
    if (r.success) out.push(r.data);
    else errors.push(`${file}[${i}] ${(item as { slug?: string }).slug ?? ""}: ${r.error.issues.map((x) => `${x.path.join(".")} ${x.message}`).join("; ")}`);
  });
  return out;
}

const pfiles = (cat: string) => fs.readdirSync(path.join(root, "products")).filter((f) => f === `${cat}.json` || f.startsWith(`${cat}-`));
const helmets = pfiles("kask").flatMap((f) => load(`products/${f}`, HelmetSchema));
const intercoms = pfiles("interkom").flatMap((f) => load(`products/${f}`, IntercomSchema));
const apparel = ["mont", "eldiven", "bot", "pantolon", "koruma"].flatMap((c) => pfiles(c).flatMap((f) => load(`products/${f}`, ApparelSchema)));
const brands = fs.readdirSync(root).filter((f) => /^brands.*\.json$/.test(f)).flatMap((f) => load(f, BrandSchema));
for (const b of brands) if (brands.filter((x) => x.slug === b.slug).length > 1) errors.push(`Yinelenen marka: ${b.slug}`);
const compat = load("compat.json", CompatSchema);
const guideDir = path.join(root, "guides");
const guides = fs.existsSync(guideDir)
  ? fs.readdirSync(guideDir).filter((f) => f.endsWith(".json")).flatMap((f) => load(`guides/${f}`, GuideSchema))
  : [];

const products = [...helmets, ...intercoms, ...apparel];
const ids = new Set<string>();
const subSlugs = new Set(allSubcategories().map((x) => `${x.category.slug}/${x.sub.slug}`));
const brandSlugs = new Set(brands.map((b) => b.slug));

for (const p of products) {
  const id = `${p.brand}/${p.slug}`;
  if (ids.has(id)) errors.push(`Yinelenen ürün: ${id}`);
  ids.add(id);
  if (brands.length && !brandSlugs.has(p.brand)) errors.push(`${id}: marka kaydı yok (${p.brand})`);
  for (const s of p.subcategories) if (!subSlugs.has(`${p.category}/${s}`)) errors.push(`${id}: geçersiz alt kategori ${p.category}/${s}`);
  for (const o of p.offers) if (!o.url.startsWith("http")) errors.push(`${id}: fiyat kaynağı yok`);
  if (p.priceRange && p.offers.length === 0 && !p.sources.some((s) => s.type === "retailer" || s.type === "distributor"))
    errors.push(`${id}: fiyat aralığı var ama perakendeci/distribütör kaynağı yok`);
  if (!p.sources.some((s) => s.type === "manufacturer")) warn.push(`${id}: üretici kaynağı yok`);
}
for (const p of products) for (const r of p.rivals) if (!ids.has(r)) warn.push(`${p.brand}/${p.slug}: rakip ${r} veri tabanında yok (sayfada gösterilmeyecek)`);
for (const c of compat) {
  if (!ids.has(c.helmet)) errors.push(`compat: kask yok ${c.helmet}`);
  if (!ids.has(c.intercom)) errors.push(`compat: interkom yok ${c.intercom}`);
  if (c.verified && !c.source) errors.push(`compat ${c.helmet}+${c.intercom}: doğrulanmış ama kaynak yok`);
}
const media = fs.readdirSync(root).filter((f) => /^media.*\.json$/.test(f)).flatMap((f) => load(f, MediaSchema));
for (const m of media) if (!ids.has(m.product)) errors.push(`media: ürün yok ${m.product}`);
const reviews = load("reviews.json", ReviewSchema);
for (const r of reviews) if (!ids.has(r.product)) errors.push(`review: ürün yok ${r.product}`);
const guideSlugs = new Set(guides.map((g) => g.slug));
for (const g of guides) for (const r of g.relatedGuides) if (!guideSlugs.has(r)) warn.push(`rehber ${g.slug}: ilgili rehber ${r} yok (gösterilmeyecek)`);

console.log(`Ürün: ${products.length} (kask ${helmets.length}, interkom ${intercoms.length}, giyim ${apparel.length}) · Marka: ${brands.length} · Uyumluluk: ${compat.length} · Rehber: ${guides.length}`);
warn.forEach((w) => console.log("UYARI  " + w));
errors.forEach((e) => console.log("HATA   " + e));
process.exit(errors.length ? 1 : 0);
