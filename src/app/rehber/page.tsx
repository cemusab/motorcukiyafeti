import Link from "next/link";

export default function Rehber() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600 hover:underline">← Ana Sayfaya Dön</Link>
          <span className="font-bold text-slate-700">MOTORCUKIYAFETİ.COM</span>
        </div>
      </div>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-black text-slate-900 mb-6">Motosiklet Ekipmanı Nasıl Seçilir? Altın Kurallar</h1>
        <div className="prose prose-lg text-slate-700">
          <p>Yeni bir motosiklet aldınız ve bütçenizi kask ve ekipmana ayırdınız. Peki "En İyi Motorcu Kıyafeti" hangisidir? Cevap basittir: <strong>Bedeninize en iyi oturan ve ihtiyacınıza (sürüş tarzınıza) en uygun olandır.</strong> Dünyanın en pahalı montu, bedeninizde bol duruyorsa kaza anında korumalar kayacağı için hiçbir işe yaramaz.</p>

          <h2>Alırken Nelere Dikkat Edilmeli ve Neler Denenmeli?</h2>
          <ul>
            <li><strong>Kask:</strong> Kafanıza taktığınızda yanaklarınızı sıkmalı, ancak alnınızı acıtmamalıdır. Kask zamanla süngerlerinden esneme (yarım beden kadar) yapacaktır. Kaskı kafanıza takın ve mağazada 15 dakika dolaşın. Baş ağrısı yapıyorsa kafa yapınıza (yuvarlak, oval) uygun değildir. Arai veya Shoei gibi markaların farklı kafa yapıları için modelleri vardır.</li>
            <li><strong>Mont ve Koruma Oturumu:</strong> Montu giydiğinizde dirsek ve omuz korumaları tam eklem yerlerinizin üzerine gelmelidir. Montu giyip kollarınızı "motosiklet gidonunu tutuyormuş gibi" uzatın. Sırtınız açılmamalı ve kollarınız çok fazla açıkta kalmamalıdır.</li>
            <li><strong>Sertifikalar:</strong> "CE Level 1" ve "CE Level 2" koruma standartlarına bakın. Level 2 her zaman daha iyi şok emer. Kasklarda ise ECE 22.06 veya Snell sertifikası arayın.</li>
          </ul>

          <h2>Kullanıcı Yorumlarının Önemi (Google Reviews)</h2>
          <p>Sipariş vermeden önce, ekipmanı uzun süre (en az 1 yıl) kullanmış kişilerin yorumlarına bakmak çok önemlidir. Örneğin bir mont ilk gün çok şık durabilir, ancak 6 ay sonra fermuarı bozuluyor veya güneşte soluyorsa, bu ancak uzun dönem kullanıcı yorumlarından (Google, forumlar, Facebook grupları) öğrenilebilir. Ürünü satan mağazanın iade/garanti süreçlerindeki hızı da yine Google Satıcı Yorumları'ndan teyit edilmelidir.</p>
        </div>
      </main>
    </div>
  );
}
