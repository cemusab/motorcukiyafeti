"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function HelmetPicker({ helmets, current }: { helmets: { brand: string; name: string; slug: string }[]; current?: string }) {
  const router = useRouter();
  const brands = [...new Set(helmets.map((h) => h.brand))];
  const cur = helmets.find((h) => h.slug === current);
  const [brand, setBrand] = useState(cur?.brand ?? brands[0]);
  return (
    <form
      className="flex flex-wrap items-end gap-3 rounded-lg border border-line bg-white p-4"
      onSubmit={(e) => {
        e.preventDefault();
        const v = (e.currentTarget.elements.namedItem("kask") as HTMLSelectElement).value;
        if (v) router.push(`/interkom-uyumlulugu/${v}`);
      }}
    >
      <div>
        <label htmlFor="hp-brand" className="mb-1 block text-sm font-semibold">
          Kask markası
        </label>
        <select id="hp-brand" value={brand} onChange={(e) => setBrand(e.target.value)} className="h-11 rounded-md border border-line px-3">
          {brands.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>
      <div className="min-w-56 flex-1">
        <label htmlFor="hp-model" className="mb-1 block text-sm font-semibold">
          Model
        </label>
        <select id="hp-model" name="kask" key={brand} defaultValue={cur?.brand === brand ? cur.slug : ""} className="h-11 w-full rounded-md border border-line px-3">
          {helmets
            .filter((h) => h.brand === brand)
            .map((h) => (
              <option key={h.slug} value={h.slug}>
                {h.name}
              </option>
            ))}
        </select>
      </div>
      <button type="submit" className="h-11 rounded-md bg-red px-5 font-semibold text-white hover:bg-red-dark">
        Uyumlu interkomları göster
      </button>
    </form>
  );
}
