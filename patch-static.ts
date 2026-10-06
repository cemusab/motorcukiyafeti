const fs = require('fs');

function patchFile(filePath: string, modelName: string, selectField: string, isCategory = false) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Remove existing generateStaticParams if any
  content = content.replace(/export async function generateStaticParams\(\) \{[\s\S]*?\}/, '');
  
  let staticParamsCode = `
export async function generateStaticParams() {
  const items = await prisma.${modelName}.findMany({ select: { ${selectField}: true } });
  return items.map((item: any) => ({ ${selectField}: item.${selectField} }));
}
export const dynamicParams = false;
`;

  if (isCategory) {
    staticParamsCode = `
export async function generateStaticParams() {
  const items = await prisma.${modelName}.findMany({ select: { slug: true, category: { select: { slug: true } } } });
  return items.map((item: any) => ({ slug: item.slug, category: item.category.slug }));
}
export const dynamicParams = false;
`;
  }

  // Insert after prisma initialization
  content = content.replace(/(const prisma = new PrismaClient\(\);)/, `$1\n${staticParamsCode}`);
  
  fs.writeFileSync(filePath, content);
  console.log("Patched", filePath);
}

patchFile('src/app/kask/[slug]/page.tsx', 'product', 'slug');
patchFile('src/app/[category]/[slug]/page.tsx', 'product', 'slug', true);
patchFile('src/app/rehberler/[slug]/page.tsx', 'article', 'slug');
patchFile('src/app/markalar/[slug]/page.tsx', 'brand', 'slug');

