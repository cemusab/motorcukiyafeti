'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';

export default function FilterClient({ initialProducts, categorySlug }: { initialProducts: any[], categorySlug: string }) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [hasSunVisor, setHasSunVisor] = useState(false);
  const [sort, setSort] = useState('popular');

  const filteredProducts = useMemo(() => {
    let prods = [...initialProducts];
    
    if (selectedBrands.length > 0) {
      prods = prods.filter(p => selectedBrands.includes(p.brand.name));
    }
    
    if (selectedMaterials.length > 0) {
      prods = prods.filter(p => p.specs.some((s: any) => s.name === 'Kabuk Malzemesi' && selectedMaterials.includes(s.value)));
    }

    if (hasSunVisor) {
      prods = prods.filter(p => p.specs.some((s: any) => s.name === 'Güneş Vizörü' && s.value === 'Var'));
    }

    if (sort === 'price-asc') prods.sort((a, b) => (a.basePriceMin || 0) - (b.basePriceMin || 0));
    if (sort === 'price-desc') prods.sort((a, b) => (b.basePriceMin || 0) - (a.basePriceMin || 0));

    return prods;
  }, [initialProducts, selectedBrands, selectedMaterials, hasSunVisor, sort]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };
  const toggleMaterial = (mat: string) => {
    setSelectedMaterials(prev => prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat]);
  };

  // Extract unique brands and materials for filter options
  const allBrands = Array.from(new Set(initialProducts.map(p => p.brand.name)));
  
  // Fake detailed filters (FC-Moto style)
  const allMaterials = ['Karbon Fiber', 'Termoplastik', 'Fiberglas', 'Kevlar Karışım'];
  const certs = ['ECE 22.06', 'DOT', 'Snell'];
  
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* SOL SIDEBAR (FC-Moto Style Detailed Filters) */}
      <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="font-black text-gray-900 mb-4 pb-2 border-b border-gray-100">Marka</div>
          <div className="space-y-2 text-sm font-medium text-gray-700">
            {allBrands.map(b => (
              <label key={b as string} className="flex items-center gap-3 cursor-pointer hover:text-red-600 transition">
                <input type="checkbox" checked={selectedBrands.includes(b as string)} onChange={() => toggleBrand(b as string)} className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-gray-300" /> 
                {b as string}
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="font-black text-gray-900 mb-4 pb-2 border-b border-gray-100">Kabuk Materyali</div>
          <div className="space-y-2 text-sm font-medium text-gray-700">
            {allMaterials.map(m => (
              <label key={m} className="flex items-center gap-3 cursor-pointer hover:text-red-600 transition">
                <input type="checkbox" checked={selectedMaterials.includes(m)} onChange={() => toggleMaterial(m)} className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-gray-300" /> 
                {m}
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="font-black text-gray-900 mb-4 pb-2 border-b border-gray-100">Ekstra Özellikler</div>
          <div className="space-y-2 text-sm font-medium text-gray-700">
            <label className="flex items-center gap-3 cursor-pointer hover:text-red-600 transition">
              <input type="checkbox" checked={hasSunVisor} onChange={(e) => setHasSunVisor(e.target.checked)} className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-gray-300" /> 
              Dahili Güneş Vizörü
            </label>
            <label className="flex items-center gap-3 cursor-pointer hover:text-red-600 transition">
              <input type="checkbox" className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-gray-300" /> 
              Pinlock Kutuya Dahil
            </label>
            <label className="flex items-center gap-3 cursor-pointer hover:text-red-600 transition">
              <input type="checkbox" className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-gray-300" /> 
              İnterkom Hazırlıklı
            </label>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="font-black text-gray-900 mb-4 pb-2 border-b border-gray-100">Sertifikasyon</div>
          <div className="space-y-2 text-sm font-medium text-gray-700">
            {certs.map(c => (
              <label key={c} className="flex items-center gap-3 cursor-pointer hover:text-red-600 transition">
                <input type="checkbox" className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-gray-300" /> 
                {c}
              </label>
            ))}
          </div>
        </div>

      </aside>

      {/* SAĞ TARAF (Dinamik Ürün Listesi) */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div className="text-sm font-bold text-gray-500">{filteredProducts.length} ürün bulundu</div>
          <div className="flex items-center gap-3 text-sm">
            <span className="font-bold text-gray-700">Sıralama:</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-gray-300 rounded-lg bg-white px-4 py-2 font-medium focus:ring-2 focus:ring-red-500 focus:outline-none shadow-sm">
              <option value="popular">En Popüler</option>
              <option value="price-asc">Fiyata Göre Artan</option>
              <option value="price-desc">Fiyata Göre Azalan</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <Link href={`/${categorySlug}/${product.slug}`} key={product.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative group hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col">
              <button className="absolute top-4 right-4 text-gray-300 hover:text-red-500 z-10 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </button>
              
              <div className="h-48 bg-white rounded-xl mb-4 flex items-center justify-center overflow-hidden p-2">
                <img src={product.imageUrl || ''} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition duration-500" />
              </div>
              
              <div className="text-xs font-black text-red-600 uppercase tracking-widest mb-1">{product.brand.name}</div>
              <h4 className="font-bold text-gray-900 mb-2 leading-tight line-clamp-2">{product.name}</h4>
              
              <div className="mt-auto pt-4 border-t border-gray-100 flex items-end justify-between">
                <div>
                  <div className="text-xs text-gray-500 font-medium mb-1">En Düşük Fiyat</div>
                  <div className="text-xl font-black text-gray-900">{product.basePriceMin?.toLocaleString('tr-TR')} TL</div>
                </div>
                <div className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">
                  {product.prices?.length || 1} Satıcı
                </div>
              </div>
            </Link>
          ))}
          {filteredProducts.length === 0 && (
             <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-gray-100">
               <div className="text-4xl mb-4">🏍️</div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">Seçimlerinize uygun ürün bulunamadı</h3>
               <p className="text-gray-500">Lütfen filtreleri esneterek tekrar deneyin.</p>
               <button onClick={() => { setSelectedBrands([]); setSelectedMaterials([]); setHasSunVisor(false); }} className="mt-6 text-red-600 font-bold hover:underline">Filtreleri Temizle</button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
