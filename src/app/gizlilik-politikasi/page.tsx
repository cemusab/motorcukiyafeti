import { LegalPageView, legalMeta } from "@/components/LegalPageView";

export const metadata = legalMeta("gizlilik-politikasi");

export default function Page() {
  return <LegalPageView slug="gizlilik-politikasi" />;
}
