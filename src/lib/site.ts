export const SITE = {
  name: "Motorcu Kıyafeti",
  domain: "motorcukiyafeti.com",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://motorcukiyafeti.com").replace(/\/$/, ""),
  tagline: "Doğru ekipman, daha güvenli sürüş",
  description:
    "Motosiklet kaskı, mont, eldiven, bot, koruma ve interkom için kaynaklı teknik bilgiler, karşılaştırmalar ve satın alma rehberleri.",
  locale: "tr_TR",
  /** Şikâyet, öneri, hata bildirimi ve kullanıcı yorumları bu adrese gelir; yorumlar onaydan sonra yayınlanır. */
  email: "motorcukiyafeti@gmail.com",
};

/** Konu ve gövdesi hazır mailto bağlantısı. */
export const mailto = (subject: string, body = "") =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

export const abs = (p: string) => SITE.url + (p.startsWith("/") ? p : "/" + p);
