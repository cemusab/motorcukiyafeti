/** Kategori ağacı. URL: /{kategori} ve /{kategori}/{alt-kategori}. Türkçe karakter içermeyen slug'lar. */

export type Facet = { key: string; label: string };

export type Subcategory = {
  slug: string;
  name: string;
  intro: string;
  /** Ürünün hangi alt kategoride görüneceğini belirleyen kural ürün verisindeki `subcategories` alanıdır. */
};

export type Category = {
  slug: string;
  name: string;
  short: string;
  intro: string;
  icon: IconName;
  guide?: string; // ilgili ana rehber slug'ı
  groups: { title: string; items: Subcategory[] }[];
};

export type IconName =
  | "kask"
  | "mont"
  | "pantolon"
  | "eldiven"
  | "bot"
  | "interkom"
  | "koruma"
  | "yagmurluk"
  | "termal"
  | "aksesuar";

const s = (slug: string, name: string, intro: string): Subcategory => ({ slug, name, intro });

export const CATEGORIES: Category[] = [
  {
    slug: "kask",
    name: "Kask",
    short: "Kask",
    icon: "kask",
    guide: "kask-nasil-secilir",
    intro:
      "Kask, motosiklet ekipmanının en kritik parçasıdır. Tipini kullanımına göre, bedenini kafa ölçüne göre, güvenliğini ECE 22.06 etiketine göre seç.",
    groups: [
      {
        title: "Kask tipi",
        items: [
          s("kapali-kask", "Kapalı Kask", "Çene kısmı kabukla bütün olan, en yüksek koruma ve sessizlik sunan kask tipi."),
          s("cene-acilir-kask", "Çene Açılır (Modüler) Kask", "Çene bölümü yukarı kalkan kasklar. Uzun yol ve şehir içi duraklamalarda pratiklik sağlar."),
          s("acik-kask", "Açık Kask", "Çene koruması olmayan, şehir içi ve scooter kullanımında tercih edilen hafif kasklar."),
          s("adventure-kask", "Adventure Kask", "Siperlikli, hem asfalt hem toprak yolda kullanılabilen çift amaçlı kasklar."),
          s("cross-kask", "Cross / Enduro Kask", "Gözlükle kullanılan, arazi sürüşü için tasarlanmış, iyi havalandırılan kasklar."),
        ],
      },
      {
        title: "Kullanıma göre",
        items: [
          s("touring-kask", "Touring Kask", "Uzun yolda konfor, sessizlik ve güneş vizörü öne çıkan kasklar."),
          s("racing-kask", "Racing Kask", "Pist ve sportif sürüş için aerodinamiği ve geniş görüş açısı öne çıkan kasklar."),
          s("interkomlu-kask", "İnterkom Uyumlu Kask", "Kendine özel interkom yuvası veya hazır hoparlör cepleri olan kasklar."),
        ],
      },
      {
        title: "Malzemeye göre",
        items: [
          s("karbon-kask", "Karbon Kask", "Karbon fiber kabuklu, hafifliği ile öne çıkan kasklar."),
          s("fiber-kask", "Fiber (Kompozit) Kask", "Cam elyafı ve kompozit karışımlı kabuklu kasklar; hafiflik ve dayanım dengesi sunar."),
          s("termoplastik-kask", "Termoplastik Kask", "Polikarbonat vb. enjeksiyon kabuklu, bütçe dostu kasklar."),
        ],
      },
    ],
  },
  {
    slug: "mont",
    name: "Mont",
    short: "Mont",
    icon: "mont",
    guide: "motosiklet-montu-nasil-secilir",
    intro:
      "Motosiklet montu düşmede cildini sürtünmeye karşı, omuz ve dirseklerini darbeye karşı korur. EN 17092 sınıfına ve mevsime göre seç.",
    groups: [
      {
        title: "Mevsime göre",
        items: [
          s("yazlik-mont", "Yazlık (File) Mont", "Bol havalandırmalı, sıcak havada serin tutan montlar."),
          s("kislik-mont", "Kışlık Mont", "Termal astarlı ve su geçirmez membranlı, soğukta sıcak tutan montlar."),
          s("4-mevsim-mont", "4 Mevsim Mont", "Çıkarılabilir astar ve membranlarla her mevsim kullanılabilen montlar."),
        ],
      },
      {
        title: "Malzemeye göre",
        items: [
          s("deri-mont", "Deri Mont", "Sürtünme dayanımı yüksek, sportif sürüşe uygun deri montlar."),
          s("tekstil-mont", "Tekstil Mont", "Hafif, çok yönlü ve genellikle su geçirmez tekstil montlar."),
        ],
      },
      {
        title: "Kullanıma göre",
        items: [
          s("touring-mont", "Touring / Adventure Mont", "Uzun yol ve karma zemin için çok cepli, katmanlı montlar."),
          s("sport-mont", "Sport Mont", "Sürüş pozisyonuna göre kalıplanmış, sportif kullanıma yönelik montlar."),
          s("sehir-mont", "Şehir Montu", "Günlük giyime yakın görünümlü, şehir içi kullanıma yönelik montlar."),
        ],
      },
    ],
  },
  {
    slug: "pantolon",
    name: "Pantolon",
    short: "Pantolon",
    icon: "pantolon",
    guide: "aa-ve-aaa-koruma-farki",
    intro: "Bacak ve kalçayı sürtünmeye karşı korur. Diz ve kalça koruyucusu olan, montunla uyumlu bir pantolon seç.",
    groups: [
      {
        title: "Malzemeye göre",
        items: [
          s("tekstil-pantolon", "Tekstil Pantolon", "Su geçirmez ve katmanlı, çok yönlü pantolonlar."),
          s("deri-pantolon", "Deri Pantolon", "Sportif sürüş için deri pantolonlar."),
          s("kevlar-jean", "Kevlar / Aramid Jean", "Günlük görünümlü, aramid takviyeli kot pantolonlar."),
        ],
      },
    ],
  },
  {
    slug: "eldiven",
    name: "Eldiven",
    short: "Eldiven",
    icon: "eldiven",
    guide: "motosiklet-eldiveni-nasil-secilir",
    intro:
      "Düşerken elini refleksle yere koyarsın; eldiven bu yüzden kasktan sonraki en önemli parçadır. EN 13594 onaylı ve avuç içi korumalı olsun.",
    groups: [
      {
        title: "Mevsime göre",
        items: [
          s("yazlik-eldiven", "Yazlık Eldiven", "Havalandırmalı, kısa bilekli eldivenler."),
          s("kislik-eldiven", "Kışlık Eldiven", "Yalıtımlı, su geçirmez membranlı eldivenler."),
        ],
      },
      {
        title: "Kullanıma göre",
        items: [
          s("sport-eldiven", "Sport / Pist Eldiveni", "Uzun bilekli, deri, parmak köprülü yüksek koruma eldivenleri."),
          s("touring-eldiven", "Touring Eldiven", "Uzun yolda konfor ve hava koşullarına dayanım için eldivenler."),
          s("adventure-eldiven", "Adventure Eldiven", "Karma zemin için esnek ve dayanıklı eldivenler."),
        ],
      },
    ],
  },
  {
    slug: "bot",
    name: "Bot & Ayakkabı",
    short: "Bot",
    icon: "bot",
    guide: "motosiklet-botu-nasil-secilir",
    intro: "Ayak bileği ve ayağı ezilmeye ve burkulmaya karşı korur. EN 13634 onaylı, bileği kapatan bir model seç.",
    groups: [
      {
        title: "Kullanıma göre",
        items: [
          s("sehir-botu", "Şehir Botu / Ayakkabı", "Günlük ayakkabı görünümlü, korumalı kısa botlar."),
          s("touring-botu", "Touring Bot", "Su geçirmez, uzun yolda konforlu botlar."),
          s("sport-botu", "Sport / Pist Botu", "Burulma kontrollü, yüksek korumalı sportif botlar."),
          s("adventure-botu", "Adventure Bot", "Hem asfalt hem arazide kullanılabilen sağlam botlar."),
        ],
      },
    ],
  },
  {
    slug: "interkom",
    name: "İnterkom",
    short: "İnterkom",
    icon: "interkom",
    guide: "interkom-nasil-secilir",
    intro:
      "İnterkom; navigasyon, telefon, müzik ve sürücüler arası konuşma sağlar. Kaskınla uyumunu ve grup ihtiyacını (Bluetooth / Mesh) baştan belirle.",
    groups: [
      {
        title: "Teknolojiye göre",
        items: [
          s("mesh-interkom", "Mesh İnterkom", "Grup sürüşlerinde bağlantısı kopmayan Mesh ağı destekli interkomlar."),
          s("bluetooth-interkom", "Bluetooth İnterkom", "Tek sürücü veya küçük gruplar için Bluetooth interkomlar."),
          s("kaska-ozel-interkom", "Kaska Özel İnterkom", "Belirli kask modellerine gömülü olarak tasarlanmış interkomlar."),
        ],
      },
    ],
  },
  {
    slug: "koruma",
    name: "Koruma",
    short: "Koruma",
    icon: "koruma",
    guide: "level-1-ve-level-2-koruma-farki",
    intro: "Sırt, göğüs, omuz, dirsek ve diz koruyucuları ile airbag sistemleri. EN 1621 seviyesine göre seç.",
    groups: [
      {
        title: "Bölgeye göre",
        items: [
          s("sirt-koruma", "Sırt Koruması", "Omurgayı darbeye karşı koruyan, mont içine takılan veya ayrı giyilen koruyucular."),
          s("airbag", "Airbag Yelek", "Düşme anında şişerek gövdeyi koruyan elektronik veya kablolu sistemler."),
        ],
      },
    ],
  },
];

export const NAV_EXTRA = [
  { href: "/markalar", label: "Markalar" },
  { href: "/karsilastir", label: "Karşılaştır" },
  { href: "/interkom-uyumlulugu", label: "Kask + İnterkom" },
  { href: "/rehber", label: "Rehberler" },
];

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function allSubcategories() {
  return CATEGORIES.flatMap((c) => c.groups.flatMap((g) => g.items.map((i) => ({ category: c, sub: i }))));
}

export function getSubcategory(cat: string, sub: string) {
  const c = getCategory(cat);
  const item = c?.groups.flatMap((g) => g.items).find((i) => i.slug === sub);
  return c && item ? { category: c, sub: item } : undefined;
}
