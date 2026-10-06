import { GenderHub, genderMeta } from "@/components/GenderPages";

export const metadata = genderMeta("erkek");

export default function Page() {
  return <GenderHub g="erkek" />;
}
