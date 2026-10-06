import { GenderCategory, genderMeta } from "@/components/GenderPages";
import { genderCategories } from "@/lib/catalog";

export const dynamicParams = false;
export const generateStaticParams = () => genderCategories("kadin").map((c) => ({ kategori: c.slug }));

export async function generateMetadata({ params }: PageProps<"/kadin/[kategori]">) {
  return genderMeta("kadin", (await params).kategori);
}

export default async function Page({ params }: PageProps<"/kadin/[kategori]">) {
  return <GenderCategory g="kadin" cat={(await params).kategori} />;
}
