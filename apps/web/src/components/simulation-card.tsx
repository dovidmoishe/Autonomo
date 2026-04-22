"use client";

import { useMemo, useState } from "react";

import { previewSimulation } from "@/lib/api";
import { SimulationPreview, StrategyRecord } from "@/lib/types";

type SimulationCardProps = {
  strategy: StrategyRecord | null;
};

export function SimulationCard({ strategy }: SimulationCardProps) {
  const [marketVolatilityPercent, setMarketVolatilityPercent] = useState("15");
  const [observedPriceMovePercent, setObservedPriceMovePercent] = useState("-4");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<SimulationPreview | null>(null);

  const ready = Boolean(strategy);

  const statusText = useMemo(() => {
    if (!ready) {
      return "Awaiting saved strategy";
    }
    if (loading) {
      return "Running preview";
    }
    if (preview) {
      return `Preview ready (${preview.guardrailStatus})`;
    }
    return "Ready for simulation";
  }, [ready, loading, preview]);

  async function runPreview() {
    if (!strategy) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await previewSimulation({
        strategyId: strategy.id,
        marketVolatilityPercent: Number(marketVolatilityPercent),
        observedPriceMovePercent: Number(observedPriceMovePercent),
      });

      setPreview(response.preview);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Failed to run simulation preview",
      );
      setPreview(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-800/30 p-4 sm:p-5">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-zinc-100">
            Pre-action Simulation
          </h3>
          <p className="mt-1 text-sm text-zinc-500">
            Run a backend preview to inspect guardrails and projected outcomes
            before execution.
          </p>
        </div>
        <span className="rounded-full border border-zinc-600 bg-zinc-800 px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-400">
          {statusText}
        </span>
      </header>

      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <label className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Market volatility (%)
          </p>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={marketVolatilityPercent}
            onChange={(event) => setMarketVolatilityPercent(event.target.value)}
            className="mt-1 w-full rounded border border-zinc-600 bg-zinc-900/70 px-2 py-1 text-zinc-200 outline-none focus:border-teal-500"
            disabled={!ready || loading}
          />
        </label>

        <label className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Price move (%)
          </p>
          <input
            type="number"
            min="-100"
            max="100"
            step="0.1"
            value={observedPriceMovePercent}
            onChange={(event) => setObservedPriceMovePercent(event.target.value)}
            className="mt-1 w-full rounded border border-zinc-600 bg-zinc-900/70 px-2 py-1 text-zinc-200 outline-none focus:border-teal-500"
            disabled={!ready || loading}
          />
        </label>
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={() => {
            void runPreview();
          }}
          disabled={!ready || loading}
          className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Running preview..." : "Run preview"}
        </button>
      </div>

      {error ? (
        <p className="mt-4 rounded-lg border border-red-500/50 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      {preview ? (
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Expected output
            </p>
            <p className="mt-1 text-zinc-300">{preview.expectedOutput.expectedAction}</p>
          </div>

          <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Slippage guard
            </p>
            <p className="mt-1 text-zinc-300">
              {preview.expectedOutput.projectedSlippagePercent}% projected
            </p>
          </div>

          <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Position impact
            </p>
            <p className="mt-1 text-zinc-300">
              {preview.expectedOutput.projectedAllocationShiftPercent}% allocation shift
            </p>
          </div>

          <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Risk note
            </p>
            <p className="mt-1 text-zinc-300">{preview.explanation}</p>
          </div>

          <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 sm:col-span-2">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Guardrail reasons
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-300">
              {preview.guardrailReasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </section>
  );
}
