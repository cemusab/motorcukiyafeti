import "server-only";
import type { BikeRow } from "@/components/MotorCompare";
import { GEAR, MOTO_TYPES, wizardSet } from "@/data/riding";
import { getMotorcycles } from "./data";

/** Motor karşılaştırma aracı ve hazır karşılaştırma sayfaları için satır verisi. */
export function bikeRows(): BikeRow[] {
  return getMotorcycles()
    .filter((m) => m.tech)
    .map((m) => {
      const t = MOTO_TYPES.find((x) => x.slug === m.type)!;
      const keys = wizardSet({ tur: m.type, kullanim: m.courierCommon ? "is" : "sehir", mevsim: "4-mevsim", butce: "orta" });
      return {
        slug: m.slug,
        name: `${m.brand} ${m.model}`,
        brand: m.brand,
        type: t.name,
        cc: m.cc,
        licence: m.licence,
        powerKw: m.tech!.powerKw,
        powerHp: m.tech!.powerHp,
        torqueNm: m.tech!.torqueNm,
        weightKg: m.tech!.weightKg,
        weightType: m.tech!.weightType,
        weightNote: m.tech!.weightNote,
        seatHeightMm: m.tech!.seatHeightMm,
        seatHeightNote: m.tech!.seatHeightNote,
        fuelTankL: m.tech!.fuelTankL,
        tireFront: m.tires?.front ?? null,
        tireRear: m.tires?.rear ?? null,
        oil: m.oil && (m.oil.viscosity || m.oil.spec) ? [m.oil.viscosity, m.oil.spec].filter(Boolean).join(", ") : null,
        sourceUrl: m.tech!.source.url,
        sourceLabel: m.tech!.source.label,
        gear: keys.slice(0, 6).map((k) => ({ name: GEAR[k].name, href: GEAR[k].href })),
      };
    });
}
