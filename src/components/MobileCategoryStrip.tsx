"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Icon } from "./Icon";

type IconKey = Parameters<typeof Icon>[0]["name"];

/** Mobil: kategoriler parmakla kaydırılan tek satır. Bulunulan kategori vurgulanır ve görünür alana kaydırılır. */
export function MobileCategoryStrip({ items }: { items: { href: string; label: string; icon: IconKey | null }[] }) {
  const pathname = usePathname();
  const ref = useRef<HTMLUListElement>(null);
  const active = items.find((i) => pathname === i.href || pathname.startsWith(`${i.href}/`))?.href;

  useEffect(() => {
    const el = ref.current?.querySelector<HTMLElement>("[aria-current=page]");
    if (el && ref.current) ref.current.scrollTo({ left: el.offsetLeft - 8, behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label="Kategoriler" className="bg-red lg:hidden">
      <ul ref={ref} className="no-scrollbar flex gap-1 overflow-x-auto px-2 py-1.5 font-display text-[15px] font-bold tracking-wide whitespace-nowrap text-white uppercase">
        {items.map((c) => (
          <li key={c.href} className="shrink-0">
            <Link
              href={c.href}
              aria-current={c.href === active ? "page" : undefined}
              className={`flex h-9 items-center gap-1.5 rounded px-2.5 active:bg-red-dark ${c.href === active ? "bg-white text-red" : ""}`}
            >
              {c.icon && <Icon name={c.icon} className="size-5" />}
              {c.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
