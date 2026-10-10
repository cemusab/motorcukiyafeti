/**
 * İç link tarayıcısı: ana sayfa ve sitemap'ten başlayıp tüm iç linkleri gezer.
 * Her sayfa için HTTP 200, kırık anchor, boş/# href, kırık görsel ve console hatası kontrol edilir.
 * Bir tek kırık link bile testi düşürür.
 */
import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test("tüm iç linkler, anchor'lar ve görseller çalışıyor", async ({ page, baseURL, request }, info) => {
  test.skip(info.project.name !== "desktop", "Tarayıcı testi bir kez çalışır");
  test.setTimeout(1_800_000);
  const origin = new URL(baseURL!).origin;

  const seeds = new Set<string>(["/"]);
  const idx = await request.get("/sitemap.xml");
  expect(idx.status()).toBe(200);
  for (const loc of (await idx.text()).matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const sm = await request.get(new URL(loc[1]).pathname);
    expect(sm.status(), loc[1]).toBe(200);
    for (const u of (await sm.text()).matchAll(/<loc>([^<]+)<\/loc>/g)) seeds.add(new URL(u[1]).pathname);
  }

  const queue = [...seeds];
  const seen = new Set<string>(queue);
  const failures: string[] = [];
  const anchorChecks: { page: string; hash: string }[] = [];
  const consoleErrors: string[] = [];
  page.on("console", (m) => m.type() === "error" && consoleErrors.push(`${page.url()}: ${m.text()}`));
  page.on("pageerror", (e) => consoleErrors.push(`${page.url()}: ${e.message}`));

  while (queue.length) {
    const path = queue.shift()!;
    const res = await page.goto(path, { waitUntil: "domcontentloaded" });
    const status = res?.status() ?? 0;
    if (status !== 200) {
      failures.push(`${status} ${path}`);
      continue;
    }
    const data = await page.evaluate(() => ({
      links: [...document.querySelectorAll("a")].map((a) => ({ raw: a.getAttribute("href"), href: a.href, text: a.textContent?.trim().slice(0, 40) })),
      ids: [...document.querySelectorAll("[id]")].map((e) => e.id),
      imgs: [...document.querySelectorAll("img")].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src),
      emptyButtons: [...document.querySelectorAll("button")].filter((b) => !b.textContent?.trim() && !b.getAttribute("aria-label")).length,
    }));
    if (data.imgs.length) failures.push(`kırık görsel ${path}: ${data.imgs.join(", ")}`);
    if (data.emptyButtons) failures.push(`etiketsiz buton ${path}: ${data.emptyButtons}`);
    for (const l of data.links) {
      if (!l.raw || l.raw === "#" || l.raw.startsWith("javascript")) {
        failures.push(`boş href ${path}: "${l.text}"`);
        continue;
      }
      const u = new URL(l.href);
      if (u.origin !== origin) continue;
      if (u.hash && u.pathname === new URL(page.url()).pathname) {
        if (!data.ids.includes(decodeURIComponent(u.hash.slice(1)))) failures.push(`kırık anchor ${path}${u.hash}`);
        continue;
      }
      if (u.hash) anchorChecks.push({ page: u.pathname, hash: u.hash });
      const key = u.pathname + (u.search ? u.search : "");
      if (!seen.has(key)) {
        seen.add(key);
        queue.push(key);
      }
    }
  }
  for (const a of anchorChecks.slice(0, 200)) {
    await page.goto(a.page);
    const ok = await page.evaluate((h) => !!document.getElementById(decodeURIComponent(h.slice(1))), a.hash);
    if (!ok) failures.push(`kırık anchor ${a.page}${a.hash}`);
  }
  console.log(`Taranan URL: ${seen.size}`);
  expect([...failures, ...consoleErrors], "Kırık link / hata listesi").toEqual([]);
});

test("olmayan sayfa 404 döner ve 404 sayfası gösterilir", async ({ page }) => {
  const res = await page.goto("/bu-sayfa-yok-123");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: /yolda kalmış/ })).toBeVisible();
});
