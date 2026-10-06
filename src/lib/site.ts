export const SITE = {
  name: "MotorcuKiyafeti",
  domain: "motorcukiyafeti.com",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://motorcukiyafeti.com").replace(/\/$/, ""),
  tagline: "Doğru ekipman, daha güvenli sürüş",
  description:
    "Motosiklet kaskı, mont, eldiven, bot, koruma ve interkom için kaynaklı teknik bilgiler, karşılaştırmalar ve satın alma rehberleri.",
  locale: "tr_TR",
};

export const abs = (p: string) => SITE.url + (p.startsWith("/") ? p : "/" + p);
