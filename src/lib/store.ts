"use client";
/**
 * Tarayıcıda tutulan kişisel listeler (favoriler, karşılaştırma). Sunucuya gönderilmez.
 * localStorage erişilemezse (gizli pencere vb.) liste bellekte tutulur, site çalışmaya devam eder.
 */
import { useSyncExternalStore } from "react";

type Key = "mk:fav" | "mk:cmp";
const CMP_CAT = "mk:cmp-cat";
const mem: Record<string, string[]> = {};
const listeners = new Set<() => void>();
const EMPTY: string[] = [];
const snap: Record<string, { raw: string | null; val: string[] }> = {};

function read(key: Key): string[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    return mem[key] ?? EMPTY;
  }
  const s = snap[key];
  if (s && s.raw === raw) return s.val;
  let val: string[] = EMPTY;
  try {
    val = raw ? (JSON.parse(raw) as string[]) : EMPTY;
  } catch {}
  snap[key] = { raw, val };
  return val;
}

function write(key: Key, v: string[]) {
  mem[key] = v;
  try {
    window.localStorage.setItem(key, JSON.stringify(v));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = () => cb();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export const MAX_COMPARE = 4;

export function useList(key: Key) {
  const list = useSyncExternalStore(subscribe, () => read(key), () => EMPTY);
  return {
    list,
    has: (id: string) => list.includes(id),
    /** Karşılaştırmada: farklı kategoriden ürün eklenirse liste o kategoriyle yeniden başlar; 4 üründen sonra eklenmez. */
    toggle: (id: string, category?: string) => {
      const cur = read(key);
      if (cur.includes(id)) return write(key, cur.filter((x) => x !== id));
      if (key !== "mk:cmp") return write(key, [...cur, id]);
      let prevCat: string | null = null;
      try {
        prevCat = window.localStorage.getItem(CMP_CAT);
      } catch {}
      if (category && prevCat !== category) {
        try {
          window.localStorage.setItem(CMP_CAT, category);
        } catch {}
        return write(key, [id]);
      }
      if (cur.length >= MAX_COMPARE) return;
      write(key, [...cur, id]);
    },
    remove: (id: string) => write(key, read(key).filter((x) => x !== id)),
    clear: () => write(key, []),
  };
}
