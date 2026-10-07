import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BudgetLinks } from "@/components/BudgetLinks";
import { Container, LinkCard, Notice, PageHead } from "@/components/ui";
import { activeLists } from "@/lib/catalog";
import { meta } from "@/lib/seo";

export const metadata = meta({
  title: "Ne Almalıyım? Kask, Mont ve İnterkom Önerileri",
  description: "Gerçek sorulara göre hazırlanmış öneri listeleri: en hafif kasklar, çene açılır kasklar, uzun yol kaskları, Mesh interkomlar ve yazlık montlar.",
  path: "/ne-almaliyim",
});

export default function ListsPage() {
  const lists = activeLists();
  return (
    <>
      <PageHead title="Ne almalıyım?" intro="Her liste açık kriterlerle, yalnızca verisi doğrulanmış ürünlerden oluşturulur. Kriterleri karşılayan ürün sayısı az ise liste kısa kalır; listeyi doldurmak için ürün eklemeyiz.">
        <Breadcrumbs items={[{ name: "Ne Almalıyım?", href: "/ne-almaliyim" }]} />
      </PageHead>
      <Container className="mt-8">
        <h2 className="mb-3 font-display text-3xl font-bold">Bütçene göre</h2>
        <BudgetLinks limit={12} />
        <h2 className="mt-10 mb-3 font-display text-3xl font-bold">İhtiyacına göre</h2>
      </Container>
      <Container className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {lists.length ? lists.map((l) => <LinkCard key={l.slug} href={`/ne-almaliyim/${l.slug}`} title={l.title} desc={l.description} icon="star" />) : <Notice>Listeler ürün verileri eklendikçe yayınlanacak.</Notice>}
      </Container>
    </>
  );
}
