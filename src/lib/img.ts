/** next.config.ts'teki remotePatterns listesinde olmayan görseller optimize edilmeden yüklenir. */
const PATTERNS = (process.env.NEXT_PUBLIC_IMG_PATTERNS ?? "").split(",").filter(Boolean);

export function canOptimize(url: string) {
  let host: string;
  try {
    host = new URL(url).hostname;
  } catch {
    return false;
  }
  return PATTERNS.some((p) => (p.startsWith("**.") ? host.endsWith(p.slice(2)) : host === p));
}
