import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { CompareTray } from "@/components/CompareTray";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { displayName, getProducts, productId } from "@/lib/data";
import { SITE, abs } from "@/lib/site";
import "./globals.css";

const barlow = Barlow({ variable: "--font-barlow", subsets: ["latin", "latin-ext"], weight: ["400", "500", "600", "700"], display: "swap" });
const barlowCondensed = Barlow_Condensed({ variable: "--font-barlow-condensed", subsets: ["latin", "latin-ext"], weight: ["600", "700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} – ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: { siteName: SITE.name, locale: SITE.locale, type: "website" },
};

export const viewport: Viewport = { themeColor: "#0f1114", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: LayoutProps<"/">) {
  const names = Object.fromEntries(getProducts().map((p) => [productId(p), displayName(p)]));
  return (
    <html lang="tr" className={`${barlow.variable} ${barlowCondensed.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <JsonLd
          data={[
            { "@context": "https://schema.org", "@type": "Organization", name: SITE.name, url: SITE.url, logo: abs("/icon.svg") },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: SITE.name,
              url: SITE.url,
              inLanguage: "tr-TR",
              potentialAction: { "@type": "SearchAction", target: abs("/arama?q={search_term_string}"), "query-input": "required name=search_term_string" },
            },
          ]}
        />
        <a href="#icerik" className="sr-only z-50 bg-red px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
          İçeriğe geç
        </a>
        <Header />
        <main id="icerik" className="flex-1">
          {children}
        </main>
        <Footer />
        <CompareTray names={names} />
      </body>
    </html>
  );
}
