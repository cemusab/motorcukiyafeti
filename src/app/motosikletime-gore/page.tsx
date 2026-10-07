import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container, LinkCard, PageHead } from "@/components/ui";
import { MOTO_TYPES } from "@/data/riding";
import { meta } from "@/lib/seo";

export const metadata = meta({
  title: "Motosikletime Göre Ekipman: Scooter, Naked, Sport, Adventure, Touring",
  description: "Motosiklet türüne ve sürüş şekline göre hangi kask, mont, eldiven ve botun seçilmesi gerektiği; kurye kullanımı dahil.",
  path: "/motosikletime-gore",
});

export default function MotoTypesPage() {
  return (
    <>
      <PageHead title="Motosikletime göre ekipman" intro="Scooter ile adventure motorun ekipman ihtiyacı aynı değildir. Motor türünü seç; kask tipinden mont sınıfına kadar neye dikkat etmen gerektiğini gör.">
        <Breadcrumbs items={[{ name: "Motosikletime Göre", href: "/motosikletime-gore" }]} />
      </PageHead>
      <Container className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {MOTO_TYPES.map((m) => (
          <LinkCard key={m.slug} href={`/motosikletime-gore/${m.slug}`} title={m.name} desc={m.summary.split(". ")[0] + "."} icon="bike" />
        ))}
      </Container>
    </>
  );
}
