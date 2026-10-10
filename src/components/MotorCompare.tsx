"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Icon } from "./Icon";

export type BikeRow = {
  slug: string;
  name: string;
  brand: string;
  type: string;
  cc: number | null;
  licence: string | null;
  powerKw: number | null;
  powerHp: number | null;
  torqueNm: number | null;
  weightKg: number | null;
  weightType: string | null;
  weightNote: string | null;
  seatHeightMm: number | null;
  seatHeightNote: string | null;
  fuelTankL: number | null;
  tireFront: string | null;
  tireRear: string | null;
  oil: string | null;
  sourceUrl: string | null;
  sourceLabel: string | null;
  gear: { name: string; href: string }[];
};

const WEIGHT_LABEL: Record<string, string> = { islak: "ıslak", kuru: "kuru", "surushe-hazir": "sürüşe hazır" };
const nf = (n: number) => n.toLocaleString("tr-TR");

type Row = { key: string; label: string; get: (b: BikeRow) => string | null; num?: (b: BikeRow) => number | null; better?: "high" | "low"; comparable?: (bs: BikeRow[]) => boolean };

const ROWS: Row[] = [
  { key: "type", label: "Tip", get: (b) => b.type },
  { key: "cc", label: "Motor hacmi", get: (b) => (b.cc ? `${nf(b.cc)} cc` : null) },
  { key: "licence", label: "Ehliyet", get: (b) => b.licence },
  { key: "kw", label: "Güç (kW)", get: (b) => (b.powerKw != null ? `${nf(b.powerKw)} kW` : null), num: (b) => b.powerKw, better: "high" },
  { key: "hp", label: "Güç (hp, üretici beyanı)", get: (b) => (b.powerHp != null ? `${nf(b.powerHp)} hp` : null) },
  { key: "nm", label: "Tork", get: (b) => (b.torqueNm != null ? `${nf(b.torqueNm)} Nm` : null), num: (b) => b.torqueNm, better: "high" },
  {
    key: "kg",
    label: "Ağırlık",
    get: (b) => (b.weightKg != null ? `${nf(b.weightKg)} kg${b.weightType ? ` (${WEIGHT_LABEL[b.weightType]})` : " (tanım belirtilmemiş)"}` : null),
    num: (b) => b.weightKg,
    better: "low",
    // Yalnız hepsi aynı ağırlık tanımıyla verilmişse karşılaştırılır (ıslak ile kuru karşılaştırılmaz).
    comparable: (bs) => bs.every((b) => b.weightType && b.weightType === bs[0].weightType),
  },
  { key: "seat", label: "Sele yüksekliği", get: (b) => (b.seatHeightMm != null ? `${nf(b.seatHeightMm)} mm${b.seatHeightNote ? ` · ${b.seatHeightNote}` : ""}` : null) },
  { key: "tank", label: "Yakıt deposu", get: (b) => (b.fuelTankL != null ? `${nf(b.fuelTankL)} L` : null), num: (b) => b.fuelTankL, better: "high" },
  { key: "tf", label: "Ön lastik (fabrika)", get: (b) => b.tireFront },
  { key: "tr", label: "Arka lastik (fabrika)", get: (b) => b.tireRear },
  { key: "oil", label: "Önerilen motor yağı", get: (b) => b.oil },
];

export function MotorCompare({ bikes }: { bikes: BikeRow[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const selected = useMemo(
    () => (params.get("m")?.split(",") ?? []).map((s) => bikes.find((b) => b.slug === s)).filter((b): b is BikeRow => !!b).slice(0, 4),
    [params, bikes],
  );
  const setSel = (slugs: string[]) => router.replace(slugs.length ? `${pathname}?m=${slugs.join(",")}` : pathname, { scroll: false });
  const brands = [...new Set(bikes.map((b) => b.brand))].sort((a, b) => a.localeCompare(b, "tr"));
  return (
    <div>
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex-1 basis-full sm:basis-auto">
          <span className="mb-1 block text-sm font-semibold">Motor ekle ({selected.length}/4)</span>
          <select
            value=""
            disabled={selected.length >= 4}
            onChange={(e) => e.target.value && setSel([...selected.map((b) => b.slug), e.target.value])}
            className="h-12 w-full rounded-md border border-line bg-white px-3 sm:max-w-md"
          >
            <option value="">{selected.length >= 4 ? "En fazla 4 motor" : "Marka ve model seç…"}</option>
            {brands.map((br) => (
              <optgroup key={br} label={br}>
                {bikes
                  .filter((b) => b.brand === br && !selected.some((s) => s.slug === b.slug))
                  .map((b) => (
                    <option key={b.slug} value={b.slug}>
                      {b.name}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
        </label>
        {selected.length > 0 && (
          <button type="button" onClick={() => setSel([])} className="h-12 rounded-md border border-line bg-white px-4 text-sm font-semibold hover:border-ink">
            Sıfırla
          </button>
        )}
      </div>
      {selected.length === 0 ? (
        <p className="mt-6 rounded-lg border border-dashed border-line bg-white p-8 text-center text-mute">Karşılaştırmak için en az iki motor seç.</p>
      ) : (
        <MotorTable selected={selected} onRemove={(slug) => setSel(selected.filter((s) => s.slug !== slug).map((s) => s.slug))} />
      )}
    </div>
  );
}

/** Karşılaştırma tablosu. URL'ye bağlı değildir; hazır karşılaştırma sayfalarında sunucuda tam HTML olarak üretilir. */
export function MotorTable({ selected, onRemove }: { selected: BikeRow[]; onRemove?: (slug: string) => void }) {
  const [diffOnly, setDiffOnly] = useState(false);
  const best = (r: Row) => {
    if (!r.num || !r.better || selected.length < 2) return null;
    if (r.comparable && !r.comparable(selected)) return null;
    const vals = selected.map(r.num).filter((v): v is number => v != null);
    if (vals.length < 2) return null;
    const target = r.better === "high" ? Math.max(...vals) : Math.min(...vals);
    return vals.filter((v) => v === target).length === vals.length ? null : target;
  };
  const rows = ROWS.filter((r) => !diffOnly || new Set(selected.map((b) => r.get(b) ?? "—")).size > 1);
  return (
    <div className="mt-6">
      <label className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <input type="checkbox" className="size-5 accent-red" checked={diffOnly} onChange={(e) => setDiffOnly(e.target.checked)} /> Yalnız farkları göster
      </label>
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[560px] border-collapse rounded-lg border border-line bg-white text-left text-sm">
            <thead>
              <tr className="bg-paper align-top">
                <th scope="col" className="sticky left-0 z-10 w-32 bg-paper p-3 font-semibold sm:w-40">Model</th>
                {selected.map((b) => (
                  <th key={b.slug} scope="col" className="p-3">
                    <Link href={`/motor/${b.slug}`} className="font-display text-lg font-bold hover:text-red">
                      {b.name}
                    </Link>
                    {onRemove && <button type="button" aria-label={`${b.name} karşılaştırmadan çıkar`} onClick={() => onRemove(b.slug)} className="ml-2 align-middle text-mute hover:text-red">
                      <Icon name="close" className="inline size-4" />
                    </button>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const top = best(r);
                return (
                  <tr key={r.key} className="border-t border-line align-top">
                    <th scope="row" className="sticky left-0 z-10 bg-white p-3 font-semibold text-ink-2">{r.label}</th>
                    {selected.map((b) => {
                      const isBest = top != null && r.num?.(b) === top;
                      return (
                        <td key={b.slug} className={`p-3 ${isBest ? "bg-ok/10 font-semibold text-ok" : ""}`}>
                          {r.get(b) ?? <span className="text-mute">Üretici belirtmiyor</span>}
                          {r.key === "kg" && !b.weightType && b.weightNote && <span className="block text-xs text-mute">{b.weightNote}</span>}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
              <tr className="border-t border-line align-top">
                <th scope="row" className="sticky left-0 z-10 bg-white p-3 font-semibold text-ink-2">Önerilen ekipman</th>
                {selected.map((b) => (
                  <td key={b.slug} className="p-3">
                    <ul className="space-y-1">
                      {b.gear.map((g) => (
                        <li key={g.href}>
                          <Link href={g.href} className="font-semibold text-red hover:underline">
                            {g.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link href={`/motor/${b.slug}`} className="mt-2 inline-block text-xs font-semibold underline">
                      Uygun ürünler, lastik ve yağ →
                    </Link>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-line align-top">
                <th scope="row" className="sticky left-0 z-10 bg-white p-3 font-semibold text-ink-2">Kaynak</th>
                {selected.map((b) => (
                  <td key={b.slug} className="p-3 text-xs">
                    {b.sourceUrl ? (
                      <a href={b.sourceUrl} target="_blank" rel="noopener nofollow" className="underline">
                        {b.sourceLabel}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      <p className="mt-3 text-xs text-mute">
        Yeşil, seçili motorlar arasındaki en yüksek güç/tork/depo veya en düşük ağırlığı gösterir. Ağırlık yalnız aynı tanımla (ör. hepsi ıslak) verildiyse karşılaştırılır; sele yüksekliği kişisel tercih olduğu için vurgulanmaz. Fiyat gösterilmez.
      </p>
    </div>
  );
}
