import type { Product } from "@/data/schema";
import { displayName, formatDate, productPath, reviewsFor } from "@/lib/data";
import { SITE, abs, mailto } from "@/lib/site";
import { Icon } from "./Icon";

/** Kullanıcı yorumları: yorumlar e-postayla gelir, site sahibi onayladıktan sonra yayınlanır. */
export function Reviews({ p }: { p: Product }) {
  const list = reviewsFor(p);
  const name = displayName(p);
  const body = [
    `Ürün: ${name}`,
    `Sayfa: ${abs(productPath(p))}`,
    "",
    "Rumuz (yayınlanacak isim): ",
    "Ne kadar süredir ve nasıl kullanıyorsun? (ör. 6 aydır, şehir içi / kurye / uzun yol): ",
    p.category === "kask" ? "Kafa çevren ve aldığın beden (ör. 58 cm, M – tam oldu): " : "Ölçün ve aldığın beden (ör. göğüs 102 cm, L – kolları kısa): ",
    "Puanın (1-5, isteğe bağlı): ",
    "",
    "Yorumun:",
    "",
    "",
    "---",
    "Yorumumun Motorcu Kıyafeti'nde yukarıdaki rumuzla yayınlanmasına izin veriyorum. E-posta adresim yayınlanmaz.",
  ].join("\n");
  return (
    <section id="yorumlar">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl font-bold">Kullanıcı yorumları</h2>
          <p className="text-sm text-mute">Yorumlar editör onayından sonra yayınlanır. Beden ve kullanım bilgisi diğer sürücülere çok yardımcı olur.</p>
        </div>
        <a href={mailto(`Yorum: ${name}`, body)} className="flex h-10 items-center gap-2 rounded-md bg-red px-4 text-sm font-semibold text-white hover:bg-red-dark">
          <Icon name="book" className="size-4" /> Yorum yaz
        </a>
      </div>
      {list.length ? (
        <ul className="space-y-3">
          {list.map((r) => (
            <li key={r.author + r.receivedAt} className="rounded-lg border border-line bg-white p-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-semibold">{r.author}</span>
                {r.rating != null && (
                  <span className="flex items-center gap-0.5 text-red" aria-label={`${r.rating} / 5`}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Icon key={i} name="star" className={`size-4 ${i < r.rating! ? "fill-red" : "opacity-30"}`} />
                    ))}
                  </span>
                )}
                <span className="text-xs text-mute">{formatDate(r.approvedAt)}</span>
              </div>
              {(r.usage || r.sizeInfo) && <p className="mt-1 text-sm text-mute">{[r.usage, r.sizeInfo].filter(Boolean).join(" · ")}</p>}
              <p className="mt-2 text-ink-2">{r.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-lg border border-dashed border-line bg-white p-5 text-mute">
          Henüz onaylanmış yorum yok. Bu ürünü kullanıyorsan ilk yorumu sen yaz; yorumun {SITE.email} adresine gelir ve onaylandıktan sonra burada görünür.
        </p>
      )}
    </section>
  );
}
