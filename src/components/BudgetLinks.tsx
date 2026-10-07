import Link from "next/link";
import { getCategory } from "@/data/categories";
import { featuredBudgetGroups } from "@/lib/budget";
import { Icon } from "./Icon";

/** Bütçeye göre hazır karşılaştırma kartları (ana sayfa, karşılaştırma merkezi). */
export function BudgetLinks({ limit = 8 }: { limit?: number }) {
  const groups = featuredBudgetGroups().slice(0, limit);
  if (!groups.length) return null;
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {groups.map((g) => {
        const c = getCategory(g.category)!;
        return (
          <li key={g.slug}>
            <Link href={`/karsilastir/butce/${g.slug}`} className="group flex h-full items-start gap-3 rounded-lg border border-line bg-white p-4 hover:border-ink hover:shadow-md">
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-paper text-red">
                <Icon name={c.icon} className="size-6" />
              </span>
              <span>
                <span className="block text-xs font-semibold tracking-wide text-red uppercase">{g.label}</span>
                <span className="block font-display text-xl leading-tight font-bold group-hover:text-red">{c.name} karşılaştırması</span>
                <span className="mt-1 block text-sm text-mute">{g.items.length} model · {g.compare.length} tanesi yan yana</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
