import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Favorites } from "@/components/Favorites";
import { Container, PageHead } from "@/components/ui";
import { meta } from "@/lib/seo";

export const metadata = meta({ title: "Favorilerim", description: "Favorilere eklediğin motosiklet ekipmanları. Liste yalnızca bu tarayıcıda saklanır.", path: "/favoriler", noindex: true });

export default function FavoritesPage() {
  return (
    <>
      <PageHead title="Favorilerim" intro="Favori listen yalnızca bu tarayıcıda saklanır; hesap gerekmez.">
        <Breadcrumbs items={[{ name: "Favoriler", href: "/favoriler" }]} />
      </PageHead>
      <Container className="mt-8">
        <Favorites />
      </Container>
    </>
  );
}
