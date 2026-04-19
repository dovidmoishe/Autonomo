import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { SimulationCard } from "@/components/simulation-card";
import { StrategyForm } from "@/components/strategy-form";

export default function StrategyPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Strategy"
        title="Rule builder and control logic"
        description="Define one strategy path with risk guardrails, trigger thresholds, and execution behavior."
      />

      <div className="grid gap-4 xl:grid-cols-[1.25fr_0.95fr]">
        <StrategyForm />

        <div className="space-y-4">
          <SimulationCard />

          <SectionCard
            title="Execution Safety Frame"
            description="This block defines what must pass before any action is eligible for signing."
          >
            <ul className="grid gap-2 text-sm text-[#33434d]">
              <li className="rounded-xl border border-[#e0d1b4] bg-[#fff8ea] px-3 py-2">
                Balance sufficiency check
              </li>
              <li className="rounded-xl border border-[#e0d1b4] bg-[#fff8ea] px-3 py-2">
                Slippage tolerance check
              </li>
              <li className="rounded-xl border border-[#e0d1b4] bg-[#fff8ea] px-3 py-2">
                Exposure and risk bounds check
              </li>
            </ul>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
