import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { getBrands, getGuides } from "@/lib/data";
import { Logo } from "./Header";

export function Footer() {
  const guides = getGuides().slice(0, 6);
  const brands = getBrands().slice(0, 8);
  const col = "space-y-2 text-sm text-white/70";
  return (
    <footer className="mt-20 bg-night text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Motosiklet ekipmanı için kaynaklı teknik bilgi, karşılaştırma ve satın alma rehberi. Ürün verilerini üretici kaynaklarıyla doğrular, doğrulayamadığımız bilgiyi açıkça belirtiriz.
          </p>
        </div>
        <div>
          <p className="mb-3 font-display text-lg font-bold">Kategoriler</p>
          <ul className={col}>
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}`} className="hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/kadin" className="hover:text-white">
                Kadın
              </Link>
            </li>
            <li>
              <Link href="/erkek" className="hover:text-white">
                Erkek
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-display text-lg font-bold">Araçlar</p>
          <ul className={col}>
            <li><Link href="/yeni-baslayanlar" className="hover:text-white">Yeni Motor Aldım, Ne Almalıyım?</Link></li>
            <li><Link href="/karsilastir" className="hover:text-white">Ürün Karşılaştırma</Link></li>
            <li><Link href="/interkom-uyumlulugu" className="hover:text-white">Kask + İnterkom Uyumluluğu</Link></li>
            <li><Link href="/motosikletime-gore" className="hover:text-white">Motosikletime Göre Ekipman</Link></li>
            <li><Link href="/ne-almaliyim" className="hover:text-white">Ne Almalıyım? Listeleri</Link></li>
            <li><Link href="/markalar" className="hover:text-white">Tüm Markalar</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-display text-lg font-bold">Rehberler</p>
          <ul className={col}>
            {guides.map((g) => (
              <li key={g.slug}>
                <Link href={`/rehber/${g.slug}`} className="hover:text-white">
                  {g.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/rehber" className="font-semibold text-white hover:underline">
                Tüm rehberler →
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-display text-lg font-bold">Markalar</p>
          <ul className={col}>
            {brands.map((b) => (
              <li key={b.slug}>
                <Link href={`/marka/${b.slug}`} className="hover:text-white">
                  {b.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5 text-xs text-white/50">
          <p>© {new Date().getFullYear()} motorcukiyafeti.com · Marka adları ve ürün isimleri sahiplerine aittir.</p>
          <p className="flex gap-4">
            <Link href="/hakkimizda" className="hover:text-white">Hakkımızda</Link>
            <Link href="/veri-politikasi" className="hover:text-white">Veri ve Kaynak Politikası</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
