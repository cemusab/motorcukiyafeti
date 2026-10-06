import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HelmetPicker } from "@/components/HelmetPicker";
import { Container, PageHead } from "@/components/ui";
import { compatForHelmet, compatSlug, helmetsWithCompat } from "@/lib/catalog";
import { brandName, displayName, getGuide, productId } from "@/lib/data";
import { meta } from "@/lib/seo";

export const metadata = meta({
  title: "Kask + İnterkom Uyumluluğu: Kaskıma Hangi İnterkom Uyar?",
  description: "Kaskını seç; ona özel, tam entegre, standart montajla uyumlu veya adaptör gerektiren interkomları kaynak ve doğrulama durumuyla gör.",
  path: "/interkom-uyumlulugu",
});

export default function CompatPage() {
  const helmets = helmetsWithCompat();
  const pick = helmets.map((h) => ({ brand: brandName(h.brand), name: h.name, slug: compatSlug(h) }));
  return (
    <>
      <PageHead title="Kask + İnterkom Uyumluluğu" intro="Kaskını seç, hangi interkomların ona özel, tam entegre, standart montajla uyumlu ya da adaptör gerektiren olduğunu gör. Her kaydın doğrulama durumu ve kaynağı açıkça belirtilir.">
        <Breadcrumbs items={[{ name: "Kask + İnterkom", href: "/interkom-uyumlulugu" }]} />
      </PageHead>
      <Container className="mt-8 space-y-8">
        {helmets.length ? <HelmetPicker helmets={pick} /> : <p className="text-mute">Uyumluluk verisi yükleniyor.</p>}
        <section>
          <h2 className="mb-3 font-display text-3xl font-bold">Kasklar</h2>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {helmets.map((h) => {
              const list = compatForHelmet(productId(h));
              const ok = list.filter((c) => c.level !== "uyumsuz").length;
              return (
                <li key={productId(h)}>
                  <Link href={`/interkom-uyumlulugu/${compatSlug(h)}`} className="flex justify-between gap-2 rounded-lg border border-line bg-white p-4 font-semibold hover:border-ink hover:text-red">
                    {displayName(h)} <span className="text-sm font-normal text-mute">{ok} uyumlu</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
        {getGuide("interkom-nasil-secilir") && (
          <Link href="/rehber/interkom-nasil-secilir" className="inline-block font-semibold text-red hover:underline">
            İnterkom nasıl seçilir? Rehberi oku →
          </Link>
        )}
      </Container>
    </>
  );
}
