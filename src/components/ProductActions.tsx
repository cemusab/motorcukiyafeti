"use client";
import { MAX_COMPARE, useList } from "@/lib/store";
import { Icon } from "./Icon";

export function FavoriteButton({ id, name, compact = false }: { id: string; name: string; compact?: boolean }) {
  const { has, toggle } = useList("mk:fav");
  const on = has(id);
  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      aria-pressed={on}
      aria-label={compact ? (on ? `${name} favorilerden çıkar` : `${name} favorilere ekle`) : undefined}
      className={`flex items-center gap-1.5 rounded-md border text-sm font-semibold transition ${
        on ? "border-red bg-red/5 text-red" : "border-line bg-white text-ink hover:border-ink"
      } ${compact ? "size-9 justify-center" : "h-10 px-3"}`}
    >
      <Icon name="heart" className={`size-[18px] ${on ? "fill-red" : ""}`} />
      {!compact && (on ? "Favorilerde" : "Favorilere ekle")}
    </button>
  );
}

export function CompareButton({ id, name, category, compact = false }: { id: string; name: string; category: string; compact?: boolean }) {
  const { has, toggle, list } = useList("mk:cmp");
  const on = has(id);
  const full = !on && list.length >= MAX_COMPARE;
  return (
    <button
      type="button"
      onClick={() => toggle(id, category)}
      aria-pressed={on}
      aria-label={compact ? (on ? `${name} karşılaştırmadan çıkar` : `${name} karşılaştır`) : undefined}
      title={full ? "En fazla 4 ürün karşılaştırılabilir; önce birini çıkar. Farklı kategoriden ürün eklersen liste yeniden başlar." : undefined}
      className={`flex items-center gap-1.5 rounded-md border text-sm font-semibold transition ${
        on ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink"
      } ${compact ? "size-9 justify-center" : "h-10 px-3"}`}
    >
      <Icon name={on ? "check" : "compare"} className="size-[18px]" />
      {!compact && (on ? "Karşılaştırmada" : full ? "Liste dolu (4)" : "Karşılaştır")}
    </button>
  );
}
