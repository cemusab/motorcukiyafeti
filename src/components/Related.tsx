import Link from "next/link";
import { getCategory, getSubcategory } from "@/data/categories";
import { getGuide } from "@/lib/data";
import { Icon } from "./Icon";

/** İlgili rehber ve kategori bağlantıları; yalnızca var olan hedefler gösterilir. */
export function RelatedLinks({ guides = [], categories = [], title = "İlgili içerikler" }: { guides?: string[]; categories?: string[]; title?: string }) {
  const g = [...new Set(guides)].map(getGuide).filter((x) => !!x);
  const c = [...new Set(categories)]
    .map((path) => {
      const [cat, sub] = path.split("/");
      if (!sub) {
        const cc = getCategory(cat);
        return cc ? { href: `/${cat}`, name: `Tüm ${cc.name.toLocaleLowerCase("tr")} modelleri` } : null;
      }
      const s = getSubcategory(cat, sub);
      return s ? { href: `/${cat}/${sub}`, name: s.sub.name } : null;
    })
    .filter((x) => !!x);
  if (!g.length && !c.length) return null;
  return (
    <section className="rounded-lg border border-line bg-white p-5">
      <h2 className="mb-3 font-display text-2xl font-bold">{title}</h2>
      <ul className="space-y-2">
        {g.map((x) => (
          <li key={x.slug}>
            <Link href={`/rehber/${x.slug}`} className="flex items-start gap-2 font-semibold hover:text-red">
              <Icon name="book" className="mt-0.5 size-4 shrink-0 text-red" /> {x.title}
            </Link>
          </li>
        ))}
        {c.map((x) => (
          <li key={x.href}>
            <Link href={x.href} className="flex items-start gap-2 font-semibold hover:text-red">
              <Icon name="arrow" className="mt-0.5 size-4 shrink-0 text-red" /> {x.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
