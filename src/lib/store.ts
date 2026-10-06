"use client";
/**
 * Tarayıcıda tutulan kişisel listeler (favoriler, karşılaştırma). Sunucuya gönderilmez.
 * localStorage erişilemezse (gizli pencere vb.) liste bellekte tutulur, site çalışmaya devam eder.
 */
import { useSyncExternalStore } from "react";

type Key = "mk:fav" | "mk:cmp";
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
    toggle: (id: string) => {
      const cur = read(key);
      if (cur.includes(id)) write(key, cur.filter((x) => x !== id));
      else write(key, key === "mk:cmp" ? [...cur, id].slice(-MAX_COMPARE) : [...cur, id]);
    },
    remove: (id: string) => write(key, read(key).filter((x) => x !== id)),
    clear: () => write(key, []),
  };
}
