import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container, PageHead } from "@/components/ui";
import { meta } from "@/lib/seo";

export const metadata = meta({
  title: "Hakkımızda",
  description: "Motorcu Kıyafeti, motosiklet ekipmanı seçimini kaynaklı teknik bilgi, şeffaf karşılaştırma ve sade rehberlerle kolaylaştırmak için kuruldu.",
  path: "/hakkimizda",
});

export default function AboutPage() {
  return (
    <>
      <PageHead title="Hakkımızda" intro="Motorunu yeni almış birinin de, yıllardır süren birinin de doğru ekipmanı başka bir siteye ihtiyaç duymadan seçebilmesini istiyoruz.">
        <Breadcrumbs items={[{ name: "Hakkımızda", href: "/hakkimizda" }]} />
      </PageHead>
      <Container className="mt-8 max-w-3xl">
        <div className="prose-mk">
          <p>
            Motorcu Kıyafeti bir mağaza değil; kask, mont, eldiven, bot, koruma ve interkom seçimi için bir bilgi ve karşılaştırma platformudur. Ürün satmıyoruz, bu yüzden bir ürünü öne çıkarmak için abartılı ifade kullanmamız gerekmiyor. Her ürünün artıları kadar eksilerini de yazıyoruz.
          </p>
          <h2>Nasıl çalışıyoruz?</h2>
          <ul>
            <li>Teknik bilgileri önce üreticinin resmi kaynağından doğruluyoruz.</li>
            <li>Doğrulayamadığımız bilgiyi tahminle doldurmuyor, açıkça işaretliyoruz.</li>
            <li>Karşılaştırmalarda kararımızın gerekçesini yazıyoruz; veri yoksa kazanan ilan etmiyoruz.</li>
            <li>Ürün sayısını hızla artırmak yerine her ürünü eksiksiz bir sayfayla ekliyoruz.</li>
          </ul>
          <p>
            Ayrıntılar için{" "}
            <Link href="/veri-politikasi" className="font-semibold text-red underline">
              veri ve kaynak politikamıza
            </Link>{" "}
            bakabilirsin.
          </p>
        </div>
      </Container>
    </>
  );
}
