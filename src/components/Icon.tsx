import type { IconName } from "@/data/categories";

type UiIcon =
  | IconName
  | "search"
  | "heart"
  | "compare"
  | "menu"
  | "close"
  | "chevron"
  | "arrow"
  | "external"
  | "check"
  | "x"
  | "info"
  | "star"
  | "shield"
  | "book"
  | "user"
  | "bike";

const P: Record<UiIcon, React.ReactNode> = {
  kask: (
    <>
      <path d="M3.5 14.5C3.5 8.7 7.6 4.5 13 4.5c4.6 0 7.5 3.3 7.5 7.5v3.2c0 1.6-1.3 2.8-2.8 2.8H9.2L6 20H4.6a1.1 1.1 0 0 1-1.1-1.1z" />
      <path d="M11 9.5h9.3M11 9.5c-.6 1.5-.6 3.3 0 5h9.5" />
    </>
  ),
  mont: (
    <>
      <path d="M8.5 3.5 12 6l3.5-2.5 4 2 1.5 13-3 .5-.8-7.5V20.5H6.8V11.5L6 19l-3-.5 1.5-13z" />
      <path d="M12 6v14.5M9 9.5h1.5M13.5 9.5H15" />
    </>
  ),
  pantolon: <path d="M6.5 3.5h11l1 17h-4.3L12 9.5l-2.2 11H5.5zM6.5 6.5h11" />,
  eldiven: (
    <>
      <path d="M7 21v-4.5l-3-4c-.6-.9-.3-2 .6-2.4.7-.3 1.5 0 1.9.6L8 12.5V5.2a1.2 1.2 0 0 1 2.4 0V10V3.7a1.2 1.2 0 0 1 2.4 0V10V4.6a1.2 1.2 0 0 1 2.4 0V10.5V6.4a1.2 1.2 0 0 1 2.4 0v8.2c0 2.3-.9 4-2.4 5V21z" />
      <path d="M7 18h8.8" />
    </>
  ),
  bot: (
    <>
      <path d="M7 3.5h6v9.5l5.6 2.6c1.2.6 1.9 1.6 1.9 2.9v2H4.5V15c0-1 .5-2 1.3-2.6L7 11.5z" />
      <path d="M4.5 18.5h16M7 7.5h6" />
    </>
  ),
  interkom: (
    <>
      <rect x="4" y="7" width="13" height="10" rx="3" />
      <path d="M17 10.5h2.5M17 13.5h2.5M8 12h5M10.5 9.5v5M8 3.5l2 3.5" />
    </>
  ),
  koruma: (
    <>
      <path d="M12 3.5 5 6v5.5c0 4.3 3 7.7 7 9 4-1.3 7-4.7 7-9V6z" />
      <path d="M12 7v11M8.5 9.5h7M8.5 13h7" />
    </>
  ),
  yagmurluk: (
    <>
      <path d="M3.5 12a8.5 8.5 0 0 1 17 0z" />
      <path d="M12 12v6.5a2 2 0 0 1-4 0M7 3.5l-.8 1.5M12 2.5V4M17 3.5l.8 1.5" />
    </>
  ),
  termal: (
    <>
      <path d="M10 14.5V5a2 2 0 0 1 4 0v9.5a3.5 3.5 0 1 1-4 0z" />
      <path d="M12 9v7.5M16.5 7h3M16.5 10.5h3" />
    </>
  ),
  lastik: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3M6 6l2.1 2.1M15.9 15.9 18 18M18 6l-2.1 2.1M8.1 15.9 6 18" />
    </>
  ),
  yag: (
    <>
      <path d="M12 3.5c-2.8 4-5 6.9-5 9.8a5 5 0 0 0 10 0c0-2.9-2.2-5.8-5-9.8z" />
      <path d="M9.5 14.5a2.6 2.6 0 0 0 2.5 2.3" />
    </>
  ),
  aksesuar: (
    <>
      <path d="M5.5 8.5h13l-1 11.5h-11z" />
      <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5M9 12.5h6" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.3-4.3" />
    </>
  ),
  heart: <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z" />,
  compare: <path d="M8 4v16M16 4v16M3.5 8.5 8 4l4.5 4.5M11.5 15.5 16 20l4.5-4.5" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  chevron: <path d="m9 6 6 6-6 6" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  external: <path d="M14 4.5h5.5V10M19.5 4.5 11 13M17 14v5.5H4.5V7H10" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  x: <path d="m7 7 10 10M17 7 7 17" />,
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5M12 7.8v.2" />
    </>
  ),
  star: <path d="m12 3.8 2.5 5.3 5.8.7-4.3 4 1.1 5.7L12 16.7l-5.1 2.8 1.1-5.7-4.3-4 5.8-.7z" />,
  shield: (
    <>
      <path d="M12 3.5 5 6v5.5c0 4.3 3 7.7 7 9 4-1.3 7-4.7 7-9V6z" />
      <path d="m8.8 12 2.2 2.2 4.2-4.4" />
    </>
  ),
  book: <path d="M4.5 5.5c2.7-.9 5.2-.6 7.5 1 2.3-1.6 4.8-1.9 7.5-1v13c-2.7-.9-5.2-.6-7.5 1-2.3-1.6-4.8-1.9-7.5-1zM12 6.5v13" />,
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.8" />
      <path d="M4.8 20c.9-3.6 3.8-5.6 7.2-5.6s6.3 2 7.2 5.6" />
    </>
  ),
  bike: (
    <>
      <circle cx="5.5" cy="16" r="3.2" />
      <circle cx="18.5" cy="16" r="3.2" />
      <path d="M5.5 16 9 10h5l4.5 6M9 10 7.5 7.5H5M14 10l1.5-3H18M11 16h3.5L12 10" />
    </>
  ),
};

export function Icon({ name, className = "size-5", title }: { name: UiIcon; className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      {P[name]}
    </svg>
  );
}
