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
    <nav className="space-y-0.5" aria-label="Primary navigation">
      {NAV_ITEMS.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={joinClasses(
              "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
