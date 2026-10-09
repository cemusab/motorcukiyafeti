import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

/**
 * Üretici görsellerinin barındığı alan adları media*.json dosyalarından okunur.
 * Next.js en fazla 50 remotePattern kabul eder: en çok görsel barındıran 49 ana alan adı (alt alan adlarıyla) optimize edilir,
 * diğerleri `unoptimized` olarak doğrudan yüklenir (src/lib/img.ts).
 */
function baseDomain(h: string) {
  const p = h.split(".");
  return p.length >= 3 && ["com", "co", "net", "org"].includes(p[p.length - 2]) && p[p.length - 1].length === 2 ? p.slice(-3).join(".") : p.slice(-2).join(".");
}
function imageBases() {
  const dir = path.join(process.cwd(), "src", "data");
  const count = new Map<string, number>();
  const hosts = new Map<string, Set<string>>();
  for (const f of fs.readdirSync(dir).filter((x) => /^media.*\.json$/.test(x))) {
    for (const m of JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as { images?: { url: string }[] }[])
      for (const i of m.images ?? []) {
        const h = new URL(i.url).hostname;
        const b = baseDomain(h);
        count.set(b, (count.get(b) ?? 0) + 1);
        hosts.set(b, (hosts.get(b) ?? new Set()).add(h));
      }
  }
  // Tek bir alan adı kullanan tabanlar için tam ad, birden fazlası için "**.taban" deseni.
  return [...count.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 49)
    .map(([b]) => {
      const hs = [...hosts.get(b)!];
      return { base: b, pattern: hs.length === 1 ? hs[0] : `**.${b}` };
    });
}
const IMG_BASES = imageBases();

/**
 * Eski sitenin (v1) indekslenmiş adreslerinden yeni yapıya kalıcı (301) yönlendirmeler.
 * v1 tüm ürünleri /kask/{marka-model} altında yayınlıyordu; eşleşen ürün varsa ürüne, yoksa marka sayfasına gider.
 */
const OLD_PRODUCTS = [
  "cardo-packtalk-edge", "sena-50s", "sena-srl3", "cardo-freecom-4x", "sena-spider-st1", "alpinestars-andes-v3-drystar",
  "dainese-super-speed-3", "alpinestars-t-gp-plus-r-v3", "dainese-racing-4", "alpinestars-missile-v2", "alpinestars-sp-8-v3",
  "dainese-full-metal-6", "alpinestars-smx-1-air-v2", "dainese-carbon-3", "tech90-kevlar-city", "alpinestars-smx-6-v2",
  "dainese-torque-3-out", "alpinestars-tech-7", "dainese-nexus-2", "alpinestars-j-6-waterproof", "revit-eclipse-2",
  "revit-sand-4-h2o", "spidi-4-season-evo", "revit-sand-4", "dainese-carbon-4-long", "five-gloves-rfx1", "knox-handroid-pod-mk4",
  "tcx-vibe-wp", "sidi-adventure-2-gore-tex", "dainese-york-air", "forma-terrain-tx", "interphone-u-com-16", "shoei-neotec-3",
  "schuberth-c5", "shoei-gt-air-3", "agv-pista-gp-rr", "agv-k6-s", "hjc-rpha-11-pro", "shoei-nxr-2", "shark-spartan-gt",
  "scorpion-exo-1400-evo", "ls2-ff327-challenger", "revit-pioneer", "dainese-carbon-4",
];

/** Eski modelin yerine gelen güncel nesil (marka/slug). */
const SUCCESSORS: Record<string, string> = {
  "dainese-super-speed-3": "dainese/super-speed-5",
  "dainese-racing-4": "dainese/racing-5",
  "alpinestars-t-gp-plus-r-v3": "alpinestars/t-gp-plus-r-v4-airflow",
  "alpinestars-missile-v2": "alpinestars/missile-v3",
  "alpinestars-andes-v3-drystar": "alpinestars/andes-air-drystar",
  "alpinestars-smx-6-v2": "alpinestars/smx-6-v3",
  "revit-sand-4-h2o": "revit/sand-5-h2o",
  "revit-sand-4": "revit/sand-5-h2o",
  "shark-spartan-gt": "shark/spartan-gt-pro",
  "ls2-ff327-challenger": "ls2/challenger-ii",
};

const OLD_BRANDS = ["shoei", "schuberth", "agv", "hjc", "ls2", "cardo", "sena", "alpinestars", "dainese", "tech90", "arai", "nolan", "revit", "spidi", "knox", "tcx", "sidi", "forma", "interphone", "shark", "scorpion"];

function legacyRedirects() {
  const dir = path.join(process.cwd(), "src", "data");
  const products: { brand: string; slug: string; category: string }[] = [];
  for (const f of fs.readdirSync(path.join(dir, "products")).filter((x) => x.endsWith(".json")))
    products.push(...(JSON.parse(fs.readFileSync(path.join(dir, "products", f), "utf8")) as typeof products));
  const brands = new Set<string>();
  for (const f of fs.readdirSync(dir).filter((x) => /^brands.*\.json$/.test(x)))
    for (const b of JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as { slug: string }[]) brands.add(b.slug);
  const norm = (s: string) => s.replace(/-/g, "");
  const out: { source: string; destination: string; permanent: boolean }[] = [];
  for (const old of OLD_PRODUCTS) {
    const hit =
      products.find((p) => norm(`${p.brand}-${p.slug}`) === norm(old)) ??
      products.find((p) => SUCCESSORS[old] === `${p.brand}/${p.slug}`);
    const brand = [...brands].find((b) => old.startsWith(b + "-"));
    const destination = hit ? `/${hit.category}/${hit.brand}/${hit.slug}` : brand ? `/marka/${brand}` : "/markalar";
    out.push({ source: `/kask/${old}`, destination, permanent: true });
  }
  out.push(
    ...OLD_BRANDS.map((b) => ({ source: `/markalar/${b}`, destination: brands.has(b) ? `/marka/${b}` : "/markalar", permanent: true })),
    { source: "/rehberler", destination: "/rehber", permanent: true },
    { source: "/rehberler/:slug*", destination: "/rehber", permanent: true },
    { source: "/uyumluluk", destination: "/interkom-uyumlulugu", permanent: true },
    { source: "/gizlilik", destination: "/gizlilik-politikasi", permanent: true },
    { source: "/kullanim-sartlari", destination: "/veri-politikasi", permanent: true },
    { source: "/kurye", destination: "/motosikletime-gore/kurye", permanent: true },
    { source: "/saticilar", destination: "/markalar", permanent: true },
    { source: "/hesabim", destination: "/favoriler", permanent: true },
    { source: "/admin/:path*", destination: "/", permanent: false },
    // /aksesuar ve /yagmurluk artık kategori sayfası; eski sitenin bu adreslere ait yönlendirmeleri kaldırıldı (2026-10-09).
    { source: "/termal-giyim", destination: "/termal", permanent: true },
    // Üretici sitesi askıya alınan ve geçici olarak yayından kaldırılan ürünler (docs/askiya-alinan/).
    { source: "/eldiven/five-gloves/:slug", destination: "/eldiven", permanent: false },
    { source: "/marka/five-gloves", destination: "/markalar", permanent: false },
  );
  return out;
}

const nextConfig: NextConfig = {
  // İstemci ve sunucu bileşenleri hangi görselin optimize edilebileceğini bilsin diye (src/lib/img.ts)
  env: { NEXT_PUBLIC_IMG_PATTERNS: IMG_BASES.map((x) => x.pattern).join(",") },
  async redirects() {
    return legacyRedirects();
  },
  images: {
    remotePatterns: IMG_BASES.map((x) => ({ protocol: "https" as const, hostname: x.pattern })),
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
