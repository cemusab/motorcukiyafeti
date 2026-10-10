import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import { RelatedLinks } from "@/components/Related";
import { Container, PageHead } from "@/components/ui";
import { MAINTENANCE_CATEGORIES } from "@/data/categories";
import { getGuide, productsIn } from "@/lib/data";
import { meta } from "@/lib/seo";

export const metadata = meta({
  title: "Motosiklet Bakımı: Lastik, Motor Yağı ve Bakım Ürünleri",
  description: "Motoruna uygun lastik ebadı ve motor yağı, zincir bakımı, fren hidroliği ve sezon kontrolü: üretici verisiyle lastik ve yağ seçimi, bakım rehberleri.",
  path: "/motor-bakimi",
});

const GUIDES = [
  "motosiklet-lastigi-nelere-dikkat-edilmeli",
  "motosiklet-lastik-markalari",
  "motosiklet-yagi-ve-bakim-urunleri",
  "motor-yagi-degisimi-dikkat-edilecekler",
  "motosiklet-zincir-bakimi-ve-yaglama",
  "sezon-oncesi-motosiklet-kontrol-listesi",
  "motosiklet-nasil-yikanir",
];

export default function MaintenancePage() {
  const guides = GUIDES.filter((g) => getGuide(g));
  return (
    <>
      <PageHead
        title="Motor bakımı: lastik ve yağ"
        intro="Ekipmanın kadar motorunun bakımı da güvenliğin parçası. Lastik ebadını ve motor yağı sınıfını motoruna göre bul; zincir, fren ve soğutma bakım ürünlerini üretici verileriyle karşılaştır."
      >
        <Breadcrumbs items={[{ name: "Motor bakımı", href: "/motor-bakimi" }]} />
      </PageHead>
      <Container className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <Link href="/motor" className="flex items-center justify-between gap-4 rounded-lg bg-night p-5 text-white hover:bg-ink-2">
            <span>
              <span className="block font-display text-2xl font-bold">Motoruna uygun lastik ve yağı bul</span>
              <span className="mt-1 block text-sm text-white/70">Motor modelini seç: fabrika lastik ebadı, üreticinin önerdiği yağ ve uyan ürünler tek sayfada.</span>
            </span>
            <span className="shrink-0 rounded-md bg-red px-4 py-2 text-sm font-semibold">Motorunu seç →</span>
          </Link>
          {MAINTENANCE_CATEGORIES.map((c) => (
            <section key={c.slug} className="rounded-lg border border-line bg-white p-5">
              <h2 className="flex items-center gap-2 font-display text-3xl font-bold">
                <Icon name={c.icon} className="size-7 text-red" />
                <Link href={`/${c.slug}`} className="hover:text-red">
                  {c.name}
                </Link>
                <span className="text-base font-normal text-mute">({productsIn(c.slug).length} ürün)</span>
              </h2>
              <p className="mt-2 text-ink-2">{c.intro}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.groups
                  .flatMap((g) => g.items)
                  .filter((s) => productsIn(c.slug, s.slug).length)
                  .map((s) => (
                    <li key={s.slug}>
                      <Link href={`/${c.slug}/${s.slug}`} className="block rounded-full border border-line px-3 py-1.5 text-sm font-semibold hover:border-ink hover:text-red">
                        {s.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
        <aside>
          <RelatedLinks guides={guides} title="Bakım rehberleri" />
        </aside>
      </Container>
    </>
  );
}
