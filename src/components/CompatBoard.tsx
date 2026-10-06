import Link from "next/link";
import type { Helmet } from "@/data/schema";
import { compatForHelmet } from "@/lib/catalog";
import { displayName, getProductById, priceLabel, productId, productPath } from "@/lib/data";
import { Icon } from "./Icon";

const LEVELS = [
  { k: "ozel", t: "Bu kaska özel", d: "Kaskın kendi yuvasına göre tasarlanmış, dışarıdan görünmeyen sistemler." },
  { k: "entegre", t: "Tam entegre", d: "Kaskın hazır yuvasına kelepçesiz oturan interkomlar." },
  { k: "standart", t: "Standart montaj", d: "Evrensel kelepçe veya yapışkan aparatla takılan interkomlar." },
  { k: "adaptor", t: "Adaptör gerekli", d: "Ek montaj kiti veya adaptörle takılabilenler." },
  { k: "uyumsuz", t: "Uyumlu değil", d: "Üreticisine göre bu kaskla kullanılamayan modeller." },
] as const;

export function CompatBoard({ helmet }: { helmet: Helmet }) {
  const list = compatForHelmet(productId(helmet));
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-4 rounded-lg border border-line bg-white p-4">
        <span className="grid size-14 place-items-center rounded-md bg-night text-white">
          <Icon name="kask" className="size-9" />
        </span>
        <div className="flex-1">
          <Link href={productPath(helmet)} className="font-display text-2xl font-bold hover:text-red">
            {displayName(helmet)}
          </Link>
          <p className="text-sm text-mute">
            İnterkom hazırlığı: {helmet.specs.intercomReady === true ? "var" : helmet.specs.intercomReady === false ? "yok" : "doğrulanmadı"}
            {helmet.specs.intercomNotes ? ` · ${helmet.specs.intercomNotes}` : ""}
          </p>
        </div>
      </div>
      {LEVELS.map((lv) => {
        const rows = list.filter((c) => c.level === lv.k);
        if (!rows.length) return null;
        return (
          <section key={lv.k}>
            <h2 className="font-display text-2xl font-bold">
              {lv.t} <span className="text-mute">({rows.length})</span>
            </h2>
            <p className="mb-3 text-sm text-mute">{lv.d}</p>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {rows.map((c) => {
                const ic = getProductById(c.intercom)!;
                const price = priceLabel(ic);
                return (
                  <li key={c.intercom} className="flex flex-col rounded-lg border border-line bg-white p-4">
                    <div className="flex items-start justify-between gap-2">
                      <Link href={productPath(ic)} className="font-display text-xl font-bold hover:text-red">
                        {displayName(ic)}
                      </Link>
                      <span className={`shrink-0 rounded px-2 py-0.5 text-xs font-semibold ${c.verified ? "bg-ok/10 text-ok" : "bg-paper text-mute"}`}>
                        {c.verified ? "Doğrulandı" : "Doğrulanmadı"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-ink-2">{c.note}</p>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-3 text-sm">
                      <span className="font-semibold">{price ?? <span className="font-normal text-mute">Fiyat doğrulanmadı</span>}</span>
                      {c.source && (
                        <a href={c.source.url} target="_blank" rel="noopener nofollow" className="text-mute underline hover:text-red">
                          Kaynak
                        </a>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
      <p className="text-sm text-mute">
        “Doğrulandı” etiketi üreticinin uyumluluk listesine dayanır. Doğrulanmamış kayıtlar genel beklentidir; kaskın iç yapısı ve hoparlör cepleri modele göre değişebileceği için satın almadan önce satıcıyla teyit et.
      </p>
    </div>
  );
}
