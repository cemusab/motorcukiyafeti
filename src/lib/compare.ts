import "server-only";
import type { Product } from "@/data/schema";
import type { CompareEntry } from "./compare-core";
import { displayName, productId, productPath } from "./data";
import { productTypeLabel, specDefs } from "./labels";

export function compareEntry(p: Product): CompareEntry {
  const defs = specDefs(p.category);
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
