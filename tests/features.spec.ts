import { expect, test } from "@playwright/test";

test("ana menüdeki her link çalışıyor (desktop: üst menü, mobil: hamburger menü)", async ({ page, isMobile }) => {
  await page.goto("/");
  let hrefs: string[];
  if (isMobile) {
    await page.getByRole("button", { name: "Menüyü aç" }).click();
    const nav = page.getByRole("navigation", { name: "Mobil menü" });
    await expect(nav).toBeVisible();
    hrefs = await nav.locator("a").evaluateAll((as) => as.map((a) => a.getAttribute("href")!));
    // Alt kategori açılır listesi
    await page.getByRole("button", { name: "Kask alt kategorileri" }).click();
    await expect(nav.getByRole("link", { name: "Kapalı Kask" })).toBeVisible();
    await nav.getByRole("link", { name: "Kapalı Kask" }).click();
    await expect(page).toHaveURL(/\/kask\/kapali-kask$/);
    await expect(page.getByRole("dialog")).toHaveCount(0);
  } else {
    const nav = page.getByRole("navigation", { name: "Ana menü" });
    hrefs = await nav.locator("a").evaluateAll((as) => as.map((a) => a.getAttribute("href")!));
    await nav.getByRole("link", { name: "Kask", exact: true }).hover();
    await expect(nav.getByRole("link", { name: "Kapalı Kask" })).toBeVisible();
  }
  expect(hrefs.length).toBeGreaterThan(10);
  for (const h of [...new Set(hrefs)]) {
    const r = await page.request.get(h);
    expect(r.status(), h).toBe(200);
  }
});

test("arama autocomplete gruplu sonuç verir ve yazım hatasını tolere eder", async ({ page, isMobile }) => {
  await page.goto(isMobile ? "/arama" : "/");
  if (isMobile) {
    await page.getByLabel("Arama").fill("neotek");
    await page.getByRole("button", { name: "Ara", exact: true }).click();
    await expect(page.getByRole("link", { name: /Neotec 3/ }).first()).toBeVisible();
    return;
  }
  const box = page.getByRole("combobox").first();
  await box.fill("neotek");
  await expect(page.getByRole("option", { name: /Neotec 3/ }).first()).toBeVisible();
  await box.fill("cardo");
  await expect(page.getByText("Ürün", { exact: true }).first()).toBeVisible();
  await box.press("Enter");
  await expect(page).toHaveURL(/\/arama\?q=cardo/);
  await expect(page.getByRole("link", { name: /Packtalk Edge/ }).first()).toBeVisible();
});

test("kategori filtreleri ürün listesini daraltır", async ({ page, isMobile }) => {
  await page.goto("/kask");
  const count = page.getByText(/ürün bulundu/);
  await expect(count).toContainText(/\d+ ürün bulundu/);
  const before = (await count.textContent())!.match(/\d+/)![0];
  if (isMobile) await page.getByRole("button", { name: /^Filtrele/ }).click();
  const scope = isMobile ? page.getByRole("dialog", { name: "Filtreler" }) : page.getByRole("complementary", { name: "Filtreler" });
  await scope.getByLabel("Çene açılır kask").click();
  await expect(page).toHaveURL(/tip=/);
  if (isMobile) await scope.getByRole("button", { name: /ürünü göster/ }).click();
  await expect(count).not.toHaveText(`${before} ürün bulundu`);
  await expect(page).toHaveURL(/tip=/);
});

test("karşılaştırma: iki kask seçilir, tablo ve kısa cevap görünür", async ({ page }) => {
  await page.goto("/kask/shoei/neotec-3");
  await page.getByRole("button", { name: "Karşılaştır", exact: true }).first().click();
  await page.goto("/kask/schuberth/c5");
  await page.getByRole("button", { name: "Karşılaştır", exact: true }).first().click();
  await page.goto("/karsilastir");
  await expect(page.getByRole("heading", { name: "Kısa cevap" })).toBeVisible();
  await expect(page.getByRole("table")).toContainText("Kask tipi");
});

test("statik karşılaştırma sayfası ve kask-interkom uyumluluğu", async ({ page }) => {
  await page.goto("/karsilastir");
  await page.getByRole("link", { name: / vs / }).first().click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("vs");
  await page.goto("/interkom-uyumlulugu");
  await page.getByRole("button", { name: "Uyumlu interkomları göster" }).click();
  await expect(page).toHaveURL(/\/interkom-uyumlulugu\/.+/);
  await expect(page.getByText(/Doğrulandı|Doğrulanmadı/).first()).toBeVisible();
});

test("sihirbaz ekipman seti üretir", async ({ page }) => {
  await page.goto("/yeni-baslayanlar");
  // 1) Motor modeliyle: PCX seçilince tür otomatik scooter olur, kullanımda pist/arazi çıkmaz
  await page.getByLabel("1. Motorun hangisi?").fill("Honda PCX 125 (2021+)");
  await expect(page.getByText(/Honda PCX 125 \(2021\+\) için \d+ parçalık set/)).toBeVisible();
  const usage = page.getByLabel("2. Ne için kullanacaksın?");
  await expect(usage.locator("option", { hasText: "Pist" })).toHaveCount(0);
  await usage.selectOption("kurye");
  await expect(page.getByText(/ile kuryelik için/)).toBeVisible();
  // 2) Listede yoksa türle
  await page.getByRole("button", { name: "Listede yok / henüz almadım" }).click();
  await page.getByLabel("1. Motosiklet türü").selectOption("touring");
  await expect(page.getByText(/Touring için \d+ parçalık set/)).toBeVisible();
  await expect(page.getByRole("heading", { name: "İnterkom", exact: true })).toBeVisible();
});

test("favoriler çalışır", async ({ page }) => {
  await page.goto("/kask/hjc/i71");
  await page.getByRole("button", { name: "Favorilere ekle", exact: true }).first().click();
  await page.goto("/favoriler");
  await expect(page.getByRole("link", { name: /i71/ })).toBeVisible();
});

test("SEO: title, description, canonical ve tek h1", async ({ page }) => {
  for (const path of ["/", "/kask", "/kask/shoei/neotec-3", "/rehber/ece-22-06-nedir", "/karsilastir"]) {
    await page.goto(path);
    expect(await page.title()).not.toBe("");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{50,}/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /^https:\/\/motorcukiyafeti\.com/);
    await expect(page.locator("h1")).toHaveCount(1);
  }
});

test("yatay taşma yok (responsive)", async ({ page }) => {
  for (const path of ["/", "/kask", "/kask/shoei/neotec-3", "/karsilastir/schuberth-c5-vs-shoei-neotec-3", "/markalar", "/interkom-uyumlulugu/shoei-neotec-3"]) {
    await page.goto(path);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(over, path).toBeLessThanOrEqual(1);
  }
});

test("eski site adresleri yeni sayfalara 301 ile yönlenir", async ({ request }) => {
  for (const [from, to] of [
    ["/kask/shoei-neotec-3", "/kask/shoei/neotec-3"],
    ["/kask/dainese-racing-4", "/mont/dainese/racing-5"],
    ["/markalar/shoei", "/marka/shoei"],
    ["/rehberler", "/rehber"],
    ["/uyumluluk", "/interkom-uyumlulugu"],
  ]) {
    const r = await request.get(from, { maxRedirects: 0 });
    expect(r.status(), from).toBe(308);
    expect(r.headers()["location"], from).toContain(to);
  }
});

test("IndexNow anahtar dosyası ve llms.txt yayınlanıyor", async ({ request }) => {
  const key = await request.get("/c0904cfb25f4d685c988025395354a7e.txt");
  expect(key.status()).toBe(200);
  expect((await key.text()).trim()).toBe("c0904cfb25f4d685c988025395354a7e");
  expect((await request.get("/llms.txt")).status()).toBe(200);
});

test("site haritasındaki her adres yönlendirmesiz 200 döner (eski site yönlendirmesi gölgelemesin)", async ({ request }, info) => {
  test.skip(info.project.name !== "desktop", "Bir kez çalışır");
  test.setTimeout(300_000);
  const idx = await (await request.get("/sitemap.xml")).text();
  const paths: string[] = [];
  for (const loc of idx.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const sm = await (await request.get(new URL(loc[1]).pathname)).text();
    for (const u of sm.matchAll(/<loc>([^<]+)<\/loc>/g)) paths.push(new URL(u[1]).pathname);
  }
  expect(paths.length).toBeGreaterThan(100);
  const bad: string[] = [];
  for (const p of paths) {
    const r = await request.get(p, { maxRedirects: 0 });
    if (r.status() !== 200) bad.push(`${r.status()} ${p} -> ${r.headers()["location"] ?? ""}`);
  }
  expect(bad).toEqual([]);
});

test("motor karşılaştırma: seçim, vurgulama ve hazır çift sayfası", async ({ page, request }) => {
  await page.goto("/motor/karsilastir?m=honda-pcx-125,yamaha-nmax-125");
  await expect(page.getByRole("columnheader", { name: /Honda PCX 125/ })).toBeVisible();
  await expect(page.getByRole("rowheader", { name: "Tork" })).toBeVisible();
  // Hazır çift sayfası tabloyu sunucuda üretir (SEO): HTML'de satırlar olmalı.
  const html = await (await request.get("/motor/karsilastir/honda-pcx-125-vs-yamaha-nmax-125")).text();
  expect(html).toContain("Kısaca farklar");
  expect(html).toContain("Sele yüksekliği");
});
