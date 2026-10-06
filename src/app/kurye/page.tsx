import Link from "next/link";

export default function Kurye() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600 hover:underline">← Ana Sayfaya Dön</Link>
          <span className="font-bold text-slate-700">MOTORCUKIYAFETİ.COM</span>
        </div>
      </div>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-black text-slate-900 mb-6">Motosikletli Kuryeler İçin Fiyat/Performans Ekipmanlar</h1>
        <div className="prose prose-lg text-slate-700">
          <p>Günde 10-12 saat yolda olan bir motosikletli kuryenin ihtiyaçları, hafta sonu sürücüsünden çok farklıdır. %100 su geçirmezlik, hafiflik ve aşırı kullanım dayanımı en önemli kriterlerdir.</p>
          <h2>Kuryeler İçin En İyi Yerli ve Yabancı Çözümler</h2>
          <ul>
            <li><strong>Prosev ve Tex Motor:</strong> Türkiye şartlarında bütçe dostu, su geçirmeyen kışlık kurye takımları (mont ve pantolon).</li>
            <li><strong>Vexo:</strong> Şehir içi sürekli in-bin yapanlar için mafsallı dizlikler yerine günlük kevlar kurye pantolonları.</li>
            <li><strong>LS2 ve MT Helmets:</strong> Bütçeyi sarsmayan, ancak güvenlik testlerinden (ECE 22.06) geçmiş dayanıklı çene açılır veya yarım kasklar. (Intercom uyumlu).</li>
          </ul>
          <h2>Kurye Ekipmanı Alırken Nelere Dikkat Edilmeli?</h2>
          <p>Reflektörler hayat kurtarır! Gece vardiyaları için montunuzda bolca fosfor (Night Eye özellikleri) bulunmalı. Eldivenler kesinlikle yağmur geçirmez (Gore-Tex veya muadili) ve manet kontrolünü kaybettirmeyecek incelikte olmalıdır.</p>
        </div>
      </main>
    </div>
  );
}
