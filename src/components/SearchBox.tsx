"use client";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { KIND_ORDER, search, type SearchDoc } from "@/lib/search-core";
import { Icon } from "./Icon";

let cache: Promise<SearchDoc[]> | null = null;
export function loadIndex() {
  cache ??= fetch("/search-index.json")
    .then((r) => r.json() as Promise<SearchDoc[]>)
    .catch(() => {
      cache = null;
      return [];
    });
  return cache;
}

export function SearchBox({ size = "md", autoFocus = false }: { size?: "md" | "lg"; autoFocus?: boolean }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [docs, setDocs] = useState<SearchDoc[] | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const box = useRef<HTMLDivElement>(null);
  const id = useId();

  const results = useMemo(() => (docs && q.trim().length >= 2 ? search(docs, q, 8) : []), [docs, q]);
  const grouped = useMemo(() => KIND_ORDER.flatMap((k) => results.filter((r) => r.k === k)), [results]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    setQ("");
    router.push(href);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (active >= 0 && grouped[active]) return go(grouped[active].h);
    if (q.trim()) go(`/arama?q=${encodeURIComponent(q.trim())}`);
  };

  const lg = size === "lg";
  return (
    <div ref={box} className="relative w-full">
      <form role="search" onSubmit={submit} className="relative">
        <label htmlFor={id} className="sr-only">
          Sitede ara
        </label>
        <input
          id={id}
          type="search"
          value={q}
          autoFocus={autoFocus}
          autoComplete="off"
          role="combobox"
          aria-expanded={open && q.length >= 2}
          aria-controls={`${id}-list`}
          aria-activedescendant={active >= 0 ? `${id}-${active}` : undefined}
          placeholder="Kask, mont, interkom, marka veya rehber ara…"
          onFocus={() => {
            setOpen(true);
            loadIndex().then(setDocs);
          }}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setActive(-1);
            if (!docs) loadIndex().then(setDocs);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, grouped.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, -1));
            } else if (e.key === "Escape") setOpen(false);
          }}
          className={`w-full rounded-md border border-line bg-white pr-14 text-ink placeholder:text-mute/80 ${lg ? "h-14 pl-5 text-lg" : "h-10 pl-3.5 text-[15px]"}`}
        />
        <button
          type="submit"
          aria-label="Ara"
          className={`absolute top-1 right-1 bottom-1 grid place-items-center rounded bg-red text-white hover:bg-red-dark ${lg ? "w-12" : "w-9"}`}
        >
          <Icon name="search" className={lg ? "size-6" : "size-5"} />
        </button>
      </form>
      {open && q.trim().length >= 2 && (
        <div
          id={`${id}-list`}
          role="listbox"
          className="absolute top-full right-0 left-0 z-50 mt-1 max-h-[70vh] overflow-auto rounded-md border border-line bg-white text-ink shadow-xl"
        >
          {!docs ? (
            <p className="p-4 text-sm text-mute">Yükleniyor…</p>
          ) : grouped.length === 0 ? (
            <p className="p-4 text-sm text-mute">
              “{q}” için sonuç bulunamadı. Farklı bir kelime dene ya da{" "}
              <a className="text-red underline" href="/rehber">
                rehberlere
              </a>{" "}
              göz at.
            </p>
          ) : (
            <>
              {grouped.map((r, i) => (
                <div key={r.h}>
                  {(i === 0 || grouped[i - 1].k !== r.k) && (
                    <div className="border-t border-line bg-paper px-4 py-1.5 text-xs font-semibold tracking-wide text-mute uppercase first:border-t-0">
                      {r.k}
                    </div>
                  )}
                  <button
                    type="button"
                    id={`${id}-${i}`}
                    role="option"
                    aria-selected={i === active}
                    onClick={() => go(r.h)}
                    onMouseEnter={() => setActive(i)}
                    className={`block w-full px-4 py-2.5 text-left ${i === active ? "bg-red/5" : ""}`}
                  >
                    <span className="block font-semibold">{r.t}</span>
                    {r.d && <span className="block truncate text-sm text-mute">{r.d}</span>}
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => go(`/arama?q=${encodeURIComponent(q.trim())}`)}
                className="block w-full border-t border-line px-4 py-3 text-left text-sm font-semibold text-red hover:bg-paper"
              >
                “{q}” için tüm sonuçları gör →
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
