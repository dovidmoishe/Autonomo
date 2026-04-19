"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/overview", label: "Overview" },
  { href: "/strategy", label: "Strategy" },
  { href: "/activity", label: "Activity" },
];

function joinClasses(...classes: Array<string | false>): string {
  return classes.filter(Boolean).join(" ");
}

export function AppNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2" aria-label="Primary navigation">
      {NAV_ITEMS.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={joinClasses(
              "group flex items-center justify-between rounded-2xl border px-3 py-2 text-sm font-medium transition-all",
              isActive
                ? "border-teal-600/80 bg-teal-600/10 text-teal-100"
                : "border-white/10 bg-white/[0.02] text-zinc-300 hover:border-zinc-500/60 hover:bg-white/[0.06] hover:text-zinc-100",
            )}
          >
            <span>{item.label}</span>
            <span
              className={joinClasses(
                "h-2.5 w-2.5 rounded-full transition-colors",
                isActive ? "bg-teal-400" : "bg-zinc-600 group-hover:bg-zinc-400",
              )}
              aria-hidden="true"
            />
          </Link>
        );
      })}
    </nav>
  );
}
