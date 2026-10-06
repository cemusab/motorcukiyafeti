const fs = require('fs');
let schema = fs.readFileSync('prisma/schema.prisma', 'utf-8');

if (!schema.includes('SizeGuide')) {
  schema += `
model SizeGuide {
  id         String   @id @default(uuid())
  brandId    String
  categoryId String
  content    String   
  brand      Brand    @relation(fields: [brandId], references: [id])
  category   Category @relation(fields: [categoryId], references: [id])
  
  @@unique([brandId, categoryId])
}
`;
  schema = schema.replace('products    Product[]', 'products    Product[]\n  sizeGuides  SizeGuide[]');
  schema = schema.replace('products    Product[]', 'products    Product[]\n  sizeGuides  SizeGuide[]');
}

if (!schema.includes('deliveryTime')) {
  schema = schema.replace('stockStatus    Boolean   @default(true)', 'inStock        Boolean   @default(true)\n  stockText      String    @default("Stokta")\n  deliveryTime   String    @default("1-3 İş Günü")');
}

fs.writeFileSync('prisma/schema.prisma', schema);
console.log("Schema updated.");
