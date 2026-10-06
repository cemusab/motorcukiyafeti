import Link from "next/link";

export default function Kadin() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600 hover:underline">← Ana Sayfaya Dön</Link>
          <span className="font-bold text-slate-700">MOTORCUKIYAFETİ.COM</span>
        </div>
      </div>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-black text-slate-900 mb-6">Kadın Motorcu Kıyafetleri: Estetik ve Yüksek Güvenlik</h1>
        <div className="prose prose-lg text-slate-700">
          <p>Motosiklet dünyasında kadın sürücüler için ekipman seçimi artık "erkek modellerinin küçültülmüş hali" değil, tamamen kadın anatomisine özel tasarlanmış teknolojik kıyafetlerden oluşuyor.</p>
          <h2>En İyi Kadın Ekipman Markaları</h2>
          <p><strong>Dainese (Lady Serisi):</strong> İtalyan kesiminin vücuda tam oturan zarifliği ve en yüksek CE Level 2 korumaları birleşir.</p>
          <p><strong>Revit (Stella & Safeway):</strong> Hollanda pratikliği ile şık macera (adventure) montları ve kadınlara özel tasarlanmış dar kesim motosiklet kotları.</p>
          <h2>Kadın Sürücüler Seçim Yaparken Nelere Dikkat Etmeli?</h2>
          <ul>
            <li><strong>Bel ve Kalça Kesimi:</strong> Olası bir kazada korumaların kaymaması için kıyafetin kalça ve bel hatlarına tam oturması şarttır.</li>
            <li><strong>Ağırlık:</strong> Kadınların boyun ve omuz kaslarını daha az yoracak hafif karbon kasklar (Örn: Nexx, X-Lite) tercih edilmelidir.</li>
            <li><strong>Bot Seçimi:</strong> Topuklu motosiklet botları (TCX, Falco gibi) hem yere daha sağlam basmanızı sağlar hem de şıklık katar.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
