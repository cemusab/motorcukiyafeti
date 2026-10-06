import "server-only";
import type { Product } from "@/data/schema";
import type { CompareEntry } from "./compare-core";
import { displayName, productId, productPath } from "./data";
import { APPAREL_SPECS, HELMET_SPECS, INTERCOM_SPECS, productTypeLabel, type SpecRow } from "./labels";

export function compareEntry(p: Product): CompareEntry {
  const defs = (p.category === "kask" ? HELMET_SPECS : p.category === "interkom" ? INTERCOM_SPECS : APPAREL_SPECS) as SpecRow<Product>[];
  const rows = defs.map((d) => {
    const v = d.get(p);
    return {
      key: d.key,
      label: d.label,
      value: d.fmt ? d.fmt(v, p) : v == null || v === "" ? "—" : String(v),
      num: typeof v === "number" ? v : null,
      better: d.better,
      unverified: p.unverified.includes(d.key),
    };
  });
  const flags: Record<string, boolean | null> =
    p.category === "kask" ? { sunVisor: p.specs.sunVisor, intercomReady: p.specs.intercomReady, pinlock: p.specs.pinlock } : p.category === "interkom" ? { mesh: p.specs.mesh } : { waterproof: p.specs.waterproof };
  return { id: productId(p), name: displayName(p), href: productPath(p), category: p.category, type: productTypeLabel(p), price: p.priceRange?.min ?? null, rows, usage: p.usage, flags };
}
