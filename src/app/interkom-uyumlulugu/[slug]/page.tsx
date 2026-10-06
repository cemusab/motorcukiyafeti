import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CompatBoard } from "@/components/CompatBoard";
import { HelmetPicker } from "@/components/HelmetPicker";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/ui";
import { compatForHelmet, compatSlug, helmetsWithCompat } from "@/lib/catalog";
import { brandName, displayName, getProductById, productId } from "@/lib/data";
import { faqLd, clip, meta } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => helmetsWithCompat().map((h) => ({ slug: compatSlug(h) }));
const find = (slug: string) => helmetsWithCompat().find((h) => compatSlug(h) === slug);

export async function generateMetadata({ params }: PageProps<"/interkom-uyumlulugu/[slug]">) {
  const { slug } = await params;
  const h = find(slug)!;
  return meta({
    title: `${displayName(h)} Uyumlu İnterkomlar`,
    description: clip(`${displayName(h)} kaskına hangi interkom uyar? Kaska özel, entegre, standart montaj ve uyumsuz modeller; doğrulama durumu ve kaynaklarıyla.`),
    path: `/interkom-uyumlulugu/${slug}`,
  });
}

export default async function HelmetCompatPage({ params }: PageProps<"/interkom-uyumlulugu/[slug]">) {
  const { slug } = await params;
  const h = find(slug);
  if (!h) notFound();
  const list = compatForHelmet(productId(h));
  const special = list.filter((c) => c.level === "ozel").map((c) => displayName(getProductById(c.intercom)!));
  const pick = helmetsWithCompat().map((x) => ({ brand: brandName(x.brand), name: x.name, slug: compatSlug(x) }));
  const answer = special.length
    ? `${displayName(h)} için üreticinin önerdiği kaska özel interkom: ${special.join(", ")}. Evrensel montajlı interkomlar da genellikle takılabilir; ayrıntılar aşağıda.`
    : `${displayName(h)} için kaska özel bir interkom veri tabanımızda yok; evrensel montajlı interkomların uyumu aşağıda doğrulama durumuyla listelendi.`;

  return (
    <>
      <JsonLd data={faqLd([{ q: `${displayName(h)} kaskına hangi interkom uyar?`, a: answer }])} />
      <Container className="pt-6">
        <Breadcrumbs items={[{ name: "Kask + İnterkom", href: "/interkom-uyumlulugu" }, { name: displayName(h), href: `/interkom-uyumlulugu/${slug}` }]} />
        <h1 className="mt-4 font-display text-4xl leading-none font-bold sm:text-5xl">{displayName(h)} uyumlu interkomlar</h1>
        <p className="mt-3 max-w-3xl text-lg">{answer}</p>
      </Container>
      <Container className="mt-6 space-y-8">
        <HelmetPicker helmets={pick} current={slug} />
        <CompatBoard helmet={h} />
      </Container>
    </>
  );
}
