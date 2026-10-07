/** Arama çekirdeği: hem sunucuda (indeks üretimi) hem tarayıcıda (sorgu) çalışır. */

export type SearchKind = "Ürün" | "Marka" | "Kategori" | "Rehber" | "Karşılaştırma" | "Araç";
export type SearchDoc = {
  t: string; // başlık
  k: SearchKind;
  h: string; // href
  d?: string; // kısa açıklama
  w?: string; // ek anahtar kelimeler
  p?: number; // en düşük fiyat (TL), "10 bin altı" sorguları için
};

const MAP: Record<string, string> = { ç: "c", ğ: "g", ı: "i", İ: "i", ö: "o", ş: "s", ü: "u", â: "a", î: "i", û: "u" };

export function norm(s: string) {
  return s
    .toLocaleLowerCase("tr")
    .replace(/[çğıİöşüâîû]/g, (c) => MAP[c] ?? c)
    .replace(/[^a-z0-9.\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Damerau-Levenshtein (yer değiştirmiş harfleri de tek hata sayar: "sheoi" → "shoei"). */
function lev(a: string, b: string, max: number) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    let best = Infinity;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      best = Math.min(best, d[i][j]);
    }
    if (best > max) return max + 1;
  }
  return d[a.length][b.length];
}

/** Sorgudaki kategori kelimesi (ör. "mont", "kask") sonuçları o kategoriye kısıtlar. */
const CATEGORY_WORDS: Record<string, string> = {
  kask: "/kask",
  kasklar: "/kask",
  mont: "/mont",
  montlar: "/mont",
  ceket: "/mont",
  eldiven: "/eldiven",
  bot: "/bot",
  botlar: "/bot",
  ayakkabi: "/bot",
  interkom: "/interkom",
  pantolon: "/pantolon",
};

/** "10 bin altı", "10000 tl alti", "15k altı" gibi bütçe ifadelerini yakalar. */
export function parseBudget(q: string): { max: number; rest: string } | null {
  const m = norm(q).match(/(\d+(?:[.,]\d+)?)\s*(bin|k)?\s*(tl)?\s*(alti|altinda|ve alti)/);
  if (!m) return null;
  let n = parseFloat(m[1].replace(",", "."));
  if (m[2] || n < 1000) n = n * 1000;
  return { max: n, rest: norm(q).replace(m[0], " ").trim() };
}

const STOP = new Set(["en", "iyi", "ve", "ile", "icin", "hangi", "mi", "mu", "nasil", "tl"]);

export function search(docs: SearchDoc[], q: string, limit = 24) {
  const budget = parseBudget(q);
  const terms = norm(budget ? budget.rest : q)
    .split(" ")
    .filter((t) => t && !STOP.has(t));
  if (!terms.length && !budget) return [];
  const catTerm = terms.find((t) => CATEGORY_WORDS[t]);
  const catPrefix = catTerm ? CATEGORY_WORDS[catTerm] : null;
  const scored: { doc: SearchDoc; score: number }[] = [];
  for (const doc of docs) {
    if (budget && (doc.p == null || doc.p > budget.max)) continue;
    // Bütçe sorgusu veya ürün odaklı sorguda kategori kelimesi varsa yalnız o kategorideki ürünler.
    if (catPrefix && doc.k === "Ürün" && !doc.h.startsWith(catPrefix + "/")) continue;
    if (catPrefix && budget && doc.k !== "Ürün") continue;
    const title = norm(doc.t);
    const titleWords = title.split(" ");
    const hay = `${title} ${norm(doc.w ?? "")} ${norm(doc.d ?? "")}`;
    const words = hay.split(" ");
    let score = 0;
    let ok = true;
    for (const t of terms) {
      if (t === catTerm && doc.k === "Ürün") {
        score += 1;
        continue;
      }
      if (titleWords.some((w) => w === t)) score += 7;
      else if (titleWords.some((w) => w.startsWith(t))) score += 5;
      else if (words.some((w) => w === t)) score += 3;
      else if (hay.includes(t)) score += 1.5;
      else if (t.length >= 4 && words.some((w) => lev(t, w.slice(0, t.length + 1), 2) <= (t.length >= 5 ? 2 : 1) || lev(t, w, 2) <= (t.length >= 5 ? 2 : 1))) score += 1;
      else {
        ok = false;
        break;
      }
    }
    if (!ok) continue;
    if (budget && !terms.length) score = 1;
    scored.push({ doc, score: score + (doc.k === "Ürün" ? 0.5 : 0) + (doc.k === "Kategori" && catTerm && doc.h === catPrefix ? 6 : 0) });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, limit).map((s) => s.doc);
}

export const KIND_ORDER: SearchKind[] = ["Ürün", "Marka", "Kategori", "Rehber", "Karşılaştırma", "Araç"];
