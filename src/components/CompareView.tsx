import Link from "next/link";
import { USAGE_Q, bestInRow, rowDiffers, verdicts, type CompareEntry } from "@/lib/compare-core";
import { Icon } from "./Icon";

/** Sunucu ve istemci tarafında ortak kullanılan karşılaştırma görünümü (yalnızca saf veriyle çalışır). */
export function CompareView({ items, onRemove }: { items: CompareEntry[]; onRemove?: (id: string) => void }) {
  const v = verdicts(items);
  const keys = items[0].rows.map((r) => r.key);
  const usageKeys = [...new Set(items.flatMap((i) => Object.keys(i.usage)))].filter((k) => items.filter((i) => i.usage[k]).length >= 2);
  const fmt = (n: number) => new Intl.NumberFormat("tr-TR").format(n) + " TL";

  return (
    <div className="space-y-10">
      <section aria-labelledby="kisa-cevap">
        <h2 id="kisa-cevap" className="mb-4 font-display text-3xl font-bold">
          Kısa cevap
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {v.map((x) => (
            <div key={x.q} className="rounded-lg border border-line bg-white p-4">
              <p className="text-sm font-semibold text-mute">{x.q}</p>
              <p className={`mt-1 font-display text-xl font-bold ${x.winner ? "text-red" : "text-ink-2"}`}>{x.winner ?? "Net bir kazanan yok"}</p>
              <p className="mt-1 text-sm text-ink-2">{x.why}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="tablo">
        <h2 id="tablo" className="mb-2 font-display text-3xl font-bold">
          Teknik karşılaştırma
        </h2>
        <p className="mb-4 text-sm text-mute">
          <span className="mr-1 inline-block size-3 rounded-sm bg-red/10 ring-1 ring-red/30 align-middle" /> Farklı olan özellikler vurgulandı ·{" "}
          <span className="font-semibold text-ok">yeşil</span> = bu satırda öne çıkan değer
        </p>
        <div className="overflow-x-auto rounded-lg border border-line bg-white">
          <table className="w-full min-w-[560px] text-[15px]">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="w-44 p-3 text-left text-sm text-mute">
                  Özellik
                </th>
                {items.map((i) => (
                  <th key={i.id} scope="col" className="p-3 text-left align-top">
                    <Link href={i.href} className="font-display text-lg leading-tight font-bold hover:text-red">
                      {i.name}
                    </Link>
                    <span className="block text-xs font-normal text-mute">{i.type}</span>
                    {onRemove && (
                      <button type="button" onClick={() => onRemove(i.id)} className="mt-1 text-xs font-semibold text-red hover:underline">
                        Çıkar
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-line">
                <th scope="row" className="bg-paper/60 p-3 text-left font-semibold">
                  Türkiye fiyatı
                </th>
                {items.map((i) => (
                  <td key={i.id} className="p-3">
                    {i.price != null ? `${fmt(i.price)}'den` : <span className="text-mute">Doğrulanıyor</span>}
                  </td>
                ))}
              </tr>
              {keys.map((k) => {
                const diff = rowDiffers(items, k);
                const best = bestInRow(items, k);
                const label = items[0].rows.find((r) => r.key === k)!.label;
                if (items.every((i) => i.rows.find((r) => r.key === k)?.value === "—")) return null;
                return (
                  <tr key={k} className={`border-b border-line last:border-0 ${diff ? "bg-red/[.035]" : ""}`}>
                    <th scope="row" className="bg-paper/60 p-3 text-left font-semibold">
                      {label}
                    </th>
                    {items.map((i) => {
                      const r = i.rows.find((x) => x.key === k)!;
                      return (
                        <td key={i.id} className={`p-3 ${best === i.id ? "font-semibold text-ok" : ""}`}>
                          {r.unverified ? <span className="text-sm text-warn">Doğrulanıyor</span> : r.value}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {usageKeys.length > 0 && (
        <section aria-labelledby="kullanim">
          <h2 id="kullanim" className="mb-4 font-display text-3xl font-bold">
            Kullanıma göre değerlendirme
          </h2>
          <div className="space-y-4">
            {usageKeys.map((k) => (
              <div key={k}>
                <h3 className="mb-2 font-display text-xl font-bold">{USAGE_Q[k] ?? k} için hangisi?</h3>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                  {items.map((i) => (
                    <div key={i.id} className="rounded-lg border border-line bg-white p-4 text-sm">
                      <p className="font-semibold">{i.name}</p>
                      <p className="mt-1 text-ink-2">{i.usage[k] ?? "Bu kullanım için değerlendirme yok."}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="flex flex-wrap gap-2">
        {items.map((i) => (
          <Link key={i.id} href={i.href} className="flex items-center gap-1.5 rounded-md border border-line bg-white px-4 py-2 text-sm font-semibold hover:border-ink">
            {i.name} incelemesi <Icon name="arrow" className="size-4" />
          </Link>
        ))}
      </div>
    </div>
  );
}
