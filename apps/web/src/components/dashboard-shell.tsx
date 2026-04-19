import type { ReactNode } from "react";

import { AppNav } from "./app-nav";

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="relative min-h-dvh bg-zinc-950">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 12% 8%, rgba(13, 148, 136, 0.08), transparent 40%), radial-gradient(circle at 86% 4%, rgba(255, 131, 67, 0.06), transparent 30%)",
        }}
      />

      <div className="mx-auto grid min-h-dvh w-full max-w-[1320px] grid-cols-1 gap-4 px-4 py-4 lg:grid-cols-[240px_1fr] lg:gap-6 lg:px-6 lg:py-6">
        <aside className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 text-zinc-100">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-teal-600">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold">Autonomo</h1>
              <p className="text-xs text-zinc-500">Solana Frontier</p>
            </div>
          </div>

          <p className="mt-4 text-sm text-zinc-400">
            Autonomous DeFi strategy planning and execution.
          </p>

          <div className="mt-4 rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-2 text-xs text-amber-200">
            UI-only mode active. Integrations not connected.
          </div>

          <nav className="mt-6">
            <AppNav />
          </nav>

          <div className="mt-8 space-y-2">
            <div className="rounded-lg bg-zinc-800/50 px-3 py-2 text-xs text-zinc-400">
              Stage: Frontend Structure
            </div>
            <div className="rounded-lg bg-zinc-800/50 px-3 py-2 text-xs text-zinc-400">
              Focus: Product quality
            </div>
          </div>
        </aside>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 sm:p-5 lg:p-6">
          <header className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-800/30 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-zinc-200">Autonomous DeFi Operator</p>
              <p className="mt-0.5 text-xs text-zinc-500">Build phase: UI architecture</p>
            </div>
            <div className="rounded-lg bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-400">
              No integrations
            </div>
          </header>

          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
