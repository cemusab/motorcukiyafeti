const fs = require('fs');
let kask = fs.readFileSync('src/app/kask/page.tsx', 'utf-8');

kask = kask.replace(
  /<div className="flex flex-col lg:flex-row gap-8">[\s\S]*?<\/div>\n        <\/div>\n      <\/main>/,
  `<FilterClient initialProducts={helmets} categorySlug="kask" />
      </main>`
);

kask = kask.replace(
  /import { PrismaClient } from '@prisma\/client';/,
  `import { PrismaClient } from '@prisma/client';\nimport FilterClient from '@/components/FilterClient';`
);

kask = kask.replace(
  /include: { brand: true },/,
  `include: { brand: true, specs: true, prices: true },`
);

fs.writeFileSync('src/app/kask/page.tsx', kask);
