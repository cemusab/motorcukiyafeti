# Mimari (v2)

## Bilgi mimarisi ve URL haritası
| URL | Sayfa | İndeks |
|---|---|---|
| `/` | Ana sayfa: arama, "Yeni motor aldım" sihirbazı, kategoriler, markalar, editör seçimleri, rehberler | ✔ |
| `/{kategori}` | kask, mont, pantolon, eldiven, bot, interkom, koruma – filtreli liste | ✔ |
| `/{kategori}/{alt}` | Alt kategori (ör. `/kask/cene-acilir-kask`) | ürün varsa |
| `/{kategori}/{marka}/{model}` | Ürün sayfası (ör. `/kask/shoei/neotec-3`) | ✔ |
| `/kadin`, `/erkek`, `/{cinsiyet}/{kategori}` | Cinsiyet sayfaları (kask/interkom canonical → ana kategori) | ✔ |
| `/markalar`, `/marka/{slug}` | Menşe ülkeye göre markalar; marka merkezi, resmi site ve öne çıkan ürün derin linkleri | ✔ |
| `/rehber`, `/rehber/{slug}` | Rehber merkezi | ✔ |
| `/ne-almaliyim/{slug}` | Kriterleri açık öneri listeleri (en az 2 ürün yoksa yayınlanmaz) | ✔ |
| `/motosikletime-gore/{tur}` | scooter, naked, sport, adventure, touring, cruiser, enduro, kurye | ✔ |
| `/karsilastir` | 2–4 ürün karşılaştırma aracı (`?urunler=` → canonical `/karsilastir`) | ✔ |
| `/karsilastir/{a}-vs-{b}` | Yalnızca editoryal rakip çiftleri için statik SEO/GEO sayfası (alfabetik sıralı tek canonical) | ✔ |
| `/interkom-uyumlulugu`, `/interkom-uyumlulugu/{kask}` | Kask + interkom uyumluluk motoru | ✔ |
| `/yeni-baslayanlar` | Sihirbaz + başlangıç rehberleri | ✔ |
| `/favoriler`, `/arama` | Kişisel / arama | noindex |
| `/sitemap.xml` → `/sitemaps/{grup}.xml` | Sitemap index; statik, kategori, ürün, marka, rehber, karşılaştırma | – |

## Katmanlar
- `src/data/` – şema (zod), kategori ağacı, sürüş profilleri, JSON veriler
- `src/lib/data.ts` – tek veri erişim noktası (ileride Prisma)
- `src/lib/catalog.ts` – türetilmiş yapılar: karşılaştırma çiftleri, listeler, cinsiyet, uyumluluk, **route manifest**
- `src/lib/labels.ts` – teknik özellik satır tanımları (ürün sayfası + karşılaştırma ortak)
- `src/lib/compare-core.ts` – karşılaştırma karar kuralları (şeffaf)
- `src/lib/search-core.ts` – Türkçe karakter ve yazım hatası toleranslı arama, "10 bin altı" bütçe ayrıştırma
- `/search-index.json`, `/compare-data.json` – build sırasında üretilen statik JSON (istemci araçları)
- Favoriler ve karşılaştırma listesi tarayıcıda (localStorage) tutulur; sunucuya gitmez.

## GEO (yapay zekâ arama motorları) yaklaşımı
Her rehber ve karşılaştırma sayfası ilk iki cümlede soruya doğrudan cevap verir; "Kısa cevap" kutuları, FAQPage, Article, Product, ItemList, BreadcrumbList JSON-LD; kaynak listeleri ve son kontrol tarihleri görünür.

## Test / QA
- `scripts/validate-data.ts` – data-quality agent'ın otomatik kısmı
- `tests/crawl.spec.ts` – sitemap + tüm iç linkleri gezer; 200, boş href, kırık anchor, kırık görsel, etiketsiz buton, console hatası
- `tests/features.spec.ts` – menü (desktop + mobil), arama, filtre, karşılaştırma, uyumluluk, sihirbaz, favoriler, SEO meta, yatay taşma

## Yol haritası
1. **Veritabanı + admin paneli:** Vercel Postgres (Neon) + Prisma; şema `src/data/schema.ts` ile birebir. Admin: ürün/marka/kategori/rehber/fiyat/kaynak düzenleme, SEO alanları. (Kullanıcının Vercel panelinden veritabanı oluşturması gerekir.)
2. **Fiyat turu:** kasklar için yetkili TR distribütör/satıcı fiyatları (şu an kaynaklı fiyat yok).
3. **Alıcı yorumu eğilimleri** (`buyerInsights`): Trendyol vb. popüler ürün yorumlarından beden/kalıp, olumlu/olumsuz eğilim özeti (kopyalamadan, kullanım koşullarına uyarak).
4. **Ürün genişletme:** yerli markalar (Yaren Tekstil, Forte GT, Sway, Scudo, Tech90), kurye ürünleri, pantolon/koruma/airbag kategorileri.
5. Lisanslı ürün görselleri (üretici medya kitleri / izinli feed).
6. Shopify / headless commerce bağlantısı: `Offer` modeli satıcı bağımsız tasarlandı.

## FC-Moto analizinden gelen öneriler (bkz. `docs/arastirma/fc-moto-analizi.md`)
- [x] Ölçüne göre beden filtresi (cm → üretici tablosundaki beden)
- [ ] Kalıp rozeti (dar/normal/bol) ve filtresi – `buyerInsights.fit`
- [ ] Ortak "Kullanım alanı" filtresi – yeni `ridingStyles` alanı
- [ ] Yağmurluk ve termal giyim kategorileri, kurye kiti sayfası
- [ ] Koruma kategorisini bölgelere ayırma, airbag tip/tetikleme filtreleri
- [ ] Sertifika kartı (EN 17092 / EN 13594 KP / EN 13634 haneleri, uygunluk beyanı PDF linki)
- [ ] Kategoriye özel filtreler (eldiven bilek boyu, dokunmatik; bot konç boyu; interkom tekli/çiftli)
- [ ] "Bununla iyi gider" blokları (mont+pantolon fermuarı, kask+uyumlu interkom, mont+sırt koruması)
