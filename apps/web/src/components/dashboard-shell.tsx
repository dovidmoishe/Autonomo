"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import { AppNav } from "./app-nav";
import { useWalletConnection } from "@/hooks/use-wallet";

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const {
    connected,
    connecting,
    disconnect,
    publicKey,
    walletName,
    networkLabel,
  } = useWalletConnection();

  const shortAddress = publicKey
    ? `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`
    : null;

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

        <div className="flex items-center gap-2">
          <span className="rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-[11px] font-medium uppercase tracking-wider text-zinc-300">
            {networkLabel}
          </span>

          <span
            className={`rounded border px-2 py-1 text-[11px] font-medium uppercase tracking-wider ${
              connected
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                : "border-amber-500/40 bg-amber-500/10 text-amber-300"
            }`}
          >
            {connected ? "Connected" : connecting ? "Connecting" : "Disconnected"}
          </span>

          {connected && shortAddress ? (
            <span className="rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-[11px] font-medium text-zinc-300">
              {walletName ? `${walletName} · ` : ""}
              {shortAddress}
            </span>
          ) : null}

          <WalletMultiButton className="!h-9 !rounded-lg !border !border-teal-400/45 !bg-teal-500/10 !px-4 !font-sans !text-sm !font-semibold !text-teal-200 !shadow-none !transition hover:!bg-teal-500/20 hover:!text-white" />

          {connected ? (
            <button
              type="button"
              onClick={() => {
                void disconnect();
              }}
              className="h-9 rounded-lg border border-zinc-700 bg-zinc-800 px-3 text-sm font-medium text-zinc-200 transition hover:bg-zinc-700"
            >
              Disconnect
            </button>
          ) : null}

          <span className="rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">UI-only</span>
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
