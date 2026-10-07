import Link from "next/link";
import { SearchBox } from "@/components/SearchBox";
import { Container } from "@/components/ui";
import { CATEGORIES } from "@/data/categories";

export const metadata = { title: "Sayfa bulunamadı", robots: { index: false } };

export default function NotFound() {
  return (
    <Container className="py-20 text-center">
      <p className="font-display text-8xl font-bold text-red">404</p>
      <h1 className="mt-2 font-display text-4xl font-bold">Bu sayfa yolda kalmış</h1>
      <p className="mx-auto mt-3 max-w-lg text-mute">Aradığın sayfa taşınmış veya hiç var olmamış olabilir. Aşağıdan aramayı dene ya da bir kategoriye göz at.</p>
      <div className="mx-auto mt-6 max-w-lg text-left">
        <SearchBox />
      </div>
      <ul className="mt-8 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((c) => (
          <li key={c.slug}>
            <Link href={`/${c.slug}`} className="block rounded-full border border-line bg-white px-4 py-2 font-semibold hover:border-ink hover:text-red">
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/" className="mt-8 inline-block font-semibold text-red hover:underline">
        Ana sayfaya dön →
      </Link>
    </Container>
  );
}
