/**
 * Veri sözleşmesi. Tüm ürün, marka, rehber ve uyumluluk kayıtları bu şemaya uyar.
 * Kural: kaynakta doğrulanamayan alan `null` olur ve anahtarı `unverified` listesine yazılır.
 * İleride Prisma/PostgreSQL'e taşınırken aynı alanlar tablolara eşlenir (bkz. prisma/schema.prisma).
 */
import { z } from "zod";

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const slug = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/);

export const SourceSchema = z.object({
  url: z.string().url(),
  type: z.enum(["manufacturer", "homologation", "distributor", "retailer", "review"]),
  label: z.string().min(2),
  checkedAt: isoDate,
});
export type Source = z.infer<typeof SourceSchema>;

export const OfferSchema = z.object({
  seller: z.string(),
  url: z.string().url(),
  price: z.number().positive(),
  salePrice: z.number().positive().nullable(),
  currency: z.literal("TRY"),
  inStock: z.boolean().nullable(),
  sizes: z.array(z.string()).default([]),
  colors: z.array(z.string()).default([]),
  checkedAt: isoDate,
});
export type Offer = z.infer<typeof OfferSchema>;

const tri = z.boolean().nullable(); // true / false / bilinmiyor

const ProductBase = z.object({
  slug,
  brand: slug,
  name: z.string(),
  subcategories: z.array(slug).min(1),
  status: z.enum(["active", "discontinued"]),
  successor: z.string().nullable().default(null),
  summary: z.string().min(40),
  description: z.array(z.string().min(40)).min(2),
  forWho: z.array(z.string()).min(2),
  notFor: z.array(z.string()).min(1),
  pros: z.array(z.string()).min(2),
  cons: z.array(z.string()).min(2),
  usage: z.record(z.string(), z.string()).default({}),
  verdict: z.string().min(80),
  rivals: z.array(z.string()).default([]),
  priceRange: z
    .object({ min: z.number(), max: z.number(), currency: z.literal("TRY"), checkedAt: isoDate, note: z.string().optional() })
    .nullable(),
  offers: z.array(OfferSchema).default([]),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  manufacturerUrl: z.string().url(),
  sources: z.array(SourceSchema).min(1),
  lastCheckedAt: isoDate,
  dataConfidence: z.enum(["high", "medium", "low"]),
  unverified: z.array(z.string()).default([]),
  colors: z.array(z.string()).default([]),
  sizes: z.array(z.string()).default([]),
  /** Üreticinin resmi beden tablosu: beden → kafa/göğüs/el çevresi (cm) aralığı. */
  sizeChart: z.array(z.object({ size: z.string(), min: z.number(), max: z.number() })).default([]),
  sizeChartMeasure: z.string().nullable().default(null), // ör. "Kafa çevresi (cm)"
  /** Alıcı yorumlarından kendi cümlelerimizle derlenen eğilim. Yorum metni kopyalanmaz. */
  buyerInsights: z
    .object({
      fit: z.enum(["dar", "normal", "bol"]).nullable(),
      fitNote: z.string().nullable(),
      positives: z.array(z.string()),
      negatives: z.array(z.string()),
      reviewCount: z.number().int().nullable(),
      sources: z.array(SourceSchema).min(1),
    })
    .nullable()
    .default(null),
});

export const HelmetSchema = ProductBase.extend({
  category: z.literal("kask"),
  specs: z.object({
    helmetType: z.enum(["kapali", "cene-acilir", "acik", "adventure", "cross"]),
    shellMaterial: z.string().nullable(),
    materialClass: z.enum(["karbon", "fiber", "termoplastik"]).nullable(),
    shellSizes: z.number().int().nullable(),
    ece2206: tri,
    dot: tri,
    snell: tri,
    fim: tri,
    weightGrams: z.number().int().nullable(),
    weightSize: z.string().nullable(),
    headShape: z.string().nullable(),
    visor: z.string().nullable(),
    pinlock: tri,
    pinlockIncluded: tri,
    sunVisor: tri,
    ventilation: z.string().nullable(),
    chinCurtain: tri,
    breathGuard: tri,
    linerRemovable: tri,
    linerWashable: tri,
    emergencyCheekPads: tri,
    retention: z.enum(["double-d", "mikrometrik", "diger"]).nullable(),
    intercomReady: tri,
    intercomNotes: z.string().nullable(),
    spoiler: tri,
    warrantyYears: z.number().nullable(),
    madeIn: z.string().nullable(),
  }),
});
export type Helmet = z.infer<typeof HelmetSchema>;

export const IntercomSchema = ProductBase.extend({
  category: z.literal("interkom"),
  specs: z.object({
    bluetoothVersion: z.string().nullable(),
    mesh: tri,
    meshTech: z.string().nullable(),
    meshMaxRiders: z.number().int().nullable(),
    bluetoothMaxRiders: z.number().int().nullable(),
    rangeMeters: z.number().int().nullable(),
    talkTimeHours: z.number().nullable(),
    chargeTimeHours: z.number().nullable(),
    usbC: tri,
    fastCharge: z.string().nullable(),
    speakers: z.string().nullable(),
    waterproof: z.string().nullable(),
    fmRadio: tri,
    musicSharing: tri,
    voiceCommand: tri,
    siri: tri,
    googleAssistant: tri,
    universalIntercom: tri,
    crossBrand: z.string().nullable(),
    otaUpdate: tri,
    app: z.string().nullable(),
    inBox: z.array(z.string()).default([]),
  }),
});
export type Intercom = z.infer<typeof IntercomSchema>;

const Protector = z.object({
  area: z.enum(["omuz", "dirsek", "sirt", "gogus", "kalca", "diz", "bilek", "avuc", "parmak", "ayak-bilegi", "kaval"]),
  standard: z.string().nullable(),
  level: z.union([z.literal(1), z.literal(2)]).nullable(),
  included: tri,
});

export const ApparelSchema = ProductBase.extend({
  category: z.enum(["mont", "eldiven", "bot", "pantolon", "koruma"]),
  specs: z.object({
    gender: z.enum(["erkek", "kadin", "unisex"]).nullable(),
    season: z.enum(["yaz", "kis", "4-mevsim"]).nullable(),
    material: z.string().nullable(),
    materialClass: z.enum(["deri", "tekstil", "karma"]).nullable(),
    ceStandard: z.string().nullable(),
    ceClass: z.string().nullable(),
    protectors: z.array(Protector).default([]),
    waterproof: tri,
    membrane: z.string().nullable(),
    airbagCompatible: tri,
    ventilation: z.string().nullable(),
    closure: z.string().nullable(),
    madeIn: z.string().nullable(),
  }),
});
export type Apparel = z.infer<typeof ApparelSchema>;

export type Product = Helmet | Intercom | Apparel;

export const CompatSchema = z.object({
  helmet: z.string(), // "shoei/neotec-3"
  intercom: z.string(), // "sena/srl3"
  level: z.enum(["ozel", "entegre", "standart", "adaptor", "uyumsuz"]),
  note: z.string(),
  verified: z.boolean(),
  source: SourceSchema.nullable(),
});
export type Compat = z.infer<typeof CompatSchema>;

export const BrandSchema = z.object({
  slug,
  name: z.string(),
  country: z.string().nullable(),
  founded: z.number().int().nullable(),
  website: z.string().url(),
  about: z.array(z.string().min(40)).min(1),
  strengths: z.array(z.string()).min(1),
  categories: z.array(slug).min(1),
  families: z.array(z.object({ name: z.string(), note: z.string(), url: z.string().url() })).default([]),
  /** Markanın en güçlü olduğu ürün/kategori için doğrudan üretici sayfası bağlantısı. */
  highlights: z.array(z.object({ label: z.string(), url: z.string().url(), reason: z.string() })).default([]),
  alternatives: z.array(slug).default([]),
  /** Doğrulanmış tarihçe: kuruluş, dönüm noktaları. */
  history: z.array(z.object({ year: z.number().int(), event: z.string() })).default([]),
  /** Markanın en güçlü olduğu ürün grubu, tek cümle (ör. "Çene açılır kask ve entegre interkom"). */
  strongestLine: z.string().nullable().default(null),
  sources: z.array(SourceSchema).min(1),
});
export type Brand = z.infer<typeof BrandSchema>;

export const GuideSchema = z.object({
  slug,
  title: z.string(),
  description: z.string().min(70).max(170),
  topic: slug, // kask, mont, interkom, koruma, genel...
  updatedAt: isoDate,
  readingMinutes: z.number().int(),
  intro: z.string().min(80),
  sections: z
    .array(z.object({ heading: z.string(), paragraphs: z.array(z.string()).min(1), bullets: z.array(z.string()).default([]) }))
    .min(3),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  relatedGuides: z.array(slug).default([]),
  relatedCategories: z.array(z.string()).default([]),
  sources: z.array(SourceSchema).default([]),
});
export type Guide = z.infer<typeof GuideSchema>;

/** Ürün medyası (src/data/media.json): üretici görselleri ve YouTube videoları. Ürün kaydından ayrı tutulur. */
export const MediaSchema = z.object({
  product: z.string(), // "shoei/neotec-3"
  images: z
    .array(
      z.object({
        url: z.string().url(), // doğrudan görsel adresi (üretici sunucusu)
        alt: z.string(),
        credit: z.string(), // ör. "Shoei"
        sourcePage: z.string().url(), // görselin alındığı resmi sayfa
      }),
    )
    .default([]),
  videos: z
    .array(
      z.object({
        youtubeId: z.string().regex(/^[A-Za-z0-9_-]{11}$/),
        title: z.string(),
        channel: z.string(),
        kind: z.enum(["resmi", "inceleme", "kurulum"]),
        lang: z.string(), // "tr", "en", "de"...
        checkedAt: isoDate,
      }),
    )
    .default([]),
});
export type Media = z.infer<typeof MediaSchema>;

/** Türkiye'de satılan motosiklet modelleri (src/data/motorcycles.json) – sihirbazın ilk adımı. */
export const MotorcycleSchema = z.object({
  slug,
  brand: z.string(),
  model: z.string(),
  type: z.enum(["scooter", "naked", "sport", "adventure", "touring", "cruiser", "enduro"]),
  cc: z.number().int().nullable(),
  generationFrom: z.number().int().nullable().default(null),
  licence: z.string().nullable().default(null),
  popularity: z.enum(["cok-satan", "ilgi"]),
  salesRank: z.number().int().nullable().default(null),
  courierCommon: z.boolean().default(false),
  notes: z.array(z.string()).default([]),
  officialUrl: z.string().url().nullable().default(null),
});
export type Motorcycle = z.infer<typeof MotorcycleSchema>;

/** Onaylanmış kullanıcı yorumları (src/data/reviews.json). Yalnızca site sahibinin onayladığı yorumlar eklenir. */
export const ReviewSchema = z.object({
  product: z.string(), // "shoei/neotec-3"
  author: z.string().min(2), // rumuz
  text: z.string().min(20),
  usage: z.string().nullable().default(null), // ör. "8 aydır, günlük kuryelik"
  sizeInfo: z.string().nullable().default(null), // ör. "Kafa 58 cm, M aldım, tam oldu"
  rating: z.number().int().min(1).max(5).nullable().default(null), // kullanıcının kendi puanı
  receivedAt: isoDate,
  approvedAt: isoDate,
});
export type Review = z.infer<typeof ReviewSchema>;
