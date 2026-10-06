const fs = require('fs');

function patchFile(filePath, modelName, selectField, isCategory = false) {
  let content = fs.readFileSync(filePath, 'utf-8');
  content = content.replace(/export async function generateStaticParams\(\) \{[\s\S]*?\}/g, '');
  content = content.replace(/export const dynamicParams = false;/g, '');
  
  let staticParamsCode = `
export async function generateStaticParams() {
  const items = await prisma.${modelName}.findMany({ select: { ${selectField}: true } });
  return items.map((item) => ({ ${selectField}: item.${selectField} }));
}
export const dynamicParams = false;
`;

  if (isCategory) {
    staticParamsCode = `
export async function generateStaticParams() {
  const items = await prisma.${modelName}.findMany({ select: { slug: true, category: { select: { slug: true } } } });
  return items.map((item) => ({ slug: item.slug, category: item.category.slug }));
}
export const dynamicParams = false;
`;
  }

  content = content.replace(/(const prisma = new PrismaClient\(\);)/, `$1\n${staticParamsCode}`);
  fs.writeFileSync(filePath, content);
  console.log("Patched", filePath);
}

patchFile('src/app/[category]/[slug]/page.tsx', 'product', 'slug', true);
patchFile('src/app/rehberler/[slug]/page.tsx', 'article', 'slug');
patchFile('src/app/markalar/[slug]/page.tsx', 'brand', 'slug');
