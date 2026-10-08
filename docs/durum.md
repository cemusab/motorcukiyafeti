# Çalışma durumu (son güncelleme: 2026-10-07)

✅ 2026-10-07: v2 yayında (PR #1 main'e birleştirildi, kullanıcı onayıyla). Canlı: https://motorcukiyafeti.com
Açık konular: www → apex yönlendirmesi (Vercel alan adı ayarı, kullanıcı onayı gerekli), Google Search Console, veri sorumlusu bilgisi, admin/DB.

## Tamamlanan (v2 dalında)
- Site iskeleti, Motomax tarzı üst bar, mega menü, arama, filtreler (ölçüye göre beden dahil), karşılaştırma, kask+interkom, sihirbaz (motor modeli ile), /motor, /kadin, /erkek, kurye, KVKK/GDPR sayfaları, iletişim + e-postayla onaylı yorumlar
- Veri: 28 kask, 5 interkom, ~119 giyim (mont grupları g1/g2/g3/g5 + kadın), 45 marka (tarihçe + en güçlü kalem), 44 rehber
- Yerli marka: rozet, "Önerilen"de öne alma, "Yerli marka" filtresi, sihirbazda öncelik (commit bekliyor olabilir)
- Karşılaştırma çubuğu mobilde tek satır + ✕ ile sıfırlama

## Bekleyen (sıradaki adımlar)
1. ✅ Tüm ürün ekipleri bitti ve commit'lendi (103 kask, 105 mont).
2. ✅ Karşılaştırmayı bitir düğmesi
3. ✅ Önceki/sonraki gezinme
4. ✅ Yerli markalar bölümü + eski URL 301 yönlendirmeleri (next.config.ts)
5. ✅ Dev server / tip dosyaları yenilendi (yeni görsel alan adları next.config'e build/başlangıçta okunur)
6. ✅ QA yeşil (1356 URL taraması dahil), Lighthouse mobil SEO 100 her sayfada; Performance 85–93 (ürün sayfaları 85: üretici görseli ilk optimizasyonu). Push edildi (PR güncellenir); Lighthouse mobil: SEO ≥95 zorunlu, Performance >90 hedef
7. Sonraki aşama: Postgres + admin paneli + site içi yorum formu (Resend), veri sorumlusu bilgisi netleşince legal-config güncelle

## 2026-10-07 veri turu (tamamlandı)
436 ürün: 103 kask, 105 mont, 39 pantolon, 43 eldiven, 43 bot, 24 koruma, 21 interkom, 12 yağmurluk, 10 termal, 36 aksesuar · 78 marka · 44 rehber
Yeni kategoriler: yağmurluk, termal, aksesuar; koruma alt grupları. Görsel optimizasyonu en çok kullanılan 49 alan adıyla sınırlı (Next.js 50 limit), diğerleri unoptimized.
✅ Uyumluluk genişletildi: 17 kaska özel interkom, 167 kayıt (doğrulanmış 108+9), interkoma hazır tüm kasklara otomatik "teyit edilmedi" satırları.
Sıradaki: yayına alma (kullanıcı onayı); admin/DB; Search Console.

## Güncel rapor ve yol haritası
Tam durum ve adım adım plan: `docs/RAPOR.md` (7 Ekim 2026). Şu anki aşama: **AŞAMA 1 — İndeksleme** (büyük değişiklik yok; Search Console/Analytics takibi).

## Bekleyen iş (7 Eki 2026, dış değerlendirmeden) — 18:10 sonrası yapılacak
1. Görseller: kırık görsel yedeği (onError → SVG), haftalık görsel kontrol betiği, optimize edilmeyen görseller (HJC interkom), `docs/gorsel-izinleri.md` (üretici medya koşulları özeti, karar sahibe).
2. Ana sayfa: "Editörün Seçimleri" ile "Yerli markalar" ürünleri çakışmasın.
3. Küçük hatalar: üstteki "/arama" etiketi; Pantolon menüsü rehber linki (doğru rehber veya yeni "pantolon nasıl seçilir"); "Popüler Markalar" gerçek popülerlik sırası (ABUS/BUFF başta olmasın).
4. Kartlarda fiyat yanında satıcı sayısı + kontrol tarihi.
5. ÖNCELİK — karşılaştırmalar: bütçe segmentli (10 bin altı, 10–20, 20–35 bin kask; mont/eldiven/bot için de) hazır karşılaştırmalar ve listeler; öne çıkan karşılaştırmalar yeni başlayan/kurye segmentinden.
Not: Repo `cemusab/motorcukiyafeti`, Vercel'e bağlı; sıfırdan başlanmayacak, mevcut v2 üzerinde düzeltilecek.

## "devam" protokolü — düzenli veri turları (7 Eki 2026'da kararlaştırıldı)
Kullanıcı "devam" dediğinde sıradaki turu yap. Otomatik zamanlama YOK; tur yalnızca "devam" ile başlar.

**Her tur:**
1. Önce bu dosyadaki "Tur kayıtları"na bak, sıradaki turu seç.
2. Turda **toplam 20–30 ürün** (kategori başına 10 değil). Öncelik sırası:
   a. Türkiye'de satılan ve fiyatı doğrulanabilen modeller
   b. Yerli markalar (Yaren, Tex Motor/Forte GT/Sway, Scudo, Tech90/Vecton, Riderdenim, YDS, LBC, Metanic, Venom — site sahibi özellikle istedi)
   c. Kurye ürünleri
   d. Mevsim (Ekim–Şubat: kışlık mont/eldiven, termal, yağmurluk, ısıtmalı)
   e. Search Console'da aranan marka/ürünler (veri gelince)
   **Kalıcı öncelik (8 Eki 2026, site sahibi):** her turda kadın ürünlerine ağırlık ver; öncelik KORUMA (sertifikalı kadın pantolon/mont AA-AAA, eldiven EN 13594, bot EN 13634, kadın göğüs/sırt koruyucu). Kadın sayısı (8 Eki): mont 25, pantolon 5, eldiven 9, bot 8, koruma 0 → pantolon, koruma, eldiven, bot öncelikli.
3. Kurallar: `docs/agent-urun-talimati.md`; uydurma veri yok; yeni ürün dosyaları `src/data/products/{kategori}-{tur}.json`.
   **Her turda ayrıca 2–3 blog yazısı** (`src/data/guides/`): turun ürünleriyle bağlantılı rehber + güncel/sezonluk konu. İlk iki cümle soruyu doğrudan cevaplar (GEO), her rakam kaynaklı, özgün Türkçe. Konu havuzu:
   - Reflektörlü yelek ve görünürlük (EN 17353 vs EN ISO 20471), kışın motosiklet sürüşü, buzlu/ıslak zeminde sürüş
   - Kurye ekipmanı yıllık maliyet hesabı, kurye mont/yağmurluk karşılaştırması, kurye iş güvenliği güncel düzenlemeler
   - Yerli üretici profilleri (Yaren, Tex Motor, YDS, Riderdenim, Tech90): ne üretiyorlar, sertifikaları
   - "X bütçeyle tam ekipman seti" (10/20/40 bin TL), yeni başlayanlar için ilk alışveriş listesi
   - Ehliyet sınıfları (A1/A2/A, B ile 125cc), motor alırken ekipman bütçesi
   - Kask bedeni sorunları, gözlüklüler için kask, kadın sürücü kalıp rehberi
   - Sezon: kış bakımı ve motoru kışa hazırlama, ilkbahar ekipman kontrolü
   - MotoGP/WorldSBK sezon notları (Toprak Razgatlıoğlu dahil) — yalnız doğrulanmış bilgi
4. Bitince `npm run validate` + `npm run qa` yeşil → **tek commit, tek push** (`main`).
5. Bu dosyaya tur kaydı ekle; kullanıcıya kısa rapor ver.

**Tur kayıtları / plan:**
- [x] Tur 1 (+ blog: reflektörlü yelek ve görünürlük standartları; kışın motosiklet sürüşü): YENİ kategori "Görünürlük / reflektörlü yelek" (koruma altında `gorunurluk-yelegi` alt kategorisi veya ayrı kategori; EN 17353 / EN ISO 20471) 10–15 ürün + kışlık ürünler (kışlık mont, kışlık eldiven, termal, yağmurluk) 10–15 ürün
  - 7 Eki 2026 tamamlandı: 25 ürün (12 görünürlük yeleği koruma-t1: Tex Motor Forte GT ×5, Rev'it, Oxford ×2, Richa ×3, Bering; 13 kışlık: Scudo Alaska, Tex Motor Forte GT mont ×4 ve yağmurluk ×2, Scudo/Knox/Dainese ×2 eldiven, Held ve Odlo termal) + 2 blog (reflektorlu-yelek-ve-gorunurluk-standartlari, kisin-motosiklet-surusu). 16 ürün TR fiyatlı. Atlananlar: Halvarssons (site kapalı), Yaren YRN-6035/6037 (fiyat yok). Açık not: Yaren kışlık ürünleri fiyat çıkınca; EN 17353 model bazında teyit edilecek (Tex Motor).
- [x] Tur 2 (+ blog: kurye ekipmanı yıllık maliyet; yerli üretici profili): Kurye ürünleri + eksik TR fiyatları
  - 8 Eki 2026 tamamlandı (kullanıcı istekleriyle genişledi): ~84 yeni ürün + 20 mevcut ürüne TR fiyatı + 4 rehber + SEO.
    - kask-t2 (10: LS2, Nolan, Scorpion ×4, HJC ×2, MT), kask-t2a Axor (7; marka Hindistan, yerli DEĞİL, TR resmi mağaza Artı Grup)
    - kurye *-t2 (13: Yaren, Tex Motor, Shima, Givi, SP Connect, Quad Lock)
    - kadın koruma *-t2k (14: Knox, Riderdenim, Dainese, Leatt, Alpinestars, Shima) — yeni marka leatt
    - Venom *-t2v (10; resmi site yok → Motoplus kaynaklı, dataConfidence low, görselsiz; istisna docs/agent-urun-talimati.md'de)
    - TNSPRO mont-t2n (4; resmi sitede yalnız mont var)
    - BMW Motorrad + premium adventure *-t2b (13; BMW verisi bmwmotorcycles.com, fiyat shop.bmw-motorrad.com.tr)
    - Rehberler: kurye-ekipmani-yillik-maliyet, yerli-motosiklet-ekipmani-ureticileri, motosiklet-kiyafeti-nasil-secilir, kadin-motosiklet-kiyafeti-rehberi
    - SEO (ilk 10 rakip analizi): ana sayfa H1 "Motosiklet Kıyafetleri ve Ekipmanları"; kategori/alt kategori/kadın-erkek başlıkları ad tamlamasıyla (src/data/category-seo.ts); kategori SSS + FAQPage (src/data/category-faq.json, 43 soru)
    - İzinli mağazalara enduromarket.com eklendi.
  - Açık: BMW GS Rallye Carbon kask (ECE sürümü doğrulanamadı); Dainese/Rev'it/iXS adventure TR fiyatı; Halvarssons; beden tablosu eksik ürünler; bütçe dilimlerine koruma/yağmurluk/aksesuar eklenebilir.
- [ ] Tur 3 (+ blog: bütçeyle tam ekipman seti; ehliyet sınıfları ve ekipman): Search Console verisine göre aranan markalar/modeller
- [ ] Sonra: haftada ~2 tur ritmi
