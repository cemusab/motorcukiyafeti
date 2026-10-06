"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAX_COMPARE, useList } from "@/lib/store";
import { Icon } from "./Icon";

/**
 * Karşılaştırma listesinde ürün varken ekranın altında görünen ince çubuk.
 * Mobilde tek satırdır; ✕ listeyi sıfırlar. Karşılaştırma sayfasında gösterilmez (orada "Bitir" düğmesi var).
 */
export function CompareTray({ names }: { names: Record<string, string> }) {
  const { list, remove, clear } = useList("mk:cmp");
  const path = usePathname();
  const items = list.filter((id) => names[id]);
  if (!items.length || path.startsWith("/karsilastir")) return null;
  const ready = items.length >= 2;
  return (
    <>
      {/* Sabit çubuk sayfa sonundaki footer bağlantılarını örtmesin diye boşluk */}
      <div className="h-16" aria-hidden />
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 shadow-[0_-8px_24px_rgba(0,0,0,.08)] backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-2.5">
          <span className="shrink-0 text-sm font-semibold">
            Karşılaştır <span className="text-red">{items.length}/{MAX_COMPARE}</span>
          </span>
          {/* Masaüstünde seçilen ürünler görünür; mobilde yalnız sayı */}
          <ul className="hidden min-w-0 flex-1 gap-2 overflow-x-auto md:flex">
            {items.map((id) => (
              <li key={id} className="flex shrink-0 items-center gap-1 rounded-full bg-paper py-1 pr-1 pl-3 text-sm">
                {names[id]}
                <button type="button" onClick={() => remove(id)} aria-label={`${names[id]} çıkar`} className="grid size-6 place-items-center rounded-full hover:bg-line">
                  <Icon name="x" className="size-3.5" />
                </button>
              </li>
            ))}
          </ul>
          <div className="ml-auto flex shrink-0 items-center gap-1.5">
            {ready ? (
              <Link href={`/karsilastir?urunler=${items.join(",")}`} className="flex h-10 items-center gap-2 rounded-md bg-red px-4 text-sm font-semibold text-white hover:bg-red-dark">
                Karşılaştır <Icon name="arrow" className="size-4" />
              </Link>
            ) : (
              <span className="text-sm text-mute">1 ürün daha seç</span>
            )}
            <button type="button" onClick={clear} aria-label="Karşılaştırma listesini sıfırla" title="Listeyi sıfırla" className="grid size-10 place-items-center rounded-md text-mute hover:bg-paper hover:text-ink">
              <Icon name="close" className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
