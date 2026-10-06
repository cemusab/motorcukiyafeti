import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

/** Üretici görsellerinin barındığı alan adları media*.json dosyalarından okunur; yalnızca bunlar optimize edilir. */
function imageHosts() {
  const dir = path.join(process.cwd(), "src", "data");
  const hosts = new Set<string>();
  for (const f of fs.readdirSync(dir).filter((x) => /^media.*\.json$/.test(x))) {
    for (const m of JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as { images?: { url: string }[] }[])
      for (const i of m.images ?? []) hosts.add(new URL(i.url).hostname);
  }
  return [...hosts];
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: imageHosts().map((hostname) => ({ protocol: "https" as const, hostname })),
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
