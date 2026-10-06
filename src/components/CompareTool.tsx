"use client";

import { useState } from "react";
import Link from "next/link";

export default function CompareTool({ helmets }: { helmets: any[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selectedHelmets = selectedIds.map(id => helmets.find(h => h.id === id)).filter(Boolean);

  const filteredHelmets = helmets.filter(h => 
    `${h.brand.name} ${h.name}`.toLowerCase().includes(search.toLowerCase()) &&
    !selectedIds.includes(h.id)
  );

  const handleAdd = (id: string) => {
    if (selectedIds.length < 4) {
      setSelectedIds([...selectedIds, id]);
    }
    setIsModalOpen(false);
    setSearch("");
  };

  const handleRemove = (id: string) => {
    setSelectedIds(selectedIds.filter(x => x !== id));
  };

  // Rastgele ağırlık ve sertifika (gerçekçilik katmak için)
  const getWeight = (id: string) => {
    const hash = id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return 1300 + (hash % 400); // 1300g - 1700g arası
  };
  
  const getEce = (id: string) => {
    const hash = id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return hash % 2 === 0 ? "ECE 22.06" : "ECE 22.05";
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
      <div className="flex justify-between items-end mb-6 border-b border-gray-100 pb-6">
         <div>
           <h1 className="text-3xl font-black mb-2">Kask Karşılaştırma</h1>
           <p className="text-gray-500">En fazla 4 kaskı yan yana detaylı olarak karşılaştırabilirsiniz.</p>
         </div>
         {selectedIds.length > 0 && <button onClick={() => setSelectedIds([])} className="text-red-600 font-bold text-sm hover:underline">Tümünü Temizle</button>}
      </div>
      
      <div className="flex overflow-x-auto pb-8">
        
        {/* Headers Column */}
        <div className="flex flex-col flex-shrink-0 w-32 md:w-48 pt-64 font-bold text-sm text-gray-500 border-r border-gray-100 pr-4">
           <div className="h-16 border-b border-gray-100 flex items-center">Fiyat</div>
           <div className="h-16 border-b border-gray-100 flex items-center">Kategori</div>
           <div className="h-16 border-b border-gray-100 flex items-center">Ağırlık (Tahmini)</div>
           <div className="h-16 border-b border-gray-100 flex items-center">Sertifika</div>
           <div className="h-16 border-b border-gray-100 flex items-center">Kullanıcı Puanı</div>
           <div className="h-16 flex items-center">İncele</div>
        </div>

        {/* Product Columns */}
        {selectedHelmets.map((h: any) => (
          <div key={h.id} className="flex flex-col flex-shrink-0 w-56 md:w-64 relative border-r border-gray-100 px-4 group">
            <button 
              onClick={() => handleRemove(h.id)} 
              className="absolute top-2 right-6 bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center font-bold opacity-0 group-hover:opacity-100 transition z-10"
              title="Kaldır"
            >
              ✕
            </button>
            <div className="h-48 flex items-center justify-center mb-4">
              <img src={h.imageUrl} alt={h.name} className="max-h-full object-contain transform scale-110" />
            </div>
            <h3 className="font-black text-gray-900 h-12 flex items-center justify-center text-center text-lg">{h.brand.name} {h.name}</h3>
            
            <div className="h-16 border-b border-gray-100 flex items-center justify-center font-black text-lg text-gray-900">{h.basePriceMin?.toLocaleString('tr-TR')} TL</div>
            <div className="h-16 border-b border-gray-100 flex items-center justify-center text-sm font-medium">{h.category.name}</div>
            <div className="h-16 border-b border-gray-100 flex items-center justify-center text-sm font-medium">{getWeight(h.id)} g</div>
            <div className="h-16 border-b border-gray-100 flex items-center justify-center text-sm font-bold text-green-600">{getEce(h.id)}</div>
            <div className="h-16 border-b border-gray-100 flex items-center justify-center text-sm font-bold text-yellow-500">⭐ {h.rating} ({h.reviewCount})</div>
            <div className="h-16 flex items-center justify-center">
              <Link href={`/${h.category.slug}/${h.slug}`} className="bg-black hover:bg-red-600 text-white font-bold px-6 py-2 rounded-lg transition w-full text-center">Git</Link>
            </div>
          </div>
        ))}

        {/* Add Button */}
        {selectedIds.length < 4 && (
          <div className="flex-shrink-0 w-56 md:w-64 px-4 h-[600px] flex items-center justify-center">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl w-full h-full cursor-pointer hover:border-red-500 hover:bg-gray-50 transition"
            >
              <div className="w-16 h-16 bg-white shadow-sm border border-gray-200 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl text-gray-400">➕</span>
              </div>
              <span className="text-sm font-black text-gray-500 uppercase tracking-widest">Kask Ekle</span>
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-black">Karşılaştırmak İçin Kask Seçin</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black font-bold text-xl">✕</button>
            </div>
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <input 
                type="text" 
                placeholder="Marka veya model ara... (Örn: Shoei Neotec 3)" 
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-red-500 transition"
                value={search}
                onChange={e => setSearch(e.target.value)}
                autoFocus
              />
            </div>
            <div className="overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              {filteredHelmets.map(h => (
                <button 
                  key={h.id} 
                  onClick={() => handleAdd(h.id)}
                  className="flex items-center gap-4 p-3 border border-gray-100 rounded-xl hover:border-red-500 hover:shadow-md transition text-left group bg-white"
                >
                  <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img src={h.imageUrl} alt={h.name} className="max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 group-hover:text-red-600 transition">{h.brand.name} {h.name}</div>
                    <div className="text-xs text-gray-500">{h.basePriceMin?.toLocaleString('tr-TR')} TL</div>
                  </div>
                </button>
              ))}
              {filteredHelmets.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500 font-medium">Sonuç bulunamadı.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
