"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { SearchBox } from "./SearchBox";

type IconKey = Parameters<typeof Icon>[0]["name"];

export type MobileNav = {
  quick: { label: string; href: string; icon: IconKey }[];
  categories: { name: string; href: string; icon: IconKey; items: { name: string; href: string }[] }[];
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
        className="-ml-2 grid size-10 place-items-center rounded text-ink hover:bg-paper lg:hidden"
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
                Motorcu <span className="text-red">Kıyafeti</span>
              </span>
              <button type="button" className="grid size-10 place-items-center rounded hover:bg-white/10" aria-label="Menüyü kapat" onClick={() => setOpen(false)}>
                <Icon name="close" className="size-6" />
              </button>
            </div>
            <div className="border-b border-line p-4">
              <SearchBox />
            </div>
            <nav aria-label="Mobil menü" className="flex-1 overflow-y-auto overscroll-contain">
              <ul className="grid grid-cols-3 gap-2 border-b border-line p-3">
                {nav.quick.map((q) => (
                  <li key={q.href}>
                    <Link
                      href={q.href}
                      onClick={() => setOpen(false)}
                      className="flex h-full min-h-[76px] flex-col items-center justify-center gap-1.5 rounded-lg bg-paper p-2 text-center text-[13px] leading-tight font-semibold active:bg-line"
                    >
                      <Icon name={q.icon} className="size-6 text-red" />
                      {q.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul>
                {nav.categories.map((c) => (
                  <li key={c.href} className="border-b border-line">
                    <div className="flex">
                      <Link href={c.href} onClick={() => setOpen(false)} className="flex flex-1 items-center gap-3 px-4 py-3.5 text-lg font-semibold active:bg-paper">
                        <Icon name={c.icon} className="size-6 text-mute" />
                        {c.name}
                      </Link>
                      {c.items.length > 0 && (
                      <button
                        type="button"
                        className="min-w-14 border-l border-line px-4 active:bg-paper"
                        aria-expanded={expanded === c.href}
                        aria-label={`${c.name} alt kategorileri`}
                        onClick={() => setExpanded(expanded === c.href ? null : c.href)}
                      >
                        <Icon name="chevron" className={`size-5 transition ${expanded === c.href ? "rotate-90" : ""}`} />
                      </button>
                      )}
                    </div>
                    {expanded === c.href && (
                      <ul className="bg-paper pb-2">
                        <li>
                          <Link href={c.href} onClick={() => setOpen(false)} className="block px-6 py-3 text-[15px] font-semibold text-red">
                            Tüm {c.name.toLocaleLowerCase("tr")} ürünleri →
                          </Link>
                        </li>
                        {c.items.map((i) => (
                          <li key={i.href}>
                            <Link href={i.href} onClick={() => setOpen(false)} className="block px-6 py-3 text-[15px] active:bg-line">
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
                    <Link href={e.href} onClick={() => setOpen(false)} className="block px-4 py-3.5 font-semibold">
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
