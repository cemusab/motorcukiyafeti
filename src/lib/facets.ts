import "server-only";
import type { Product } from "@/data/schema";
import { brandName, isLocal, productId } from "./data";
import { CARE_TYPE, HELMET_TYPE, TIRE_USAGE } from "./labels";

export type FacetDef = { key: string; label: string };
export type FacetItem = {
  id: string;
  values: Record<string, string[]>;
  price: number | null;
  weight: number | null;
  name: string;
  sizes: { size: string; min: number; max: number }[];
  measure: string | null;
};

const tri = (v: boolean | null, yes: string) => (v === true ? [yes] : []);
/** Lastik ebadından jant çapı: "120/70 ZR17" → 17, "110/70-13" → 13, "90/90-21" → 21. */
export const rimOf = (size: string) => [...size.matchAll(/(?:ZR|R|-|B)\s?(\d{2})(?!\d)/g)].pop()?.[1] ?? null;

export function facetDefs(category: string): FacetDef[] {
  const brand = { key: "marka", label: "Marka" };
  if (category === "kask")
    return [
      brand,
      { key: "tip", label: "Kask tipi" },
      { key: "malzeme", label: "Malzeme" },
      { key: "ozellik", label: "Özellikler" },
    ];
  if (category === "interkom") return [brand, { key: "ozellik", label: "Özellikler" }];
  if (category === "aksesuar") return [brand, { key: "tip", label: "Ürün tipi" }, { key: "ozellik", label: "Özellikler" }];
  if (category === "lastik") return [brand, { key: "tip", label: "Kullanım tipi" }, { key: "jant", label: "Jant çapı" }, { key: "mevsim", label: "Mevsim" }, { key: "ozellik", label: "Özellikler" }];
  if (category === "yag-bakim")
    return [brand, { key: "tip", label: "Ürün tipi" }, { key: "jaso", label: "JASO sınıfı" }, { key: "viskozite", label: "Viskozite" }, { key: "baz", label: "Baz yağ" }, { key: "ozellik", label: "Özellikler" }];
  return [
    brand,
    { key: "cinsiyet", label: "Cinsiyet" },
    { key: "mevsim", label: "Mevsim" },
    { key: "malzeme", label: "Malzeme" },
    { key: "sinif", label: "Koruma sınıfı" },
    { key: "ozellik", label: "Özellikler" },
  ];
}

export function facetItem(p: Product): FacetItem {
  const v: Record<string, string[]> = { marka: [brandName(p.brand)] };
  let weight: number | null = null;
  if (p.category === "kask") {
    const s = p.specs;
    v.tip = [HELMET_TYPE[s.helmetType]];
    v.malzeme = s.materialClass ? [s.materialClass[0].toLocaleUpperCase("tr") + s.materialClass.slice(1)] : [];
    v.ozellik = [...tri(s.ece2206, "ECE 22.06"), ...tri(s.sunVisor, "Güneş vizörü"), ...tri(s.pinlock, "Pinlock"), ...tri(s.intercomReady, "İnterkom hazırlığı"), ...tri(s.fim, "FIM onaylı")];
    weight = s.weightGrams;
  } else if (p.category === "interkom") {
    const s = p.specs;
    v.ozellik = [...tri(s.mesh, "Mesh"), ...tri(s.musicSharing, "Müzik paylaşımı"), ...tri(s.fmRadio, "FM radyo"), ...tri(s.usbC, "USB-C"), ...tri(s.otaUpdate, "OTA güncelleme")];
  } else if (p.category === "lastik") {
    const s = p.specs;
    v.tip = [TIRE_USAGE[s.usage]];
    v.jant = [...new Set([...s.sizesFront, ...s.sizesRear].map(rimOf).filter(Boolean).map((r) => `${r}"`))].sort();
    v.mevsim = s.season ? [{ yaz: "Yaz", "4-mevsim": "4 mevsim", kis: "Kışa uygun" }[s.season]] : [];
    v.ozellik = [...(s.construction === "radyal" ? ["Radyal"] : []), ...s.markings.filter((m) => m === "M+S" || m === "3PMSF")];
  } else if (p.category === "yag-bakim") {
    const s = p.specs;
    v.tip = [s.productType === "motor-yagi" && s.engineType === "4t-scooter" ? "Scooter yağı" : s.productType === "motor-yagi" && s.engineType === "2t" ? "2 zamanlı yağ" : CARE_TYPE[s.productType]];
    v.jaso = s.jaso ? [s.jaso] : [];
    v.viskozite = s.viscosity ? [s.viscosity] : [];
    v.baz = s.baseOil ? [{ mineral: "Mineral", "yari-sentetik": "Yarı sentetik", "tam-sentetik": "Tam sentetik" }[s.baseOil]] : [];
    v.ozellik = s.approvals.length ? ["Üretici onaylı"] : [];
  } else if (p.category === "aksesuar") {
    const s = p.specs;
    v.tip = [s.accessoryType];
    v.ozellik = [...tri(s.waterproof, "Su geçirmez"), ...(s.certification ? ["Sertifikalı"] : [])];
  } else {
    const s = p.specs;
    v.cinsiyet = s.gender === "unisex" ? ["Erkek", "Kadın"] : s.gender === "kadin" ? ["Kadın"] : s.gender === "erkek" ? ["Erkek"] : [];
    v.mevsim = s.season ? [{ yaz: "Yaz", kis: "Kış", "4-mevsim": "4 mevsim" }[s.season]] : [];
    v.malzeme = s.materialClass ? [s.materialClass[0].toLocaleUpperCase("tr") + s.materialClass.slice(1)] : [];
    v.sinif = s.ceClass ? [s.ceClass.split(" ")[0]] : [];
    v.ozellik = [
      ...tri(s.waterproof, "Su geçirmez"),
      ...tri(s.airbagCompatible, "Airbag uyumlu"),
      ...(s.membrane?.toLowerCase().includes("gore") ? ["Gore-Tex"] : []),
      ...(s.protectors.some((x) => x.level === 2) ? ["Level 2 koruyucu"] : []),
    ];
  }
  if (isLocal(p)) v.ozellik = [...(v.ozellik ?? []), "Yerli marka"];
  return {
    id: productId(p),
    values: v,
    price: p.priceRange?.min ?? null,
    weight,
    name: `${brandName(p.brand)} ${p.name}`,
    sizes: p.unverified.includes("sizeChart") ? [] : p.sizeChart,
    measure: p.sizeChartMeasure,
  };
}
