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
    <section className="rounded-2xl border border-[#deceb0] bg-[#fffdf7] p-4 shadow-[0_8px_24px_rgba(43,58,68,0.08)] sm:p-5">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-[#1f2d36]">
            Wallet Session
          </h3>
          <p className="mt-1 text-sm text-[#4f5c65]">
            Solflare session UI state and readiness indicators.
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${
            isConnected
              ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-800"
              : "border-amber-500/40 bg-amber-500/10 text-amber-800"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isConnected ? "bg-emerald-600" : "bg-amber-500"
            }`}
            aria-hidden="true"
          />
          {isConnected ? "Connected" : "Disconnected"}
        </span>
      </header>

      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
        <div className="rounded-xl border border-[#e5d8bf] bg-[#fff7e6] px-3 py-2">
          <dt className="text-xs uppercase tracking-[0.08em] text-[#8b6a3b]">Address</dt>
          <dd className="mt-1 font-medium text-[#32414a]">
            {walletAddress ?? "Awaiting wallet connection"}
          </dd>
        </div>

        <div className="rounded-xl border border-[#e5d8bf] bg-[#fff7e6] px-3 py-2">
          <dt className="text-xs uppercase tracking-[0.08em] text-[#8b6a3b]">Network</dt>
          <dd className="mt-1 font-medium text-[#32414a]">
            {network ?? "Not selected"}
          </dd>
        </div>

        <div className="rounded-xl border border-[#e5d8bf] bg-[#fff7e6] px-3 py-2">
          <dt className="text-xs uppercase tracking-[0.08em] text-[#8b6a3b]">Last Sync</dt>
          <dd className="mt-1 font-medium text-[#32414a]">
            {lastSynced ?? "No sync yet"}
          </dd>
        </div>
      </dl>
    </section>
  );
}
