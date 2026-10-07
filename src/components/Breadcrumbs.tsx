import Link from "next/link";
import { breadcrumbLd, type Crumb } from "@/lib/seo";
import { JsonLd } from "./JsonLd";
import { Icon } from "./Icon";

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Ana Sayfa", href: "/" }, ...items];
  return (
    <nav aria-label="Konum" className="text-sm text-mute">
      <JsonLd data={breadcrumbLd(all)} />
      <ol className="flex flex-wrap items-center gap-1">
        {all.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1">
            {i > 0 && <Icon name="chevron" className="size-3.5 opacity-60" />}
            {i === all.length - 1 ? (
              <span aria-current="page" className="font-medium text-ink">
                {c.name}
              </span>
            ) : (
              <Link href={c.href} className="hover:text-red hover:underline">
                {c.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
