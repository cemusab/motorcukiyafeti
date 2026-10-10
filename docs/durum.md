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
- **8 Eki 2026 ek yayınlar (Tur 2 sonrası):** Mobil: kaydırılabilir kategori şeridi (MobileCategoryStrip), menüde hızlı erişim kutuları, 2 sütunlu ürün kartları, yapışkan filtre çubuğu ve yeni filtre penceresi. SEO (Manus incelemesi): verisi yetersiz ikili karşılaştırmalar noindex + site haritası dışı (`pairIndexable`, src/lib/compare.ts; ~1.063 → dizinde ~400 civarı), marka başlıkları kategoriyle ("Shoei Kask Modelleri…"), ana sayfa "Motosiklet Ekipmanları ve Kıyafetleri Rehberi", kask/mont tür tabloları (TYPE_TABLES), /llms.txt. Sonraki SEO fikirleri: sessiz/hafif kask rehberi, marka sayfalarına özgün açıklama, ürün sayfasında bütçe/üst alternatif.
- **Mola (8 Eki 2026, site sahibiyle kararlaştırıldı):** Tur 3'ten önce Google indekslemesi beklenecek (~1–2 hafta). Devam edilince önce Search Console'a bak: Sayfalar (dizine eklenen / eklenmeyen ve nedenleri), Site haritaları durumu (sitemap.xml "Başarılı" mı), Performans > Sorgular (Tur 3 marka/model listesi buradan). Sorunlu sayfa nedenleri varsa önce onlar düzeltilir.
- [x] Tur 3 (+ blog: bütçeyle tam ekipman seti; ehliyet sınıfları ve ekipman): Search Console verisine göre aranan markalar/modeller
  - 9 Eki 2026 BAŞLADI (site sahibi: TR mağazalarından daha çok ürün). 4 ekip: kask-t3 (12–15, TR mağaza fiyatlı), mont-t3 + pantolon-t3 (kadın ≥4), eldiven-t3 + bot-t3 + koruma-t3 (kadın koruma öncelikli), 2 blog (butceye-gore-tam-motosiklet-ekipman-seti, motosiklet-ehliyet-siniflari-ve-ekipman). Yarım kalırsa: `git status` → eksik tamamla → validate + qa → commit → push (site sahibine sor).
  - 9 Eki 2026 tamamlandı: 42 ürün (15 kask: Airoh ×7, Acerbis ×2, Scorpion ×2, Torc ×3, Just1 — yeni markalar acerbis/just1/torc; 12 mont-pantolon, 8 kadın; 15 eldiven-bot-koruma, 5 kadın) + 3 rehber (butceye-gore-tam-motosiklet-ekipman-seti, motosiklet-ehliyet-siniflari-ve-ekipman, kask-sertifikalari-ne-anlama-gelir). `npm run links` eklendi; Vecton 6 ürünün yeni adresleri. Kasklarda sertifika durumu: yeşil "ECE 22.06" / turuncu "ECE doğrulanıyor" + ürün sayfasında uyarı kutusu. Açık: kadın koruyucu TR fiyatlı bulunamadı; Airoh Aviator 3; Nolan beden tablosu; Shoei/Arai/Schuberth/Nexx tabloları JS.
- **Karar (10 Eki 2026, site sahibi):** Aşama 3 (yönetim paneli, veritabanı, yorum formu) **Kasım 2026**'ya ertelendi. Şimdilik öncelik: veri/ürün eklemeleri, eksik TR fiyatları, SEO ve Search Console verisine göre iyileştirmeler.
- **10 Eki 2026 yayınlandı:** Tur 4/5 + Tur 6 (lastik 28, yağ-bakım 30, 13 zayıf alt kategori ürünü, M1/M2 fiyat). Kontroller: qa 28/28 (4.122 URL), görsel 1.431/0 kırık, bağlantı 1.785/0 kırık (8 bot engelli site tarayıcıda açılıyor). Açık: Pirelli/Metzeler/Bridgestone/Continental motosiklet lastiği izinli mağazalarda satılmıyor (fiyat yok); deri pantolon ve ısıtmalı giyimde TR fiyatlı ürün bulunamadı.
- [~] Tur 4/5 — 10 Eki 2026 gece (01:16–03:40 oturumu): kod tamam — lastik + yağ/bakım kategorileri (TireSchema, CareSchema, filtreler, spec tabloları, SSS), motor sayfasında "uygun lastikler/yağlar" ve ürün sayfasında "uyumlu motorlar"; motor teknik verileri (74 model: güç, tork, ağırlık + tanımı, sele, depo); /motor/karsilastir aracı (4 model, en iyi değer vurgusu, farklı ağırlık tanımı karşılaştırılmaz, fiyat yok), hazır çift sayfaları /motor/karsilastir/{a}-vs-{b} (aynı tip ±%35 cc; yalnız tam veri + aynı ağırlık tanımı indexlenir), /motor/sele-yuksekligi tablosu; 2 rehber (test sürüşü, ikinci el). Masaüstü kırmızı çubuk lg'de taşıyordu: Motosikletime göre/Markalar/Rehberler lg'de yardımcı satıra alındı.
- [ ] Tur 4 (yeni kategoriler, site sahibinin isteği 9 Eki 2026): **Lastik** ve **Yağ & bakım ürünleri** kategorileri. Önce şema: lastik (ebat, ön/arka, radyal/çapraz, hız/yük endeksi, kullanım tipi, DOT yılı yok – ürün kaydı model bazında), yağ (viskozite, JASO MA/MA2/MB, API, baz yağ tipi, hacim), bakım (zincir yağı/temizleyici, fren hidroliği DOT, soğutma sıvısı). compare-core kuralları, filtreler, bütçe dilimleri. Yerli: Anlas (lastik), PO/Opet (yağ) varsa. Rehberler hazır: motosiklet-lastik-markalari, motosiklet-yagi-ve-bakim-urunleri, motosiklet-lastigi-nelere-dikkat-edilmeli. Fikir (10 Eki 2026, karakrider.com/yag-danismani incelendi; metin/tasarım kopyalanmaz): (1) "Yağ seçici" aracı — motor seç → motorcycles.json'daki üretici yağ önerisi (kaynaklı) varsa onu göster, yoksa motor tipine göre (vitesli MA2 / scooter MB / 2T FD) genel yönlendirme + kaynaklı sıcaklık–viskozite tablosu; (2) yağ kategorisi filtreleri: JASO, viskozite, baz yağ, hacim, motor tipi, TR fiyat (yerli PO Maximoto, Opet Fullmoto); (3) motor sayfasında "bu motora uygun yağlar" (yalnız üretici sınıf+viskozite eşleşmesi); (4) aynı yapı lastik için: motor → fabrika ebadı → o ebattaki lastikler. Rakibin farkı: model bazlı öneri vermiyor; bizde kaynaklı model verisi var.
- [ ] Tur 5 (site sahibinin fikri, 10 Eki 2026; karakrider.com/karsilastirmalar incelendi): **Motor karşılaştırma + otomatik ekipman.** En fazla 4 motor yan yana: tip, cc, ehliyet, güç (kW/hp), tork, ağırlık, sele yüksekliği, lastik ebatı, önerilen yağ (yeni alanlar MotorcycleSchema'ya, resmi teknik sayfadan, kaynaklı). En iyi değer vurgusu (sele yüksekliği gibi kişisel değerler hariç), "yalnız farkları göster". Her motorun altında otomatik ekipman: wizardSet(tip) giyim seti + Tur 4 yağ/lastik eşleşmesi + fiyatlı ürünlerden yaklaşık set toplamı. Motor fiyatı GÖSTERİLMEZ — site sahibinin kararı (10 Eki 2026): "biz öneri sitesiyiz, hareketli fiyatlar yorar". Ekipman fiyatları (satıcı + kontrol tarihiyle) mevcut haliyle kalır. Popüler çiftler için statik "/motor/karsilastir/{a}-vs-{b}" sayfaları (yalnız iki modelde de yeterli veri varsa indexlenir).
- [ ] Bekleyen: Aprilia/Piaggio/Vespa modelleri (TR siteleri distribütör değişimi nedeniyle bakımda, 9 Eki 2026); Five eldiven geri dönüşü (alan adı askıda, docs/askiya-alinan/).
- [ ] Sonra: haftada ~2 tur ritmi
