"use client";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";

/**
 * Çerez onayı + Google Analytics 4 (Consent Mode v2).
 * KVKK Çerez Rehberi ve GDPR gereği analitik çerezler yalnızca açık onaydan sonra çalışır:
 * onay yoksa gtag.js hiç yüklenmez. Tercih yalnızca bu tarayıcıda (localStorage) tutulur.
 */
/** Google Analytics 4 ölçüm kimliği (herkese açık bir değerdir, gizli değildir). */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-87K77J3RWV";
/** Analytics yalnızca canlı alan adında çalışır; önizleme ve yerel testler istatistiğe karışmaz. */
const LIVE_HOST = "motorcukiyafeti.com";
const isLive = () => typeof window !== "undefined" && window.location.hostname === LIVE_HOST;
const KEY = "mk:consent"; // "granted" | "denied"

type Choice = "granted" | "denied" | null;

function readChoice(): Choice {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

const EVT = "mk:consent-change";
const subscribe = (cb: () => void) => {
  window.addEventListener(EVT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVT, cb);
    window.removeEventListener("storage", cb);
  };
};
const noopSubscribe = () => () => {};

export function Consent() {
  const stored = useSyncExternalStore(subscribe, readChoice, () => null);
  const ready = useSyncExternalStore(noopSubscribe, isLive, () => false);
  const [reopened, setReopened] = useState(false);
  const choice: Choice = reopened ? null : stored;

  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener("mk:consent-open", reopen);
    return () => window.removeEventListener("mk:consent-open", reopen);
  }, []);

  const decide = (c: "granted" | "denied") => {
    const wasGranted = readChoice() === "granted" || document.cookie.includes("_ga");
    try {
      window.localStorage.setItem(KEY, c);
    } catch {}
    if (c === "denied" && wasGranted) {
      // Onay geri alındı: Analytics çerezlerini sil ve betiği bırakmak için sayfayı yenile.
      const host = window.location.hostname;
      document.cookie.split(";").forEach((ck) => {
        const name = ck.split("=")[0].trim();
        if (name.startsWith("_ga")) {
          for (const d of [host, "." + host.replace(/^www\./, "")]) document.cookie = `${name}=; Max-Age=0; path=/; domain=${d}`;
          document.cookie = `${name}=; Max-Age=0; path=/`;
        }
      });
      window.location.reload();
      return;
    }
    setReopened(false);
    window.dispatchEvent(new Event(EVT));
  };

  if (!GA_ID) return null; // Analytics yapılandırılmamışsa bant da gösterilmez (çerez kullanılmıyor).

  return (
    <>
      {ready && choice === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});
gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true,allow_google_signals:false,allow_ad_personalization_signals:false});`}
          </Script>
        </>
      )}
      {ready && choice === null && (
        <div role="dialog" aria-label="Çerez tercihi" className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white p-4 shadow-[0_-8px_24px_rgba(0,0,0,.12)]">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
            <p className="min-w-60 flex-1 text-sm text-ink-2">
              Siteyi nasıl kullandığını anlamak için, <strong>yalnızca onay verirsen</strong> Google Analytics çerezleri kullanırız. Reklam çerezi kullanmıyoruz.{" "}
              <Link href="/cerez-politikasi" className="font-semibold text-red underline">
                Çerez politikası
              </Link>
            </p>
            <div className="flex gap-2">
              <button type="button" onClick={() => decide("denied")} className="h-10 rounded-md border border-ink px-4 text-sm font-semibold hover:bg-paper">
                Reddet
              </button>
              <button type="button" onClick={() => decide("granted")} className="h-10 rounded-md bg-red px-4 text-sm font-semibold text-white hover:bg-red-dark">
                Kabul et
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/** Footer'daki "Çerez tercihleri" bağlantısı: bandı yeniden açar ve önceki onayı geri almayı sağlar. */
export function ConsentLink() {
  const live = useSyncExternalStore(noopSubscribe, isLive, () => false);
  if (!GA_ID || !live) return null;
  return (
    <button
      type="button"
      onClick={() => {
        try {
          window.localStorage.removeItem(KEY);
        } catch {}
        window.dispatchEvent(new Event("mk:consent-open"));
      }}
      className="hover:text-white"
    >
      Çerez tercihleri
    </button>
  );
}
