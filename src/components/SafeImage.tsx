"use client";
import Image from "next/image";
import { useState } from "react";

/** Üretici görseli yüklenemezse (adres değişti, sunucu yanıt vermedi) kategori çizimine düşer. */
export function SafeImage({
  src,
  alt,
  sizes,
  unoptimized,
  priority,
  className,
  fallback,
}: {
  src: string;
  alt: string;
  sizes: string;
  unoptimized: boolean;
  priority?: boolean;
  className?: string;
  fallback: React.ReactNode;
}) {
  const [broken, setBroken] = useState(false);
  if (broken) return <>{fallback}</>;
  return <Image src={src} alt={alt} fill sizes={sizes} unoptimized={unoptimized} priority={priority} className={className} onError={() => setBroken(true)} />;
}
