"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Children, isValidElement, useMemo, useState } from "react";
import type { FacetDef, FacetItem } from "@/lib/facets";
import { Icon } from "./Icon";

type Sort = "onerilen" | "fiyat-artan" | "fiyat-azalan" | "hafif" | "ad";

/**
 * Sunucuda üretilmiş ürün kartlarını tarayıcıda filtreler. Filtre durumu URL'de tutulur (paylaşılabilir),
 * ancak filtreli URL'ler canonical olarak kategori sayfasını gösterir; böylece kombinasyonlar indekslenmez.
 */
export function FilterableGrid({ defs, items, children }: { defs: FacetDef[]; items: FacetItem[]; children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [panel, setPanel] = useState(false);

  const selected = useMemo(() => {
    const m: Record<string, string[]> = {};
    for (const d of defs) {
      const v = params.get(d.key);
      if (v) m[d.key] = v.split(",");
    }
    return m;
  }, [params, defs]);
  const sort = (params.get("sirala") as Sort) ?? "onerilen";
  const maxPrice = params.get("fiyat") ? Number(params.get("fiyat")) : null;
  const olcu = params.get("olcu") ? Number(params.get("olcu")) : null;
  const sizeFor = (i: FacetItem, cm: number) => i.sizes.filter((s) => cm >= s.min && cm <= s.max + 0.99).map((s) => s.size);
  const measureLabel = items.find((i) => i.sizes.length)?.measure ?? "Ölçü (cm)";

  const options = useMemo(() => {
    const o: Record<string, { value: string; count: number }[]> = {};
    for (const d of defs) {
      const counts = new Map<string, number>();
      items.forEach((i) => (i.values[d.key] ?? []).forEach((v) => counts.set(v, (counts.get(v) ?? 0) + 1)));
      o[d.key] = [...counts.entries()].map(([value, count]) => ({ value, count })).sort((a, b) => a.value.localeCompare(b.value, "tr"));
    }
    return o;
  }, [defs, items]);

  const prices = items.map((i) => i.price).filter((x): x is number => x != null);
  const priceCap = prices.length ? Math.ceil(Math.max(...prices) / 1000) * 1000 : null;

  const visible = useMemo(() => {
    let list = items.filter((i) => Object.entries(selected).every(([k, vals]) => vals.some((v) => (i.values[k] ?? []).includes(v))));
    if (maxPrice != null) list = list.filter((i) => i.price != null && i.price <= maxPrice);
    if (olcu != null) list = list.filter((i) => sizeFor(i, olcu).length > 0);
    const by = {
      onerilen: () => 0,
      "fiyat-artan": (a: FacetItem, b: FacetItem) => (a.price ?? 9e9) - (b.price ?? 9e9),
      "fiyat-azalan": (a: FacetItem, b: FacetItem) => (b.price ?? -1) - (a.price ?? -1),
      hafif: (a: FacetItem, b: FacetItem) => (a.weight ?? 9e9) - (b.weight ?? 9e9),
      ad: (a: FacetItem, b: FacetItem) => a.name.localeCompare(b.name, "tr"),
    }[sort];
    return sort === "onerilen" ? list : [...list].sort(by);
  }, [items, selected, maxPrice, sort, olcu]);

  const update = (mut: (p: URLSearchParams) => void) => {
    const p = new URLSearchParams(params.toString());
    mut(p);
    const qs = p.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };
  const toggle = (key: string, value: string) =>
    update((p) => {
      const cur = new Set(p.get(key)?.split(",") ?? []);
      if (cur.has(value)) cur.delete(value);
      else cur.add(value);
      if (cur.size) p.set(key, [...cur].join(","));
      else p.delete(key);
    });

  const byId = new Map<string, React.ReactNode>();
  Children.forEach(children, (c) => {
    if (isValidElement(c) && c.key) byId.set(String(c.key), c);
  });
  const activeCount = Object.values(selected).flat().length + (maxPrice != null ? 1 : 0) + (olcu != null ? 1 : 0);
  const hasSizes = items.some((i) => i.sizes.length);
  const hasWeight = items.some((i) => i.weight != null);

  const filters = (
    <div className="space-y-6">
      {defs.map((d) =>
        options[d.key]?.length ? (
          <fieldset key={d.key}>
            <legend className="mb-2 font-display text-lg font-bold">{d.label}</legend>
            <ul className="space-y-1.5">
              {options[d.key].map((o) => (
                <li key={o.value}>
                  <label className="flex cursor-pointer items-center gap-2 text-[15px]">
                    <input type="checkbox" className="size-4 accent-red" checked={selected[d.key]?.includes(o.value) ?? false} onChange={() => toggle(d.key, o.value)} />
                    <span className="flex-1">{o.value}</span>
                    <span className="text-xs text-mute">{o.count}</span>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
        ) : null,
      )}
      {hasSizes && (
        <fieldset>
          <legend className="mb-1 font-display text-lg font-bold">Ölçüne göre beden</legend>
          <label htmlFor="olcu" className="mb-2 block text-sm text-mute">
            {measureLabel}
          </label>
          <input
            id="olcu"
            type="number"
            inputMode="numeric"
            min={40}
            max={140}
            placeholder="ör. 57"
            defaultValue={olcu ?? ""}
            onChange={(e) => {
              const v = e.target.value;
              update((p) => (v && Number(v) >= 40 ? p.set("olcu", v) : p.delete("olcu")));
            }}
            className="h-10 w-28 rounded-md border border-line px-3"
          />
          <p className="mt-1 text-xs text-mute">Üreticinin resmi beden tablosu olan ürünler gösterilir.</p>
        </fieldset>
      )}
      {priceCap && (
        <fieldset>
          <legend className="mb-2 font-display text-lg font-bold">Fiyat (en fazla)</legend>
          <input
            type="range"
            min={0}
            max={priceCap}
            step={500}
            value={maxPrice ?? priceCap}
            aria-label="En yüksek fiyat"
            onChange={(e) => update((p) => (Number(e.target.value) >= priceCap ? p.delete("fiyat") : p.set("fiyat", e.target.value)))}
            className="w-full accent-red"
          />
          <p className="text-sm text-mute">{maxPrice != null ? `${maxPrice.toLocaleString("tr-TR")} TL ve altı (fiyatı bilinmeyenler gizlenir)` : "Tüm fiyatlar"}</p>
        </fieldset>
      )}
      {activeCount > 0 && (
        <button type="button" onClick={() => router.replace(pathname, { scroll: false })} className="text-sm font-semibold text-red hover:underline">
          Filtreleri temizle ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <aside className="hidden lg:block" aria-label="Filtreler">
        {filters}
      </aside>
      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-mute" aria-live="polite">
            <strong className="text-ink">{visible.length}</strong> ürün bulundu
          </p>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setPanel(true)} className="flex h-10 items-center gap-2 rounded-md border border-line bg-white px-3 text-sm font-semibold lg:hidden">
              Filtrele {activeCount > 0 && `(${activeCount})`}
            </button>
            <label className="sr-only" htmlFor="sirala">
              Sıralama
            </label>
            <select
              id="sirala"
              value={sort}
              onChange={(e) => update((p) => (e.target.value === "onerilen" ? p.delete("sirala") : p.set("sirala", e.target.value)))}
              className="h-10 rounded-md border border-line bg-white px-2 text-sm"
            >
              <option value="onerilen">Önerilen</option>
              <option value="fiyat-artan">Fiyat: düşükten yükseğe</option>
              <option value="fiyat-azalan">Fiyat: yüksekten düşüğe</option>
              {hasWeight && <option value="hafif">En hafif</option>}
              <option value="ad">Ada göre</option>
            </select>
          </div>
        </div>
        {olcu != null && visible.length > 0 && (
          <div className="mb-4 rounded-md border border-line bg-white p-3 text-sm">
            <p className="font-semibold">{olcu} cm için üretici tablosuna göre bedenin:</p>
            <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
              {visible.map((i) => (
                <li key={i.id}>
                  {i.name}: <strong className="text-red">{sizeFor(i, olcu).join(" / ")}</strong>
                </li>
              ))}
            </ul>
          </div>
        )}
        {visible.length ? (
          <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 xl:grid-cols-3">{visible.map((i) => byId.get(i.id))}</div>
        ) : (
          <div className="rounded-lg border border-dashed border-line bg-white p-10 text-center text-mute">
            Bu filtrelerle eşleşen ürün yok.{" "}
            <button type="button" className="font-semibold text-red underline" onClick={() => router.replace(pathname, { scroll: false })}>
              Filtreleri temizle
            </button>
          </div>
        )}
      </div>
      {panel && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filtreler">
          <div className="absolute inset-0 bg-black/50" onClick={() => setPanel(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-xl bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-display text-2xl font-bold">Filtreler</p>
              <button type="button" aria-label="Filtreleri kapat" onClick={() => setPanel(false)} className="grid size-10 place-items-center">
                <Icon name="close" />
              </button>
            </div>
            {filters}
            <button type="button" onClick={() => setPanel(false)} className="mt-6 h-12 w-full rounded-md bg-red font-semibold text-white">
              {visible.length} ürünü göster
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
