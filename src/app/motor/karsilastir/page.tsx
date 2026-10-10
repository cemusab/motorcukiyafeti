import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MotorCompare } from "@/components/MotorCompare";
import { Container, PageHead } from "@/components/ui";
import { bikeRows } from "@/lib/bike-rows";
import { meta } from "@/lib/seo";

export const metadata = meta({
  title: "Motosiklet Karşılaştırma ve Uygun Ekipman",
  description: "Türkiye'de satılan motosikletleri güç, tork, ağırlık, sele yüksekliği ve lastik ebadına göre yan yana koy; her motor için uygun ekipman setini gör.",
  path: "/motor/karsilastir",
});

export default function MotorComparePage() {
  const bikes = bikeRows();
  return (
    <>
      <PageHead
        title="Motosiklet karşılaştırma"
        intro={`En fazla 4 motoru yan yana koy: güç, tork, ağırlık, sele yüksekliği, lastik ebadı ve önerilen yağ. Değerler üreticinin resmi teknik sayfasından, kaynağıyla; ${bikes.length} model. Her motorun altında ona uygun ekipman seti.`}
      >
        <Breadcrumbs items={[{ name: "Motoruna Göre", href: "/motor" }, { name: "Karşılaştır", href: "/motor/karsilastir" }]} />
      </PageHead>
      <Container className="mt-8">
        <Suspense fallback={null}>
          <MotorCompare bikes={bikes} />
        </Suspense>
      </Container>
    </>
  );
}
