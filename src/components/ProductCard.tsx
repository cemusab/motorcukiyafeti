import { canOptimize } from "@/lib/img";
import { SafeImage } from "./SafeImage";
import Link from "next/link";
import { getCategory } from "@/data/categories";
import type { Product } from "@/data/schema";
import { brandName, formatShortDate, getMedia, isLocal, priceLabel, productId, productPath } from "@/lib/data";
import { productTypeLabel, keyChips } from "@/lib/labels";
import { Icon } from "./Icon";
import { CompareButton, FavoriteButton } from "./ProductActions";

export function ProductVisual({ p, className = "", eager = false }: { p: Product; className?: string; eager?: boolean }) {
  const img = getMedia(p).images[0];
  if (img)
    return (
      <div className={`relative grid place-items-center overflow-hidden bg-white ${className}`}>
        {/* Üretici görseli; yüklenemezse kategori çizimi gösterilir. Kaynak ürün sayfasında yazar. */}
        <SafeImage
          unoptimized={!canOptimize(img.url)}
          src={img.url}
          alt={img.alt}
          priority={eager}
          sizes="(min-width:1280px) 300px, 48vw"
          className="object-contain p-2 sm:p-4"
          fallback={<DrawnVisual p={p} className="absolute inset-0" />}
        />
      </div>
    );
  return <DrawnVisual p={p} className={className} />;
}

/** Görseli olmayan veya görseli yüklenemeyen ürünler için kategori çizimi. */
function DrawnVisual({ p, className = "" }: { p: Product; className?: string }) {
  const icon = getCategory(p.category)?.icon ?? "kask";
  return (
    <div className={`relative grid place-items-center overflow-hidden bg-gradient-to-br from-[#1d2026] to-[#0d0f12] text-white ${className}`}>
      <svg className="absolute inset-0 size-full opacity-[.07]" aria-hidden>
        <defs>
          <pattern id="mk-grid" width="18" height="18" patternUnits="userSpaceOnUse">
            <path d="M18 0H0v18" fill="none" stroke="#fff" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mk-grid)" />
      </svg>
      <Icon name={icon} className="relative size-1/2 max-h-28 text-white/90 drop-shadow-[0_8px_16px_rgba(212,32,42,.45)]" />
      <span lang="en" className="absolute bottom-2 left-3 font-display text-sm font-bold tracking-wider text-white/50 uppercase">{brandName(p.brand)}</span>
    </div>
  );
}

export function ProductCard({ p }: { p: Product }) {
  const href = productPath(p);
  const id = productId(p);
  const price = priceLabel(p);
  const name = `${brandName(p.brand)} ${p.name}`;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-line bg-white transition hover:-translate-y-0.5 hover:shadow-lg">
      <ProductVisual p={p} className="aspect-square sm:aspect-[4/3]" />
      <div className="absolute top-1.5 right-1.5 z-10 flex flex-col gap-1 sm:top-2 sm:right-2 sm:flex-row sm:gap-1.5">
        <FavoriteButton id={id} name={name} compact />
        <CompareButton id={id} name={name} category={p.category} compact />
      </div>
      {isLocal(p) && p.status !== "discontinued" && (
        <span className="absolute top-1.5 left-1.5 z-10 flex items-center gap-1 rounded bg-red px-1.5 py-0.5 text-[11px] font-bold text-white sm:top-2 sm:left-2 sm:px-2 sm:text-xs">
          <svg viewBox="0 0 16 16" className="size-3" aria-hidden>
            <circle cx="6.5" cy="8" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="m11.5 5.6.6 1.6 1.7.1-1.3 1 .5 1.7-1.5-1-1.4 1 .5-1.7-1.3-1 1.7-.1z" fill="currentColor" />
          </svg>
          Yerli<span className="hidden sm:inline"> marka</span>
        </span>
      )}
      {p.status === "discontinued" && (
        <span className="absolute top-2 left-2 rounded bg-warn px-2 py-0.5 text-xs font-semibold text-white">Üretimi sona erdi</span>
      )}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p lang="en" className="truncate text-[11px] font-semibold tracking-wide text-mute uppercase sm:text-xs">{brandName(p.brand)}</p>
        <h3 className="mt-0.5 font-display text-[17px] leading-tight font-bold sm:text-xl">
          <Link href={href} className="after:absolute after:inset-0 after:content-[''] hover:text-red">
            {p.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-xs text-mute sm:text-sm">{productTypeLabel(p)}</p>
        <ul className="mt-2 flex flex-wrap gap-1 sm:mt-3 sm:gap-1.5 [&>li:nth-child(n+3)]:hidden sm:[&>li:nth-child(n+3)]:block">
          {keyChips(p).map((c) => (
            <li key={c} className="max-w-full truncate rounded bg-paper px-1.5 py-0.5 text-[11px] font-medium text-ink-2 sm:px-2 sm:text-xs">
              {c}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-3 sm:pt-4">
          {price ? (
            <p className="font-display text-lg font-bold sm:text-xl">
              {price}
              <span className="block font-sans text-[11px] font-normal text-mute sm:text-xs">
                {p.offers.length} satıcı · {formatShortDate(p.priceRange!.checkedAt)} kontrol
              </span>
            </p>
          ) : (
            <p className="text-xs text-mute sm:text-sm">TR fiyatı henüz doğrulanmadı</p>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((p) => (
        <ProductCard key={productId(p)} p={p} />
      ))}
    </div>
  );
}
