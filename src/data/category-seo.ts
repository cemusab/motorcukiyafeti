/**
 * Arama motoru adları ve açıklamaları. Türkçe aramalar ad tamlamasıyla yapılır ("motosiklet montu",
 * "kışlık motosiklet montu"); sayfa başlığı, H1 ve meta açıklama buradan gelir. Kategori adı (menü, breadcrumb) kısa kalır.
 */

export const CATEGORY_SEO: Record<string, { name: string; description: string }> = {
  kask: {
    name: "Motosiklet Kaskı",
    description: "Motosiklet kaskı seçerken ECE 22.06 onayı, kask tipi ve doğru beden önemlidir. Kapalı, çene açılır ve açık kaskları teknik veriyle karşılaştır.",
  },
  mont: {
    name: "Motosiklet Montu",
    description: "Motosiklet montu seçerken EN 17092 sınıfı, koruyucu seviyesi ve mevsim önemlidir. Korumalı montları üretici verisiyle karşılaştır.",
  },
  pantolon: {
    name: "Motosiklet Pantolonu",
    description: "Motosiklet pantolonu seçerken EN 17092 sınıfına, diz ve kalça koruyucusuna bak. Tekstil, deri ve kevlar jean modellerini karşılaştır.",
  },
  eldiven: {
    name: "Motosiklet Eldiveni",
    description: "Motosiklet eldiveni seçerken EN 13594 onayı, boğum (KP) koruması ve mevsim önemlidir. Yazlık, kışlık ve touring eldivenleri karşılaştır.",
  },
  bot: {
    name: "Motosiklet Botu ve Ayakkabısı",
    description: "Motosiklet botu seçerken EN 13634 onayı ve bilek koruması önemlidir. Şehir, touring, sport ve adventure botlarını teknik veriyle karşılaştır.",
  },
  interkom: {
    name: "Motosiklet İnterkomu",
    description: "Motosiklet interkomu seçerken mesh/bluetooth bağlantı, menzil ve kaskına uyumu önemlidir. Cardo, Sena ve diğer modelleri karşılaştır.",
  },
  koruma: {
    name: "Motosiklet Koruma Ekipmanları",
    description: "Sırt, göğüs, dirsek ve diz koruyucuları, airbag yelekler ve reflektörlü yelekler: EN 1621 seviyesi ve kullanım amacına göre karşılaştır.",
  },
  yagmurluk: {
    name: "Motosiklet Yağmurluğu",
    description: "Motosiklet yağmurluğu seçerken bant dikiş, görünürlük ve ekipmanın üstüne rahat geçmesi önemlidir. Yağmur takımı ve tek parça modelleri karşılaştır.",
  },
  termal: {
    name: "Motosiklet Termal Giyim",
    description: "Soğukta sürüş için termal içlik, boyunluk ve ısıtmalı giyim. Nem atan malzemeleri ve ısıtmalı seçenekleri teknik özellikleriyle karşılaştır.",
  },
  lastik: {
    name: "Motosiklet Lastiği",
    description: "Motosiklet lastiği kullanım tipine ve motorunun fabrika ebadına göre seçilir. Sport, touring, adventure ve scooter lastiklerini ebatlarıyla karşılaştır.",
  },
  "yag-bakim": {
    name: "Motosiklet Yağı ve Bakım Ürünleri",
    description: "Motosiklet yağını JASO sınıfı ve viskoziteye göre seç: vitesli motorda MA2, scooter'da MB. Zincir yağı, fren hidroliği ve bakım ürünleri de burada.",
  },
  aksesuar: {
    name: "Motosiklet Aksesuarları",
    description: "Telefon tutucu, kilit, motosiklet çantası, kask aksesuarı ve kulak tıkacı: üretici verisi, sertifika ve uyumluluk bilgisiyle karşılaştır.",
  },
};

/** Alt kategori arama adı ("kategori/alt" → ad). Listede yoksa alt kategori adı kullanılır. */
export const SUB_SEO: Record<string, string> = {
  "kask/kapali-kask": "Kapalı Motosiklet Kaskı",
  "kask/cene-acilir-kask": "Çene Açılır Motosiklet Kaskı",
  "kask/acik-kask": "Açık Motosiklet Kaskı",
  "kask/adventure-kask": "Adventure Motosiklet Kaskı",
  "kask/cross-kask": "Cross ve Enduro Kaskı",
  "kask/touring-kask": "Touring Motosiklet Kaskı",
  "kask/racing-kask": "Racing Motosiklet Kaskı",
  "kask/interkomlu-kask": "İnterkom Uyumlu Kask",
  "kask/karbon-kask": "Karbon Motosiklet Kaskı",
  "kask/fiber-kask": "Fiber Motosiklet Kaskı",
  "kask/termoplastik-kask": "Termoplastik Motosiklet Kaskı",
  "mont/yazlik-mont": "Yazlık Motosiklet Montu",
  "mont/kislik-mont": "Kışlık Motosiklet Montu",
  "mont/4-mevsim-mont": "4 Mevsim Motosiklet Montu",
  "mont/deri-mont": "Deri Motosiklet Montu",
  "mont/tekstil-mont": "Tekstil Motosiklet Montu",
  "mont/touring-mont": "Touring ve Adventure Mont",
  "mont/sport-mont": "Sport Motosiklet Montu",
  "mont/sehir-mont": "Şehir İçi Motosiklet Montu",
  "pantolon/tekstil-pantolon": "Tekstil Motosiklet Pantolonu",
  "pantolon/deri-pantolon": "Deri Motosiklet Pantolonu",
  "pantolon/kevlar-jean": "Kevlar Motosiklet Jean",
  "eldiven/yazlik-eldiven": "Yazlık Motosiklet Eldiveni",
  "eldiven/kislik-eldiven": "Kışlık Motosiklet Eldiveni",
  "eldiven/sport-eldiven": "Sport Motosiklet Eldiveni",
  "eldiven/touring-eldiven": "Touring Motosiklet Eldiveni",
  "eldiven/adventure-eldiven": "Adventure Motosiklet Eldiveni",
  "bot/sehir-botu": "Şehir Tipi Motosiklet Botu",
  "bot/touring-botu": "Touring Motosiklet Botu",
  "bot/sport-botu": "Sport Motosiklet Botu",
  "bot/adventure-botu": "Adventure Motosiklet Botu",
  "koruma/sirt-koruma": "Motosiklet Sırt Koruyucu",
  "koruma/gogus-koruma": "Motosiklet Göğüs Koruyucu",
  "koruma/dirsek-diz-koruma": "Motosiklet Dizlik, Dirseklik ve Omuzluk",
  "koruma/airbag": "Motosiklet Airbag Yelek",
  "koruma/gorunurluk-yelegi": "Reflektörlü Motorcu Yeleği",
  "yagmurluk/yagmur-takimi": "Motosiklet Yağmur Takımı",
  "yagmurluk/tek-parca-yagmurluk": "Tek Parça Motosiklet Yağmurluğu",
  "termal/isitmali-giyim": "Isıtmalı Motosiklet Giyim",
  "lastik/sport-lastik": "Sport Motosiklet Lastiği",
  "lastik/touring-lastik": "Touring Motosiklet Lastiği",
  "lastik/adventure-lastik": "Adventure Motosiklet Lastiği",
  "lastik/scooter-lastik": "Scooter Lastiği",
  "lastik/arazi-lastik": "Arazi ve Enduro Lastiği",
  "lastik/kis-lastik": "Kışa Uygun Motosiklet Lastiği",
  "yag-bakim/motor-yagi": "Motosiklet Motor Yağı",
  "yag-bakim/scooter-yagi": "Scooter Yağı (JASO MB)",
  "yag-bakim/iki-zamanli-yag": "2 Zamanlı Motosiklet Yağı",
  "yag-bakim/zincir-bakim": "Motosiklet Zincir Yağı",
  "yag-bakim/fren-hidroligi": "Motosiklet Fren Hidroliği",
  "yag-bakim/sogutma-sivisi": "Motosiklet Soğutma Sıvısı",
  "yag-bakim/temizlik-bakim": "Motosiklet Bakım Ürünleri",
  "aksesuar/telefon-tutucu": "Motosiklet Telefon Tutucu",
  "aksesuar/motosiklet-cantasi": "Motosiklet Çantası",
  "aksesuar/kilit-guvenlik": "Motosiklet Kilidi",
};

export const categorySeoName = (slug: string, fallback: string) => CATEGORY_SEO[slug]?.name ?? `Motosiklet ${fallback}`;
export const subSeoName = (cat: string, sub: string, fallback: string) => SUB_SEO[`${cat}/${sub}`] ?? fallback;

/**
 * Kategori sayfasındaki "türler" karşılaştırma tablosu: genel, ölçüsüz bilgi (rakam yok). Diğer adlar sütunu
 * aramalarda kullanılan eş anlamlıları (full face, jet, modüler…) doğal biçimde sayfaya taşır.
 */
export type TypeRow = { sub: string; name: string; aka: string; bestFor: string; plus: string; minus: string };

export const TYPE_TABLES: Record<string, { title: string; rows: TypeRow[] }> = {
  kask: {
    title: "Kask türleri karşılaştırması",
    rows: [
      { sub: "kapali-kask", name: "Kapalı kask", aka: "Full face, entegre kask", bestFor: "Şehir, uzun yol, otoban, kurye", plus: "Çene dahil tam koruma, genelde daha sessiz", minus: "Sıcakta ve dururken daha kapalı hissettirir" },
      { sub: "cene-acilir-kask", name: "Çene açılır kask", aka: "Modüler, flip-up kask", bestFor: "Touring, şehir, gözlük kullananlar", plus: "Kaskı çıkarmadan konuşma, su içme; gözlükle kolay takılır", minus: "Mekanizma nedeniyle genelde daha ağır; açık konumda çene koruması yoktur" },
      { sub: "acik-kask", name: "Açık kask", aka: "Jet kask, 3/4 kask", bestFor: "Scooter, kısa şehir içi sürüş", plus: "Hafif ve geniş görüş", minus: "Çene ve yüz koruması yok; rüzgâr ve böcek doğrudan yüze gelir" },
      { sub: "adventure-kask", name: "Adventure kask", aka: "ADV, dual sport kask", bestFor: "Asfalt + toprak karma kullanım", plus: "Güneşlik siperliği, geniş görüş; vizörle veya gözlükle kullanılır", minus: "Siperlik yüksek hızda rüzgâr yapar, genelde daha gürültülü" },
      { sub: "cross-kask", name: "Cross / enduro kask", aka: "MX, motokros kaskı", bestFor: "Arazi, enduro", plus: "Bol hava akışı, gözlükle geniş görüş", minus: "Vizör yok; asfaltta uzun yolda gürültülü ve rüzgâra açık" },
      { sub: "racing-kask", name: "Racing kask", aka: "Pist, yarış kaskı", bestFor: "Pist, sportif sürüş", plus: "Eğik sürüş pozisyonuna göre görüş, aerodinamik", minus: "Dik oturuşta görüş ve konfor sınırlı, iç güneş vizörü çoğunlukla yok" },
    ],
  },
  mont: {
    title: "Mont türleri karşılaştırması",
    rows: [
      { sub: "yazlik-mont", name: "Yazlık (file) mont", aka: "Mesh, fileli mont", bestFor: "Sıcak hava, şehir içi", plus: "Hava akışı yüksek, terletmez", minus: "Serin havada ve yağmurda yetersiz; file bölgelerde aşınma direnci daha düşük olabilir" },
      { sub: "kislik-mont", name: "Kışlık mont", aka: "Termal astarlı mont", bestFor: "Soğuk hava, kış kuryeliği", plus: "Isı yalıtımı, çoğunlukla su geçirmez katman", minus: "Bahar ve yazda çok sıcak" },
      { sub: "4-mevsim-mont", name: "4 mevsim mont", aka: "Dört mevsim, çok katmanlı mont", bestFor: "Tek montla tüm yıl", plus: "Çıkarılabilir termal ve su geçirmez astarlar", minus: "Her mevsimde uzman montlar kadar iyi değil; yazın file kadar serin olmaz" },
      { sub: "deri-mont", name: "Deri mont", aka: "Deri motosiklet ceketi", bestFor: "Sportif sürüş, pist, şehir", plus: "Yüksek aşınma direnci, vücuda oturur", minus: "Yağmurda bakım ister, sıcakta ağır" },
      { sub: "touring-mont", name: "Touring / adventure mont", aka: "Uzun yol, ADV mont", bestFor: "Uzun yol, karma zemin", plus: "Bol cep, havalandırma, membran; uzun kesim", minus: "Daha ağır ve hacimli, fiyatı genelde yüksek" },
    ],
  },
};
