"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import { AppNav } from "./app-nav";

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-dvh flex-col bg-zinc-950">
      <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          >
            {sidebarOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>

          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-teal-500 to-teal-600">
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-zinc-100">Autonomo</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">UI-only</span>
          <div className="h-7 w-7 rounded-full bg-zinc-700">
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside
          className={`shrink-0 overflow-hidden border-r border-zinc-800 bg-zinc-950 transition-all duration-200 ${
            sidebarOpen ? "w-56" : "w-0"
          }`}
        >
          <nav className="p-3">
            <div className="mb-3 px-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
              Menu
            </div>
            <AppNav />
          </nav>

          <div className="border-t border-zinc-800 p-3">
            <div className="mb-3 px-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
              Status
            </div>
            <div className="rounded bg-zinc-900 px-2 py-1.5 text-xs text-zinc-400">
              No integrations
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
