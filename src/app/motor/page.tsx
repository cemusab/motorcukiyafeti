import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container, PageHead } from "@/components/ui";
import { MOTO_TYPES } from "@/data/riding";
import { getMotorcycles } from "@/lib/data";
import { meta } from "@/lib/seo";

export const metadata = meta({
  title: "Motoruna Göre Ekipman: Honda PCX, Yamaha NMAX, CFMoto ve Diğerleri",
  description: "Türkiye'de çok satan ve popüler motosiklet modelleri için hangi kask, mont, eldiven ve botun uygun olduğu; ehliyet sınıfı ve modele özel notlar.",
  path: "/motor",
});

export default function BikesPage() {
  const bikes = getMotorcycles();
  const brands = [...new Set(bikes.map((b) => b.brand))].sort((a, b) => a.localeCompare(b, "tr"));
  return (
    <>
      <PageHead title="Motoruna göre ekipman" intro="Motorunun markasını ve modelini bul; o modele uygun ekipman setini, ehliyet sınıfını ve modele özel kullanım notlarını gör.">
        <Breadcrumbs items={[{ name: "Motoruna Göre", href: "/motor" }]} />
      </PageHead>
      <Container className="mt-8 space-y-8">
        {brands.map((br) => (
          <section key={br}>
            <h2 className="mb-3 font-display text-2xl font-bold">{br}</h2>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {bikes
                .filter((b) => b.brand === br)
                .map((b) => (
                  <li key={b.slug}>
                    <Link href={`/motor/${b.slug}`} className="block rounded-lg border border-line bg-white p-3 hover:border-ink hover:text-red">
                      <span className="block font-semibold">{b.model}</span>
                      <span className="text-sm text-mute">
                        {MOTO_TYPES.find((m) => m.slug === b.type)?.name}
                        {b.cc ? ` · ${b.cc} cc` : ""}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </Container>
    </>
  );
}
