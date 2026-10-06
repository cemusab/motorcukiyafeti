import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://motorcukiyafeti.com'),
  title: {
    default: "MotorcuKiyafeti | Türkiye'nin Kapsamlı Motosiklet Ekipmanı Rehberi",
    template: "%s | MotorcuKiyafeti"
  },
  description: "En iyi motosiklet kaskı, mont, pantolon ve interkom incelemeleri. Yeni başlayanlar ve profesyoneller için bağımsız, tarafsız ekipman rehberi.",
  keywords: [
    "motosiklet ekipmanları", "kadın motorcu kıyafeti", "kadın motor kıyafeti", "erkek motorcu kıyafeti", 
    "kurye motorcu kıyafeti", "en iyi motosiklet montu", "uygun fiyatlı motor ekipmanları", 
    "korumalı motosiklet giyimi", "motosiklet kaskı satın al", "kask", "mont", "interkom", 
    "yazlık motor eldiveni", "çene açılır kask fiyatları", "İstanbul motosiklet ekipman mağazaları",
    "Kadıköy Hasanpaşa motor mağazaları", "Ankara motosiklet ekipman mağazası", "İzmir motosiklet mağazaları",
    "Türkiye motosiklet rehberi"
  ],
  openGraph: {
    title: "MotorcuKiyafeti | Motosiklet Ekipmanı Rehberi",
    description: "Bağımsız motosiklet ekipmanları, karşılaştırma motoru ve inceleme rehberi.",
    url: 'https://motorcukiyafeti.com',
    siteName: 'MotorcuKiyafeti',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "MotorcuKiyafeti | Türkiye'nin Kapsamlı Motosiklet Ekipmanı Rehberi",
    description: "Bağımsız motosiklet ekipmanları, karşılaştırma motoru ve inceleme rehberi.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        {/* GLOBAL HEADER (Tasarım Görseline Göre Dark Theme) */}
        <header className="bg-[#111111] text-white sticky top-0 z-50 border-b border-gray-800">
          <div className="max-w-[1400px] mx-auto px-4">
            {/* Üst Bar: Logo, Arama, Kullanıcı Menüsü */}
            <div className="flex items-center justify-between h-16">
              {/* Logo (Yeni Tasarım: MK Monogram + Birleşik İsim) */}
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 bg-red-600 text-white rounded-xl flex items-center justify-center font-black text-xl italic tracking-tighter shadow-[0_0_15px_rgba(220,38,38,0.6)] group-hover:scale-105 transition-transform">
                  MK
                </div>
                <span className="text-2xl font-black tracking-tighter lowercase text-white group-hover:text-gray-200 transition-colors">motorcukiyafeti</span>
              </Link>

              {/* Arama Barı (Desktop) - İPTAL EDİLDİ, HERO İÇİNE TAŞINDI */}

              {/* Sağ Menü (Karşılaştır, Favoriler, Hesabım) */}
              <div className="hidden md:flex items-center space-x-6 text-sm text-gray-300 font-medium">
                <Link href="/karsilastir" className="flex items-center hover:text-white transition">
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                  Karşılaştır
                </Link>
                <Link href="/favoriler" className="flex items-center hover:text-white transition">
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                  Favoriler
                </Link>
                <Link href="/hesabim" className="flex items-center hover:text-white transition">
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  Hesabım
                </Link>
              </div>
            </div>
          </div>
          
          {/* Alt Bar: Kategoriler */}
          <div className="border-t border-gray-800 bg-[#161616]">
            <div className="max-w-[1400px] mx-auto px-4">
              <nav className="flex space-x-6 text-sm font-semibold text-gray-300 py-3 overflow-x-auto whitespace-nowrap">
                <Link href="/kask" className="hover:text-white transition">Kask</Link>
                <Link href="/mont" className="hover:text-white transition">Mont</Link>
                <Link href="/pantolon" className="hover:text-white transition">Pantolon</Link>
                <Link href="/eldiven" className="hover:text-white transition">Eldiven</Link>
                <Link href="/bot" className="hover:text-white transition">Bot ▾</Link>
                <Link href="/interkom" className="hover:text-white transition">İnterkom</Link>
                <Link href="/koruma" className="hover:text-white transition">Koruma</Link>
                <Link href="/aksesuar" className="hover:text-white transition">Aksesuar</Link>
                <Link href="/markalar" className="hover:text-white transition">Markalar</Link>
                <Link href="/rehberler" className="hover:text-white transition">Rehberler</Link>
              </nav>
            </div>
          </div>
        </header>

        {children}

        {/* GLOBAL FOOTER (Premium & Zengin Tasarım) */}
        <footer className="bg-[#0a0a0a] text-gray-400 pt-20 pb-8 mt-20 border-t border-gray-800">
          <div className="max-w-[1400px] mx-auto px-4">
            
            {/* Üst Kısım: Bülten ve İkonlar */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-[#111111] p-8 rounded-3xl border border-gray-800 mb-16">
              <div className="mb-6 md:mb-0">
                <h3 className="text-white text-2xl font-black mb-2 flex items-center gap-3">
                  <span className="text-3xl">🚀</span> Ekipman Fırsatlarını Kaçırma
                </h3>
                <p className="text-sm text-gray-500 max-w-md">En yeni kask incelemeleri, gizli indirimler ve motorcu rehberleri her cuma mail kutunuzda.</p>
              </div>
              <div className="flex w-full md:w-auto gap-2">
                <input type="email" placeholder="E-posta adresiniz..." className="bg-black border border-gray-700 text-white px-6 py-3 rounded-xl focus:outline-none focus:border-red-600 w-full md:w-72" />
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-red-600/20">Abone Ol</button>
              </div>
            </div>

            {/* Orta Kısım: Linkler */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
              <div className="col-span-2 pr-8">
                <Link href="/" className="flex items-center gap-2.5 group mb-6">
                  <div className="w-10 h-10 bg-red-600 text-white rounded-xl flex items-center justify-center font-black text-xl italic tracking-tighter shadow-[0_0_15px_rgba(220,38,38,0.6)] group-hover:scale-105 transition-transform">
                    MK
                  </div>
                  <span className="text-2xl font-black tracking-tighter lowercase text-white group-hover:text-gray-200 transition-colors">motorcukiyafeti</span>
                </Link>
                <p className="text-sm leading-relaxed text-gray-500 mb-6">
                  Motorcukiyafeti.com, motosiklet tutkunları için Türkiye'nin en kapsamlı, bağımsız ve tarafsız ekipman rehberidir. Kasklardan interkomlara kadar yüzlerce ürünü inceliyor, test ediyor ve puanlıyoruz.
                </p>
                <div className="flex gap-4">
                  <a href="https://instagram.com/motorcukiyafeti" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition">📸</a>
                  <a href="https://youtube.com/motorcukiyafeti" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition">▶️</a>
                  <a href="https://twitter.com/motorcukiyafeti" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition">🐦</a>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Donanım</h4>
                <ul className="space-y-3 text-sm">
                  <li><Link href="/kask" className="hover:text-red-500 transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-800"></span> Kapalı Kasklar</Link></li>
                  <li><Link href="/kask" className="hover:text-red-500 transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-800"></span> Çene Açılır Kasklar</Link></li>
                  <li><Link href="/mont" className="hover:text-red-500 transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-800"></span> Motosiklet Montları</Link></li>
                  <li><Link href="/interkom" className="hover:text-red-500 transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-800"></span> İnterkom Sistemleri</Link></li>
                  <li><Link href="/bot" className="hover:text-red-500 transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-800"></span> Gore-Tex Botlar</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Platform</h4>
                <ul className="space-y-3 text-sm">
                  <li><Link href="/yeni-baslayanlar" className="hover:text-white transition">Yeni Başlayanlar Rehberi</Link></li>
                  <li><Link href="/karsilastir" className="hover:text-white transition">Karşılaştırma Motoru</Link></li>
                  <li><Link href="/markalar" className="hover:text-white transition">Tüm Markalar</Link></li>
                  <li><Link href="/rehberler" className="hover:text-white transition">İnceleme Blogu</Link></li>
                  <li><Link href="/uyumluluk" className="hover:text-white transition">İnterkom Uyumluluk</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Kurumsal</h4>
                <ul className="space-y-3 text-sm">
                  <li><Link href="/hakkimizda" className="hover:text-white transition">Biz Kimiz?</Link></li>
                  <li><Link href="/iletisim" className="hover:text-white transition">İletişim & Destek</Link></li>
                  <li><Link href="/gizlilik" className="hover:text-white transition">Gizlilik Politikası</Link></li>
                  <li><Link href="/kullanim-sartlari" className="hover:text-white transition">Kullanım Şartları</Link></li>
                </ul>
              </div>
              
              <div className="col-span-2 md:col-span-5 border-t border-gray-800 pt-8 mt-4 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-gray-500">
                <div>
                  <h4 className="text-gray-400 font-bold mb-3 uppercase tracking-wider">Popüler Aramalar</h4>
                  <p className="leading-relaxed">
                    Motosiklet ekipmanları, kadın motorcu kıyafeti, erkek motor kıyafeti, kurye motorcu kıyafeti, en iyi motosiklet montu, uygun fiyatlı motor ekipmanları, korumalı motosiklet giyimi, motosiklet kaskı satın al, yazlık motor eldiveni, motosiklet aksesuarları, interkom sistemleri, çene açılır kask fiyatları.
                  </p>
                </div>
                <div>
                  <h4 className="text-gray-400 font-bold mb-3 uppercase tracking-wider">Hizmet Bölgelerimiz</h4>
                  <p className="leading-relaxed">
                    İstanbul motosiklet ekipman mağazaları, Kadıköy Hasanpaşa motor mağazaları, Şirinevler motosiklet aksesuar, Ankara motosiklet ekipman mağazası, İzmir motosiklet mağazaları, Antalya motorcu kıyafeti, Bursa motosiklet giyim, tüm Türkiye'ye online motosiklet rehberi.
                  </p>
                </div>
              </div>
            </div>

            {/* Alt Kısım: Copyright */}
            <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
              <p>© 2026 MotorcuKiyafeti.com. Tüm hakları saklıdır.</p>
              <div className="flex gap-4 mt-4 md:mt-0">
                 <span className="flex items-center gap-1">🔒 SSL Güvenli Bağlantı</span>
                 <span className="flex items-center gap-1">⚡ Bağımsız Test Merkezi</span>
              </div>
            </div>

          </div>
        </footer>
      </body>
    </html>
  );
}
