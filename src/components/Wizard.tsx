"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { GEAR, MOTO_TYPES, WIZARD_OPTIONS, WIZARD_TYPES, budgetTip, usageOptionsFor, wizardSet, type GearKey, type MotoSlug, type WizardInput } from "@/data/riding";
import { useList } from "@/lib/store";
import { Icon } from "./Icon";

export type WizardProduct = {
  id: string;
  name: string;
  href: string;
  category: string;
  subs: string[];
  price: number | null;
  season: string | null;
  gender: string | null;
  notFor: string;
};

type Gender = "fark-etmez" | "erkek" | "kadin";

const GEAR_CAT: Partial<Record<GearKey, string>> = { kask: "kask", mont: "mont", pantolon: "pantolon", eldiven: "eldiven", bot: "bot", interkom: "interkom" };

/** Kullanıcının durumuna uymayan ürünleri dışlamak için "uygun değil" metninde aranan kelimeler. */
function contextWords(i: WizardInput) {
  const w = ["yeni başla", "acemi", "ilk kask"];
  if (i.tur === "kurye" || i.kullanim === "kurye") w.push("kurye");
  if (i.tur === "scooter") w.push("scooter");
  if (i.kullanim === "sehir" || i.kullanim === "is") w.push("şehir içi", "günlük");
  if (i.butce === "ekonomik") w.push("bütçe");
  return w;
}

function pickFor(key: GearKey, input: WizardInput, gender: Gender, products: WizardProduct[]) {
  const cat = GEAR_CAT[key];
  if (!cat) return [];
  // Kuryelik bir kullanım şeklidir; ekipman profili kurye profiline göre seçilir.
  const moto = MOTO_TYPES.find((m) => m.slug === (input.kullanim === "kurye" ? "kurye" : input.tur))!;
  const subs: string[] = moto.subs.filter((s) => s.startsWith(cat + "/")).map((s) => s.split("/")[1]);
  const avoid = contextWords(input);
  let list = products.filter(
    (p) =>
      p.category === cat &&
      !p.subs.includes("kaska-ozel-interkom") &&
      !avoid.some((w) => p.notFor.includes(w)) &&
      (p.gender == null || p.gender === "unisex" || (gender !== "fark-etmez" && p.gender === gender)),
  );
  if (cat === "mont" || cat === "eldiven") {
    const seasonal = list.filter((p) => !p.season || p.season === input.mevsim || p.season === "4-mevsim");
    if (seasonal.length) list = seasonal;
  }
  // Motor türüne uygun alt kategoride ürün yoksa (ör. enduro için cross kask) alakasız öneri yapılmaz.
  if (subs.length) list = list.filter((p) => p.subs.some((s) => subs.includes(s)));
  const priced = list.filter((p) => p.price != null).sort((a, b) => a.price! - b.price!);
  if (priced.length >= 2 && input.butce !== "sinirsiz") {
    const third = Math.max(1, Math.ceil(priced.length / 3));
    const tier = input.butce === "ekonomik" ? priced.slice(0, third + 1) : input.butce === "premium" ? priced.slice(-third - 1) : priced.slice(third - 1, third * 2 + 1);
    return tier.slice(0, 2);
  }
  return list.slice(0, 2);
}

export type WizardBike = { slug: string; label: string; type: MotoSlug; cc: number | null; licence: string | null; notes: string[]; courierCommon: boolean };

export function Wizard({ products, bikes = [], compact = false }: { products: WizardProduct[]; bikes?: WizardBike[]; compact?: boolean }) {
  const [input, setInput] = useState<WizardInput>({ tur: "naked", kullanim: "sehir", mevsim: "4-mevsim", butce: "orta" });
  const [bikeText, setBikeText] = useState("");
  const [bike, setBike] = useState<WizardBike | null>(null);
  const [noBike, setNoBike] = useState(bikes.length === 0);
  const chooseBike = (text: string) => {
    setBikeText(text);
    const b = bikes.find((x) => x.label.toLocaleLowerCase("tr") === text.trim().toLocaleLowerCase("tr"));
    setBike(b ?? null);
    if (b) {
      const allowed = usageOptionsFor(b.type).map((o) => o.v);
      setInput((i) => ({ ...i, tur: b.type, kullanim: allowed.includes(i.kullanim) ? i.kullanim : "sehir" }));
    }
  };
  const setType = (t: MotoSlug) => {
    const allowed = usageOptionsFor(t).map((o) => o.v);
    setInput((i) => ({ ...i, tur: t, kullanim: allowed.includes(i.kullanim) ? i.kullanim : "sehir" }));
  };
  const [shown, setShown] = useState(!compact);
  const [gender, setGender] = useState<Gender>("fark-etmez");
  const fav = useList("mk:fav");
  const keys = useMemo(() => wizardSet(input), [input]);
  const total = keys.reduce((s, k) => s + GEAR[k].share, 0);
  const picks = useMemo(() => Object.fromEntries(keys.map((k) => [k, pickFor(k, input, gender, products)])), [keys, input, gender, products]);
  const allPickIds = Object.values(picks).flat().map((p) => p.id);
  const moto = MOTO_TYPES.find((m) => m.slug === (input.kullanim === "kurye" ? "kurye" : input.tur))!;
  const typeName = MOTO_TYPES.find((m) => m.slug === input.tur)!.name;

  const sel = "h-12 w-full rounded-md border border-white/15 bg-white px-3 text-ink";
  const field = (id: string, label: string, value: string, opts: { v: string; l: string }[], set: (v: string) => void) => (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-white/80">
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => set(e.target.value)} className={sel}>
        {opts.map((o) => (
          <option key={o.v} value={o.v}>
            {o.l}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div>
      <div className="mb-3">
        {!noBike ? (
          <div>
            <label htmlFor="w-motor" className="mb-1.5 block text-sm font-semibold text-white/80">
              1. Motorun hangisi?
            </label>
            <div className="flex flex-wrap gap-2">
              <input
                id="w-motor"
                list="w-motor-list"
                value={bikeText}
                onChange={(e) => chooseBike(e.target.value)}
                placeholder="Marka veya model yaz: PCX, NMAX, 250NK, MT-07…"
                autoComplete="off"
                className={`${sel} min-w-0 flex-1`}
              />
              <datalist id="w-motor-list">
                {bikes.map((b) => (
                  <option key={b.slug} value={b.label} />
                ))}
              </datalist>
              <button type="button" onClick={() => setNoBike(true)} className="h-12 rounded-md border border-white/25 px-4 text-sm font-semibold text-white hover:bg-white/10">
                Listede yok / henüz almadım
              </button>
            </div>
            {bike && (
              <p className="mt-2 text-sm text-white/80">
                <strong className="text-white">{bike.label}</strong> · {typeName}
                {bike.cc ? ` · ${bike.cc} cc` : ""}
                {bike.licence ? ` · ${bike.licence} ehliyet` : ""}
                {bike.notes.length > 0 && <span className="block text-white/60">{bike.notes.join(" ")}</span>}
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-wrap items-end gap-3">
            <div className="min-w-56 flex-1">{field("w-tur", "1. Motosiklet türü", input.tur, WIZARD_TYPES().map((m) => ({ v: m.slug, l: m.name })), (v) => setType(v as MotoSlug))}</div>
            {bikes.length > 0 && (
              <button type="button" onClick={() => setNoBike(false)} className="h-12 rounded-md border border-white/25 px-4 text-sm font-semibold text-white hover:bg-white/10">
                Modelimi listeden seçeyim
              </button>
            )}
          </div>
        )}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {field("w-kul", "2. Ne için kullanacaksın?", input.kullanim, usageOptionsFor(input.tur), (v) => setInput({ ...input, kullanim: v }))}
        {field("w-mev", "3. Mevsim", input.mevsim, WIZARD_OPTIONS.mevsim, (v) => setInput({ ...input, mevsim: v as WizardInput["mevsim"] }))}
        {field("w-but", "4. Bütçe", input.butce, WIZARD_OPTIONS.butce, (v) => setInput({ ...input, butce: v }))}
        {field(
          "w-cin",
          "5. Giyim kalıbı",
          gender,
          [
            { v: "fark-etmez", l: "Fark etmez (unisex)" },
            { v: "erkek", l: "Erkek" },
            { v: "kadin", l: "Kadın" },
          ],
          (v) => setGender(v as Gender),
        )}
      </div>
      {!shown && (
        <button type="button" onClick={() => setShown(true)} className="mt-5 flex h-12 items-center gap-2 rounded-md bg-red px-6 font-semibold text-white hover:bg-red-dark">
          Bana özel ekipman setini öner <Icon name="arrow" className="size-5" />
        </button>
      )}
      {shown && (
        <div className="mt-6" aria-live="polite">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="font-display text-2xl font-bold text-white">
              {bike && !noBike ? bike.label : typeName}
              {input.kullanim === "kurye" ? " ile kuryelik" : ""} için {keys.length} parçalık set
            </p>
            {allPickIds.length > 0 && (
              <button
                type="button"
                onClick={() => allPickIds.forEach((id) => !fav.has(id) && fav.toggle(id))}
                className="flex h-10 items-center gap-2 rounded-md border border-white/25 px-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                <Icon name="heart" className="size-4" /> Önerilen ürünleri favorilere ekle
              </button>
            )}
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {keys.map((k) => {
              const g = GEAR[k];
              return (
                <div key={k} className="flex flex-col rounded-lg bg-white p-4 text-ink">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-2xl font-bold">{g.name}</h3>
                    <span className="font-display text-xl font-bold text-red" title="Toplam bütçeden önerilen pay">
                      %{Math.round((g.share / total) * 100)}
                    </span>
                  </div>
                  <dl className="mt-2 space-y-2 text-sm">
                    <div>
                      <dt className="font-semibold">Neden gerekli?</dt>
                      <dd className="text-mute">{g.why}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Hangisini seçmeliyim?</dt>
                      <dd className="text-mute">{g.pick}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Güvenlik seviyesi</dt>
                      <dd className="text-mute">{g.safety}</dd>
                    </div>
                  </dl>
                  {picks[k]?.length > 0 && (
                    <div className="mt-3 border-t border-line pt-3">
                      <p className="mb-1 text-xs font-semibold tracking-wide text-mute uppercase">Veri tabanımızdan öneri</p>
                      <ul className="space-y-1 text-sm font-semibold">
                        {picks[k].map((p) => (
                          <li key={p.id}>
                            <Link href={p.href} className="hover:text-red">
                              {p.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Link href={g.href} className="mt-auto flex items-center gap-1 pt-3 text-sm font-semibold text-red hover:underline">
                    {g.name} seçeneklerine git <Icon name="arrow" className="size-4" />
                  </Link>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-sm text-white/70">
            {budgetTip(input.butce)} Yüzdeler toplam ekipman bütçenden her parçaya ayırman önerilen yaklaşık paydır, kesin kural değildir.{" "}
            <Link href={`/motosikletime-gore/${moto.slug}`} className="font-semibold text-white underline">
              {moto.name} ekipman rehberine git
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
