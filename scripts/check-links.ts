/**
 * Ürünlerdeki üretici sayfası (manufacturerUrl) ve satıcı (offers[].url) bağlantılarının hâlâ açılıp açılmadığını kontrol eder.
 * Çalıştır: npm run links  (ayda en az bir kez; üreticiler adres değiştirebilir, ör. Vecton 2026-10'da ürün kimliklerini değiştirdi)
 * Yalnız kesin kırıkları (404/410, alan adı yok) "KIRIK" olarak listeler; bot engeli (403/429/503) ve zaman aşımı "KONTROL" olarak ayrı yazılır.
 */
import fs from "node:fs";
import path from "node:path";

const dir = path.join(__dirname, "..", "src", "data", "products");
type P = { brand: string; slug: string; manufacturerUrl: string; offers: { url: string; seller: string }[] };
const items: { id: string; kind: string; url: string }[] = [];
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".json")))
  for (const p of JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as P[]) {
    const id = `${p.brand}/${p.slug}`;
    items.push({ id, kind: "üretici", url: p.manufacturerUrl });
    for (const o of p.offers) items.push({ id, kind: `satıcı (${o.seller})`, url: o.url });
  }

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36";
async function check(u: string): Promise<{ hard: boolean; msg: string } | null> {
  try {
    const r = await fetch(u, { method: "GET", redirect: "follow", headers: { "user-agent": UA, "accept-language": "tr,en;q=0.8" }, signal: AbortSignal.timeout(20000) });
    if (r.ok) return null;
    return { hard: r.status === 404 || r.status === 410, msg: String(r.status) };
  } catch (e) {
    const code = (e as { cause?: { code?: string } }).cause?.code ?? (e as Error).name;
    return { hard: code === "ENOTFOUND", msg: code };
  }
}

(async () => {
  const unique = new Map<string, typeof items>();
  for (const it of items) unique.set(it.url, [...(unique.get(it.url) ?? []), it]);
  const urls = [...unique.keys()];
  const hard: string[] = [];
  const soft: string[] = [];
  await Promise.all(
    Array.from({ length: 10 }, async () => {
      for (let u = urls.shift(); u; u = urls.shift()) {
        const err = await check(u);
        if (!err) continue;
        for (const it of unique.get(u)!) (err.hard ? hard : soft).push(`${it.id}  ${it.kind}  ${err.msg}  ${u}`);
      }
    }),
  );
  console.log(`Bağlantı: ${unique.size} (benzersiz) · kırık: ${hard.length} · elle kontrol: ${soft.length}`);
  hard.sort().forEach((b) => console.log("KIRIK    " + b));
  soft.sort().forEach((b) => console.log("KONTROL  " + b));
  process.exit(hard.length ? 1 : 0);
})();
