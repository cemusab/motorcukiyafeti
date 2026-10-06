import Link from "next/link";

export default function Markalar() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600 hover:underline">← Ana Sayfaya Dön</Link>
          <span className="font-bold text-slate-700">MOTORCUKIYAFETİ.COM</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 text-center">Dünyanın ve Türkiye'nin En İyi Motosiklet Giyim Markaları</h1>
        <p className="text-lg text-slate-600 mb-16 text-center max-w-4xl mx-auto">
          Motosiklet ekipmanlarında gerçek üreticiler (OEM) ile sadece fason üretim yaptıran markaları ayırmak hayati önem taşır. Sizin için hem 26 ülkeye ihracat yapan gururumuz olan yerli üreticileri, hem de global arenanın tartışmasız liderlerini analiz ettik.
        </p>

        {/* TÜRKİYE MARKALARI (OEM ve Yerli Üreticiler) */}
        <section className="mb-24">
          <div className="flex items-center mb-8 border-b border-slate-200 pb-4">
            <span className="text-4xl mr-4">🇹🇷</span>
            <h2 className="text-3xl font-bold text-slate-900">Türkiye'de Öne Çıkan 20 Motosiklet Kıyafeti Üreticisi / Markası</h2>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mb-8">
            <h3 className="text-xl font-bold text-blue-700 mb-4">Gerçek Üreticiler (OEM) ve Private Label Devi: Tech90 & Tex Motor</h3>
            <p className="text-slate-700 mb-4">
              Özellikle <strong>Tech90</strong> (2006) ve <strong>Tex Motor (Forte GT)</strong> sadece ürün alıp satan firmalar değil, uluslararası markalara koruyucu örme ürünler, kevlar jeanler ve su geçirmez montlar üreten <strong>gerçek üreticilerdir</strong>. Kendi markanızı (Private Label) kurmak istiyorsanız, kapısını çalmanız gereken ilk adreslerdir. <strong>Riderdenim</strong> ise 2018'de kendi atölyesini kurarak CE EN 17092 standartlarında harika üretimlere imza atan bir diğer gururumuzdur.
            </p>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-200">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-100 text-slate-900">
                <tr>
                  <th className="px-6 py-4 font-bold border-b">Marka / Firma</th>
                  <th className="px-6 py-4 font-bold border-b">Ana Ürün</th>
                  <th className="px-6 py-4 font-bold border-b">Sınıflandırma</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold">1. Tech90</td>
                  <td className="px-6 py-4">Korumalı jean, mont, koruma ekipmanı</td>
                  <td className="px-6 py-4 text-green-700 font-medium">⭐⭐⭐⭐⭐ Gerçek üretici / OEM</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold">2. Forte GT / Tex Motor</td>
                  <td className="px-6 py-4">Mont, pantolon, eldiven, yağmurluk, çanta</td>
                  <td className="px-6 py-4 text-green-700 font-medium">⭐⭐⭐⭐⭐ Gerçek üretici / OEM</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold">3. Riderdenim</td>
                  <td className="px-6 py-4">Korumalı jean, mont</td>
                  <td className="px-6 py-4 text-green-700 font-medium">⭐⭐⭐⭐⭐ Yerli üretici</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold">4. Scudo</td>
                  <td className="px-6 py-4">Mont, pantolon, eldiven, kask</td>
                  <td className="px-6 py-4 text-green-700 font-medium">⭐⭐⭐⭐⭐ Yerli üretici</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold">5. Vecton</td>
                  <td className="px-6 py-4">Mont, pantolon, eldiven, bot</td>
                  <td className="px-6 py-4 text-green-700 font-medium">⭐⭐⭐⭐⭐ Tech90 altyapısı</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold">6. The Biker Jeans</td>
                  <td className="px-6 py-4">Korumalı jean ve günlük moto giyim</td>
                  <td className="px-6 py-4 text-blue-700 font-medium">⭐⭐⭐⭐ Yerli marka</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold">7. TNS Pro</td>
                  <td className="px-6 py-4">Deri mont, tekstil mont</td>
                  <td className="px-6 py-4 text-blue-700 font-medium">⭐⭐⭐⭐ Yerli üretim</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold">8. Vexo</td>
                  <td className="px-6 py-4">Mont, pantolon, eldiven, bot</td>
                  <td className="px-6 py-4 text-blue-700 font-medium">⭐⭐⭐⭐ Büyük yerli marka</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold">9. Prohel</td>
                  <td className="px-6 py-4">Mont, pantolon, eldiven, bot</td>
                  <td className="px-6 py-4 text-blue-700 font-medium">⭐⭐⭐⭐ Köklü yerli marka</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold">10. Prosev</td>
                  <td className="px-6 py-4">Mont, pantolon, bot, eldiven</td>
                  <td className="px-6 py-4 text-blue-700 font-medium">⭐⭐⭐⭐ Köklü yerli marka</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold">11. Venom</td>
                  <td className="px-6 py-4">Mont, pantolon, koruyucu ekipman</td>
                  <td className="px-6 py-4 text-blue-700 font-medium">⭐⭐⭐⭐ Tech90 bağlantılı üretim</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold">12. Duratech</td>
                  <td className="px-6 py-4">Motosiklet botu</td>
                  <td className="px-6 py-4 text-blue-700 font-medium">⭐⭐⭐⭐ Türkiye üretimi (Tex Motor)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold">13. LBC Motor Giyim</td>
                  <td className="px-6 py-4">Mont, pantolon, özel üretim</td>
                  <td className="px-6 py-4 text-blue-700 font-medium">⭐⭐⭐⭐ Üretici</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold">14. Fox Rider</td>
                  <td className="px-6 py-4">Eldiven, yelek, ekipman, aksesuar</td>
                  <td className="px-6 py-4 text-orange-600 font-medium">⭐⭐⭐ Yerli üretim</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold">15. XSpeed</td>
                  <td className="px-6 py-4">Mont, eldiven, yelek</td>
                  <td className="px-6 py-4 text-orange-600 font-medium">⭐⭐⭐ Yerli pazar markası</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold">16. 4Riders</td>
                  <td className="px-6 py-4">Mont, bot, eldiven, aksesuar</td>
                  <td className="px-6 py-4 text-orange-600 font-medium">⭐⭐⭐ Büyük yerli pazar markası</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold">17. Rockwell</td>
                  <td className="px-6 py-4">Motosiklet botları</td>
                  <td className="px-6 py-4 text-orange-600 font-medium">⭐⭐⭐ Yerli pazarda köklü</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold">18. Armode</td>
                  <td className="px-6 py-4">Pantolon ve motosiklet ekipmanı</td>
                  <td className="px-6 py-4 text-orange-600 font-medium">⭐⭐⭐ Yerli pazar markası</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold">19. Andes</td>
                  <td className="px-6 py-4">Mont ve pantolon</td>
                  <td className="px-6 py-4 text-orange-600 font-medium">⭐⭐⭐ Türkiye pazarında güçlü</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold">20. Tex</td>
                  <td className="px-6 py-4">Mont, pantolon ve aksesuar</td>
                  <td className="px-6 py-4 text-blue-700 font-medium">⭐⭐⭐⭐ Tex Motor kökenli</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>


        {/* GLOBAL MARKALAR */}
        <section>
          <div className="flex items-center mb-8 border-b border-slate-200 pb-4">
            <span className="text-4xl mr-4">🌍</span>
            <h2 className="text-3xl font-bold text-slate-900">Dünyanın En Güçlü 20 Motosiklet Kıyafeti Markası</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2">Büyük 8'li (Pazar Belirleyiciler)</h3>
              <p className="text-sm text-slate-600">Alpinestars → Dainese → REV'IT! → Held → Klim → Rukka → Spidi → RST. Bu 8 markanın koleksiyonlarını analiz ettiğinizde yarış, touring, adventure ve şehir giyiminin tüm DNA'sını çözmüş olursunuz.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2">Alman Mucizesi: HELD</h3>
              <p className="text-sm text-slate-600">2026 MOTORRAD okuyucu anketinde tekstil, deri, eldiven ve biker jeans kategorilerinin tamamında 1. sırayı aldı. Özellikle eldiven kategorisinde %73,5 gibi ezici bir üstünlüğü var.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: 1, name: "Alpinestars", country: "İtalya 🇮🇹", power: "Yarış, deri tulum, airbag" },
              { id: 2, name: "Dainese", country: "İtalya 🇮🇹", power: "Premium deri, D-air, yarış" },
              { id: 3, name: "REV'IT!", country: "Hollanda 🇳🇱", power: "Adventure, touring, şehir" },
              { id: 4, name: "Held", country: "Almanya 🇩🇪", power: "Eldiven, touring, tekstil" },
              { id: 5, name: "Klim", country: "ABD 🇺🇸", power: "Adventure / Gore-Tex" },
              { id: 6, name: "Rukka", country: "Finlandiya 🇫🇮", power: "Premium touring / Gore-Tex" },
              { id: 7, name: "Spidi", country: "İtalya 🇮🇹", power: "Touring, sport, airbag" },
              { id: 8, name: "RST", country: "İngiltere 🇬🇧", power: "Yarış, deri, airbag" },
              { id: 9, name: "Furygan", country: "Fransa 🇫🇷", power: "Deri ve sportif giyim" },
              { id: 10, name: "Richa", country: "Belçika 🇧🇪", power: "Touring / tekstil" },
              { id: 11, name: "Bering", country: "Fransa 🇫🇷", power: "Touring / şehir" },
              { id: 12, name: "Macna", country: "Hollanda 🇳🇱", power: "Teknik tekstil / touring" },
              { id: 13, name: "iXS", country: "İsviçre 🇨🇭", power: "Touring, tekstil, deri" },
              { id: 14, name: "Knox", country: "İngiltere 🇬🇧", power: "Korumalı gömlek, armor" },
              { id: 15, name: "Merlin", country: "İngiltere 🇬🇧", power: "Heritage / urban" },
              { id: 16, name: "Leatt", country: "G. Afrika 🇿🇦", power: "Adventure, off-road" },
              { id: 17, name: "Acerbis", country: "İtalya 🇮🇹", power: "Enduro / motocross" },
              { id: 18, name: "Tucano Urbano", country: "İtalya 🇮🇹", power: "Şehir / scooter" },
              { id: 19, name: "Segura", country: "Fransa 🇫🇷", power: "Retro / deri / şehir" },
              { id: 20, name: "Büse", country: "Almanya 🇩🇪", power: "Touring / tekstil" }
            ].map(brand => (
              <div key={brand.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-800">{brand.id}. {brand.name}</h4>
                  <span className="text-xs text-slate-500">{brand.country}</span>
                </div>
                <p className="text-sm text-blue-700 font-medium">{brand.power}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
