/**
 * Bütçe dilimleri: yeni başlayan ve bütçe odaklı kullanıcılar için fiyata göre öneri listeleri
 * ve 3–4 ürünlük hazır karşılaştırmalar. Yalnızca doğrulanmış Türkiye fiyatı olan ürünler kullanılır.
 */
import "server-only";
import type { Product } from "@/data/schema";
import { getCategory } from "@/data/categories";
import { isLocal, priceLabel, productsIn } from "./data";
import { memo } from "./memo";

type Tier = { min: number; max: number | null };

const TIERS: Record<string, Tier[]> = {
  kask: [
    { min: 0, max: 10000 },
    { min: 10000, max: 20000 },
    { min: 20000, max: 35000 },
    { min: 35000, max: null },
  ],
  mont: [
    { min: 0, max: 10000 },
    { min: 10000, max: 20000 },
    { min: 20000, max: 35000 },
    { min: 35000, max: null },
  ],
  pantolon: [
    { min: 0, max: 8000 },
    { min: 8000, max: 20000 },
    { min: 20000, max: null },
  ],
  eldiven: [
    { min: 0, max: 3000 },
    { min: 3000, max: 8000 },
    { min: 8000, max: null },
  ],
  bot: [
    { min: 0, max: 8000 },
    { min: 8000, max: 15000 },
    { min: 15000, max: null },
  ],
  interkom: [
    { min: 0, max: 10000 },
    { min: 10000, max: 20000 },
    { min: 20000, max: null },
  ],
};

const tl = (n: number) => (n % 1000 === 0 ? `${n / 1000} bin` : n.toLocaleString("tr-TR"));

export type BudgetGroup = {
  slug: string; // ör. "kask-10-bin-tl-alti"
  category: string;
  tier: Tier;
  label: string; // "10 bin TL altı"
  title: string; // "10 bin TL altı kask önerileri"
  items: Product[]; // fiyata göre sıralı, yerli markalar eşit fiyatta önde
  compare: Product[]; // karşılaştırma için en uygun 3–4 ürün
};

const minPrice = (p: Product) => p.priceRange?.min ?? null;

/** Bütçe kullanıcısı için öneri skoru: güvenlik/veri kalitesi önde, yeni başlayana uygun olmayanlar geride. */
function score(p: Product) {
  let s = 0;
  if (p.category === "kask") {
    if (p.specs.ece2206) s += 3;
    if (p.specs.helmetType === "kapali" || p.specs.helmetType === "cene-acilir") s += 2;
  }
  if (p.dataConfidence === "high") s += 2;
  if (p.dataConfidence === "medium") s += 1;
  if (isLocal(p)) s += 1;
  if (/yeni başla|acemi|ilk kask/.test(p.notFor.join(" ").toLocaleLowerCase("tr"))) s -= 3;
  return s - p.unverified.length * 0.1;
}

export const budgetGroups = memo((): BudgetGroup[] => {
  const out: BudgetGroup[] = [];
  for (const [cat, tiers] of Object.entries(TIERS)) {
    const c = getCategory(cat);
    if (!c) continue;
    const priced = productsIn(cat).filter((p) => minPrice(p) != null);
    for (const t of tiers) {
      const items = priced
        .filter((p) => minPrice(p)! >= t.min && (t.max == null || minPrice(p)! < t.max))
        .sort((a, b) => minPrice(a)! - minPrice(b)! || Number(isLocal(b)) - Number(isLocal(a)));
      if (items.length < 3) continue;
      const label = t.max == null ? `${tl(t.min)} TL ve üzeri` : t.min === 0 ? `${tl(t.max)} TL altı` : `${tl(t.min)}–${tl(t.max)} TL arası`;
      const slugPart = t.max == null ? `${t.min / 1000}-bin-tl-ustu` : t.min === 0 ? `${t.max / 1000}-bin-tl-alti` : `${t.min / 1000}-${t.max / 1000}-bin-tl`;
      const compare = [...items].sort((a, b) => score(b) - score(a)).slice(0, 4).sort((a, b) => minPrice(a)! - minPrice(b)!);
      out.push({
        slug: `${cat}-${slugPart}`,
        category: cat,
        tier: t,
        label,
        title: `${label} ${c.name.toLocaleLowerCase("tr")} önerileri`,
        items,
        compare,
      });
    }
  }
  return out;
});

export const budgetGroup = (slug: string) => budgetGroups().find((g) => g.slug === slug);

/** Ana sayfa ve karşılaştırma merkezinde öne çıkacak bütçe karşılaştırmaları (en ucuz dilimler önce). */
export const featuredBudgetGroups = memo(() => {
  const order = ["kask", "mont", "eldiven", "bot", "pantolon", "interkom"];
  return order.flatMap((c) => budgetGroups().filter((g) => g.category === c).slice(0, c === "kask" || c === "mont" ? 2 : 1));
});

export function budgetLine(p: Product) {
  return priceLabel(p);
}
