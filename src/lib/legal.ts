import "server-only";
import fs from "node:fs";
import path from "node:path";
import { LEGAL_CONFIG } from "@/data/legal-config";

type Section = { heading: string; paragraphs?: string[]; bullets?: string[] };
export type LegalPage = { slug: string; title: string; description: string; intro: string; sections: Section[] };
type LegalFile = { updatedAt: string; pages: LegalPage[]; sources: { url: string; label: string }[] };

export const LEGAL_SLUGS = ["kvkk-aydinlatma-metni", "gizlilik-politikasi", "cerez-politikasi", "basvuru"] as const;

export const legalReady = () => !!(LEGAL_CONFIG.veriSorumlusu && LEGAL_CONFIG.adres && LEGAL_CONFIG.eposta);

const TOKENS: Record<string, string | null> = {
  "{{VERI_SORUMLUSU}}": LEGAL_CONFIG.veriSorumlusu,
  "{{ADRES}}": LEGAL_CONFIG.adres,
  "{{EPOSTA}}": LEGAL_CONFIG.eposta,
  "{{KEP}}": LEGAL_CONFIG.kep,
  "{{MERSIS}}": LEGAL_CONFIG.mersis,
};

/** Boş isteğe bağlı alan içeren satır atlanır; dolu alanlar yerine konur. */
function fill(lines: string[]) {
  return lines.flatMap((l) => {
    for (const [t, v] of Object.entries(TOKENS)) {
      if (!l.includes(t)) continue;
      if (!v) return [];
      l = l.split(t).join(v);
    }
    return [l];
  });
}

export function getLegal(): LegalFile & { pages: LegalPage[] } {
  const raw = JSON.parse(fs.readFileSync(path.join(process.cwd(), "src", "data", "legal.json"), "utf8")) as LegalFile;
  return {
    ...raw,
    pages: raw.pages.map((p) => ({
      ...p,
      intro: fill([p.intro])[0] ?? "",
      sections: p.sections.map((s) => ({ ...s, paragraphs: fill(s.paragraphs ?? []), bullets: fill(s.bullets ?? []) })),
    })),
  };
}
