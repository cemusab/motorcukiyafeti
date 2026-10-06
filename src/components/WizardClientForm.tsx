"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WizardClientForm() {
  const router = useRouter();
  const [bike, setBike] = useState("Yamaha MT-07");
  const [budget, setBudget] = useState("Orta (25-50.000 TL)");
  const [usage, setUsage] = useState("Günlük Şehir İçi");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      const params = new URLSearchParams({ bike, budget, usage });
      router.push(`/yeni-baslayanlar?${params.toString()}`);
    }, 1500); 
  };

  return (
    <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-red-600"></div>
      <span className="text-4xl mb-4 block">🏍️</span>
      <h1 className="text-4xl font-black mb-4">Yeni Motor Aldım, Ne Almalıyım?</h1>
      <p className="text-gray-500 mb-12">
        Motosiklet türünüzü, sürüş tarzınızı ve bütçenizi analiz ederek size en uygun seti saniyeler içinde oluşturalım.
      </p>
      
      <div className="grid sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-8">
         <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 focus-within:border-red-500 transition">
           <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">1. Motosiklet Modeli</label>
           <select 
             value={bike}
             onChange={e => setBike(e.target.value)}
             className="w-full bg-transparent border-none text-gray-900 font-bold focus:outline-none cursor-pointer"
           >
             <optgroup label="Scooter (Başlangıç & Şehir İçi)">
               <option>Honda Dio</option><option>Honda PCX 125</option><option>Honda Forza 250</option><option>Yamaha NMAX 155</option><option>Yamaha XMAX 250</option><option>Vespa GTS 300</option>
             </optgroup>
             <optgroup label="Naked (Sokak & Hobi)">
               <option>Yamaha MT-25</option><option>Yamaha MT-07</option><option>Yamaha MT-09</option><option>Honda CB250R</option><option>Honda Hornet 750</option><option>Kawasaki Z400</option><option>KTM 390 Duke</option><option>Bajaj Pulsar RS200</option><option>CFMOTO 250NK</option>
             </optgroup>
             <optgroup label="Supersport (Yarış & Pist)">
               <option>Yamaha R25</option><option>Yamaha R7</option><option>Honda CBR650R</option><option>Kawasaki Ninja 400</option><option>Kawasaki ZX-6R</option><option>CFMOTO 450SR</option><option>BMW S1000RR</option><option>Ducati Panigale V4</option>
             </optgroup>
             <optgroup label="Adventure / Touring (Uzun Yol)">
               <option>Honda NC750X</option><option>Honda Africa Twin</option><option>Yamaha Tracer 9</option><option>Yamaha Tenere 700</option><option>BMW R 1250 GS</option><option>Suzuki V-Strom 650</option><option>CFMOTO 800MT</option>
             </optgroup>
             <optgroup label="Cruiser (Klasik & Chopper)">
               <option>Honda Rebel 500</option><option>Harley-Davidson Iron 883</option><option>Kawasaki Vulcan S</option>
             </optgroup>
             <optgroup label="Cross / Enduro (Arazi)">
               <option>Honda CRF250L</option><option>Yamaha WR250R</option><option>KTM 300 EXC</option>
             </optgroup>
           </select>
         </div>
         <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 focus-within:border-red-500 transition">
           <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">2. Bütçe</label>
           <select 
             value={budget}
             onChange={e => setBudget(e.target.value)}
             className="w-full bg-transparent border-none text-gray-900 font-bold focus:outline-none cursor-pointer"
           >
             <option>Orta (25-50.000 TL)</option><option>Ekonomik (15-25.000 TL)</option><option>Premium (50.000 TL+)</option>
           </select>
         </div>
      </div>
      
      <button 
        onClick={handleSubmit} 
        disabled={loading}
        className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold py-4 px-12 rounded-full transition shadow-xl shadow-red-600/30 text-lg flex items-center justify-center mx-auto gap-2 min-w-[300px]"
      >
        {loading ? <span className="animate-spin text-2xl">⏳</span> : 'Kişiselleştirilmiş Setimi Oluştur'}
      </button>
    </div>
  );
}
