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
  "koruma/dirsek-diz-koruma": "Motosiklet Dizlik ve Dirseklik",
  "koruma/airbag": "Motosiklet Airbag Yelek",
  "koruma/gorunurluk-yelegi": "Reflektörlü Motorcu Yeleği",
  "yagmurluk/yagmur-takimi": "Motosiklet Yağmur Takımı",
  "yagmurluk/tek-parca-yagmurluk": "Tek Parça Motosiklet Yağmurluğu",
  "termal/isitmali-giyim": "Isıtmalı Motosiklet Giyim",
  "aksesuar/telefon-tutucu": "Motosiklet Telefon Tutucu",
  "aksesuar/motosiklet-cantasi": "Motosiklet Çantası",
  "aksesuar/kilit-guvenlik": "Motosiklet Kilidi",
};

export const categorySeoName = (slug: string, fallback: string) => CATEGORY_SEO[slug]?.name ?? `Motosiklet ${fallback}`;
export const subSeoName = (cat: string, sub: string, fallback: string) => SUB_SEO[`${cat}/${sub}`] ?? fallback;
