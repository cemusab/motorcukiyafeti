import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { MotorTable } from "@/components/MotorCompare";
import { Container, PageHead } from "@/components/ui";
import { bikeRows } from "@/lib/bike-rows";
import { motorPairs } from "@/lib/catalog";
import { faqLd, meta } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => motorPairs().map((p) => ({ cift: p.slug }));

const pair = (slug: string) => motorPairs().find((p) => p.slug === slug);
const nm = (m: { brand: string; model: string }) => `${m.brand} ${m.model}`;
const tr = (n: number) => String(Math.round(n * 10) / 10).replace(".", ",");

export async function generateMetadata({ params }: PageProps<"/motor/karsilastir/[cift]">) {
  const p = pair((await params).cift)!;
  const [a, b] = p.items;
  const title = `${nm(a)} vs ${nm(b)}`;
  return meta({
    title: title.length <= 44 ? `${title}: Teknik Karşılaştırma` : title,
    description: `${nm(a)} ile ${nm(b)} karşılaştırması: güç, tork, ağırlık, sele yüksekliği, lastik ebadı ve her iki motor için uygun ekipman. Üretici verileriyle.`.slice(0, 158),
    path: `/motor/karsilastir/${p.slug}`,
    noindex: !p.indexable,
  });
}

/** Yalnız kaynaklı sayılarla kurulan, yargı içermeyen fark cümleleri. */
function facts(a: ReturnType<typeof pair>) {
  const [x, y] = a!.items;
  const out: string[] = [];
  const pw = (m: typeof x) => m.tech!.powerKw;
  if (pw(x) != null && pw(y) != null && pw(x) !== pw(y)) {
    const [hi, lo] = pw(x)! > pw(y)! ? [x, y] : [y, x];
    out.push(`${nm(hi)}, üretici verisine göre ${tr(pw(hi)! - pw(lo)!)} kW daha güçlü (${tr(pw(hi)!)} kW'a karşı ${tr(pw(lo)!)} kW).`);
  }
  if (x.tech!.torqueNm != null && y.tech!.torqueNm != null && x.tech!.torqueNm !== y.tech!.torqueNm) {
    const [hi, lo] = x.tech!.torqueNm > y.tech!.torqueNm ? [x, y] : [y, x];
    out.push(`Tork: ${nm(hi)} ${tr(hi.tech!.torqueNm!)} Nm, ${nm(lo)} ${tr(lo.tech!.torqueNm!)} Nm.`);
  }
  const wt = x.tech!.weightType;
  if (x.tech!.weightKg != null && y.tech!.weightKg != null && wt && wt === y.tech!.weightType && x.tech!.weightKg !== y.tech!.weightKg) {
    const [lt, hv] = x.tech!.weightKg < y.tech!.weightKg ? [x, y] : [y, x];
    out.push(`${nm(lt)}, ${tr(hv.tech!.weightKg! - lt.tech!.weightKg!)} kg daha hafif (ikisi de ${wt === "islak" ? "ıslak" : wt === "kuru" ? "kuru" : "sürüşe hazır"} ağırlık).`);
  }
  if (x.tech!.seatHeightMm != null && y.tech!.seatHeightMm != null && x.tech!.seatHeightMm !== y.tech!.seatHeightMm) {
    const [low, high] = x.tech!.seatHeightMm < y.tech!.seatHeightMm ? [x, y] : [y, x];
    out.push(`Sele yüksekliği ${nm(low)} modelinde ${low.tech!.seatHeightMm} mm, ${nm(high)} modelinde ${high.tech!.seatHeightMm} mm; kısa boyluysan ikisine de oturarak dene.`);
  }
  if (x.licence && y.licence) out.push(x.licence === y.licence ? `İkisi de ${x.licence} sınıfı ehliyetle kullanılır.` : `Ehliyet: ${nm(x)} ${x.licence}, ${nm(y)} ${y.licence} sınıfı.`);
  return out;
}

export default async function MotorPairPage({ params }: PageProps<"/motor/karsilastir/[cift]">) {
  const p = pair((await params).cift);
  if (!p) notFound();
  const [a, b] = p.items;
  const list = facts(p);
  const rows = bikeRows();
  const faq = [{ q: `${nm(a)} mı ${nm(b)} mi?`, a: `${list.join(" ")} Hangisinin sana uygun olduğu kullanımına, boyuna ve ehliyetine bağlı; iki modeli de bayide oturup dene.` }];
  return (
    <>
      <JsonLd data={faqLd(faq)} />
      <PageHead title={`${nm(a)} vs ${nm(b)}`} intro="Üreticinin resmi teknik sayfalarındaki verilerle yan yana karşılaştırma; her iki motor için uygun ekipman ve lastik/yağ bilgisiyle. Fiyat gösterilmez.">
        <Breadcrumbs items={[{ name: "Motoruna Göre", href: "/motor" }, { name: "Karşılaştır", href: "/motor/karsilastir" }, { name: `${a.model} vs ${b.model}`, href: `/motor/karsilastir/${p.slug}` }]} />
      </PageHead>
      <Container className="mt-8 space-y-8">
        {list.length > 0 && (
          <section className="max-w-3xl rounded-lg border border-line bg-white p-5">
            <h2 className="mb-2 font-display text-2xl font-bold">Kısaca farklar</h2>
            <ul className="list-disc space-y-1 pl-5">
              {list.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>
        )}
        <MotorTable selected={[a.slug, b.slug].map((s) => rows.find((r) => r.slug === s)!).filter(Boolean)} />
        <p className="text-sm">
          <Link href={`/motor/karsilastir?m=${a.slug},${b.slug}`} className="font-semibold text-red hover:underline">
            Bu karşılaştırmaya başka motor ekle →
          </Link>
        </p>
      </Container>
    </>
  );
}
