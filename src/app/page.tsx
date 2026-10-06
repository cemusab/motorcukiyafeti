import Link from "next/link";
import { Icon } from "@/components/Icon";
import { ProductGrid } from "@/components/ProductCard";
import { SearchBox } from "@/components/SearchBox";
import { Container, SectionTitle } from "@/components/ui";
import { Wizard } from "@/components/Wizard";
import { CATEGORIES } from "@/data/categories";
import { MOTO_TYPES } from "@/data/riding";
import { comparePairs, editorPicks, wizardProducts } from "@/lib/catalog";
import { displayName, getBrands, getGuide, getGuides } from "@/lib/data";
import { meta } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = meta({
  title: `${SITE.name} – Motosiklet Kask, Mont, İnterkom Rehberi ve Karşılaştırma`,
  description: SITE.description,
  path: "/",
});

const FEATURES = [
  { icon: "star", label: "Editör Rehberleri", href: "/rehber" },
  { icon: "shield", label: "Kaynaklı Teknik Bilgi", href: "/veri-politikasi" },
  { icon: "interkom", label: "Kask + İnterkom Uyumluluğu", href: "/interkom-uyumlulugu" },
  { icon: "compare", label: "Karşılaştırma Araçları", href: "/karsilastir" },
  { icon: "book", label: "Yeni Başlayanlar İçin", href: "/yeni-baslayanlar" },
] as const;

function HeroArt() {
  return (
    <svg viewBox="0 0 600 420" className="absolute right-0 bottom-0 hidden h-full w-auto opacity-90 xl:block" aria-hidden>
      <defs>
        <linearGradient id="road" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#d4202a" stopOpacity="0" />
          <stop offset="1" stopColor="#d4202a" stopOpacity=".55" />
        </linearGradient>
        <radialGradient id="glow" cx=".6" cy=".45" r=".5">
          <stop offset="0" stopColor="#d4202a" stopOpacity=".35" />
          <stop offset="1" stopColor="#d4202a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="420" fill="url(#glow)" />
      <path d="M330 420 420 160h12l118 260z" fill="url(#road)" opacity=".5" />
      <path d="M424 200v22M425 250v30M426 310v40M427 380v40" stroke="#fff" strokeWidth="4" opacity=".35" />
      <g transform="translate(250 70) scale(9)" fill="none" stroke="#fff" strokeWidth=".55" strokeLinecap="round" strokeLinejoin="round" opacity=".92">
        <path d="M3.5 14.5C3.5 8.7 7.6 4.5 13 4.5c4.6 0 7.5 3.3 7.5 7.5v3.2c0 1.6-1.3 2.8-2.8 2.8H9.2L6 20H4.6a1.1 1.1 0 0 1-1.1-1.1z" />
        <path d="M11 9.5h9.3M11 9.5c-.6 1.5-.6 3.3 0 5h9.5" stroke="#d4202a" />
      </g>
    </svg>
  );
}

export default function Home() {
  const guides = getGuides();
  const brands = getBrands();
  const picks = editorPicks(8);
  const pairs = comparePairs().slice(0, 4);
  const banner = (slug: string) => getGuide(slug);
  const banners = [
    { title: "Kask Karşılaştırmaları", text: "İki kaskı teknik verisiyle yan yana koy.", href: "/karsilastir", cta: "Karşılaştır" },
    banner("yazlik-motosiklet-ekipmani") && { title: "Yazlık Ekipman Rehberi", text: "Sıcak havada serin ve korunaklı kal.", href: "/rehber/yazlik-motosiklet-ekipmani", cta: "Rehber" },
    banner("cardo-mu-sena-mi")
      ? { title: "Cardo mu, Sena mı?", text: "İnterkom seçiminde teknoloji farkları.", href: "/rehber/cardo-mu-sena-mi", cta: "Oku" }
      : { title: "Kask + İnterkom", text: "Kaskına uyan interkomu bul.", href: "/interkom-uyumlulugu", cta: "Bul" },
  ].filter(Boolean) as { title: string; text: string; href: string; cta: string }[];

  return (
    <>
      <section className="relative overflow-hidden bg-night text-white">
        <div className="absolute inset-0 bg-[linear-gradient(110deg,#0f1114_35%,#1c0d0f_75%,#2a0f12)]" />
        <HeroArt />
        <Container className="relative py-14 sm:py-20">
          <h1 className="max-w-2xl font-display text-[44px] leading-[0.95] font-bold sm:text-6xl lg:text-7xl">
            Doğru Ekipman
            <br />
            <span className="text-red">Daha Güvenli</span>
            <br />
            Daha Keyifli Sürüşler
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/75">Motosiklet ekipmanı hakkında bilmen gereken her şey, kaynaklarıyla birlikte tek bir yerde.</p>
          <div className="mt-7 max-w-xl">
            <SearchBox size="lg" />
          </div>
          <ul className="mt-12 grid max-w-4xl grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-5 [&>li:last-child]:col-span-2 sm:[&>li:last-child]:col-span-1">
            {FEATURES.map((f) => (
              <li key={f.href}>
                <Link href={f.href} className="group flex flex-col items-center gap-2 text-center text-sm font-semibold text-white/85 hover:text-white">
                  <Icon name={f.icon} className="size-9 transition group-hover:text-red" />
                  {f.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Container className="mt-10">
        <section className="relative overflow-hidden rounded-xl bg-night-2 p-6 sm:p-8" aria-labelledby="wiz">
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_80%_50%,rgba(212,32,42,.25),transparent_60%)]" />
          <div className="relative">
            <h2 id="wiz" className="font-display text-3xl leading-none font-bold text-white sm:text-4xl">
              Yeni Motor Aldım
              <br />
              Hangi Ekipmanları Almalıyım?
            </h2>
            <p className="mt-2 mb-5 max-w-2xl text-white/70">Dört soruyu yanıtla; ihtiyacın olan ekipmanları, nedenlerini ve bütçeni nasıl paylaştıracağını gör.</p>
            <Wizard products={wizardProducts()} compact />
          </div>
        </section>
      </Container>

      <Container className="mt-12">
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9">
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link href={`/${c.slug}`} className="group flex h-full flex-col items-center gap-2 rounded-lg border border-line bg-white p-3 pt-4 text-center font-semibold transition hover:border-ink hover:shadow-md">
                <Icon name={c.icon} className="size-11 text-ink-2 transition group-hover:text-red" />
                <span className="text-sm">{c.short}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/kadin" className="group flex h-full flex-col items-center gap-2 rounded-lg border border-line bg-white p-3 pt-4 text-center font-semibold transition hover:border-ink hover:shadow-md">
              <Icon name="user" className="size-11 text-ink-2 transition group-hover:text-red" />
              <span className="text-sm">Kadın</span>
            </Link>
          </li>
          <li>
            <Link href="/motosikletime-gore/kurye" className="group flex h-full flex-col items-center gap-2 rounded-lg border border-line bg-white p-3 pt-4 text-center font-semibold transition hover:border-ink hover:shadow-md">
              <Icon name="bike" className="size-11 text-ink-2 transition group-hover:text-red" />
              <span className="text-sm">Kurye</span>
            </Link>
          </li>
        </ul>
      </Container>

      {brands.length > 0 && (
        <Container className="mt-14">
          <SectionTitle title="Popüler Markalar" href="/markalar" linkLabel="Tüm markalar" />
          <ul className="flex flex-wrap gap-2">
            {brands.slice(0, 18).map((b) => (
              <li key={b.slug}>
                <Link
                  href={`/marka/${b.slug}`}
                  lang="en"
                  className="block rounded-md border border-line bg-white px-4 py-2.5 font-display text-xl font-bold tracking-wide text-ink-2 uppercase transition hover:border-ink hover:text-red"
                >
                  {b.name}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      )}

      {picks.length > 0 && (
        <Container className="mt-14">
          <SectionTitle title="Editörün Seçimleri" sub="Teknik verisi üretici kaynaklarıyla en eksiksiz doğrulanmış ürünlerimiz." />
          <ProductGrid items={picks} />
        </Container>
      )}

      <Container className="mt-14 grid gap-4 md:grid-cols-3">
        {banners.map((b) => (
          <Link key={b.href} href={b.href} className="group relative overflow-hidden rounded-xl bg-night p-6 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_20%,rgba(212,32,42,.35),transparent_55%)]" />
            <p className="relative font-display text-2xl font-bold">{b.title}</p>
            <p className="relative mt-1 text-sm text-white/70">{b.text}</p>
            <span className="relative mt-5 inline-flex rounded bg-white px-3 py-1.5 text-xs font-bold tracking-wide text-ink uppercase group-hover:bg-red group-hover:text-white">{b.cta}</span>
          </Link>
        ))}
      </Container>

      {pairs.length > 0 && (
        <Container className="mt-14">
          <SectionTitle title="Popüler Karşılaştırmalar" href="/karsilastir" linkLabel="Karşılaştırma aracı" />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {pairs.map((c) => (
              <li key={c.slug}>
                <Link href={`/karsilastir/${c.slug}`} className="block rounded-lg border border-line bg-white p-4 font-semibold hover:border-ink">
                  {displayName(c.items[0])} <span className="text-red">vs</span> {displayName(c.items[1])}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      )}

      {guides.length > 0 && (
        <Container className="mt-14">
          <SectionTitle title="Rehberler" sub="Seçim yaparken en çok sorulan sorulara net ve kaynaklı cevaplar." href="/rehber" linkLabel="Tüm rehberler" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {guides.slice(0, 8).map((g) => (
              <li key={g.slug}>
                <Link href={`/rehber/${g.slug}`} className="group flex h-full flex-col rounded-lg border border-line bg-white p-5 hover:border-ink hover:shadow-md">
                  <span className="text-xs font-semibold tracking-wide text-red uppercase">{g.readingMinutes} dk okuma</span>
                  <span className="mt-1 font-display text-xl leading-tight font-bold group-hover:text-red">{g.title}</span>
                  <span className="mt-2 line-clamp-3 text-sm text-mute">{g.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      )}

      <Container className="mt-14">
        <SectionTitle title="Motosikletime Göre Ekipman" href="/motosikletime-gore" linkLabel="Tümü" />
        <ul className="flex flex-wrap gap-2">
          {MOTO_TYPES.map((m) => (
            <li key={m.slug}>
              <Link href={`/motosikletime-gore/${m.slug}`} className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 font-semibold hover:border-ink hover:text-red">
                <Icon name="bike" className="size-4" /> {m.name}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
