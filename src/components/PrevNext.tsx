import Link from "next/link";
import { Icon } from "./Icon";

/** Önceki / sonraki sayfa gezinmesi (aynı kategori veya konu içinde). */
export function PrevNext({ prev, next, label }: { prev?: { href: string; title: string }; next?: { href: string; title: string }; label: string }) {
  if (!prev && !next) return null;
  return (
    <nav aria-label={label} className="grid gap-3 sm:grid-cols-2">
      {prev ? (
        <Link href={prev.href} rel="prev" className="group flex items-center gap-3 rounded-lg border border-line bg-white p-4 hover:border-ink">
          <Icon name="chevron" className="size-5 shrink-0 rotate-180 text-red" />
          <span className="min-w-0">
            <span className="block text-xs font-semibold tracking-wide text-mute uppercase">Önceki</span>
            <span className="block truncate font-semibold group-hover:text-red">{prev.title}</span>
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link href={next.href} rel="next" className="group flex items-center justify-end gap-3 rounded-lg border border-line bg-white p-4 text-right hover:border-ink">
          <span className="min-w-0">
            <span className="block text-xs font-semibold tracking-wide text-mute uppercase">Sonraki</span>
            <span className="block truncate font-semibold group-hover:text-red">{next.title}</span>
          </span>
          <Icon name="chevron" className="size-5 shrink-0 text-red" />
        </Link>
      )}
    </nav>
  );
}
