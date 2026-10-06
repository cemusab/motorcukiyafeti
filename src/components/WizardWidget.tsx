"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WizardWidget() {
  const router = useRouter();
  const [bike, setBike] = useState("Yamaha MT-07");
  const [usage, setUsage] = useState("Günlük + Hafta Sonu");
  const [season, setSeason] = useState("4 Mevsim");
  const [budget, setBudget] = useState("Orta (25-50.000 TL)");

  const handleSuggest = () => {
    // Navigate to the wizard result page with URL parameters
    const params = new URLSearchParams({
      bike, usage, season, budget
    });
    router.push(`/yeni-baslayanlar?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
      <h2 className="text-2xl font-black mb-1">Yeni Motor Aldım</h2>
      <h3 className="text-xl text-gray-500 mb-8 font-medium">Hangi Ekipmanları Almalıyım?</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="relative">
          <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wide">Motosiklet Modeli</label>
          <select 
            value={bike}
            onChange={(e) => setBike(e.target.value)}
            className="w-full bg-white border border-gray-200 hover:border-gray-300 rounded-lg px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none appearance-none cursor-pointer"
          >
            <optgroup label="Scooter (Başlangıç & Şehir İçi)">
              <option>Honda Dio</option>
              <option>Honda PCX 125</option>
              <option>Honda Forza 250</option>
              <option>Yamaha NMAX 155</option>
              <option>Yamaha XMAX 250</option>
              <option>Vespa GTS 300</option>
              <option>SYM Fiddle 125</option>
              <option>Kymco Agility 125</option>
            </optgroup>
            <optgroup label="Naked (Sokak & Hobi)">
              <option>Yamaha MT-25</option>
              <option>Yamaha MT-07</option>
              <option>Yamaha MT-09</option>
              <option>Honda CB250R</option>
              <option>Honda Hornet 750</option>
              <option>Kawasaki Z400</option>
              <option>Kawasaki Z900</option>
              <option>KTM 250 Duke</option>
              <option>KTM 390 Duke</option>
              <option>Bajaj Pulsar RS200</option>
              <option>CFMOTO 250NK</option>
              <option>Triumph Trident 660</option>
            </optgroup>
            <optgroup label="Supersport (Yarış & Pist)">
              <option>Yamaha R25</option>
              <option>Yamaha R7</option>
              <option>Honda CBR650R</option>
              <option>Kawasaki Ninja 400</option>
              <option>Kawasaki ZX-6R</option>
              <option>CFMOTO 250SR</option>
              <option>CFMOTO 450SR</option>
              <option>BMW S1000RR</option>
              <option>Ducati Panigale V4</option>
            </optgroup>
            <optgroup label="Adventure / Touring (Uzun Yol)">
              <option>Honda NC750X</option>
              <option>Honda Africa Twin</option>
              <option>Yamaha Tracer 9</option>
              <option>Yamaha Tenere 700</option>
              <option>BMW R 1250 GS</option>
              <option>Suzuki V-Strom 650</option>
              <option>KTM 890 Adventure</option>
              <option>CFMOTO 800MT</option>
            </optgroup>
            <optgroup label="Cruiser (Klasik & Chopper)">
              <option>Honda Rebel 500</option>
              <option>Harley-Davidson Iron 883</option>
              <option>Kawasaki Vulcan S</option>
              <option>Royal Enfield Meteor 350</option>
            </optgroup>
            <optgroup label="Cross / Enduro (Arazi)">
              <option>Honda CRF250L</option>
              <option>Yamaha WR250R</option>
              <option>KTM 300 EXC</option>
              <option>Husqvarna TE 300</option>
            </optgroup>
          </select>
          <div className="absolute right-3 bottom-3 pointer-events-none text-gray-400">▾</div>
        </div>
        <div className="relative">
          <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wide">Kullanım Amacı</label>
          <select 
            value={usage}
            onChange={(e) => setUsage(e.target.value)}
            className="w-full bg-white border border-gray-200 hover:border-gray-300 rounded-lg px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none appearance-none cursor-pointer"
          >
            <option>Günlük Şehir İçi</option>
            <option>Günlük + Hafta Sonu</option>
            <option>Uzun Yol / Touring</option>
            <option>Sert Arazi / Enduro</option>
            <option>Pist / Performans</option>
          </select>
          <div className="absolute right-3 bottom-3 pointer-events-none text-gray-400">▾</div>
        </div>
        <div className="relative">
          <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wide">Mevsim</label>
          <select 
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="w-full bg-white border border-gray-200 hover:border-gray-300 rounded-lg px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none appearance-none cursor-pointer"
          >
            <option>4 Mevsim (Genel)</option>
            <option>Yazlık (Fileli)</option>
            <option>Kışlık (Termal + Su Geçirmez)</option>
          </select>
          <div className="absolute right-3 bottom-3 pointer-events-none text-gray-400">▾</div>
        </div>
        <div className="relative">
          <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wide">Bütçe</label>
          <select 
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full bg-white border border-gray-200 hover:border-gray-300 rounded-lg px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none appearance-none cursor-pointer"
          >
            <option>Ekonomik (15-25.000 TL)</option>
            <option>Orta (25-50.000 TL)</option>
            <option>Premium (50.000 TL+)</option>
          </select>
          <div className="absolute right-3 bottom-3 pointer-events-none text-gray-400">▾</div>
        </div>
      </div>
      <div className="flex justify-center">
        <button 
          onClick={handleSuggest}
          className="bg-[#e60000] hover:bg-red-700 text-white font-bold py-3.5 px-8 rounded-full transition shadow-lg shadow-red-600/30 flex items-center gap-2"
        >
          Bana Özel Ekipman Setini Öner →
        </button>
      </div>
    </div>
  );
}
