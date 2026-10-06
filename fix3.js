const fs = require('fs');
let content = fs.readFileSync('src/app/[category]/[slug]/page.tsx', 'utf-8');
const metaIndex = content.indexOf('import { Metadata } from "next";');
const header = `import Link from "next/link";
import { notFound } from "next/navigation";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function generateStaticParams() {
  const items = await prisma.product.findMany({ select: { slug: true, category: { select: { slug: true } } } });
  return items.map((item) => ({ slug: item.slug, category: item.category.slug }));
}
export const dynamicParams = false;

`;
fs.writeFileSync('src/app/[category]/[slug]/page.tsx', header + content.substring(metaIndex));
