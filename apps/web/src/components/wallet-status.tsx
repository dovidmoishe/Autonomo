"use client";

import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWalletConnection } from "@/hooks/use-wallet";

export function WalletStatus() {
  const { connected, connecting, publicKey } = useWalletConnection();
  const { setVisible } = useWalletModal();

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-800/30 p-4 sm:p-5">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-zinc-100">
            Wallet Session
          </h3>
          <p className="mt-1 text-sm text-zinc-500">
            Connect your wallet to get started.
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wider ${
            connected
              ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
              : "border-amber-500/40 bg-amber-500/10 text-amber-400"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              connected ? "bg-emerald-500" : "bg-amber-500"
            }`}
            aria-hidden="true"
          />
          {connected ? "Connected" : "Disconnected"}
        </span>
      </header>

      <dl className="mt-4 grid gap-3 text-sm">
        <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2">
          <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500">Address</dt>
          <dd className="mt-1 font-medium text-zinc-300">
            {publicKey ? shortenAddress(publicKey) : "—"}
          </dd>
        </div>
      </dl>

      {!connected && (
        <button
          onClick={() => setVisible(true)}
          disabled={connecting}
          className="mt-4 w-full rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-500 disabled:opacity-50"
        >
          {connecting ? "Connecting..." : "Connect Wallet"}
        </button>
      )}
    </section>
  );
}
