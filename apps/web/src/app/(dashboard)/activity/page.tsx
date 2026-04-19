import {
  ActivityTimeline,
  type ActivityEvent,
} from "@/components/activity-timeline";
import { ExplanationCard } from "@/components/explanation-card";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";

const EMPTY_EVENTS: ActivityEvent[] = [];

export default function ActivityPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Activity"
        title="Action timeline and explainability"
        description="Chronological view of Trigger, Decision, Action, and Result with rationale support."
      />

      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.85fr]">
        <SectionCard
          title="Automation Timeline"
          description="This panel tracks all strategy engine outcomes in user-readable format."
        >
          <ActivityTimeline events={EMPTY_EVENTS} />
        </SectionCard>

        <div className="space-y-4">
          <ExplanationCard />

          <SectionCard
            title="Event States"
            description="Canonical statuses for timeline events and alert grouping."
          >
            <ul className="grid gap-2 text-sm text-[#34434d]">
              <li className="rounded-xl border border-amber-300 bg-amber-50 px-3 py-2">
                Queued: condition met, waiting for execution window.
              </li>
              <li className="rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2">
                Executed: action signed and broadcast successfully.
              </li>
              <li className="rounded-xl border border-red-300 bg-red-50 px-3 py-2">
                Failed: blocked or rejected, requires manual review.
              </li>
            </ul>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
