import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SearchResults } from "@/components/SearchResults";
import { Container, PageHead } from "@/components/ui";
import { meta } from "@/lib/seo";

export const metadata = meta({ title: "Arama", description: "MotorcuKiyafeti içinde ürün, marka, kategori ve rehber ara.", path: "/arama", noindex: true });

export default function SearchPage() {
  return (
    <>
      <PageHead title="Arama">
        <Breadcrumbs items={[{ name: "Arama", href: "/arama" }]} />
      </PageHead>
      <Container className="mt-6">
        <Suspense fallback={<p className="text-mute">Yükleniyor…</p>}>
          <SearchResults />
        </Suspense>
      </Container>
    </>
  );
}
