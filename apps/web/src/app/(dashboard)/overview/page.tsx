import { EmptyState } from "@/components/empty-state";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { MetricCard } from "@/components/metric-card";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { WalletStatus } from "@/components/wallet-status";

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Overview"
        title="Portfolio Dashboard"
        description="Top-level control panel for balance visibility, risk posture, and system readiness."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Managed capital"
          hint="Total value managed across active strategies."
        />
        <MetricCard
          label="Risk score"
          hint="Strategy-weighted risk state from backend engine."
        />
        <MetricCard
          label="Actions today"
          hint="Successful and blocked automation actions."
        />
        <MetricCard
          label="Guardrail health"
          hint="Simulation checks and transaction safety metrics."
        />
      </section>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <WalletStatus connection="disconnected" />

        <SectionCard
          title="System Signals"
          description="Live protocol event summaries and engine heartbeat status."
        >
          <LoadingSkeleton lines={5} />
        </SectionCard>
      </div>

      <SectionCard
        title="Capital Map"
        description="Positions, allocation spread, and protocol-level exposure details."
      >
        <EmptyState
          title="No live capital map yet"
          description="Chart blocks and position tables will render here once data endpoints are wired."
        />
      </SectionCard>
    </div>
  );
}
