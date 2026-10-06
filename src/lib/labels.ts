/** Teknik özellik etiketleri ve biçimlendirme: ürün sayfası, karşılaştırma tablosu ve kartlar aynı tanımları kullanır. */
import type { Apparel, Helmet, Intercom, Product } from "@/data/schema";

export const HELMET_TYPE: Record<Helmet["specs"]["helmetType"], string> = {
  kapali: "Kapalı kask",
  "cene-acilir": "Çene açılır kask",
  acik: "Açık kask",
  adventure: "Adventure kask",
  cross: "Cross / enduro kask",
};
const SEASON: Record<string, string> = { yaz: "Yazlık", kis: "Kışlık", "4-mevsim": "4 mevsim" };
const GENDER: Record<string, string> = { erkek: "Erkek", kadin: "Kadın", unisex: "Unisex" };
const CAT: Record<string, string> = { mont: "mont", eldiven: "eldiven", bot: "bot", pantolon: "pantolon", koruma: "koruyucu" };

export function productTypeLabel(p: Product) {
  if (p.category === "kask") return HELMET_TYPE[p.specs.helmetType];
  if (p.category === "interkom") return p.specs.mesh ? "Mesh + Bluetooth interkom" : "Bluetooth interkom";
  const s = p.specs;
  return [s.gender && s.gender !== "unisex" ? GENDER[s.gender] : null, s.season ? SEASON[s.season] : null, s.materialClass, CAT[p.category]]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase("tr")
    .replace(/^./, (c) => c.toLocaleUpperCase("tr"));
}

export function keyChips(p: Product): string[] {
  if (p.category === "kask") {
    const s = p.specs;
    return [
      s.ece2206 ? "ECE 22.06" : null,
      s.materialClass ? s.materialClass[0].toLocaleUpperCase("tr") + s.materialClass.slice(1) : null,
      s.weightGrams ? `${s.weightGrams} g` : null,
      s.sunVisor ? "Güneş vizörü" : null,
      s.pinlock ? "Pinlock" : null,
    ].filter(Boolean) as string[];
  }
  if (p.category === "interkom") {
    const s = p.specs;
    return [s.mesh ? "Mesh" : null, s.bluetoothVersion ? `BT ${s.bluetoothVersion}` : null, s.talkTimeHours ? `${s.talkTimeHours} sa konuşma` : null, s.usbC ? "USB-C" : null]
      .filter(Boolean)
      .slice(0, 4) as string[];
  }
  const s = p.specs;
  return [s.ceClass ? `CE ${s.ceClass}` : null, s.waterproof ? "Su geçirmez" : null, s.membrane, s.airbagCompatible ? "Airbag uyumlu" : null]
    .filter(Boolean)
    .slice(0, 4) as string[];
}

/* ---------- Spesifikasyon tablosu tanımları ---------- */

type Val = string | number | boolean | null | undefined;
export type SpecRow<T> = { key: string; label: string; get: (p: T) => Val; fmt?: (v: Val, p: T) => string; better?: "high" | "low" };

const yesno = (v: Val) => (v === true ? "Var" : v === false ? "Yok" : "—");

export const HELMET_SPECS: SpecRow<Helmet>[] = [
  { key: "specs.helmetType", label: "Kask tipi", get: (p) => HELMET_TYPE[p.specs.helmetType] },
  { key: "specs.shellMaterial", label: "Kabuk malzemesi", get: (p) => p.specs.shellMaterial },
  { key: "specs.shellSizes", label: "Kabuk ölçüsü sayısı", get: (p) => p.specs.shellSizes },
  { key: "specs.ece2206", label: "ECE 22.06", get: (p) => p.specs.ece2206, fmt: (v) => (v === true ? "Onaylı" : v === false ? "Hayır" : "—") },
  { key: "specs.dot", label: "DOT", get: (p) => p.specs.dot, fmt: yesno },
  { key: "specs.snell", label: "Snell", get: (p) => p.specs.snell, fmt: yesno },
  { key: "specs.fim", label: "FIM homologasyonu", get: (p) => p.specs.fim, fmt: yesno },
  {
    key: "specs.weightGrams",
    label: "Ağırlık",
    get: (p) => p.specs.weightGrams,
    fmt: (v, p) => (v ? `${v} g${p.specs.weightSize ? ` (${p.specs.weightSize} beden)` : ""}` : "—"),
    better: "low",
  },
  { key: "specs.headShape", label: "Kafa şekli", get: (p) => p.specs.headShape },
  { key: "specs.visor", label: "Vizör", get: (p) => p.specs.visor },
  { key: "specs.pinlock", label: "Pinlock hazırlığı", get: (p) => p.specs.pinlock, fmt: yesno },
  { key: "specs.pinlockIncluded", label: "Pinlock kutudan çıkıyor", get: (p) => p.specs.pinlockIncluded, fmt: (v) => (v === true ? "Evet" : v === false ? "Hayır" : "—") },
  { key: "specs.sunVisor", label: "Güneş vizörü", get: (p) => p.specs.sunVisor, fmt: yesno },
  { key: "specs.ventilation", label: "Havalandırma", get: (p) => p.specs.ventilation },
  { key: "specs.chinCurtain", label: "Çene perdesi", get: (p) => p.specs.chinCurtain, fmt: yesno },
  { key: "specs.breathGuard", label: "Burunluk", get: (p) => p.specs.breathGuard, fmt: yesno },
  { key: "specs.linerRemovable", label: "İç ped çıkarılabilir", get: (p) => p.specs.linerRemovable, fmt: yesno },
  { key: "specs.linerWashable", label: "İç ped yıkanabilir", get: (p) => p.specs.linerWashable, fmt: yesno },
  { key: "specs.emergencyCheekPads", label: "Acil durum yanak pedi", get: (p) => p.specs.emergencyCheekPads, fmt: yesno },
  { key: "specs.retention", label: "Bağlantı", get: (p) => p.specs.retention, fmt: (v) => (v === "double-d" ? "Double-D" : v === "mikrometrik" ? "Mikrometrik" : v ? "Diğer" : "—") },
  { key: "specs.intercomReady", label: "İnterkom hazırlığı", get: (p) => p.specs.intercomReady, fmt: yesno },
  { key: "specs.spoiler", label: "Spoiler", get: (p) => p.specs.spoiler, fmt: yesno },
  { key: "specs.warrantyYears", label: "Garanti", get: (p) => p.specs.warrantyYears, fmt: (v) => (v ? `${v} yıl` : "—") },
  { key: "specs.madeIn", label: "Üretim ülkesi", get: (p) => p.specs.madeIn },
];

export const INTERCOM_SPECS: SpecRow<Intercom>[] = [
  { key: "specs.bluetoothVersion", label: "Bluetooth sürümü", get: (p) => p.specs.bluetoothVersion },
  { key: "specs.mesh", label: "Mesh desteği", get: (p) => p.specs.mesh, fmt: yesno },
  { key: "specs.meshTech", label: "Mesh teknolojisi", get: (p) => p.specs.meshTech },
  { key: "specs.meshMaxRiders", label: "Mesh grup kapasitesi", get: (p) => p.specs.meshMaxRiders, fmt: (v) => (v ? `${v} sürücü` : "—"), better: "high" },
  { key: "specs.bluetoothMaxRiders", label: "Bluetooth grup", get: (p) => p.specs.bluetoothMaxRiders, fmt: (v) => (v ? `${v} sürücü` : "—"), better: "high" },
  { key: "specs.rangeMeters", label: "Teorik menzil", get: (p) => p.specs.rangeMeters, fmt: (v) => (v ? `${Number(v).toLocaleString("tr-TR")} m` : "—"), better: "high" },
  { key: "specs.talkTimeHours", label: "Konuşma süresi", get: (p) => p.specs.talkTimeHours, fmt: (v) => (v ? `${v} saat` : "—"), better: "high" },
  { key: "specs.chargeTimeHours", label: "Şarj süresi", get: (p) => p.specs.chargeTimeHours, fmt: (v) => (v ? `${v} saat` : "—"), better: "low" },
  { key: "specs.usbC", label: "USB-C", get: (p) => p.specs.usbC, fmt: yesno },
  { key: "specs.fastCharge", label: "Hızlı şarj", get: (p) => p.specs.fastCharge },
  { key: "specs.speakers", label: "Hoparlör", get: (p) => p.specs.speakers },
  { key: "specs.waterproof", label: "Su dayanımı", get: (p) => p.specs.waterproof },
  { key: "specs.fmRadio", label: "FM radyo", get: (p) => p.specs.fmRadio, fmt: yesno },
  { key: "specs.musicSharing", label: "Müzik paylaşımı", get: (p) => p.specs.musicSharing, fmt: yesno },
  { key: "specs.voiceCommand", label: "Sesli komut", get: (p) => p.specs.voiceCommand, fmt: yesno },
  { key: "specs.siri", label: "Siri", get: (p) => p.specs.siri, fmt: yesno },
  { key: "specs.googleAssistant", label: "Google Asistan", get: (p) => p.specs.googleAssistant, fmt: yesno },
  { key: "specs.universalIntercom", label: "Universal Intercom", get: (p) => p.specs.universalIntercom, fmt: yesno },
  { key: "specs.crossBrand", label: "Diğer markalarla bağlantı", get: (p) => p.specs.crossBrand },
  { key: "specs.otaUpdate", label: "OTA güncelleme", get: (p) => p.specs.otaUpdate, fmt: yesno },
  { key: "specs.app", label: "Mobil uygulama", get: (p) => p.specs.app },
];

const AREA: Record<string, string> = {
  omuz: "Omuz",
  dirsek: "Dirsek",
  sirt: "Sırt",
  gogus: "Göğüs",
  kalca: "Kalça",
  diz: "Diz",
  bilek: "Bilek",
  avuc: "Avuç içi",
  parmak: "Parmak eklemi",
  "ayak-bilegi": "Ayak bileği",
  kaval: "Kaval kemiği",
};

export function protectorsText(p: Apparel) {
  if (!p.specs.protectors.length) return null;
  return p.specs.protectors
    .map((x) => `${AREA[x.area]}${x.level ? ` L${x.level}` : ""}${x.included === false ? " (opsiyonel)" : ""}`)
    .join(", ");
}

export const APPAREL_SPECS: SpecRow<Apparel>[] = [
  { key: "specs.gender", label: "Cinsiyet", get: (p) => (p.specs.gender ? GENDER[p.specs.gender] : null) },
  { key: "specs.season", label: "Mevsim", get: (p) => (p.specs.season ? SEASON[p.specs.season] : null) },
  { key: "specs.material", label: "Malzeme", get: (p) => p.specs.material },
  { key: "specs.ceStandard", label: "CE standardı", get: (p) => p.specs.ceStandard },
  { key: "specs.ceClass", label: "Koruma sınıfı", get: (p) => p.specs.ceClass },
  { key: "specs.protectors", label: "Koruyucular", get: (p) => protectorsText(p) },
  { key: "specs.waterproof", label: "Su geçirmez", get: (p) => p.specs.waterproof, fmt: (v) => (v === true ? "Evet" : v === false ? "Hayır" : "—") },
  { key: "specs.membrane", label: "Membran", get: (p) => p.specs.membrane },
  { key: "specs.airbagCompatible", label: "Airbag uyumu", get: (p) => p.specs.airbagCompatible, fmt: yesno },
  { key: "specs.ventilation", label: "Havalandırma", get: (p) => p.specs.ventilation },
  { key: "specs.closure", label: "Kapanış", get: (p) => p.specs.closure },
  { key: "specs.madeIn", label: "Üretim ülkesi", get: (p) => p.specs.madeIn },
];

export function specRows(p: Product): { key: string; label: string; value: string; unverified: boolean }[] {
  const rows = (p.category === "kask" ? HELMET_SPECS : p.category === "interkom" ? INTERCOM_SPECS : APPAREL_SPECS) as SpecRow<Product>[];
  return rows.map((r) => {
    const v = r.get(p);
    const value = r.fmt ? r.fmt(v, p) : v == null || v === "" ? "—" : String(v);
    return { key: r.key, label: r.label, value, unverified: p.unverified.includes(r.key) };
  });
}
