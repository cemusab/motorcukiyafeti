"use client";
import Image from "next/image";
import { canOptimize } from "@/lib/img";
import { useState } from "react";
import type { Media } from "@/data/schema";

/** Ürün sayfası galerisi: üretici görselleri, küçük resimler ve görsel kaynağı. */
export function ProductGallery({ images, fallback }: { images: Media["images"]; fallback: React.ReactNode }) {
  const [i, setI] = useState(0);
  if (!images.length) return <>{fallback}</>;
  const cur = images[Math.min(i, images.length - 1)];
  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-xl border border-line bg-white">
        <Image unoptimized={!canOptimize(cur.url)} src={cur.url} alt={cur.alt} fill priority sizes="(min-width:1024px) 45vw, 95vw" className="object-contain p-6" />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((im, k) => (
            <button
              key={im.url}
              type="button"
              onClick={() => setI(k)}
              aria-label={`Görsel ${k + 1}: ${im.alt}`}
              aria-pressed={k === i}
              className={`relative size-20 shrink-0 overflow-hidden rounded-md border-2 bg-white ${k === i ? "border-red" : "border-line hover:border-ink"}`}
            >
              <Image unoptimized={!canOptimize(im.url)} src={im.url} alt="" fill sizes="80px" className="object-contain p-1" />
            </button>
          ))}
        </div>
      )}
      <p className="mt-2 text-xs text-mute">
        Görsel:{" "}
        <a href={cur.sourcePage} target="_blank" rel="noopener nofollow" className="underline hover:text-red">
          {cur.credit}
        </a>{" "}
        (üreticinin resmi sitesi)
      </p>
    </div>
  );
}
