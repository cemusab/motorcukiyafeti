import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Container, PageHead } from "@/components/ui";
import { MOTO_TYPES } from "@/data/riding";
import { activeLists } from "@/lib/catalog";
import { getGuides } from "@/lib/data";
import { itemListLd, meta } from "@/lib/seo";

export const metadata = meta({
  title: "Motosiklet Ekipmanı Rehberleri",
  description: "Kask, mont, eldiven, bot, koruma ve interkom seçimi; ECE 22.06, EN 17092 ve EN 1621 standartları hakkında sade ve kaynaklı rehberler.",
  path: "/rehber",
});

const TOPICS: Record<string, string> = { genel: "Başlangıç ve genel", kask: "Kask", interkom: "İnterkom", mont: "Mont ve giyim", malzeme: "Kumaş ve malzeme", sektor: "Sektör ve haberler (kurye dünyası)", koruma: "Koruma", eldiven: "Eldiven", bot: "Bot" };

export default function GuidesPage() {
  const guides = getGuides();
  const topics = Object.keys(TOPICS).filter((t) => guides.some((g) => g.topic === t));
  const lists = activeLists();
  return (
    <>
      <PageHead title="Rehberler" intro="Doğru ekipmanı seçmek için bilmen gerekenler. Her rehber bir soruya net cevap vererek başlar; teknik bilgiler kaynaklarıyla birlikte verilir.">
        <Breadcrumbs items={[{ name: "Rehberler", href: "/rehber" }]} />
      </PageHead>
      <JsonLd data={itemListLd("Rehberler", guides.map((g) => ({ name: g.title, href: `/rehber/${g.slug}` })))} />
      <Container className="mt-8 space-y-12">
        {topics.map((t) => (
          <section key={t}>
            <h2 className="mb-4 font-display text-3xl font-bold">{TOPICS[t]}</h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {guides
                .filter((g) => g.topic === t)
                .map((g) => (
                  <li key={g.slug}>
                    <Link href={`/rehber/${g.slug}`} className="group flex h-full flex-col rounded-lg border border-line bg-white p-5 hover:border-ink hover:shadow-md">
                      <span className="text-xs font-semibold tracking-wide text-red uppercase">{g.readingMinutes} dk okuma</span>
                      <span className="mt-1 font-display text-xl leading-tight font-bold group-hover:text-red">{g.title}</span>
                      <span className="mt-2 text-sm text-mute">{g.description}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
        {lists.length > 0 && (
          <section>
            <h2 className="mb-4 font-display text-3xl font-bold">Ne almalıyım?</h2>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {lists.map((l) => (
                <li key={l.slug}>
                  <Link href={`/ne-almaliyim/${l.slug}`} className="block rounded-lg border border-line bg-white p-4 font-semibold hover:border-ink hover:text-red">
                    {l.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        <section>
          <h2 className="mb-4 font-display text-3xl font-bold">Motosikletime göre</h2>
          <ul className="flex flex-wrap gap-2">
            {MOTO_TYPES.map((m) => (
              <li key={m.slug}>
                <Link href={`/motosikletime-gore/${m.slug}`} className="block rounded-full border border-line bg-white px-4 py-2 font-semibold hover:border-ink hover:text-red">
                  {m.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
