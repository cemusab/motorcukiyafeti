import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/ui";
import { Wizard } from "@/components/Wizard";
import { GEAR } from "@/data/riding";
import { wizardProducts } from "@/lib/catalog";
import { getGuide } from "@/lib/data";
import { faqLd, meta } from "@/lib/seo";

export const metadata = meta({
  title: "Yeni Motor Aldım, Hangi Ekipmanları Almalıyım?",
  description: "Motor türünü, kullanımını, mevsimi ve bütçeni seç; ihtiyacın olan kask, mont, eldiven, bot ve korumaları nedenleri ve bütçe paylarıyla gör.",
  path: "/yeni-baslayanlar",
});

const STARTER = ["ilk-motosiklet-ekipmanlari", "kask-nasil-secilir", "kask-bedeni-nasil-olculur", "ece-22-06-nedir", "aa-ve-aaa-koruma-farki", "level-1-ve-level-2-koruma-farki", "motosiklet-eldiveni-nasil-secilir", "motosiklet-botu-nasil-secilir"];

export default function StarterPage() {
  const guides = STARTER.map(getGuide).filter((g) => !!g);
  const faq = [
    { q: "Yeni motorcu ilk olarak hangi ekipmanı almalı?", a: "Önce ECE 22.06 onaylı ve bedene tam oturan bir kask, ardından eldiven ve bileği kapatan bir bot. Bunlardan sonra korumalı mont ve pantolon gelir." },
    { q: "Ekipman bütçesi nasıl paylaştırılmalı?", a: `Genel bir yaklaşım olarak bütçenin yaklaşık %${GEAR.kask.share}'unu kaska, %${GEAR.mont.share}'sini monta, kalanını pantolon, eldiven ve bota ayırmak dengeli bir set sağlar.` },
    { q: "Şehir içinde kısa mesafe için de tam ekipman gerekir mi?", a: "Evet. Kazaların büyük kısmı şehir içinde ve düşük-orta hızlarda olur; kısa mesafe sürtünme ve darbe riskini ortadan kaldırmaz." },
  ];
  return (
    <>
      <JsonLd data={faqLd(faq)} />
      <div className="bg-night text-white">
        <Container className="py-10">
          <div className="[&_a]:text-white/70 [&_span]:text-white">
            <Breadcrumbs items={[{ name: "Yeni Başlayanlar", href: "/yeni-baslayanlar" }]} />
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-none font-bold sm:text-6xl">Yeni motor aldım, hangi ekipmanları almalıyım?</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/75">
            Kısa cevap: kask, mont, pantolon, eldiven ve bot temel settir. Motor türüne, kullanımına ve mevsime göre sırt koruması, interkom, yağmurluk ve termal giyim eklenir.
          </p>
          <div className="mt-8">
            <Wizard products={wizardProducts()} />
          </div>
        </Container>
      </div>
      <Container className="mt-12 grid gap-10 lg:grid-cols-2">
        <section>
          <h2 className="mb-4 font-display text-3xl font-bold">Başlangıç rehberleri</h2>
          <ul className="space-y-2">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link href={`/rehber/${g.slug}`} className="block rounded-lg border border-line bg-white p-4 hover:border-ink">
                  <span className="block font-display text-xl font-bold">{g.title}</span>
                  <span className="text-sm text-mute">{g.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="mb-4 font-display text-3xl font-bold">Sık sorulanlar</h2>
          <div className="space-y-2">
            {faq.map((f) => (
              <details key={f.q} className="rounded-lg border border-line bg-white open:border-ink">
                <summary className="cursor-pointer p-4 font-semibold">{f.q}</summary>
                <p className="px-4 pb-4 text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
