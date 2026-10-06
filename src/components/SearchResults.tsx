"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { KIND_ORDER, search, type SearchDoc } from "@/lib/search-core";
import { loadIndex } from "./SearchBox";

const EXAMPLES = ["Neotec", "Shoei", "ECE 22.06 karbon", "Cardo", "yazlık mont", "30 bin altı kask"];

export function SearchResults() {
  const params = useSearchParams();
  const router = useRouter();
  const q = params.get("q") ?? "";
  const [input, setInput] = useState(q);
  const [docs, setDocs] = useState<SearchDoc[] | null>(null);
  useEffect(() => {
    loadIndex().then(setDocs);
  }, []);
  useEffect(() => setInput(q), [q]);
  const results = useMemo(() => (docs && q ? search(docs, q, 60) : []), [docs, q]);

  return (
    <div>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/arama?q=${encodeURIComponent(input.trim())}`);
        }}
        className="flex max-w-2xl gap-2"
      >
        <label htmlFor="arama-q" className="sr-only">
          Arama
        </label>
        <input id="arama-q" type="search" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ne arıyorsun?" className="h-12 flex-1 rounded-md border border-line bg-white px-4 text-lg" autoFocus />
        <button type="submit" className="h-12 rounded-md bg-red px-5 font-semibold text-white hover:bg-red-dark">
          Ara
        </button>
      </form>
      {!q && (
        <div className="mt-6">
          <p className="mb-2 text-sm text-mute">Örnek aramalar:</p>
          <ul className="flex flex-wrap gap-2">
            {EXAMPLES.map((e) => (
              <li key={e}>
                <Link href={`/arama?q=${encodeURIComponent(e)}`} className="block rounded-full border border-line bg-white px-3 py-1.5 text-sm font-semibold hover:border-ink">
                  {e}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {q && docs && (
        <div className="mt-8 space-y-8" aria-live="polite">
          <p className="text-mute">
            “{q}” için <strong className="text-ink">{results.length}</strong> sonuç
          </p>
          {KIND_ORDER.map((k) => {
            const rs = results.filter((r) => r.k === k);
            if (!rs.length) return null;
            return (
              <section key={k}>
                <h2 className="mb-3 font-display text-2xl font-bold">{k}</h2>
                <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {rs.map((r) => (
                    <li key={r.h}>
                      <Link href={r.h} className="block h-full rounded-lg border border-line bg-white p-4 hover:border-ink">
                        <span className="block font-semibold">{r.t}</span>
                        {r.d && <span className="mt-0.5 block text-sm text-mute">{r.d}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
          {!results.length && (
            <p>
              Sonuç bulunamadı. Yazımı kontrol et veya{" "}
              <Link href="/rehber" className="font-semibold text-red underline">
                rehberlere
              </Link>{" "}
              göz at.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
