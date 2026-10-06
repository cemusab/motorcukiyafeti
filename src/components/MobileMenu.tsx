"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { SearchBox } from "./SearchBox";

export type MobileNav = {
  categories: { name: string; href: string; items: { name: string; href: string }[] }[];
  extra: { label: string; href: string }[];
};

export function MobileMenu({ nav }: { nav: MobileNav }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="-ml-2 grid size-10 place-items-center rounded hover:bg-white/10 lg:hidden"
        aria-label="Menüyü aç"
        aria-expanded={open}
        aria-controls="mobil-menu"
        onClick={() => setOpen(true)}
      >
        <Icon name="menu" className="size-6" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menü" id="mobil-menu">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[min(380px,90vw)] flex-col bg-white text-ink shadow-2xl">
            <div className="flex h-16 items-center justify-between bg-night px-4 text-white">
              <span className="font-display text-2xl font-bold">
                Motorcu<span className="text-red">Kiyafeti</span>
              </span>
              <button type="button" className="grid size-10 place-items-center rounded hover:bg-white/10" aria-label="Menüyü kapat" onClick={() => setOpen(false)}>
                <Icon name="close" className="size-6" />
              </button>
            </div>
            <div className="border-b border-line p-4">
              <SearchBox />
            </div>
            <nav aria-label="Mobil menü" className="flex-1 overflow-y-auto">
              <ul>
                {nav.categories.map((c) => (
                  <li key={c.href} className="border-b border-line">
                    <div className="flex">
                      <Link href={c.href} className="flex-1 px-4 py-3.5 text-lg font-semibold">
                        {c.name}
                      </Link>
                      <button
                        type="button"
                        className="px-4"
                        aria-expanded={expanded === c.href}
                        aria-label={`${c.name} alt kategorileri`}
                        onClick={() => setExpanded(expanded === c.href ? null : c.href)}
                      >
                        <Icon name="chevron" className={`size-5 transition ${expanded === c.href ? "rotate-90" : ""}`} />
                      </button>
                    </div>
                    {expanded === c.href && (
                      <ul className="bg-paper pb-2">
                        {c.items.map((i) => (
                          <li key={i.href}>
                            <Link href={i.href} className="block px-6 py-2.5 text-[15px]">
                              {i.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
                {nav.extra.map((e) => (
                  <li key={e.href} className="border-b border-line">
                    <Link href={e.href} className="block px-4 py-3.5 font-semibold">
                      {e.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
