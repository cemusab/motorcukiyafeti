# Ürün veri ekibi talimatı (tüm kategoriler)

Proje: /Users/cemaksakal/Projects/motorcukiyafeti · Tarih: kontrol tarihi olarak bugünü (YYYY-MM-DD) kullan.

## Önce oku
- `src/data/schema.ts` → `HelmetSchema` (kask), `IntercomSchema` (interkom), `ApparelSchema` (mont, pantolon, eldiven, bot, koruma, yagmurluk, termal), `AccessorySchema` (aksesuar), `MediaSchema`, `BrandSchema`
- `src/data/categories.ts` → geçerli alt kategori slug'ları
- Örnek kayıt: `src/data/products/kask.json` ilk kayıt veya `src/data/products/mont.json` ilk kayıt (kalite ve ton referansı)
- Mevcut marka slug'ları: `src/data/brands*.json`

## Yazacağın dosyalar (yalnızca bunlar)
- Ürünler: `src/data/products/{kategori}-{grup}.json` (JSON dizi; dosya adı kategori slug'ı ile başlamalı, ör. pantolon-g1.json, aksesuar-g1.json)
- Medya: `src/data/media-{kategori}-{grup}.json` (JSON dizi, MediaSchema)
- Marka eksikse: `src/data/brands-{grup}.json` (BrandSchema; mevcut slug'ı tekrar ekleme)
Mevcut dosyaları DÜZENLEME. Başka ekipler başka markalar üzerinde paralel çalışıyor.

## Veri kuralları (değişmez)
1. Teknik bilgi önce üreticinin resmi ürün sayfasından. Doğrulanamayan alan `null` + anahtarı `unverified` listesine (ör. "specs.weightGrams"). Asla uydurma.
2. Ağırlık: yalnız kaynakta varsa, bedeniyle (`weightSize`). ECE 22.06/DOT/Snell/FIM: yalnız kaynakta yazıyorsa true.
3. Giyim: mont/pantolon `ceStandard` ("EN 17092-3:2020" vb.) ve `ceClass` ("AAA"/"AA"/"A"); eldiven "EN 13594:2015" + "Level 1 KP" vb.; bot "EN 13634:2017" + kod (ör. "2222WR"); koruyucu "EN 1621-1/-2/-3/-4" + level; airbag için ilgili standart. Yalnız kaynakta varsa. Koruyucular (bölge, standart, level, dahil mi). Yağmurluk/termal çoğunlukla CE'siz: null bırak, su sütunu/nefes alma değerlerini yalnız kaynakta varsa açıklamaya yaz.
   Aksesuar: `specs.accessoryType` (Türkçe, ör. "Telefon tutucu"), `certification` (ör. "ART 4", "Sold Secure Gold"), `compatibility`, `capacityLiters`, `features`.
4. `manufacturerUrl` = o modelin çalışan resmi ürün sayfası (HTTP 200 doğrula). `sources` ≥1 manufacturer; her kaynak `checkedAt`.
5. Türkiye fiyatı: yetkili/yerleşik motor ekipmanı mağazaları (motomax.com.tr, mototas.com.tr, feyizoglu, motodium, vipmoto, ars motor, enduromarket.com (özellikle enduro/offroad/adventure), markanın TR sitesi/resmi mağazası). Birebir model + gerçek TL fiyat + ürün URL'si varsa `offers`; yoksa `priceRange: null`, `offers: []`. Fiyat tahmini yok. Perakendeci metni kopyalanmaz.
6. `sizeChart`: üreticinin resmi beden tablosu (kask: "Kafa çevresi (cm)", mont: "Göğüs çevresi (cm)", pantolon: "Bel çevresi (cm)", eldiven: "El çevresi (cm)"); bot ve aksesuarda []; yoksa [] + "sizeChart" unverified.
7. Metinler: özgün, uzman, sade Türkçe (summary, description ≥2 paragraf, forWho, notFor, pros, cons, usage, verdict 2-4 cümle, faq 2-3). Reklam dili yok, eksileri dürüstçe yaz. usage anahtarları — kask: sehir, uzunYol, otoban, sport, adventure, gozluk, interkom, kurye; giyim/aksesuar: sehir, uzunYol, yaz, kis, yagmur, sport, kurye (uygun olanlar). Kuryeye uygun değilse notFor'a "kurye" kelimesiyle yaz.
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

## İstisna: Venom (8 Eki 2026, site sahibinin kararı)
Venom'un resmi sitesi yok. Teknik bilgi ve TR fiyatı motoplus.com.tr (gerekirse feyizoglu.com) ürün sayfalarından alınır; `manufacturerUrl` = https://www.instagram.com/venomturkey/; `dataConfidence: "low"`; perakendeci görseli ve metni kopyalanmaz (görselsiz, çizim gösterilir). Marka resmi site açarsa kayıtlar üretici kaynağıyla güncellenir.
