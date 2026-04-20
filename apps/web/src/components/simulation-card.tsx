type SimulationCardProps = {
  mode?: "idle" | "ready";
};

export function SimulationCard({ mode = "idle" }: SimulationCardProps) {
  const statusText = mode === "ready" ? "Ready for simulation" : "Awaiting strategy input";

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-800/30 p-4 sm:p-5">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-zinc-100">
            Pre-action Simulation
          </h3>
          <p className="mt-1 text-sm text-zinc-500">
            This panel is where risk checks and projected outcomes will appear
            before transaction approval.
          </p>
        </div>
        <span className="rounded-full border border-zinc-600 bg-zinc-800 px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-400">
          {statusText}
        </span>
      </header>

      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Expected output
          </p>
          <p className="mt-1 text-zinc-400">Pending execution quote wiring</p>
        </div>

        <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Slippage guard
          </p>
          <p className="mt-1 text-zinc-400">Uses max slippage from strategy form</p>
        </div>

        <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Position impact
          </p>
          <p className="mt-1 text-zinc-400">Displays projected portfolio diff</p>
        </div>

        <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Risk note
          </p>
          <p className="mt-1 text-zinc-400">Blocks unsafe actions before signing</p>
        </div>
      </div>
    </section>
  );
}
