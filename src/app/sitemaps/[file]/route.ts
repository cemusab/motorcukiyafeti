import { routeManifest } from "@/lib/catalog";
import { abs } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return [...new Set(routeManifest().map((r) => r.group))].map((g) => ({ file: `${g}.xml` }));
}

export async function GET(_req: Request, ctx: RouteContext<"/sitemaps/[file]">) {
  const { file } = await ctx.params;
  const group = file.replace(/\.xml$/, "");
  const urls = routeManifest().filter((r) => r.index && r.group === group);
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${abs(u.path)}</loc></url>`)
    .join("\n")}\n</urlset>\n`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
