/**
 * Üretici görsellerinin hâlâ yüklenip yüklenmediğini kontrol eder (haftalık çalıştır).
 * Çalıştır: npx tsx scripts/check-images.ts
 * Kırık görseller sitede otomatik olarak kategori çizimine düşer; bu betik hangilerinin yenilenmesi gerektiğini listeler.
 */
import fs from "node:fs";
import path from "node:path";

const dir = path.join(__dirname, "..", "src", "data");
type M = { product: string; images: { url: string }[] };
const items: { product: string; url: string }[] = [];
for (const f of fs.readdirSync(dir).filter((x) => /^media.*\.json$/.test(x)))
  for (const m of JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as M[]) for (const i of m.images) items.push({ product: m.product, url: i.url });

async function check(u: string) {
  try {
    const r = await fetch(u, { method: "GET", headers: { "user-agent": "Mozilla/5.0 MotorcuKiyafeti-ImageCheck" }, signal: AbortSignal.timeout(15000) });
    const ok = r.ok && (r.headers.get("content-type") ?? "").startsWith("image/");
    return ok ? null : `${r.status} ${r.headers.get("content-type") ?? ""}`;
  } catch (e) {
    return (e as Error).name;
  }
}

(async () => {
  const broken: string[] = [];
  const queue = [...items];
  await Promise.all(
    Array.from({ length: 12 }, async () => {
      for (let it = queue.shift(); it; it = queue.shift()) {
        const err = await check(it.url);
        if (err) broken.push(`${it.product}  ${err}  ${it.url}`);
      }
    }),
  );
  console.log(`Görsel: ${items.length} · kırık: ${broken.length}`);
  broken.sort().forEach((b) => console.log("KIRIK  " + b));
  process.exit(broken.length ? 1 : 0);
})();
