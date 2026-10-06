import { CATEGORIES } from "@/data/categories";
import { MOTO_TYPES } from "@/data/riding";
import { GENDERS, activeLists, comparePairs } from "@/lib/catalog";
import { brandName, displayName, getBrands, getGuides, getProducts, isApparel, productPath } from "@/lib/data";
import { keyChips, productTypeLabel } from "@/lib/labels";
import type { SearchDoc } from "@/lib/search-core";

export const dynamic = "force-static";

export function GET() {
  const docs: SearchDoc[] = [];
  for (const p of getProducts()) {
    const extra = [p.category, ...p.subcategories.map((s) => s.replace(/-/g, " ")), ...keyChips(p)];
    if (p.category === "kask") extra.push(p.specs.materialClass ?? "", p.specs.ece2206 ? "ece 22.06 2206" : "");
    if (isApparel(p)) extra.push(p.specs.season === "yaz" ? "yazlik yazlık" : p.specs.season === "kis" ? "kislik kışlık" : "4 mevsim", p.specs.gender ?? "");
    docs.push({ t: displayName(p), k: "Ürün", h: productPath(p), d: productTypeLabel(p), w: extra.join(" "), p: p.priceRange?.min });
  }
  for (const b of getBrands()) docs.push({ t: b.name, k: "Marka", h: `/marka/${b.slug}`, d: [b.country, b.strengths[0]].filter(Boolean).join(" · ") });
  for (const c of CATEGORIES) {
    docs.push({ t: c.name, k: "Kategori", h: `/${c.slug}`, d: c.intro.slice(0, 90) });
    for (const g of c.groups) for (const s of g.items) docs.push({ t: s.name, k: "Kategori", h: `/${c.slug}/${s.slug}`, d: c.name, w: s.intro });
  }
  for (const g of GENDERS) docs.push({ t: g.long, k: "Kategori", h: `/${g.slug}` });
  for (const g of getGuides()) docs.push({ t: g.title, k: "Rehber", h: `/rehber/${g.slug}`, d: g.description, w: g.topic });
  for (const l of activeLists()) docs.push({ t: l.title, k: "Rehber", h: `/ne-almaliyim/${l.slug}`, d: l.description });
  for (const m of MOTO_TYPES) docs.push({ t: `${m.name} için ekipman`, k: "Rehber", h: `/motosikletime-gore/${m.slug}`, d: m.summary.slice(0, 90) });
  for (const c of comparePairs()) docs.push({ t: `${displayName(c.items[0])} vs ${displayName(c.items[1])}`, k: "Karşılaştırma", h: `/karsilastir/${c.slug}`, w: brandName(c.items[0].brand) });
  docs.push(
    { t: "Yeni motor aldım, ne almalıyım?", k: "Araç", h: "/yeni-baslayanlar", w: "sihirbaz yeni baslayan ekipman seti" },
    { t: "Kask + interkom uyumluluğu", k: "Araç", h: "/interkom-uyumlulugu", w: "uyumlu interkom kaskima" },
    { t: "Ürün karşılaştırma", k: "Araç", h: "/karsilastir", w: "vs karsilastirma" },
  );
  return Response.json(docs);
}
