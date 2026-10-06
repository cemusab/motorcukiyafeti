import { GenderHub, genderMeta } from "@/components/GenderPages";

export const metadata = genderMeta("kadin");

export default function Page() {
  return <GenderHub g="kadin" />;
}
