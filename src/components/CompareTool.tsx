"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { CompareEntry } from "@/lib/compare-core";
import { MAX_COMPARE, useList } from "@/lib/store";
import { CompareView } from "./CompareView";

const CAT_NAME: Record<string, string> = { kask: "Kask", interkom: "İnterkom", mont: "Mont", eldiven: "Eldiven", bot: "Bot", pantolon: "Pantolon", koruma: "Koruma" };

export function CompareTool({ pairs }: { pairs: { slug: string; title: string }[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const cmp = useList("mk:cmp");
  const [all, setAll] = useState<CompareEntry[] | null>(null);
  const [cat, setCat] = useState<string | null>(null);

  useEffect(() => {
    fetch("/compare-data.json")
      .then((r) => r.json())
      .then(setAll)
      .catch(() => setAll([]));
  }, []);

  const fromUrl = params.get("urunler")?.split(",").filter(Boolean);
  const ids = fromUrl ?? cmp.list;
  const selected = useMemo(() => (all ? ids.map((id) => all.find((e) => e.id === id)).filter((x): x is CompareEntry => !!x) : []), [all, ids]);
  const activeCat = selected[0]?.category ?? cat ?? "kask";
  const sameCat = selected.filter((s) => s.category === activeCat);
  const candidates = (all ?? []).filter((e) => e.category === activeCat && !ids.includes(e.id));
  const cats = [...new Set((all ?? []).map((e) => e.category))];

  const setIds = (next: string[]) => {
    const n = next.slice(0, MAX_COMPARE);
    cmp.clear();
    n.forEach((id) => cmp.toggle(id));
    router.replace(n.length ? `/karsilastir?urunler=${n.join(",")}` : "/karsilastir", { scroll: false });
  };

  if (!all) return <p className="text-mute">Karşılaştırma verileri yükleniyor…</p>;

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-line bg-white p-5">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label htmlFor="cmp-cat" className="mb-1 block text-sm font-semibold">
              Kategori
            </label>
            <select
              id="cmp-cat"
              value={activeCat}
              onChange={(e) => {
                setCat(e.target.value);
                setIds([]);
              }}
              className="h-11 rounded-md border border-line px-3"
            >
              {cats.map((c) => (
                <option key={c} value={c}>
                  {CAT_NAME[c] ?? c}
                </option>
              ))}
            </select>
          </div>
          <div className="min-w-60 flex-1">
            <label htmlFor="cmp-add" className="mb-1 block text-sm font-semibold">
              Ürün ekle ({sameCat.length}/{MAX_COMPARE})
            </label>
            <select
              id="cmp-add"
              value=""
              disabled={sameCat.length >= MAX_COMPARE || !candidates.length}
              onChange={(e) => e.target.value && setIds([...sameCat.map((s) => s.id), e.target.value])}
              className="h-11 w-full rounded-md border border-line px-3 disabled:opacity-50"
            >
              <option value="">{sameCat.length >= MAX_COMPARE ? "En fazla 4 ürün" : "Model seç…"}</option>
              {candidates.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          {sameCat.length > 0 && (
            <button type="button" onClick={() => setIds([])} className="h-11 px-3 text-sm font-semibold text-mute hover:text-ink">
              Temizle
            </button>
          )}
        </div>
        {selected.length > sameCat.length && <p className="mt-3 text-sm text-warn">Farklı kategorideki ürünler karşılaştırılamaz; yalnızca {CAT_NAME[activeCat]} ürünleri gösteriliyor.</p>}
      </div>

      {sameCat.length >= 2 ? (
        <CompareView items={sameCat} onRemove={(id) => setIds(sameCat.map((s) => s.id).filter((x) => x !== id))} />
      ) : (
        <div className="rounded-lg border border-dashed border-line bg-white p-8 text-center">
          <p className="font-display text-2xl font-bold">{sameCat.length === 1 ? `${sameCat[0].name} seçildi` : "Karşılaştırmak için en az 2 ürün seç"}</p>
          <p className="mt-1 text-mute">Yukarıdan model ekleyebilir ya da ürün kartlarındaki karşılaştır düğmesini kullanabilirsin.</p>
        </div>
      )}

      {pairs.length > 0 && (
        <section>
          <h2 className="mb-3 font-display text-3xl font-bold">Hazır karşılaştırmalar</h2>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {pairs.map((p) => (
              <li key={p.slug}>
                <Link href={`/karsilastir/${p.slug}`} className="block rounded-lg border border-line bg-white p-4 font-semibold hover:border-ink hover:text-red">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
