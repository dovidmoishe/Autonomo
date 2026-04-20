import type { ReactNode } from "react";

import { AppNav } from "./app-nav";

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="min-h-dvh bg-zinc-950">
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-teal-400 to-teal-600">
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-semibold text-zinc-100">Autonomo</h1>
              <p className="text-xs text-zinc-500">Solana Frontier</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-md bg-amber-500/10 border border-amber-500/20 px-2 py-1 text-xs text-amber-400">
              UI-only
            </span>
            <div className="h-8 w-8 rounded-full bg-zinc-800">
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 px-4 lg:px-6">
          <AppNav />
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] p-4 lg:p-6">
        <main className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
