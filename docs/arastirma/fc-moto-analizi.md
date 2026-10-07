# FC-Moto UX / Bilgi Mimarisi Analizi

> Tarih: 2026-10-06 · Kapsam: yalnızca yapı, mantık ve UX kalıpları. Metin, görsel, tasarım veya ürün açıklaması kopyalanmamıştır. robots.txt'te yasaklı olan faceted/remote search uç noktaları (`ViewAction=FacetedSearchProducts` vb.) ziyaret edilmedi; yalnızca normal kategori, ürün ve marka sayfaları okundu (~20 sayfa).
> Not: `fc-moto.de` artık `fc-moto.com/de-de/...` adresine yönleniyor; İngilizce sürüm `fc-moto.com/en-gb/` altında ama derin linkler tahmin edilemediği için analiz Almanca sayfalar üzerinden yapıldı.

## Özet

- **Tek eksenli ağaç + çok eksenli filtre:** FC-Moto alt kategorileri sade tutuyor (kaskta tip, montta malzeme/biçim, eldiven/botta kullanım alanı); mevsim, kullanım, sertifika, kapama, cinsiyet gibi boyutları her kategoride **aynı sırada tekrarlanan ortak facet seti** ile veriyor. Bizde bu boyutlar kategoriye göre dağınık.
- **Beden = ölçü:** Beden seçicide her beden etiketinin yanında cm karşılığı var (kask: kafa çevresi; eldiven: avuç çevresi). Kask beden tablosunda yanak/tepe süngeri kalınlığı da yer alıyor. Montlarda **K- (kısa), L- (uzun), B- (göbekli)** özel kalıp bedenleri ayrı etiketleniyor.
- **Kalıp bilgisi formal değil:** "Bir numara büyük geliyor" türü kalıp bilgisi yalnızca yorumlardan çıkıyor; yapılandırılmış "kalıp" alanı yok. Bizim `buyerInsights.fit` alanımız bu konuda onlardan ileride — öne çıkarılmalı.
- **Sertifika şeffaflığı:** Eldiven sayfasında EN 13594 + KP1 (boğum koruması) gösterimi ve **AB Uygunluk Beyanı PDF'i** linki var. Bot/mont tarafında bölge bazlı seviye gösterimi zayıf — bizim için ayrışma fırsatı.
- **Kategoriler arası tamamlayıcılık:** Ürün sayfasında "Tamamlayıcı ürünler" (bot → aynı markanın pantolon/montu), Funktionsbekleidung (termal, ısıtmalı, soğutmalı) ve Regenbekleidung gibi **katman/hava koşulu** kategorileri; airbag'de **tetikleme tipi** ve **entegre/hazır** ayrımı. Bunlar kurye/commuter ve 4 mevsim kullanıcıları için doğrudan değer taşıyor.

## Kategori önerileri

FC-Moto'nun kullandığı boyutlar ve bizde (`src/data/categories.ts`) eksik olanlar:

| Kategori | FC-Moto boyutları | Bizde olan | Eksik / önerilen alt kategori |
|---|---|---|---|
| Kask | Tip (integral, çene açılır, jet, enduro, cross, modüler), **kadın**, **çocuk**; ayrıca vizör/pinlock aksesuarları, helmet elektroniği, HUD, kask kamerası | Tip, kullanım, malzeme | `kadin-kask` (cinsiyet sayfası canonical'ı ana kategoriye gittiği için alt kategori olarak değil, "Küçük kafa / XS–XXS kabuk" rehber filtresi olarak), `cocuk-kask`, `retro-klasik-kask` (Classic/Chopper kullanım alanı), ayrıca **"Vizör & Pinlock"** aksesuar kümesi (rehber + uyumluluk) |
| Mont | Malzeme (deri, tekstil), biçim (**yelek, motor gömleği, hoodie**), kullanım facet'i (sport, touring, urban, enduro/adventure, **classic/chopper**) | Mevsim, malzeme, kullanım | `motosiklet-yelegi`, `korumali-hoodie` / `korumali-gomlek` (şehir/kurye için çok aranır), `klasik-mont` (cafe racer/chopper), `yagmurluk-mont` (bkz. Yağmur) |
| Pantolon | Deri, tekstil, **jean**, askı/kemer; **kısa/uzun beden** | Tekstil, deri, kevlar jean | `korumali-tayt` / `aramid-tayt` (kadın), `yazlik-file-pantolon`, `kislik-pantolon`, `yagmur-pantolonu`, `adventure-pantolon` |
| Eldiven | Kullanım: sport, touring, classic, urban, cross/enduro, **kış** | Mevsim, kullanım | `sehir-eldiveni` (kısa bilek, kurye), `klasik-eldiven`, `cross-eldiven`, `isitmali-eldiven` |
| Bot | Sport, touring, classic/chopper, cross/enduro, **motosiklet ayakkabısı** | Şehir, touring, sport, adventure | `klasik-bot`, `cross-botu`; `sehir-botu` → "Motosiklet ayakkabısı / sneaker" ayrı (kurye için bilek boyu farkı) |
| Koruma | Bölge bazında ~19 alt kategori: airbag, korumalı ceket/gömlek/yelek, sırt, **boyun**, omuz, **göğüs**, dirsek, **böbrek kemeri**, kalça, kuyruk sokumu, korumalı şort/pantolon, diz, **reflektif yelek**, set | Sırt, airbag | `gogus-koruma`, `dirsek-diz-koruma`, `kalca-koruma` (korumalı şort), `korumali-ic-giyim` (ceket/gömlek), `bobrek-kemeri`, `reflektif-yelek`, `boyun-koruma` (cross) |
| İnterkom | Ürün tipi: **tekli / ikili set / genişletme**, teknoloji (BT, Mesh, evrensel), **kaska özel / evrensel** | Mesh, BT, kaska özel | Set tipi facet olarak (alt kategori gerekmez); `evrensel-interkom` |
| **Yeni üst grup** | **Fonksiyonel giyim**: termal içlik, çorap, balaklava, boyunluk, iç eldiven, **ısıtmalı**, **soğutmalı**; **Yağmur giyimi**: takım, mont, pantolon, galoş, eldiven | Yok (`IconName` içinde `yagmurluk`, `termal` ikonları zaten var) | `yagmurluk` ve `termal` kategorileri: `yagmur-takimi`, `yagmur-galosu`, `termal-icik`, `balaklava`, `boyunluk`, `isitmali-giyim`. Kurye ve 4 mevsim kullanıcıları için yüksek arama hacmi. |

Genel ilke: FC-Moto kullanım alanını her kategoride aynı 5–6 değerle (Sport, Touring, Urban/City, Enduro/Adventure, Classic/Chopper, Motocross) ifade ediyor. Bizde de `kullanim` sözlüğünü tüm kategorilerde ortak yapmak, `/motosikletime-gore/{tur}` sayfalarıyla doğrudan eşleşir (scooter/kurye bizim ek değerlerimiz).

## Filtre önerileri

FC-Moto'nun facet sırası (tüm giyim kategorilerinde neredeyse aynı): **Marka → Yeni/İndirimli → Renk → Beden → Özellikler → Cinsiyet → Malzeme → Mevsim → Kapama tipi → Kullanım alanı → Sertifika/Koruma sınıfı → Fiyat (slider) → Puan**. Sıralama: önerilen, çok satan, yeni, puan, fiyat ↑/↓.

Bizim `facetDefs()` ile karşılaştırma ve öneriler:

| Önerilen facet | Kategori | Neden | Gereken şema alanı |
|---|---|---|---|
| **Kullanım alanı** (sport/touring/şehir/adventure/klasik/cross/kurye) | Tümü | FC-Moto'da her kategoride var; bizde sadece alt kategori olarak | `ProductBase.ridingStyles: z.array(z.enum([...]))` (alt kategori slug'larından türetilebilir ama açık alan daha temiz) |
| **Beden (cm ile)** | Kask, eldiven, mont | "Kafam 57 cm, hangi kasklar M?" sorusu | Mevcut `sizes` + `sizeChart` yeterli; facet değeri `sizeChart` aralıklarından üretilir ("Kafa çevresi 57 cm" → uygun ürünler). Yeni alan gerekmez. |
| **Özel kalıp bedenleri** (kısa / uzun / göbekli / büyük beden 5XL+) | Mont, pantolon | Türkiye'de büyük beden ve kısa boy talebi yüksek | `ApparelSchema.specs.fitVariants: z.array(z.enum(["kisa", "uzun", "genis", "buyuk-beden"])).default([])`, `maxSize: z.string().nullable()` |
| **Kalıp** (dar / normal / bol) | Tümü | Bizde `buyerInsights.fit` var ama filtrelenmiyor | Mevcut `buyerInsights.fit`; ayrıca üretici kalıbı için `specs.cut: z.enum(["sport", "regular", "relaxed"]).nullable()` |
| **Kapama tipi** | Kask (double-D / mikrometrik / Fidlock), bot (fermuar / cırt / bağcık / BOA) | FC-Moto'da standart facet | Kask: mevcut `retention` → facet'e ekle. Bot/giyim: mevcut `closure` serbest metin → `closureType: z.enum([...]).nullable()` |
| **Sertifika** (ECE 22.06, DOT, Snell, SHARP yıldız, FIM) | Kask | FC-Moto SHARP'ı da filtreliyor | Mevcut `ece2206/dot/snell/fim` → `sinif` facet'i; yeni: `sharpStars: z.number().int().min(1).max(5).nullable()` |
| **Mevsim** | Kask | FC-Moto kaskta da mevsim facet'i kullanıyor (yazlık havalandırma) | `HelmetSchema.specs.season` veya `ventilation` için `ventilationLevel: z.enum(["dusuk","orta","yuksek"]).nullable()` |
| **Bilek boyu** (kısa / uzun) | Eldiven | Şehir vs. sport ayrımının ana kriteri | `specs.cuffLength: z.enum(["kisa", "uzun"]).nullable()` (eldivene özel `GloveSpecs` eklemek daha doğru) |
| **Boğum koruması KP1 / dokunmatik / ısıtmalı** | Eldiven | FC-Moto'da ayrı facet'ler | `knuckleKP1: tri`, `touchscreen: tri`, `heated: tri` |
| **Konç yüksekliği** (ayakkabı / kısa / orta / uzun) | Bot | Kurye/şehir karar kriteri | `specs.shaftHeight: z.enum(["ayakkabi","kisa","orta","uzun"]).nullable()` |
| **EN 13634 bölge seviyeleri** (yükseklik, aşınma, kesilme, ezilme 1/2) | Bot | FC-Moto bunu göstermiyor → bizim için fark | `bootRatings: z.object({ height, abrasion, cut, crush: z.union([z.literal(1), z.literal(2)]).nullable() }).nullable()` |
| **Koruyucu dahil mi / cep var mı** | Mont, pantolon | FC-Moto "entegre koruma: sırt dahil, dirsek, omuz" facet'i | Mevcut `protectors[].included` → facet "Sırt koruması dahil", "Göğüs cebi var". `included: false` = cep var ama koruyucu yok anlamı netleşmeli (`pocketOnly` değeri). |
| **Airbag**: entegre / hazır, tetikleme (elektronik / kablolu) | Koruma, mont | FC-Moto'da ayrı facet | `airbagType: z.enum(["entegre","hazir","yok"]).nullable()`, `airbagTrigger: z.enum(["elektronik","kablolu"]).nullable()`, `airbagSubscription: tri` |
| **İnterkom set tipi** (tekli / ikili) ve **evrensel/kaska özel** | İnterkom | FC-Moto'nun ana interkom facet'i | `packType: z.enum(["tekli","ikili","genisletme"]).nullable()`, mevcut `universalIntercom` → facet |
| **Reflektif / görünürlük** | Mont, yelek, yağmurluk | Kurye ve gece sürüşü | `reflective: tri`, `hiVis: tri` |
| **Fiyat slider** | Tümü | FC-Moto'da var; bizde `price` FacetItem'da mevcut ama veri az | `priceRange` mevcut; slider veri dolunca açılsın |
| **Renk** | Tümü | FC-Moto'da ilk sıralarda; bizim için düşük öncelik (rehber sitesi) | Mevcut `colors` (normalize edilmiş renk sözlüğü gerekir) |

Önerilen sıra (bizim için): **Kullanım → Beden (cm) → Koruma sınıfı/sertifika → Mevsim → Malzeme → Özellikler → Marka → Fiyat**. Rehber sitesi olduğumuz için "karar kriteri" facet'leri marka ve renkten önce gelmeli; FC-Moto'nun marka/renk önceliği alışveriş davranışına göre.

## Ürün sayfası önerileri

Bir rehber sitesine uyanlar (✔), kısmen uyanlar (◐), uymayanlar (✘):

- ✔ **Beden seçicide cm karşılığı:** Beden çiplerinin altında ölçü aralığı ("M · 57–58 cm"). Mevcut `sizeChart` ile hemen yapılabilir.
- ✔ **Kask iç süngeri kalınlıkları:** FC-Moto beden tablosunda yanak/tepe süngeri mm değerlerini gösteriyor. Bize: `sizeChart` satırına `cheekPadMm`, `crownPadMm` (opsiyonel) ve "yanak süngeri değiştirilebilir" bilgisi — kalıp sorununa çözüm önerisi olarak değerli.
- ✔ **Ölçü alma talimatı:** Kategoriye göre ölçüm şeması (kafa, göğüs/bel/kalça, avuç çevresi + el boyu, ayak uzunluğu). Kendi illüstrasyonumuzla ortak bir `<OlcuRehberi kind="kafa|govde|el|ayak">` bileşeni.
- ✔ **Yapılandırılmış kalıp bilgisi:** FC-Moto'da kalıp bilgisi yalnızca serbest yorum metninde. Biz `buyerInsights.fit` + `fitNote` + üretici kalıbını ("sport kesim, bir beden büyük düşünün") ürün başlığına yakın bir "Kalıp" rozetiyle gösterelim. Kaynak sayısı ve tarih şeffaf.
- ✔ **Özel bedenler:** K-/L-/B- bedenleri olan ürünlerde "Kısa boy / uzun boy / geniş kalıp seçeneği var" rozeti.
- ✔ **Sertifika kartı:** Standart + sınıf + seviye + (varsa) uygunluk beyanı PDF'ine üretici linki. FC-Moto eldivende KP1 ve DoC PDF gösteriyor; biz bunu tüm kategorilere genelleştirelim ve EN 13634 bölge seviyelerini, EN 17092 sınıfını, koruyucu bölge haritasını (dahil / cep var / yok) görsel olarak verelim. Şema: `sources[].type = "homologation"` zaten var; `declarationOfConformityUrl: z.string().url().nullable()` eklenebilir.
- ✔ **Tamamlayıcı ürünler ("Bununla iyi gider"):** FC-Moto aynı markanın pantolon/montunu öneriyor. Bize: editoryal eşleşme — bağlantı fermuarlı mont-pantolon çiftleri, kaska uygun interkom (uyumluluk motorundan), kaska uygun Pinlock/vizör, mont için sırt koruması yükseltmesi. Şema: `pairsWith: z.array(z.object({ product: z.string(), reason: z.enum(["baglanti-fermuari","interkom","koruma-yukseltme","set"]) })).default([])`.
- ✔ **Sistem uyumluluğu:** Mont–pantolon bağlantı fermuarı (kısa/uzun), clip-in membran sistemi, airbag hazırlığı. Şema: `zipConnection: z.enum(["kisa","uzun","yok"]).nullable()`, `linerSystem: z.string().nullable()`.
- ✔ **Benzer ürünler karuseli:** FC-Moto aynı markanın benzer modellerini gösteriyor; biz `rivals` ile **farklı markalardan** rakip gösterip doğrudan `/karsilastir/{a}-vs-{b}` linki verelim (mağazanın yapamadığı şey).
- ◐ **Varyant (renk) gösterimi:** Renk başına ayrı sayfa yerine tek sayfada renk listesi yeterli (bizde `colors`). Renk değişince ağırlık/fiyat değişiyorsa (karbon desen vb.) not düşülmeli.
- ◐ **Stok/teslimat:** FC-Moto beden bazında stok, "bana haber ver", mağazadan rezervasyon gösteriyor. Biz satış yapmadığımız için yalnızca `offers[].inStock`, `offers[].sizes` ve `checkedAt` ile "Son kontrol: X satıcısında M ve L bedeni vardı" biçiminde şeffaf gösterim; canlı stok iddiası yok.
- ◐ **Yorum özeti:** FC-Moto puan dağılımı + tek tek yorumlar. Biz yorum barındırmıyoruz; `buyerInsights` olumlu/olumsuz eğilim özeti yeterli (kopyalamadan).
- ✘ **Soru-cevap:** FC-Moto'da yok; bizde `faq` alanı editoryal SSS olarak zaten var, kullanıcı Q&A moderasyon yükü nedeniyle şimdilik gereksiz.
- ✘ Sepet, abonelik, mağazadan teslim, indirim rozeti: rehber sitesine uymaz.

## Menü/arama önerileri

- **Mega menüde 3 sütunlu kalıp:** FC-Moto her ürün türünde "tip/kullanım" listesi + cinsiyet girişleri + aksesuar/yedek parça kümesi veriyor. Bizde: `CATEGORIES.groups` zaten gruplu; mega menüye her kategori için (1) ana grup linkleri, (2) "Rehber: Nasıl seçilir?" linki, (3) "Ölçü ve beden tablosu" linki eklenmeli.
- **Koruma menüsünü bölge bazlı göster:** Vücut silüeti üzerinde bölge seçimi (sırt, göğüs, omuz, dirsek, kalça, diz) → ilgili alt kategori. FC-Moto bunu düz liste yapıyor; görsel seçici bizi ayırır.
- **Cinsiyet girişleri her kategoride:** FC-Moto "Erkek / Kadın / Çocuk" ağacını menü kökünde ayırıyor. Bizde `/kadin/{kategori}` sayfaları var; mega menüde her kategori altında "Kadın" kısayolu görünür olmalı.
- **"Garajım" eşleniği:** FC-Moto "Bike Garage" ile motora göre parça öneriyor. Bizde `/motosikletime-gore/{tur}` + sihirbaz var; seçilen motor tipini localStorage'da tutup kategori sayfalarında varsayılan kullanım filtresi olarak önermek (kişisel veri sunucuya gitmeden).
- **Arama:** FC-Moto'nun arama kutusu genel ürün araması. Biz `search-core.ts` ile ölçü ve bütçe ayrıştırıyoruz; buna **ölçü ayrıştırma** ("57 cm kask", "L beden mont"), **standart ayrıştırma** ("AAA mont", "level 2 sırt") ve **kullanım** ("kurye eldiveni") eklenmeli; sonuçları facet'li kategori URL'sine yönlendirmek.
- **Sıralama seçenekleri:** Rehber sitesi için "Editör önerisi, Fiyat ↑/↓, En hafif (kask), En yeni model, Veri güveni yüksek" — FC-Moto'nun "çok satan" seçeneğinin karşılığı olarak "Editör seçimi".
- **Marka sayfaları:** FC-Moto marka sayfası = banner + ürün sayısı + kategori kutucukları + tam filtre paneli. Bizim `/marka/{slug}` sayfasına **marka içi kategori kutucukları** (ürün sayılarıyla) ve **markanın kalıp karakteri** ("İtalyan markaları genelde dar kalıp", kaynaklı) bloğu eklenmeli; `BrandSchema.fitTendency: z.enum(["dar","normal","bol"]).nullable()` + `fitNote`.
- **Kurye / şehir içi:** FC-Moto'da ayrı kurye bölümü yok ama Urban/City kullanım alanı, yağmur giyimi, reflektif yelek, ısıtmalı/termal kategorileri ve kısa bilekli eldiven/motor ayakkabısı var. Bize: `/motosikletime-gore/kurye` sayfasında bu parçaları **"kurye kiti"** olarak (kask + yağmurluk + 4 mevsim eldiven + motor ayakkabısı + reflektif yelek + termal) bütçe katmanlarıyla toplamak — rakipte olmayan, Türkiye'ye özgü bir landing page.

## Uygulama önceliği

Değer / efor sırasına göre ilk 8:

| # | Öneri | Değer | Efor | Not |
|---|---|---|---|---|
| 1 | Beden seçicide ve listede **cm karşılığı** + "kafa çevrene göre filtrele" | Yüksek | Düşük | Mevcut `sizeChart` ile; yeni alan yok |
| 2 | **Kalıp rozeti** (`buyerInsights.fit` + üretici kalıbı) ve kalıp facet'i | Yüksek | Düşük | Alan var, sadece UI + facet |
| 3 | **Ortak "Kullanım alanı" facet'i** tüm kategorilerde (`ridingStyles`) | Yüksek | Düşük-Orta | `/motosikletime-gore` ile bağlanır |
| 4 | **Yağmur giyimi + termal/fonksiyonel** kategorileri (ikonlar hazır) ve **kurye kiti** sayfası | Yüksek | Orta | Yeni ürün verisi gerekir |
| 5 | **Koruma kategorisini bölgeye göre genişlet** (göğüs, dirsek/diz, kalça şortu, korumalı iç giyim, böbrek kemeri, reflektif yelek) + airbag tipi/tetikleme facet'i | Yüksek | Orta | `airbagType`, `airbagTrigger` |
| 6 | **Sertifika kartı** (EN 17092 sınıfı, EN 13594 + KP1, EN 13634 bölge seviyeleri, koruyucu bölge haritası, DoC linki) | Yüksek | Orta | `bootRatings`, `knuckleKP1`, `declarationOfConformityUrl` |
| 7 | **Kategoriye özel facet'ler**: eldiven bilek boyu/dokunmatik/ısıtmalı, bot konç yüksekliği/kapama, interkom tekli/ikili set, kask kapama + SHARP | Orta | Orta | Kategoriye özel spec alanları |
| 8 | **"Bununla iyi gider" (`pairsWith`)** + özel beden rozetleri (kısa/uzun/geniş, `fitVariants`) | Orta | Orta | Editoryal eşleşme; uyumluluk motoru yeniden kullanılır |

## Kaynaklar

Tümü 2026-10-06 tarihinde, yapı incelemesi amacıyla okundu.

- https://www.fc-moto.de/robots.txt
- https://www.fc-moto.com/de_DE?URI= (fc-moto.de ana sayfa yönlendirmesi; menü yapısı)
- https://www.fc-moto.com/en-gb/c/motorcycle-helmets-goggles/motorcycle-helmets/ (kask liste + facet'ler)
- https://www.fc-moto.com/de-de/c/motorradhelme-brillen/motorradhelme/integralhelme/
- https://www.fc-moto.com/de-de/p/hjc-rpha-72-phyta-helm-silber-rot-weiss-s-55-56-HJC-12420107 (kask ürün sayfası)
- https://www.fc-moto.com/de-de/c/motorradbekleidung/motorradbekleidung-herren/motorradjacken/
- https://www.fc-moto.com/de-de/c/motorradbekleidung/motorradbekleidung-herren/motorradjacken/textiljacken/
- https://www.fc-moto.com/de-de/p/held-clip-in-gtx-evo-top-gore-packlite-jacke-3xl-HE-062181-00-1-3XL (mont ürün sayfası, K/L/B bedenleri)
- https://www.fc-moto.com/de-de/c/motorradbekleidung/motorradbekleidung-herren/motorradhosen/
- https://www.fc-moto.com/de-de/c/motorradbekleidung/motorradbekleidung-herren/motorradhandschuhe/sporthandschuhe/
- https://www.fc-moto.com/de-de/p/alpinestars-gp-plus-r-v3-motorrad-handschuhe-schwarz-weiss-3xl-APS-3550825-12-3XL (eldiven ürün sayfası)
- https://www.fc-moto.com/de-de/c/motorradbekleidung/motorradbekleidung-herren/motorradstiefel-motorradschuhe/touringstiefel/
- https://www.fc-moto.com/de-de/p/held-segrino-gtx-motorradstiefel-37-HE-082042-00-1-37 (bot ürün sayfası)
- https://www.fc-moto.com/de-de/c/protektoren-sicherheit/
- https://www.fc-moto.com/de-de/c/protektoren-sicherheit/airbag-westen-zubehoer/
- https://www.fc-moto.com/de-de/c/motorradhelme-brillen/zubehoer-ersatzteile/kommunikationssysteme/
- https://www.fc-moto.com/de-de/c/motorradbekleidung/motorradbekleidung-damen/
- https://www.fc-moto.com/de-de/c/motorradbekleidung/motorradbekleidung-herren/funktionsbekleidung/
- https://www.fc-moto.com/de-de/marken
- https://www.fc-moto.com/de-de/b/marken/held/
