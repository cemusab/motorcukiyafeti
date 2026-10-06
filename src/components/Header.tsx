import Link from "next/link";
import { CATEGORIES, NAV_EXTRA } from "@/data/categories";
import { MOTO_TYPES } from "@/data/riding";
import { getGuides } from "@/lib/data";
import { Icon } from "./Icon";
import { SearchBox } from "./SearchBox";
import { MobileMenu, type MobileNav } from "./MobileMenu";
import { HeaderCounters } from "./HeaderCounters";

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Motorcu Kıyafeti ana sayfa">
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden>
        <path d="M4 26 14 6h5L9 26z" fill="#d4202a" />
        <path d="M13 26 23 6h5L18 26z" fill={light ? "#fff" : "#15171b"} />
      </svg>
      <span className={`font-display text-[26px] leading-none font-bold ${light ? "text-white" : "text-ink"}`}>
        Motorcu <span className="text-red">Kıyafeti</span>
      </span>
    </Link>
  );
}

export function Header() {
  const guides = new Set(getGuides().map((g) => g.slug));
  const mobileNav: MobileNav = {
    categories: CATEGORIES.map((c) => ({
      name: c.name,
      href: `/${c.slug}`,
      items: c.groups.flatMap((g) => g.items.map((i) => ({ name: i.name, href: `/${c.slug}/${i.slug}` }))),
    })),
    extra: [
      { label: "Kadın", href: "/kadin" },
      { label: "Erkek", href: "/erkek" },
      { label: "Motosikletime Göre", href: "/motosikletime-gore" },
      { label: "Yeni Başlayanlar", href: "/yeni-baslayanlar" },
      { label: "Ne Almalıyım?", href: "/ne-almaliyim" },
      ...NAV_EXTRA,
      { label: "Favoriler", href: "/favoriler" },
    ],
  };

  return (
    <header className="sticky top-0 z-40 bg-night text-white shadow-[0_1px_0_#2a2e35]">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 lg:gap-8">
        <MobileMenu nav={mobileNav} />
        <Logo />
        <div className="hidden flex-1 md:block md:max-w-xl">
          <SearchBox />
        </div>
        <nav aria-label="Hızlı erişim" className="ml-auto flex items-center gap-1 text-sm">
          <Link href="/karsilastir" className="hidden items-center gap-1.5 rounded px-2.5 py-2 hover:bg-white/10 sm:flex">
            <Icon name="compare" />
            <span className="hidden lg:inline">Karşılaştır</span>
            <HeaderCounters kind="cmp" />
          </Link>
          <Link href="/favoriler" className="flex items-center gap-1.5 rounded px-2.5 py-2 hover:bg-white/10">
            <Icon name="heart" />
            <span className="hidden lg:inline">Favoriler</span>
            <HeaderCounters kind="fav" />
          </Link>
          <Link href="/arama" className="flex items-center rounded px-2.5 py-2 hover:bg-white/10 md:hidden" aria-label="Ara">
            <Icon name="search" />
          </Link>
        </nav>
      </div>

      <nav aria-label="Ana menü" className="hidden border-t border-white/10 lg:block">
        <ul className="mx-auto flex max-w-7xl items-stretch px-2 text-[15px] font-semibold whitespace-nowrap">
          {CATEGORIES.map((c) => (
            <li key={c.slug} className="group relative">
              <Link
                href={`/${c.slug}`}
                className="flex items-center gap-1 px-2.5 py-3 text-white/85 xl:px-3 group-focus-within:text-white group-hover:text-white group-hover:shadow-[inset_0_-3px_0_#d4202a]"
              >
                {c.short}
              </Link>
              <div className="invisible absolute top-full left-0 z-50 w-[min(720px,90vw)] translate-y-1 rounded-b-lg border border-line bg-white p-6 text-ink opacity-0 shadow-2xl transition group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="grid grid-cols-3 gap-6">
                  {c.groups.map((g) => (
                    <div key={g.title}>
                      <p className="mb-2 text-xs font-semibold tracking-wider text-mute uppercase">{g.title}</p>
                      <ul className="space-y-1.5 font-medium">
                        {g.items.map((i) => (
                          <li key={i.slug}>
                            <Link href={`/${c.slug}/${i.slug}`} className="hover:text-red">
                              {i.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-4 text-sm">
                  <Link href={`/${c.slug}`} className="font-semibold text-red hover:underline">
                    Tüm {c.name.toLocaleLowerCase("tr")} ürünleri →
                  </Link>
                  {c.guide && guides.has(c.guide) && (
                    <Link href={`/rehber/${c.guide}`} className="flex items-center gap-1.5 text-mute hover:text-ink">
                      <Icon name="book" className="size-4" /> {c.name} seçim rehberi
                    </Link>
                  )}
                </div>
              </div>
            </li>
          ))}
          <li className="mx-2 my-2.5 w-px bg-white/15" aria-hidden />
          <li className="group relative">
            <Link href="/motosikletime-gore" className="block px-2.5 py-3 text-white/85 xl:px-3 group-hover:text-white group-hover:shadow-[inset_0_-3px_0_#d4202a]">
              Motosikletime Göre
            </Link>
            <div className="invisible absolute top-full left-0 z-50 w-64 rounded-b-lg border border-line bg-white p-4 text-ink opacity-0 shadow-2xl transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <ul className="space-y-1.5 font-medium">
                {MOTO_TYPES.map((m) => (
                  <li key={m.slug}>
                    <Link href={`/motosikletime-gore/${m.slug}`} className="hover:text-red">
                      {m.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          {NAV_EXTRA.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className="block px-2.5 py-3 text-white/85 xl:px-3 hover:text-white hover:shadow-[inset_0_-3px_0_#d4202a]">
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
