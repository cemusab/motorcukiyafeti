"use client";
import { useList } from "@/lib/store";

export function HeaderCounters({ kind }: { kind: "fav" | "cmp" }) {
  const { list } = useList(kind === "fav" ? "mk:fav" : "mk:cmp");
  if (!list.length) return null;
  return (
    <span className="grid min-w-5 place-items-center rounded-full bg-red px-1 text-xs leading-5 font-bold text-white" aria-label={`${list.length} ürün`}>
      {list.length}
    </span>
  );
}
