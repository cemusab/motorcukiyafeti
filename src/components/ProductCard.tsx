import Link from "next/link";
import { getCategory } from "@/data/categories";
import type { Product } from "@/data/schema";
import { brandName, getMedia, priceLabel, productId, productPath } from "@/lib/data";
import { productTypeLabel, keyChips } from "@/lib/labels";
import { Icon } from "./Icon";
import { CompareButton, FavoriteButton } from "./ProductActions";

export function ProductVisual({ p, className = "", eager = false }: { p: Product; className?: string; eager?: boolean }) {
  const icon = getCategory(p.category)?.icon ?? "kask";
  const img = getMedia(p).images[0];
  if (img)
    return (
      <div className={`relative grid place-items-center overflow-hidden bg-white ${className}`}>
        {/* Üretici görseli; kaynak ve telif bilgisi ürün sayfasında gösterilir. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img.url} alt={img.alt} loading={eager ? "eager" : "lazy"} decoding="async" referrerPolicy="no-referrer" className="absolute inset-0 size-full object-contain p-4" />
      </div>
    );
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
      <ProductVisual p={p} className="aspect-[4/3]" />
      <div className="absolute top-2 right-2 z-10 flex gap-1.5">
        <FavoriteButton id={id} name={name} compact />
        <CompareButton id={id} name={name} category={p.category} compact />
      </div>
      {p.status === "discontinued" && (
        <span className="absolute top-2 left-2 rounded bg-warn px-2 py-0.5 text-xs font-semibold text-white">Üretimi sona erdi</span>
      )}
      <div className="flex flex-1 flex-col p-4">
        <p lang="en" className="text-xs font-semibold tracking-wide text-mute uppercase">{brandName(p.brand)}</p>
        <h3 className="mt-0.5 font-display text-xl leading-tight font-bold">
          <Link href={href} className="after:absolute after:inset-0 after:content-[''] hover:text-red">
            {p.name}
          </Link>
        </h3>
        <p className="text-sm text-mute">{productTypeLabel(p)}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {keyChips(p).map((c) => (
            <li key={c} className="rounded bg-paper px-2 py-0.5 text-xs font-medium text-ink-2">
              {c}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-4">
          {price ? (
            <p className="font-display text-xl font-bold">
              {price}
              <span className="ml-1 align-middle text-xs font-normal text-mute">TR fiyat</span>
            </p>
          ) : (
            <p className="text-sm text-mute">TR fiyatı henüz doğrulanmadı</p>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((p) => (
        <ProductCard key={productId(p)} p={p} />
      ))}
    </div>
  );
}
