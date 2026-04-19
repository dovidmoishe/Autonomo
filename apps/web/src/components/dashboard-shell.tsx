import type { ReactNode } from "react";

import { AppNav } from "./app-nav";

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="relative min-h-dvh">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 12% 8%, rgba(13, 148, 136, 0.14), transparent 40%), radial-gradient(circle at 86% 4%, rgba(255, 131, 67, 0.14), transparent 30%)",
        }}
      />

      <div className="mx-auto grid min-h-dvh w-full max-w-[1320px] grid-cols-1 gap-4 px-4 py-4 lg:grid-cols-[270px_1fr] lg:gap-6 lg:px-6 lg:py-6">
        <aside className="rounded-3xl border border-zinc-800/80 bg-zinc-950 p-5 text-zinc-100 shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Solana Frontier
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight">Autonomo</h1>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Command center UI for autonomous strategy planning and execution.
          </p>

          <div className="mt-6 rounded-2xl border border-teal-700/40 bg-teal-700/10 p-3 text-xs leading-5 text-teal-100">
            UI-only mode is active. Data and protocol integrations are intentionally
            not connected yet.
          </div>

          <div className="mt-6">
            <AppNav />
          </div>

          <div className="mt-8 grid gap-3 text-xs">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-zinc-300">
              Stage: Frontend Structure
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-zinc-300">
              Focus: Product quality + explainability
            </div>
          </div>
        </aside>

        <div className="rounded-3xl border border-[#d4c5a6]/60 bg-[#fffbf4]/90 p-4 shadow-[0_18px_55px_rgba(27,38,49,0.12)] backdrop-blur sm:p-5 lg:p-6">
          <header className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#dccdad] bg-[#f7f0df] px-4 py-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7d6642]">
                Autonomous DeFi Operator
              </p>
              <p className="mt-1 text-sm text-[#3f4d56]">
                Build phase: UI architecture and interaction surfaces.
              </p>
            </div>
            <div className="rounded-xl border border-[#c7b184] bg-[#fff7e8] px-3 py-1 text-xs font-semibold text-[#735321]">
              No integrations wired
            </div>
          </header>

          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
