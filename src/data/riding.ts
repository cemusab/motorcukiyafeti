/**
 * "Motosikletime göre ekipman" ve "Yeni motor aldım" sihirbazı için editoryal kurallar.
 * Bütçe payları genel bir dağılım önerisidir; fiyat değildir.
 */

export type GearKey = "kask" | "mont" | "pantolon" | "eldiven" | "bot" | "sirt" | "interkom" | "yagmurluk" | "termal";

export const GEAR: Record<
  GearKey,
  { name: string; why: string; pick: string; safety: string; share: number; href: string }
> = {
  kask: {
    name: "Kask",
    why: "Ölümcül yaralanmaların en sık görüldüğü bölge baştır. Ekipman listesinin vazgeçilmez ilk maddesidir.",
    pick: "Kafa şekline ve bedenine tam oturan modeli seç; tipi motor ve kullanım şekline göre belirle.",
    safety: "ECE 22.06 etiketi olmalı. Çene korumalı (kapalı veya çene açılır) tipler açık kaska göre yüzü de korur.",
    share: 30,
    href: "/kask",
  },
  mont: {
    name: "Mont",
    why: "Düşmede gövdeyi sürtünmeye, omuz ve dirsekleri darbeye karşı korur.",
    pick: "Mevsime ve kullanıma göre tekstil, file veya deri seç. Sürüş pozisyonunda kolların kısalmamalı.",
    safety: "EN 17092 sınıfı (tercihen AA veya AAA) ve omuz/dirsekte EN 1621-1 koruyucu.",
    share: 22,
    href: "/mont",
  },
  pantolon: {
    name: "Pantolon",
    why: "Kalça ve dizler düşmede sık yere temas eden bölgelerdir; normal kot birkaç metrede aşınır.",
    pick: "Montunla fermuarla birleşebilen veya aynı sınıfta bir pantolon seç. Diz koruyucunun yeri sürüşte dize denk gelmeli.",
    safety: "EN 17092 sınıfı ve dizde EN 1621-1 koruyucu; kalça koruyucu cebi artı puandır.",
    share: 13,
    href: "/pantolon",
  },
  eldiven: {
    name: "Eldiven",
    why: "Düşerken refleksle elini yere koyarsın; avuç içi ve bilek ilk temas eden bölgelerdir.",
    pick: "Parmak boyun tam oturmalı, frene ve debriyaja hissini kaybetmeden ulaşmalısın.",
    safety: "EN 13594 onayı; avuç içi kaydırıcı ve eklem (KP) koruması.",
    share: 10,
    href: "/eldiven",
  },
  bot: {
    name: "Bot",
    why: "Ayak bileği ezilme ve burkulmaya çok açıktır; spor ayakkabı bu yükü taşımaz.",
    pick: "Bileği kapatan, vites pedalında aşınmaya dayanıklı ve kaymaz tabanlı bir model seç.",
    safety: "EN 13634 onayı; bilek kemiği ve topuk koruması.",
    share: 13,
    href: "/bot",
  },
  sirt: {
    name: "Sırt koruması",
    why: "Omurgayı darbeye karşı korur. Birçok montta sırt cebi vardır ama koruyucu ayrıca satılır.",
    pick: "Montunun cebine uyan, sürüş pozisyonunda boynundan beline kadar kapatan bir model seç.",
    safety: "EN 1621-2 Level 2 tercih edilmeli.",
    share: 6,
    href: "/koruma/sirt-koruma",
  },
  interkom: {
    name: "İnterkom",
    why: "Uzun yolda navigasyon, telefon ve yol arkadaşınla konuşmayı ellerini gidondan çekmeden yapmanı sağlar.",
    pick: "Önce kaskınla uyumunu kontrol et; grupla sürüyorsan Mesh destekli bir model seç.",
    safety: "Sesi trafiği duyacağın seviyede tut; telefon ve navigasyon komutlarını sesli kullan.",
    share: 6,
    href: "/interkom",
  },
  yagmurluk: {
    name: "Yağmurluk",
    why: "Islanan sürücü hızla üşür ve dikkati dağılır; membransız ekipmanın üstüne giyilir.",
    pick: "Ekipmanının üstüne rahat geçen, görünürlüğü yüksek renkte ve yansıtıcılı bir model seç.",
    safety: "Koruma sağlamaz, korumalı ekipmanın üstüne giyilir; tek başına yeterli değildir.",
    share: 5,
    href: "/rehber/yagmurda-motosiklet-ekipmani",
  },
  termal: {
    name: "Termal içlik ve boyunluk",
    why: "Soğukta kaslar tutulur ve reaksiyon süresi uzar; ince bir termal katman büyük fark yaratır.",
    pick: "Pamuk yerine nem atan sentetik veya merinos içlik ve rüzgar kesen boyunluk seç.",
    safety: "Koruma sağlamaz; kışın konsantrasyonu korumak içindir.",
    share: 5,
    href: "/rehber/kislik-motosiklet-ekipmani",
  },
};

export const MOTO_TYPES = [
  {
    slug: "scooter",
    name: "Scooter",
    summary:
      "Scooter genellikle şehir içinde, kısa mesafede ve düşük-orta hızda kullanılır. Bu yüzden ekipman çoğu zaman ihmal edilir; oysa şehir trafiği kazaların en sık görüldüğü yerdir.",
    helmet: "Çene açılır veya kapalı kask önerilir. Açık kask kullanacaksan yüzün korunmadığını bilerek seç.",
    jacket: "Günlük kıyafetin üzerine giyilebilen, korumalı bir şehir montu veya file mont.",
    extra: "Kısa yollarda bile eldiven ve bileği kapatan bir ayakkabı kullan.",
    subs: ["kask/cene-acilir-kask", "mont/sehir-mont", "eldiven/yazlik-eldiven", "bot/sehir-botu"],
    guide: "scooter-surucu-ekipmanlari",
  },
  {
    slug: "naked",
    name: "Naked",
    summary:
      "Naked motorlarda rüzgar siperliği olmadığı için rüzgar doğrudan sürücüye gelir. Kaskın aerodinamiği ve sessizliği, montun rüzgarda dalgalanmaması önem kazanır.",
    helmet: "Kapalı kask. Otobanda sessizlik ve stabilite için aerodinamik bir model seç.",
    jacket: "Sport veya 4 mevsim tekstil mont; deri mont sportif kullanımda iyi bir seçenektir.",
    extra: "Rüzgar yükü boyuna bindiği için hafif bir kask uzun sürüşte fark yaratır.",
    subs: ["kask/kapali-kask", "mont/4-mevsim-mont", "eldiven/touring-eldiven", "bot/sehir-botu"],
    guide: "kask-nasil-secilir",
  },
  {
    slug: "sport",
    name: "Sport / Supersport",
    summary:
      "Sportif sürüşte hızlar yüksek ve pozisyon öne eğiktir. Koruma seviyesi en üstte tutulmalı; ekipman sürüş pozisyonuna göre kalıplanmış olmalıdır.",
    helmet: "Racing kapalı kask; geniş üst görüş açısı ve spoiler öne eğik pozisyonda avantaj sağlar.",
    jacket: "Deri mont veya tulum; AAA sınıfı ve Level 2 koruyucular hedeflenmeli.",
    extra: "Uzun bilekli deri eldiven ve sport bot zorunlu kabul edilmeli; sırt koruması mutlaka olmalı.",
    subs: ["kask/racing-kask", "mont/deri-mont", "eldiven/sport-eldiven", "bot/sport-botu"],
    guide: "aa-ve-aaa-koruma-farki",
  },
  {
    slug: "adventure",
    name: "Adventure",
    summary:
      "Adventure sürücüsü asfalt, toprak, yağmur ve sıcakla aynı gün karşılaşabilir. Ekipman katmanlı, havalandırmalı ve dayanıklı olmalıdır.",
    helmet: "Siperlikli adventure kask veya geniş vizörlü kapalı/çene açılır kask.",
    jacket: "Çıkarılabilir membranlı, bol havalandırmalı 4 mevsim touring/adventure mont.",
    extra: "Adventure bot ve sırt koruması; grup sürüşü yapıyorsan Mesh interkom.",
    subs: ["kask/adventure-kask", "mont/touring-mont", "eldiven/adventure-eldiven", "bot/adventure-botu"],
    guide: "adventure-surucu-ekipmanlari",
  },
  {
    slug: "touring",
    name: "Touring",
    summary:
      "Uzun yolda saatlerce sürersin; konfor, sessizlik ve hava koşullarına dayanım güvenlik kadar önemlidir. Yorgun sürücü hata yapar.",
    helmet: "Çene açılır veya touring kapalı kask; güneş vizörü ve düşük gürültü öncelikli.",
    jacket: "Su geçirmez membranlı 4 mevsim touring mont.",
    extra: "İnterkom uzun yolda neredeyse standarttır; su geçirmez eldiven ve bot.",
    subs: ["kask/cene-acilir-kask", "kask/touring-kask", "mont/touring-mont", "interkom/mesh-interkom", "bot/touring-botu"],
    guide: "interkom-nasil-secilir",
  },
  {
    slug: "cruiser",
    name: "Cruiser / Chopper",
    summary:
      "Cruiser sürüşü genellikle rahat ve düşük devirlidir ama motorlar ağırdır. Görünüm tarzı ekipman seçimini etkilese de koruma ihmal edilmemelidir.",
    helmet: "Açık kask tarza uygun olsa da yüzü korumaz; çene açılır veya retro kapalı kask daha güvenlidir.",
    jacket: "Deri mont veya korumalı şehir montu; EN 17092 sınıfına bak.",
    extra: "Kevlar/aramid takviyeli jean ve bileği kapatan bot.",
    subs: ["kask/cene-acilir-kask", "mont/deri-mont", "pantolon/kevlar-jean", "bot/sehir-botu"],
    guide: "motosiklet-montu-nasil-secilir",
  },
  {
    slug: "enduro",
    name: "Enduro / Cross",
    summary:
      "Arazide düşmek sürüşün bir parçasıdır; düşük hızda sık düşmeye ve yoğun efora göre ekipman seçilir. Havalandırma ve hareket serbestliği kritiktir.",
    helmet: "Cross kask ve uyumlu gözlük.",
    jacket: "Gövde koruması (göğüs-sırt zırhı) üzerine hafif enduro forması veya montu.",
    extra: "Cross botu, diz koruması ve kısa bilekli enduro eldiveni.",
    subs: ["kask/cross-kask", "koruma/sirt-koruma", "eldiven/adventure-eldiven", "bot/adventure-botu"],
    guide: "adventure-surucu-ekipmanlari",
  },
  {
    slug: "kurye",
    name: "Kurye / Paket Servis",
    summary:
      "Kurye günde saatlerce, her havada ve sık duruş-kalkışla sürer. Ekipman tek bir sürüşe değil, aylarca her gün kullanıma göre seçilmelidir: dayanıklılık, ergonomi, yağmur koruması ve görünürlük önceliklidir.",
    helmet: "Çene açılır kask, sık duruşlarda kaskı çıkarmadan konuşmayı ve teslimat yapmayı kolaylaştırır. Pinlock'lu vizör yağmurda ve kışın buğuyu önler.",
    jacket: "Su geçirmez membranlı, çıkarılabilir astarlı, yansıtıcı detaylı 4 mevsim tekstil mont; yazın file mont.",
    extra: "Telefon ekranıyla uyumlu parmak uçlu eldiven, yürümeye uygun korumalı şehir botu ve iyi bir yağmurluk günlük işin parçasıdır.",
    subs: ["kask/cene-acilir-kask", "mont/4-mevsim-mont", "eldiven/touring-eldiven", "bot/sehir-botu"],
    guide: "kurye-motosiklet-ekipmanlari",
  },
] as const;

export type MotoSlug = (typeof MOTO_TYPES)[number]["slug"];

export type WizardInput = { tur: MotoSlug; kullanim: string; mevsim: "yaz" | "kis" | "4-mevsim"; butce: string };

/** Kullanım seçenekleri motor türüne göre süzülür (ör. pist yalnız sport/naked, arazi yalnız adventure/enduro). */
export const USAGE_TYPES: Record<string, MotoSlug[] | "all"> = {
  sehir: "all",
  is: "all",
  kurye: ["scooter", "naked"],
  "hafta-sonu": "all",
  "uzun-yol": ["naked", "sport", "adventure", "touring", "cruiser", "scooter"],
  performans: ["sport", "naked"],
  "off-road": ["adventure", "enduro"],
};
export function usageOptionsFor(tur: MotoSlug) {
  return WIZARD_OPTIONS.kullanim.filter((o) => {
    const t = USAGE_TYPES[o.v];
    return t === "all" || t.includes(tur);
  });
}
/** Sihirbazın motor türü listesi: "kurye" bir kullanım şeklidir, motor türü değildir. */
export const WIZARD_TYPES = () => MOTO_TYPES.filter((m) => m.slug !== "kurye");

export const WIZARD_OPTIONS = {
  kullanim: [
    { v: "sehir", l: "Şehir içi" },
    { v: "is", l: "Günlük işe gidiş" },
    { v: "kurye", l: "Kuryelik / paket servis" },
    { v: "hafta-sonu", l: "Hafta sonu gezileri" },
    { v: "uzun-yol", l: "Uzun yol / tur" },
    { v: "performans", l: "Pist / sportif sürüş" },
    { v: "off-road", l: "Arazi / toprak yol" },
  ],
  mevsim: [
    { v: "yaz", l: "Yaz" },
    { v: "kis", l: "Kış" },
    { v: "4-mevsim", l: "4 mevsim" },
  ],
  butce: [
    { v: "ekonomik", l: "Ekonomik" },
    { v: "orta", l: "Orta" },
    { v: "premium", l: "Premium" },
    { v: "sinirsiz", l: "Bütçe sınırı yok" },
  ],
};

export function wizardSet(i: WizardInput): GearKey[] {
  const keys: GearKey[] = ["kask", "mont", "pantolon", "eldiven", "bot"];
  if (["sport", "adventure", "touring", "enduro"].includes(i.tur) || ["performans", "off-road", "uzun-yol"].includes(i.kullanim)) keys.push("sirt");
  if (i.kullanim === "uzun-yol" || i.tur === "touring" || i.tur === "adventure") keys.push("interkom");
  if (i.mevsim !== "yaz" || ["uzun-yol", "is", "kurye"].includes(i.kullanim)) keys.push("yagmurluk");
  if (i.mevsim !== "yaz") keys.push("termal");
  return keys;
}

export function budgetTip(butce: string) {
  switch (butce) {
    case "ekonomik":
      return "Bütçen kısıtlıysa önce kask, eldiven ve bot al; bunlar en kritik parçalar. Mont ve pantolonda sertifikalı giriş seviyesi modeller yeterli koruma sunar.";
    case "premium":
      return "Premium bütçede hafiflik, havalandırma ve konfora yatırım yapabilirsin; koruma sınıfını (AAA, Level 2) düşürmeden seç.";
    case "sinirsiz":
      return "Bütçe sınırı yoksa airbag yelek ve kaska özel entegre interkom gibi ileri seviye ekipmanları da değerlendir.";
    default:
      return "Orta bütçede payın büyük kısmını kask ve monta ayır; eldiven ve botta sertifikalı modelleri tercih et.";
  }
}
