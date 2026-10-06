"use client";
import { useState } from "react";
import type { Media } from "@/data/schema";
import { Icon } from "./Icon";

const KIND: Record<string, string> = { resmi: "Üretici videosu", inceleme: "İnceleme", kurulum: "Kurulum" };
const LANG: Record<string, string> = { tr: "Türkçe", en: "İngilizce", de: "Almanca", it: "İtalyanca", fr: "Fransızca", es: "İspanyolca" };

/** YouTube videoları: tıklanana kadar yalnızca küçük resim yüklenir (performans ve gizlilik için youtube-nocookie). */
export function VideoList({ videos }: { videos: Media["videos"] }) {
  const [playing, setPlaying] = useState<string | null>(null);
  const sorted = [...videos].sort((a, b) => (a.lang === "tr" ? -1 : 0) - (b.lang === "tr" ? -1 : 0));
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {sorted.map((v) => (
        <li key={v.youtubeId} className="overflow-hidden rounded-lg border border-line bg-white">
          <div className="relative aspect-video bg-night">
            {playing === v.youtubeId ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?autoplay=1&rel=0`}
                title={v.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 size-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(v.youtubeId)}
                className="group absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(212,32,42,.35),transparent_60%)]"
                aria-label={`Videoyu oynat: ${v.title}`}
              >
                {/* Gizlilik: oynatılana kadar YouTube/Google sunucularına istek gönderilmez. */}
                <span className="absolute inset-x-4 bottom-3 text-left text-xs text-white/60">Oynattığında YouTube'a bağlanılır</span>
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid size-16 place-items-center rounded-full bg-red text-white shadow-lg transition group-hover:scale-110">
                    <svg viewBox="0 0 24 24" className="ml-1 size-7" fill="currentColor" aria-hidden>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              </button>
            )}
          </div>
          <div className="p-4">
            <p className="text-xs font-semibold tracking-wide text-red uppercase">
              {KIND[v.kind]} · {LANG[v.lang] ?? v.lang}
            </p>
            <p className="mt-1 leading-snug font-semibold">{v.title}</p>
            <a
              href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
              target="_blank"
              rel="noopener nofollow"
              className="mt-1 inline-flex items-center gap-1 text-sm text-mute hover:text-red"
            >
              {v.channel} · YouTube'da aç <Icon name="external" className="size-3.5" />
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}
