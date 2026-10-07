import { notFound } from "next/navigation";
import { getLegal, legalReady } from "@/lib/legal";
import { meta } from "@/lib/seo";
import { formatDate } from "@/lib/data";
import { Breadcrumbs } from "./Breadcrumbs";
import { Container, PageHead } from "./ui";

export function legalMeta(slug: string) {
  const p = getLegal().pages.find((x) => x.slug === slug)!;
  return meta({ title: p.title, description: p.description, path: `/${slug}` });
}

export function LegalPageView({ slug }: { slug: string }) {
  if (!legalReady()) notFound();
  const legal = getLegal();
  const p = legal.pages.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <>
      <PageHead title={p.title} intro={p.intro}>
        <Breadcrumbs items={[{ name: p.title, href: `/${slug}` }]} />
      </PageHead>
      <Container className="mt-8 max-w-3xl">
        <p className="text-sm text-mute">Son güncelleme: {formatDate(legal.updatedAt)}</p>
        <div className="prose-mk mt-4">
          {p.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {(s.paragraphs ?? []).map((x) => (
                <p key={x}>{x}</p>
              ))}
              {s.bullets && s.bullets.length > 0 && (
                <ul>
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
