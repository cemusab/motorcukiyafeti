import { GenderCategory, genderMeta } from "@/components/GenderPages";
import { genderCategories } from "@/lib/catalog";

export const dynamicParams = false;
export const generateStaticParams = () => genderCategories("erkek").map((c) => ({ kategori: c.slug }));

export async function generateMetadata({ params }: PageProps<"/erkek/[kategori]">) {
  return genderMeta("erkek", (await params).kategori);
}

export default async function Page({ params }: PageProps<"/erkek/[kategori]">) {
  return <GenderCategory g="erkek" cat={(await params).kategori} />;
}
