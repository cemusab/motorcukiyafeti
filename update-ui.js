const fs = require('fs');

let page = fs.readFileSync('src/app/[category]/[slug]/page.tsx', 'utf-8');

page = page.replace(
  /<button className="text-blue-600 text-sm font-bold mt-4">Tüm Teknik Özellikler ▾<\/button>/,
  `<div className="flex items-center justify-between mt-4">
    <button className="text-blue-600 text-sm font-bold hover:underline">Tüm Teknik Özellikler ▾</button>
    <button className="text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-bold border border-gray-300 transition flex items-center gap-2">
      📏 Beden Tablosu (Size Guide)
    </button>
  </div>`
);

fs.writeFileSync('src/app/[category]/[slug]/page.tsx', page);
