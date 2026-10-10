import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Container, Notice, PageHead } from "@/components/ui";
import { MOTO_TYPES } from "@/data/riding";
import { getMotorcycles } from "@/lib/data";
import { faqLd, meta } from "@/lib/seo";

export const metadata = meta({
  title: "Motosiklet Sele Yüksekliği ve Ağırlık Tablosu",
  description: "Türkiye'de satılan motosikletlerin üreticinin açıkladığı sele yüksekliği ve ağırlığı tek tabloda; kısa boylu sürücüler için alçak seleli modeller.",
  path: "/motor/sele-yuksekligi",
});

const WEIGHT_LABEL: Record<string, string> = { islak: "ıslak", kuru: "kuru", "surushe-hazir": "sürüşe hazır" };
const FAQ = [
  {
    q: "Sele yüksekliği kaç olmalı?",
    a: "Tek bir doğru değer yoktur; belirleyici olan iç bacak boyun, selenin genişliği ve motorun ağırlığıdır. Aynı sele yüksekliğinde geniş bir sele ayağını yere daha zor bastırır. En doğrusu bayide oturup iki ayağının yere ne kadar bastığını denemektir.",
  },
  {
    q: "Ağırlık değerleri neden farklı tanımlarla yazılıyor?",
    a: "Üreticiler ağırlığı farklı tanımlarla verir: ıslak (yağ ve yakıt dahil), sürüşe hazır veya kuru/boş. Tanımlar arasında kayda değer fark olabileceği için tabloda her değerin yanında tanımı yazar; farklı tanımları birbiriyle karşılaştırma.",
  },
  {
    q: "Kısa boyluyum, seleyi alçaltabilir miyim?",
    a: "Bazı modellerde üreticinin sunduğu alçak sele veya ayarlı sele seçeneği vardır; tabloda kaynakta yazıyorsa notta belirtilir. Süspansiyonu alçaltan kitler sürüş geometrisini değiştirdiği için yetkili servisle konuşmadan uygulanmamalıdır.",
  },
];

export default function SeatHeightPage() {
  const rows = getMotorcycles()
    .filter((m) => m.tech?.seatHeightMm != null)
    .sort((a, b) => a.tech!.seatHeightMm! - b.tech!.seatHeightMm! || a.brand.localeCompare(b.brand, "tr"));
  return (
    <>
      <JsonLd data={faqLd(FAQ)} />
      <PageHead
        title="Motosiklet sele yüksekliği ve ağırlık tablosu"
        intro={`${rows.length} modelin üreticinin resmi teknik sayfasında açıkladığı sele yüksekliği ve ağırlığı, alçaktan yükseğe sıralı. Ağırlığın yanında tanımı (ıslak, kuru, sürüşe hazır) yazar; farklı tanımlar birbiriyle karşılaştırılmamalıdır.`}
      >
        <Breadcrumbs items={[{ name: "Motoruna Göre", href: "/motor" }, { name: "Sele yüksekliği", href: "/motor/sele-yuksekligi" }]} />
      </PageHead>
      <Container className="mt-8">
        <Notice>Değerler üretici beyanıdır ve donanım paketine göre değişebilir. Satın almadan önce motora oturup dene; birden çok modeli yan yana görmek için <Link href="/motor/karsilastir" className="font-semibold underline">motor karşılaştırma aracını</Link> kullan.</Notice>
        <div className="-mx-4 mt-6 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[560px] border-collapse rounded-lg border border-line bg-white text-left text-sm">
            <thead className="bg-paper">
              <tr>
                <th scope="col" className="p-3 font-semibold">Model</th>
                <th scope="col" className="p-3 font-semibold">Tip</th>
                <th scope="col" className="p-3 font-semibold">Sele yüksekliği</th>
                <th scope="col" className="p-3 font-semibold">Ağırlık</th>
                <th scope="col" className="p-3 font-semibold">Ehliyet</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m) => (
                <tr key={m.slug} className="border-t border-line align-top">
                  <th scope="row" className="p-3 font-semibold">
                    <Link href={`/motor/${m.slug}`} className="hover:text-red">
                      {m.brand} {m.model}
                    </Link>
                  </th>
                  <td className="p-3 text-ink-2">{MOTO_TYPES.find((t) => t.slug === m.type)?.name}</td>
                  <td className="p-3">
                    <strong>{m.tech!.seatHeightMm} mm</strong>
                    {m.tech!.seatHeightNote && <span className="block text-xs text-mute">{m.tech!.seatHeightNote}</span>}
                  </td>
                  <td className="p-3 text-ink-2">
                    {m.tech!.weightKg != null ? `${m.tech!.weightKg} kg` : "—"}
                    {m.tech!.weightKg != null && <span className="block text-xs text-mute">{m.tech!.weightType ? WEIGHT_LABEL[m.tech!.weightType] : "tanım belirtilmemiş"}</span>}
                  </td>
                  <td className="p-3 text-ink-2">{m.licence ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <section className="mt-10 max-w-3xl">
          <h2 className="mb-4 font-display text-3xl font-bold">Sık sorulanlar</h2>
          <div className="space-y-2">
            {FAQ.map((f) => (
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
