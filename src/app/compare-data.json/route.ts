import { compareEntry } from "@/lib/compare";
import { getProducts } from "@/lib/data";

export const dynamic = "force-static";

export function GET() {
  return Response.json(getProducts().map(compareEntry));
}
