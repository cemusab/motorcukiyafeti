import { LegalPageView, legalMeta } from "@/components/LegalPageView";

export const metadata = legalMeta("basvuru");

export default function Page() {
  return <LegalPageView slug="basvuru" />;
}
