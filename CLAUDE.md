@AGENTS.md

# MotorcuKiyafeti.com – Proje Kuralları

Bu dosya her oturumun başında okunur. Proje tanımının özeti `docs/proje-brief.md`, mimari `docs/mimari.md` içindedir. Çelişki olursa brief geçerlidir.

## Amaç
Türkiye'nin kapsamlı motosiklet ekipmanı rehberi: ürün keşfi, karşılaştırma, satın alma rehberi, SEO/GEO içerik platformu. Mağaza değil. Yeni motorcu "ne almalıyım?", deneyimli motorcu "bu iki kasktan hangisi?" sorusunun cevabını bulmalı. Kuryeler ve yerli üreticiler özel önemde.

## Teknoloji (v2, `v2` dalı)
Next.js 16 App Router + TypeScript + Tailwind v4. Tüm sayfalar build sırasında statik üretilir (SSG, `dynamicParams = false`).
Veri şimdilik `src/data/**/*.json` dosyalarında, `src/data/schema.ts` (zod) ile doğrulanır; erişim yalnızca `src/lib/data.ts` üzerinden. PostgreSQL + Prisma ve admin paneli sonraki aşamadır; geçişte yalnızca `data.ts` değişir.

## Değişmez kurallar
1. Çalışmayan link, buton, boş href yok. Hedefi olmayan sayfaya link verilmez. Route listesi `src/lib/catalog.ts > routeManifest()`; sitemap ve testler bunu kullanır.
2. Uydurma veri yok. Puan, yorum, fiyat, ağırlık, standart, interkom uyumluluğu kaynaksız yazılmaz. Doğrulanamayan alan `null` + `unverified` listesine; arayüzde "Doğrulanıyor".
3. Her kayıtta `sources` (url, type, label, checkedAt), `manufacturerUrl`, `lastCheckedAt`, `dataConfidence`.
4. Rakip/perakendeci sitelerden metin veya fotoğraf kopyalanmaz. Ürün görselleri yalnızca **üreticinin resmi sitesinden**, kaynak gösterilerek kullanılır (site sahibinin kararı, `src/data/media.json`); görsel yoksa SVG çizim gösterilir. YouTube videoları youtube-nocookie ile, tıklayınca yüklenir. Alıcı yorumları (`buyerInsights`) kendi cümlemizle özetlenir.
5. Sayısal "MotorcuKiyafeti puanı" yok. Karşılaştırma kararları `src/lib/compare-core.ts` içindeki şeffaf kurallarla verilir; veri yoksa kazanan ilan edilmez.
6. Mevcut çalışan özellik silinmez. Her değişiklikten sonra `npm run qa` (validate + build + Playwright) çalışır; kırmızıyken iş bitmiş sayılmaz.
7. Çalışmayan özellik mock bırakılmaz: ya tamamlanır ya arayüzden kaldırılır.
8. KVKK ve GDPR: yeni bir veri işleme (form, analitik, çerez, yeni üçüncü taraf) eklenirse önce `src/data/legal.json` metinleri güncellenir; rıza gerektiren çerez/izleme rızasız çalışmaz.

## Deploy disiplini (Vercel limitleri dolmuştu)
- Her küçük değişiklikte push ETME. İlgili değişiklikleri biriktir, tek committe birleştir.
- Push'tan önce yerelde `npm run qa` (validate + build + Playwright) yeşil olmalı.
- Canlıya çıkış yalnızca `main`'e push ile ve günde mümkün olduğunca bir kez. `v2` ve diğer dallar Vercel'de derlenmez (`scripts/vercel-ignore.sh`).
- Yalnızca docs/*.md/tests değişikliği derleme tetiklemez; yine de gereksiz push yapma.
- Önizleme deployment'ı gerekiyorsa kullanıcıya sor.

## "devam" protokolü
Kullanıcı "devam" dediğinde `docs/durum.md` > "devam protokolü" bölümündeki sıradaki veri turunu yap (tur başına toplam 20–30 kaliteli ürün + 2–3 blog yazısı, öncelik: TR'de satılan + fiyatlı, yerli, kurye, mevsim). Tur sonunda tek push.

## Komutlar
- `npm run dev` – geliştirme sunucusu (arka planda çalıştır, bekleme)
- `npm run validate` – veri kalitesi kontrolü (şema, yinelenen kayıt, kırık referans, kaynaksız fiyat)
- `npm run qa` – validate + build + tüm Playwright testleri (iç link tarayıcı dahil)

## Veri ekleme
Yeni ürün: ilgili `src/data/products/{kategori}.json` dosyasına şemaya uygun kayıt ekle → `npm run validate` → `npm run qa`. Marka: `brands.json` veya `brands-2.json`. Rehber: `src/data/guides/{slug}.json` (tek elemanlı dizi). Kategori ağacı: `src/data/categories.ts`.

## Tasarım
Koyu başlık, beyaz yüzeyler, kırmızı (#d4202a) vurgu; Barlow Condensed başlık, Barlow gövde; mobile-first. Referans: `docs/design/reference.webp` (içindeki puan/fiyatlar örnektir). İlk prototip: `docs/design/prototype.html`.

## Sıradaki işler
Güncel durum ve adım adım yol haritası: `docs/RAPOR.md`. Oturum notları: `docs/durum.md`.
