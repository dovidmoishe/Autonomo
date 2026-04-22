"use client";

import { useState } from "react";

import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { SimulationCard } from "@/components/simulation-card";
import { StrategyForm } from "@/components/strategy-form";
import { useWalletConnection } from "@/hooks/use-wallet";
import { StrategyRecord } from "@/lib/types";

export default function StrategyPage() {
  const { connected, publicKey } = useWalletConnection();
  const [activeStrategy, setActiveStrategy] = useState<StrategyRecord | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Strategy"
        title="Strategy Builder"
        description="Define strategy rules with risk guardrails, trigger thresholds, and execution behavior."
      />

      <div className="grid gap-4 xl:grid-cols-[1.25fr_0.95fr]">
        <StrategyForm
          connected={connected}
          walletAddress={publicKey}
          onSaved={(strategy) => {
            setActiveStrategy(strategy);
          }}
        />

        <div className="space-y-4">
          <SimulationCard strategy={activeStrategy} connected={connected} />

          <SectionCard
            title="Execution Safety Frame"
            description="What must pass before any action is eligible for signing."
          >
            <ul className="grid gap-2 text-sm text-zinc-400">
              <li className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2">
                Balance sufficiency check
              </li>
              <li className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2">
                Slippage tolerance check
              </li>
              <li className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2">
                Exposure and risk bounds check
              </li>
            </ul>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
