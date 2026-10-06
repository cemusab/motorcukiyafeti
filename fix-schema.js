const fs = require('fs');
let s = fs.readFileSync('prisma/schema.prisma', 'utf-8');
s = s.replace(/model Brand \{[\s\S]*?products    Product\[\]\n\}/, 'model Brand {\n  id          String    @id @default(uuid())\n  slug        String    @unique\n  name        String\n  isOem       Boolean   @default(false)\n  products    Product[]\n  sizeGuides  SizeGuide[]\n}');
s = s.replace(/model Category \{[\s\S]*?products    Product\[\]\n\}/, 'model Category {\n  id          String    @id @default(uuid())\n  slug        String    @unique\n  name        String\n  products    Product[]\n  sizeGuides  SizeGuide[]\n}');
fs.writeFileSync('prisma/schema.prisma', s);
