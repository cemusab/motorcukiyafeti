export const SITE = {
  name: "Motorcu Kıyafeti",
  domain: "motorcukiyafeti.com",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://motorcukiyafeti.com").replace(/\/$/, ""),
  tagline: "Doğru ekipman, daha güvenli sürüş",
  description:
    "Motosiklet kıyafeti ve ekipmanı seçmek için kaynaklı rehber: kask, mont, pantolon, eldiven, bot ve koruma modellerini teknik veriyle karşılaştır.",
  locale: "tr_TR",
  /** Şikâyet, öneri, hata bildirimi ve kullanıcı yorumları bu adrese gelir; yorumlar onaydan sonra yayınlanır. */
  email: "motorcukiyafeti@gmail.com",
  /** Resmi sosyal medya hesapları (site sahibi açtı, 2026-10-08). Footer ve Organization schema sameAs bunu kullanır. */
  social: [
    { name: "Instagram", url: "https://www.instagram.com/motorcukiyafeticom/" },
    { name: "X", url: "https://x.com/motorcukiyafeti" },
  ],
};

/** Konu ve gövdesi hazır mailto bağlantısı. */
export const mailto = (subject: string, body = "") =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

export const abs = (p: string) => SITE.url + (p.startsWith("/") ? p : "/" + p);
