// Merkezi Route Manifest Dosyası
// Sitedeki tüm linklerin kırılmasını önlemek için sabit route tanımları.

export const ROUTES = {
  HOME: "/",
  CATEGORIES: {
    KASK: "/kask",
    MONT: "/mont",
    PANTOLON: "/pantolon",
    ELDIVEN: "/eldiven",
    BOT: "/bot",
    INTERKOM: "/interkom",
    KORUMA: "/koruma",
    YAGMURLUK: "/yagmurluk",
    TERMAL: "/termal-giyim",
    AKSESUAR: "/aksesuar",
  },
  BRANDS: {
    INDEX: "/markalar",
    DETAIL: (slug: string) => `/markalar/${slug}`,
  },
  PRODUCTS: {
    KASK_DETAIL: (slug: string) => `/kask/${slug}`,
    MONT_DETAIL: (slug: string) => `/mont/${slug}`,
    INTERKOM_DETAIL: (slug: string) => `/interkom/${slug}`,
  },
  TOOLS: {
    COMPARE: "/karsilastir",
    WIZARD: "/yeni-baslayanlar",
    COMPATIBILITY: "/uyumluluk",
  },
  CONTENT: {
    GUIDES: "/rehberler",
    GUIDE_DETAIL: (slug: string) => `/rehberler/${slug}`,
  },
  USER: {
    FAVORITES: "/favoriler",
    ACCOUNT: "/hesabim",
  },
  LEGAL: {
    ABOUT: "/hakkimizda",
    PRIVACY: "/gizlilik",
    CONTACT: "/iletisim",
  }
};
