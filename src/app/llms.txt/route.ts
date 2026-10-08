import { CATEGORIES } from "@/data/categories";
import { CATEGORY_SEO, categorySeoName } from "@/data/category-seo";
import { activeLists } from "@/lib/catalog";
import { getBrands, getGuides, getProducts, productsIn } from "@/lib/data";
import { SITE, abs } from "@/lib/site";

export const dynamic = "force-static";

/**
 * llms.txt (llmstxt.org önerisi): yapay zekâ asistanlarına sitenin ne olduğunu, veri kurallarını ve en önemli
 * sayfaları düz metin/Markdown olarak anlatır. Sayılar ve listeler gerçek veriden üretilir.
 */
export function GET() {
  const cats = CATEGORIES.filter((c) => productsIn(c.slug).length);
  const guides = getGuides();
  const lines = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    `${SITE.name} (${SITE.domain}) Türkiye'deki motosiklet sürücüleri için bağımsız bir motosiklet kıyafeti ve ekipmanı rehberi ve karşılaştırma sitesidir; ürün satmaz.`,
    `Veri tabanında ${getProducts().length} ürün, ${getBrands().length} marka ve ${guides.length} rehber bulunur.`,
    "",
    "Veri kuralları:",
    "- Teknik bilgiler üreticinin resmi sayfasından alınır; her ürün sayfasında kaynak ve son kontrol tarihi yazar.",
    "- Doğrulanamayan bilgi uydurulmaz, \"Doğrulanıyor\" olarak gösterilir.",
    "- Türkiye fiyatları yetkili satıcılardan, satıcı adı ve kontrol tarihiyle verilir; canlı fiyat değildir.",
    "- Sayısal site puanı yoktur; karşılaştırma kararları şeffaf kurallarla, yalnız kaynaklı veriye göre verilir.",
    "- Yerli (Türkiye) markalar ayrıca işaretlenir.",
    "",
    "## Kategoriler",
    ...cats.map((c) => `- [${categorySeoName(c.slug, c.name)}](${abs(`/${c.slug}`)}): ${CATEGORY_SEO[c.slug]?.description ?? c.intro}`),
    "",
    "## Araçlar",
    `- [Karşılaştırma](${abs("/karsilastir")}): Aynı kategorideki ürünleri teknik veriyle yan yana karşılaştırma ve bütçeye göre hazır karşılaştırmalar.`,
    `- [Kask + interkom uyumluluğu](${abs("/interkom-uyumlulugu")}): Hangi interkomun hangi kaska uyduğu, kaynak ve doğrulama durumuyla.`,
    `- [Yeni başlayanlar](${abs("/yeni-baslayanlar")}): İlk motosiklet ekipmanı listesi ve ekipman sihirbazı.`,
    `- [Motosikletime göre](${abs("/motosikletime-gore")}): Scooter, naked, touring, adventure ve kurye kullanımına göre ekipman.`,
    `- [Kadın](${abs("/kadin")}) ve [Erkek](${abs("/erkek")}) motosiklet kıyafetleri.`,
    `- [Markalar](${abs("/markalar")}): Marka profilleri, menşe ülke ve öne çıkan ürünler.`,
    "",
    "## Rehberler",
    ...guides.map((g) => `- [${g.title}](${abs(`/rehber/${g.slug}`)}): ${g.description}`),
    ...(activeLists().length ? ["", "## Ne almalıyım? listeleri", ...activeLists().map((l) => `- [${l.title}](${abs(`/ne-almaliyim/${l.slug}`)}): ${l.description}`)] : []),
    "",
    "## Hakkında",
    `- [Veri politikası](${abs("/veri-politikasi")}): Kaynaklar, doğrulama ve güncelleme yöntemi.`,
    `- [Hakkımızda](${abs("/hakkimizda")})`,
    `- İletişim ve düzeltme bildirimi: ${SITE.email}`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
