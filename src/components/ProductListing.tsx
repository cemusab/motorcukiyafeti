import { Suspense } from "react";
import type { Product } from "@/data/schema";
import { productId } from "@/lib/data";
import { facetDefs, facetItem } from "@/lib/facets";
import { FilterableGrid } from "./FilterableGrid";
import { ProductCard, ProductGrid } from "./ProductCard";

/** Filtreli ürün listesi. JS yüklenmeden önce de (ve botlar için) tüm ürünler düz liste olarak görünür. */
export function ProductListing({ items, category }: { items: Product[]; category: string }) {
  if (!items.length) return null;
  const cards = items.map((p) => <ProductCard key={productId(p)} p={p} />);
  return (
    <Suspense fallback={<ProductGrid items={items.slice(0, 24)} />}>
      <FilterableGrid defs={facetDefs(category)} items={items.map(facetItem)}>
        {cards}
      </FilterableGrid>
    </Suspense>
  );
}
