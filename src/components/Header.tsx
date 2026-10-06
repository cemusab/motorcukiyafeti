import Link from "next/link";
import { CATEGORIES, NAV_EXTRA } from "@/data/categories";
import { MOTO_TYPES } from "@/data/riding";
import { getGuides, productsIn } from "@/lib/data";
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
      items: c.groups.flatMap((g) => g.items.filter((i) => productsIn(c.slug, i.slug).length).map((i) => ({ name: i.name, href: `/${c.slug}/${i.slug}` }))),
    })),
    extra: [
      { label: "Kadın", href: "/kadin" },
      { label: "Erkek", href: "/erkek" },
      { label: "Motosikletime Göre", href: "/motosikletime-gore" },
      { label: "Motoruma Göre (model)", href: "/motor" },
      { label: "Yeni Başlayanlar", href: "/yeni-baslayanlar" },
      { label: "Ne Almalıyım?", href: "/ne-almaliyim" },
      ...NAV_EXTRA,
      { label: "Favoriler", href: "/favoriler" },
    ],
  };

  const iconLink = "relative flex flex-col items-center gap-1 rounded px-2 py-1 text-xs font-semibold text-ink-2 hover:text-red";
  return (
    <>
      {/* Duyuru şeridi ve yardımcı satır yapışkan değildir; kaydırınca yalnız ana satır + kategori çubuğu kalır. */}
      <div className="bg-red text-center text-[13px] font-semibold text-white">
        <Link href="/veri-politikasi" className="block px-4 py-1.5 hover:underline">
          Tüm teknik bilgiler <strong>üretici kaynaklı</strong> · Fiyatlar <strong>satıcı ve kontrol tarihiyle</strong>
        </Link>
      </div>
      <div className="hidden border-b border-line bg-paper text-[13px] text-mute md:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4">
          <p>
            Merhaba, <strong className="text-ink">motorcu</strong>! Doğru ekipmanı birlikte seçelim.
          </p>
          <nav aria-label="Yardımcı bağlantılar" className="flex items-center gap-5">
            <Link href="/yeni-baslayanlar" className="hover:text-red">Yeni başlayanlar</Link>
            <Link href="/motosikletime-gore/kurye" className="hover:text-red">Kuryeler için</Link>
            <Link href="/hakkimizda" className="hover:text-red">Hakkımızda</Link>
            <Link href="/iletisim" className="hover:text-red">İletişim</Link>
          </nav>
        </div>
      </div>
      <header className="sticky top-0 z-40 bg-white text-ink shadow-[0_1px_0_#e3e1dc]">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 lg:h-[84px] lg:gap-8">
          <MobileMenu nav={mobileNav} />
          <Logo light={false} />
          <div className="hidden flex-1 md:block md:max-w-2xl">
            <SearchBox />
          </div>
          <nav aria-label="Hızlı erişim" className="ml-auto flex items-center gap-1 lg:gap-3">
            <Link href="/yeni-baslayanlar" aria-label="Ne almalıyım?" className={`${iconLink} hidden lg:flex`}>
              <Icon name="bike" className="size-6" />
              Ne almalıyım?
            </Link>
            <Link href="/karsilastir" aria-label="Karşılaştır" className={`${iconLink} hidden sm:flex`}>
              <Icon name="compare" className="size-6" />
              <span className="hidden lg:inline">Karşılaştır</span>
              <span className="absolute -top-1 right-0">
                <HeaderCounters kind="cmp" />
              </span>
            </Link>
            <Link href="/favoriler" aria-label="Favorilerim" className={iconLink}>
              <Icon name="heart" className="size-6" />
              <span className="hidden lg:inline">Favorilerim</span>
              <span className="absolute -top-1 right-0">
                <HeaderCounters kind="fav" />
              </span>
            </Link>
            <Link href="/arama" className={`${iconLink} md:hidden`} aria-label="Ara">
              <Icon name="search" className="size-6" />
            </Link>
          </nav>
        </div>

      <nav aria-label="Ana menü" className="hidden bg-red lg:block">
        <ul className="mx-auto flex max-w-7xl items-stretch justify-between px-2 font-display text-[17px] font-bold tracking-wide whitespace-nowrap uppercase">
          {CATEGORIES.map((c, idx) => (
            <li key={c.slug} className="group relative">
              <Link
                href={`/${c.slug}`}
                className="flex items-center gap-1 px-2.5 py-3 text-white group-focus-within:bg-red-dark group-hover:bg-red-dark xl:px-3"
              >
                {c.short}
              </Link>
              <div className={`invisible absolute top-full ${idx > 3 ? "right-0" : "left-0"} z-50 w-[min(720px,90vw)] font-sans text-[15px] font-normal tracking-normal normal-case translate-y-1 rounded-b-lg border border-line bg-white p-6 text-ink opacity-0 shadow-2xl transition group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100`}>
                <div className="grid grid-cols-3 gap-6">
                  {c.groups.map((g) => ({ ...g, items: g.items.filter((i) => productsIn(c.slug, i.slug).length) })).filter((g) => g.items.length).map((g) => (
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
          <li className="mx-1 my-2.5 w-px bg-white/25" aria-hidden />
          <li className="group relative">
            <Link href="/motosikletime-gore" className="block px-2.5 py-3 text-white group-hover:bg-red-dark xl:px-3">
              Motosikletime Göre
            </Link>
            <div className="invisible absolute top-full left-0 z-50 w-64 font-sans text-[15px] font-normal tracking-normal normal-case rounded-b-lg border border-line bg-white p-4 text-ink opacity-0 shadow-2xl transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <Link href="/motor" className="mb-3 block rounded bg-paper px-3 py-2 text-sm font-semibold text-red hover:underline">
                Motor modelime göre bul →
              </Link>
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
              <Link href={n.href} className="block px-2.5 py-3 text-white hover:bg-red-dark xl:px-3">
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      </header>
    </>
  );
}
