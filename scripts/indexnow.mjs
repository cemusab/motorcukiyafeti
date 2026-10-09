// IndexNow: canlı site haritasındaki adresleri Bing, Yandex ve diğer IndexNow ortaklarına bildirir (Google IndexNow kullanmaz).
// Otomatik: .github/workflows/indexnow.yml her main yayınından sonra çalıştırır (bağımlılık yok, yalnız Node).
// Elle: node scripts/indexnow.mjs            → tüm site haritası
//       node scripts/indexnow.mjs /kask /mont → yalnız verilen yollar
// Anahtar dosyası: public/<anahtar>.txt (IndexNow protokolü gereği herkese açık).
import fs from "node:fs";

const SITE = "https://motorcukiyafeti.com";
const HOST = "motorcukiyafeti.com";
const keyFile = fs.readdirSync("public").find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error("public/ içinde IndexNow anahtar dosyası yok");
const key = keyFile.replace(".txt", "");

// Yayının canlıya çıktığından emin ol: anahtar dosyası canlıda okunana kadar bekle (en fazla ~10 dk).
for (let i = 0; ; i++) {
  const r = await fetch(`${SITE}/${keyFile}`, { cache: "no-store" }).catch(() => null);
  if (r?.ok && (await r.text()).trim() === key) break;
  if (i >= 20) throw new Error(`Anahtar dosyası canlıda yok: ${SITE}/${keyFile}`);
  await new Promise((res) => setTimeout(res, 30000));
}

const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const paths = process.argv.slice(2).filter((a) => a.startsWith("/"));
let urls;
if (paths.length) urls = paths.map((p) => SITE + p);
else {
  const all = [];
  for (const sm of locs(await (await fetch(`${SITE}/sitemap.xml`)).text())) all.push(...locs(await (await fetch(sm)).text()));
  urls = [...new Set(all)];
}
console.log(`IndexNow: ${urls.length} adres gönderiliyor`);
for (let i = 0; i < urls.length; i += 10000) {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key, keyLocation: `${SITE}/${keyFile}`, urlList: urls.slice(i, i + 10000) }),
  });
  console.log(`IndexNow yanıtı: ${res.status} ${res.statusText}`);
  // 403: yeni anahtar henüz doğrulanmadı (ilk gönderimde olabilir); 429: çok sık gönderim. İkisi de yayını bozmaz.
  if (res.status >= 400 && res.status !== 403 && res.status !== 429) process.exitCode = 1;
}
