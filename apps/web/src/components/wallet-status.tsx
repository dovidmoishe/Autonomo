type WalletStatusProps = {
  connection?: "connected" | "disconnected";
  walletAddress?: string;
  network?: string;
  lastSynced?: string;
};

export function WalletStatus({
  connection = "disconnected",
  walletAddress,
  network,
  lastSynced,
}: WalletStatusProps) {
  const isConnected = connection === "connected";

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-800/30 p-4 sm:p-5">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-zinc-100">
            Wallet Session
          </h3>
          <p className="mt-1 text-sm text-zinc-500">
            Solflare session UI state and readiness indicators.
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wider ${
            isConnected
              ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
              : "border-amber-500/40 bg-amber-500/10 text-amber-400"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isConnected ? "bg-emerald-500" : "bg-amber-500"
            }`}
            aria-hidden="true"
          />
          {isConnected ? "Connected" : "Disconnected"}
        </span>
      </header>

      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
        <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2">
          <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500">Address</dt>
          <dd className="mt-1 font-medium text-zinc-300">
            {walletAddress ?? "Awaiting wallet connection"}
          </dd>
        </div>

        <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2">
          <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500">Network</dt>
          <dd className="mt-1 font-medium text-zinc-300">
            {network ?? "Not selected"}
          </dd>
        </div>

        <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2">
          <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500">Last Sync</dt>
          <dd className="mt-1 font-medium text-zinc-300">
            {lastSynced ?? "No sync yet"}
          </dd>
        </div>
      </dl>
    </section>
  );
}
