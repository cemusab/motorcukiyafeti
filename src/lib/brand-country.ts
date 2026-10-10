import "server-only";
import { getBrands } from "./data";
import { norm } from "./search-core";

/** Ülke sayfaları (/markalar/{ulke}): yalnız en az 3 markası olan ülkeler; "Yerli" Türkiye içindir. */
const ADJ: Record<string, string> = {
  Türkiye: "Yerli",
  İtalya: "İtalyan",
  Almanya: "Alman",
  Japonya: "Japon",
  Fransa: "Fransız",
  ABD: "Amerikan",
  "Amerika Birleşik Devletleri": "Amerikan",
  İspanya: "İspanyol",
  İsviçre: "İsviçreli",
  Hollanda: "Hollandalı",
  İngiltere: "İngiliz",
  "Birleşik Krallık": "İngiliz",
  "Güney Kore": "Güney Kore",
  Çin: "Çin",
  İsveç: "İsveç",
};
export const countrySlug = (c: string) => norm(c).replace(/[^a-z0-9]+/g, "-");
export const countryAdj = (c: string) => ADJ[c] ?? `${c} menşeli`;

export function brandCountries() {
  const by = new Map<string, ReturnType<typeof getBrands>>();
  for (const b of getBrands()) if (b.country) by.set(b.country, [...(by.get(b.country) ?? []), b]);
  return [...by.entries()].filter(([, bs]) => bs.length >= 3).map(([country, brands]) => ({ country, slug: countrySlug(country), brands }));
}
