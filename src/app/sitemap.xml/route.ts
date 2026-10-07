import { routeManifest } from "@/lib/catalog";
import { abs } from "@/lib/site";

export const dynamic = "force-static";

/** Sitemap index: ürün, kategori, marka, rehber ve karşılaştırma sitemap'leri ayrı dosyalardır. */
export function GET() {
  const groups = [...new Set(routeManifest().filter((r) => r.index).map((r) => r.group))];
  const now = new Date().toISOString();
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${groups
    .map((g) => `  <sitemap><loc>${abs(`/sitemaps/${g}.xml`)}</loc><lastmod>${now}</lastmod></sitemap>`)
    .join("\n")}\n</sitemapindex>\n`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
