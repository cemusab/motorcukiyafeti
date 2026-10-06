"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useList } from "@/lib/store";
import { Icon } from "./Icon";

/** Karşılaştırma listesinde ürün varken ekranın altında görünen çubuk. Ürün adları /search-index.json'dan çözülür. */
export function CompareTray({ names }: { names: Record<string, string> }) {
  const { list, remove, clear } = useList("mk:cmp");
  const path = usePathname();
  const items = list.filter((id) => names[id]);
  if (!items.length || path.startsWith("/karsilastir")) return null;
  return (
    <>
    {/* Sabit çubuk sayfa sonundaki footer bağlantılarını örtmesin diye boşluk */}
    <div className="h-24" aria-hidden />
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 shadow-[0_-8px_24px_rgba(0,0,0,.08)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3">
        <span className="mr-1 text-sm font-semibold">Karşılaştır ({items.length}/4):</span>
        {items.map((id) => (
          <span key={id} className="flex items-center gap-1 rounded-full bg-paper py-1 pr-1 pl-3 text-sm">
            {names[id]}
            <button type="button" onClick={() => remove(id)} aria-label={`${names[id]} çıkar`} className="grid size-6 place-items-center rounded-full hover:bg-line">
              <Icon name="x" className="size-3.5" />
            </button>
          </span>
        ))}
        <div className="ml-auto flex gap-2">
          <button type="button" onClick={clear} className="h-10 rounded-md px-3 text-sm font-semibold text-mute hover:text-ink">
            Temizle
          </button>
          <Link
            href={`/karsilastir?urunler=${items.join(",")}`}
            aria-disabled={items.length < 2}
            className={`flex h-10 items-center gap-2 rounded-md px-4 text-sm font-semibold text-white ${items.length < 2 ? "pointer-events-none bg-mute/50" : "bg-red hover:bg-red-dark"}`}
          >
            {items.length < 2 ? "En az 2 ürün seç" : "Karşılaştır"} <Icon name="arrow" className="size-4" />
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
