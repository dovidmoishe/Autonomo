type SimulationCardProps = {
  mode?: "idle" | "ready";
};

export function SimulationCard({ mode = "idle" }: SimulationCardProps) {
  const statusText = mode === "ready" ? "Ready for simulation" : "Awaiting strategy input";

  return (
    <section className="rounded-2xl border border-[#deceb0] bg-[#fffdf7] p-4 shadow-[0_8px_24px_rgba(43,58,68,0.08)] sm:p-5">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-[#1f2d36]">
            Pre-action Simulation
          </h3>
          <p className="mt-1 text-sm leading-6 text-[#4f5d66]">
            This panel is where risk checks and projected outcomes will appear
            before transaction approval.
          </p>
        </div>
        <span className="rounded-full border border-[#cab489] bg-[#fff4dc] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#7c5e2f]">
          {statusText}
        </span>
      </header>

      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-xl border border-[#e5d8bf] bg-[#fff8ea] px-3 py-2">
          <p className="text-xs uppercase tracking-[0.08em] text-[#8b6a3b]">
            Expected output
          </p>
          <p className="mt-1 text-[#32414a]">Pending execution quote wiring</p>
        </div>

        <div className="rounded-xl border border-[#e5d8bf] bg-[#fff8ea] px-3 py-2">
          <p className="text-xs uppercase tracking-[0.08em] text-[#8b6a3b]">
            Slippage guard
          </p>
          <p className="mt-1 text-[#32414a]">Uses max slippage from strategy form</p>
        </div>

        <div className="rounded-xl border border-[#e5d8bf] bg-[#fff8ea] px-3 py-2">
          <p className="text-xs uppercase tracking-[0.08em] text-[#8b6a3b]">
            Position impact
          </p>
          <p className="mt-1 text-[#32414a]">Displays projected portfolio diff</p>
        </div>

        <div className="rounded-xl border border-[#e5d8bf] bg-[#fff8ea] px-3 py-2">
          <p className="text-xs uppercase tracking-[0.08em] text-[#8b6a3b]">
            Risk note
          </p>
          <p className="mt-1 text-[#32414a]">Blocks unsafe actions before signing</p>
        </div>
      </div>
    </section>
  );
}
