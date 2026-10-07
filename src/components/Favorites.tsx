"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { CompareEntry } from "@/lib/compare-core";
import { useList } from "@/lib/store";
import { Icon } from "./Icon";

export function Favorites() {
  const fav = useList("mk:fav");
  const cmp = useList("mk:cmp");
  const [all, setAll] = useState<CompareEntry[] | null>(null);
  useEffect(() => {
    fetch("/compare-data.json")
      .then((r) => r.json())
      .then(setAll)
      .catch(() => setAll([]));
  }, []);
  if (!all) return <p className="text-mute">Yükleniyor…</p>;
  const items = fav.list.map((id) => all.find((a) => a.id === id)).filter((x): x is CompareEntry => !!x);
  if (!items.length)
    return (
      <div className="rounded-lg border border-dashed border-line bg-white p-10 text-center">
        <p className="font-display text-2xl font-bold">Henüz favorin yok</p>
        <p className="mt-1 text-mute">Ürün kartlarındaki kalp simgesiyle favorilere ekleyebilirsin.</p>
        <Link href="/kask" className="mt-4 inline-block font-semibold text-red hover:underline">
          Kasklara göz at →
        </Link>
      </div>
    );
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-white">
      {items.map((i) => (
        <li key={i.id} className="flex flex-wrap items-center gap-3 p-4">
          <div className="flex-1">
            <Link href={i.href} className="font-display text-xl font-bold hover:text-red">
              {i.name}
            </Link>
            <p className="text-sm text-mute">{i.type}</p>
          </div>
          <span className="text-sm font-semibold">{i.price ? `${i.price.toLocaleString("tr-TR")} TL'den` : ""}</span>
          <button type="button" onClick={() => cmp.toggle(i.id, i.category)} className="h-9 rounded-md border border-line px-3 text-sm font-semibold hover:border-ink">
            {cmp.has(i.id) ? "Karşılaştırmada" : "Karşılaştır"}
          </button>
          <button type="button" onClick={() => fav.remove(i.id)} aria-label={`${i.name} favorilerden çıkar`} className="grid size-9 place-items-center rounded-md border border-line hover:border-red hover:text-red">
            <Icon name="x" className="size-4" />
          </button>
        </li>
      ))}
    </ul>
  );
}
