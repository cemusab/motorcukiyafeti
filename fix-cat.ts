import fs from 'fs';
let content = fs.readFileSync('src/app/[category]/[slug]/page.tsx', 'utf-8');
content = content.replace(/export async function generateStaticParams[\s\S]*?export const dynamicParams = false;/m, `export async function generateStaticParams() {
  const items = await prisma.product.findMany({ select: { slug: true, category: { select: { slug: true } } } });
  return items.map((item: any) => ({ slug: item.slug, category: item.category.slug }));
}
export const dynamicParams = false;`);
fs.writeFileSync('src/app/[category]/[slug]/page.tsx', content);
