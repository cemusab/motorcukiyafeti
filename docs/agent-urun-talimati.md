# Ürün veri ekibi talimatı (kask / mont)

Proje: /Users/cemaksakal/Projects/motorcukiyafeti · Tarih: kontrol tarihi olarak bugünü (YYYY-MM-DD) kullan.

## Önce oku
- `src/data/schema.ts` → `HelmetSchema` (kask) veya `ApparelSchema` (mont), `MediaSchema`, `BrandSchema`
- `src/data/categories.ts` → geçerli alt kategori slug'ları
- Örnek kayıt: `src/data/products/kask.json` ilk kayıt veya `src/data/products/mont.json` ilk kayıt (kalite ve ton referansı)
- Mevcut marka slug'ları: `src/data/brands*.json`

## Yazacağın dosyalar (yalnızca bunlar)
- Ürünler: `src/data/products/{kask|mont}-{grup}.json` (JSON dizi)
- Medya: `src/data/media-{kask|mont}-{grup}.json` (JSON dizi, MediaSchema)
- Marka eksikse: `src/data/brands-{grup}.json` (BrandSchema; mevcut slug'ı tekrar ekleme)
Mevcut dosyaları DÜZENLEME. Başka ekipler başka markalar üzerinde paralel çalışıyor.

## Veri kuralları (değişmez)
1. Teknik bilgi önce üreticinin resmi ürün sayfasından. Doğrulanamayan alan `null` + anahtarı `unverified` listesine (ör. "specs.weightGrams"). Asla uydurma.
2. Ağırlık: yalnız kaynakta varsa, bedeniyle (`weightSize`). ECE 22.06/DOT/Snell/FIM: yalnız kaynakta yazıyorsa true.
3. Mont: `ceStandard` ("EN 17092-3:2020" vb.) ve `ceClass` ("AAA"/"AA"/"A"/"B"/"C") yalnız kaynakta varsa; koruyucular (bölge, standart, level, dahil mi).
4. `manufacturerUrl` = o modelin çalışan resmi ürün sayfası (HTTP 200 doğrula). `sources` ≥1 manufacturer; her kaynak `checkedAt`.
5. Türkiye fiyatı: yetkili/yerleşik motor ekipmanı mağazaları (motomax.com.tr, mototas.com.tr, feyizoglu, motodium, vipmoto, ars motor, markanın TR sitesi/resmi mağazası). Birebir model + gerçek TL fiyat + ürün URL'si varsa `offers`; yoksa `priceRange: null`, `offers: []`. Fiyat tahmini yok. Perakendeci metni kopyalanmaz.
6. `sizeChart`: üreticinin resmi beden tablosu (kask: "Kafa çevresi (cm)", mont: "Göğüs çevresi (cm)"); yoksa [] + "sizeChart" unverified.
7. Metinler: özgün, uzman, sade Türkçe (summary, description ≥2 paragraf, forWho, notFor, pros, cons, usage, verdict 2-4 cümle, faq 2-3). Reklam dili yok, eksileri dürüstçe yaz. usage anahtarları — kask: sehir, uzunYol, otoban, sport, adventure, gozluk, interkom, kurye; mont: sehir, uzunYol, yaz, kis, yagmur, sport, kurye. Kuryeye uygun değilse notFor'a "kurye" kelimesiyle yaz.
8. `rivals`: en fazla 3, aynı kategoride gerçek rakipler (kendi grubundan veya mevcut ürünlerden; id "marka/slug"). Yalnız var olan veya senin eklediğin id'ler.
9. Slug: küçük harf, ascii, tire. Model adını markasız yaz (name: "Neotec 3", brand: "shoei").
10. Güncel olarak satılan modeller seç; üretimden kalkmışsa ekleme.

## Medya
- 1–4 görsel: yalnız üreticinin kendi alan adı/CDN'i; `curl -sI` ile 200 + image/* doğrula; alt Türkçe; credit = marka adı; sourcePage = manufacturerUrl.
- 0–3 YouTube videosu: `curl -s "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=ID&format=json"` ile doğrula, dönen title ve author_name'i aynen kullan; video tam bu model hakkında olmalı; Türkçe varsa öncelik; kind: resmi/inceleme; lang; checkedAt.

## Doğrulama
`cd /Users/cemaksakal/Projects/motorcukiyafeti && npx tsx scripts/validate-data.ts` → senin dosyalarınla ilgili tüm HATA satırlarını düzelt.
Zaman: ürün başına ~4 dakika. Bir ürün takılırsa atla, sonrakine geç.

## Son rapor (kısa)
Eklenen id'ler, TR fiyatlı olanlar, görsel/video sayıları, atlananlar ve nedeni.
