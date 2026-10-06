/** Karşılaştırma verisi tipleri ve karar kuralları. Sunucu ve tarayıcı ortak kullanır; kurallar şeffaftır. */

export type CompareRow = { key: string; label: string; value: string; num: number | null; better?: "high" | "low"; unverified: boolean };
export type CompareEntry = {
  id: string;
  name: string;
  href: string;
  category: string;
  type: string;
  price: number | null;
  rows: CompareRow[];
  usage: Record<string, string>;
  flags: Record<string, boolean | null>;
};

export type Verdict = { q: string; winner: string | null; why: string };

const by = (items: CompareEntry[], key: string, dir: "low" | "high") => {
  const vals = items.map((i) => ({ i, v: i.rows.find((r) => r.key === key && !r.unverified)?.num ?? null })).filter((x) => x.v != null) as { i: CompareEntry; v: number }[];
  if (vals.length < 2) return null;
  vals.sort((a, b) => (dir === "low" ? a.v - b.v : b.v - a.v));
  if (vals[0].v === vals[1].v) return null;
  return vals[0];
};

export function verdicts(items: CompareEntry[]): Verdict[] {
  const out: Verdict[] = [];
  const cat = items[0]?.category;
  if (cat === "kask") {
    const light = by(items, "specs.weightGrams", "low");
    out.push(
      light
        ? { q: "Hafiflik için hangisi?", winner: light.i.name, why: `Üretici verisine göre ${light.v} g ile en hafif model. Ağırlıklar farklı bedenlerde ölçülmüş olabilir; tablodaki beden notuna bak.` }
        : { q: "Hafiflik için hangisi?", winner: null, why: "Doğrulanmış ağırlık verisi en az iki modelde olmadığı için karar vermiyoruz." },
    );
    const tour = items.filter((i) => i.flags.sunVisor && i.flags.intercomReady);
    out.push({
      q: "Uzun yol için hangisi?",
      winner: tour.length === 1 ? tour[0].name : null,
      why:
        tour.length === 1
          ? "Güneş vizörü ve interkom hazırlığı birlikte yalnızca bu modelde doğrulandı; uzun yolda pratiklik sağlar."
          : tour.length > 1
            ? `${tour.map((t) => t.name).join(" ve ")} güneş vizörü ve interkom hazırlığına sahip; aralarında konfor tercihi belirleyici olur.`
            : "Modellerin hiçbirinde güneş vizörü ve interkom hazırlığı birlikte doğrulanmadı.",
    });
    const ic = items.filter((i) => i.flags.intercomReady);
    out.push({
      q: "İnterkom için hangisi?",
      winner: ic.length === 1 ? ic[0].name : null,
      why: ic.length === 1 ? "İnterkom hazırlığı yalnızca bu modelde doğrulandı." : ic.length > 1 ? "Birden fazla modelde interkom hazırlığı var; uyumlu interkom listesine bak." : "İnterkom hazırlığı doğrulanmadı.",
    });
    out.push({ q: "Sessizlik için hangisi?", winner: null, why: "Bağımsız ve aynı koşullarda yapılmış gürültü testi verisi olmadan sessizlik sıralaması yapmıyoruz." });
  }
  if (cat === "interkom") {
    const grp = by(items, "specs.meshMaxRiders", "high");
    out.push(grp ? { q: "Grup sürüşü için hangisi?", winner: grp.i.name, why: `Mesh ağında ${grp.v} sürücüye kadar destek ile en geniş grup kapasitesi.` } : { q: "Grup sürüşü için hangisi?", winner: null, why: "Mesh kapasiteleri eşit veya doğrulanmadı." });
    const bat = by(items, "specs.talkTimeHours", "high");
    out.push(bat ? { q: "Batarya için hangisi?", winner: bat.i.name, why: `Üreticiye göre ${bat.v} saat konuşma süresi ile en uzun.` } : { q: "Batarya için hangisi?", winner: null, why: "Konuşma süreleri eşit veya doğrulanmadı." });
  }
  const priced = items.filter((i) => i.price != null).sort((a, b) => a.price! - b.price!);
  out.push(
    priced.length >= 2
      ? { q: "Fiyat için hangisi?", winner: priced[0].name, why: `Kontrol ettiğimiz Türkiye satıcılarında en düşük fiyat bu modelde. Fiyat/performans kararını teknik tabloyla birlikte ver.` }
      : { q: "Fiyat için hangisi?", winner: null, why: "En az iki model için doğrulanmış Türkiye fiyatı yok." },
  );
  return out;
}

/** Değerleri ürünler arasında farklı olan satırlar vurgulanır. */
export const rowDiffers = (items: CompareEntry[], key: string) => new Set(items.map((i) => i.rows.find((r) => r.key === key)?.value ?? "—")).size > 1;

export function bestInRow(items: CompareEntry[], key: string): string | null {
  const r0 = items[0]?.rows.find((r) => r.key === key);
  if (!r0?.better) return null;
  const b = by(items, key, r0.better);
  return b ? b.i.id : null;
}

export const USAGE_Q: Record<string, string> = {
  sehir: "Şehir içi",
  uzunYol: "Uzun yol",
  otoban: "Otoban",
  sport: "Sportif sürüş",
  adventure: "Adventure",
  gozluk: "Gözlük kullananlar",
  interkom: "İnterkom",
  grup: "Grup sürüşü",
  tekSurucu: "Tek sürücü",
  ciftSurucu: "Sürücü + yolcu",
  yaz: "Yaz",
  kis: "Kış",
  yagmur: "Yağmur",
};
