import Link from "next/link";
import { Icon } from "./Icon";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 ${className}`}>{children}</div>;
}

export function SectionTitle({ title, href, linkLabel, sub }: { title: string; href?: string; linkLabel?: string; sub?: string }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
      <div>
        <h2 className="font-display text-3xl leading-none font-bold sm:text-[34px]">{title}</h2>
        {sub && <p className="mt-2 max-w-2xl text-mute">{sub}</p>}
      </div>
      {href && (
        <Link href={href} className="flex items-center gap-1 text-sm font-semibold text-red hover:underline">
          {linkLabel ?? "Tümünü gör"} <Icon name="arrow" className="size-4" />
        </Link>
      )}
    </div>
  );
}

export function PageHead({ title, intro, children }: { title: string; intro?: string; children?: React.ReactNode }) {
  return (
    <div className="border-b border-line bg-white">
      <Container className="py-8">
        {children}
        <h1 className="mt-3 font-display text-4xl leading-none font-bold sm:text-5xl">{title}</h1>
        {intro && <p className="mt-3 max-w-3xl text-lg text-mute">{intro}</p>}
      </Container>
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-lg border border-line bg-white ${className}`}>{children}</div>;
}

export function Notice({ children, tone = "info" }: { children: React.ReactNode; tone?: "info" | "warn" }) {
  return (
    <div className={`flex gap-3 rounded-md border p-3 text-sm ${tone === "warn" ? "border-warn/30 bg-warn/5 text-[#7a3d06]" : "border-line bg-paper text-ink-2"}`}>
      <Icon name="info" className="mt-0.5 size-4 shrink-0" />
      <div>{children}</div>
    </div>
  );
}

export function LinkCard({ href, title, desc, icon }: { href: string; title: string; desc?: string; icon?: Parameters<typeof Icon>[0]["name"] }) {
  return (
    <Link href={href} className="group flex gap-3 rounded-lg border border-line bg-white p-4 transition hover:border-ink hover:shadow-md">
      {icon && (
        <span className="grid size-10 shrink-0 place-items-center rounded-md bg-paper text-red">
          <Icon name={icon} className="size-6" />
        </span>
      )}
      <span>
        <span className="block font-display text-xl leading-tight font-bold group-hover:text-red">{title}</span>
        {desc && <span className="mt-1 block text-sm text-mute">{desc}</span>}
      </span>
    </Link>
  );
}
