import { EmptyState } from "./empty-state";

export type ActivityStatus = "queued" | "executed" | "failed";

export type ActivityEvent = {
  id: string;
  timestamp: string;
  trigger: string;
  decision: string;
  action: string;
  result: string;
  rationale: string;
  status: ActivityStatus;
};

type ActivityTimelineProps = {
  events: ActivityEvent[];
};

function statusClass(status: ActivityStatus): string {
  if (status === "executed") {
    return "border-emerald-300 bg-emerald-50 text-emerald-900";
  }

  if (status === "failed") {
    return "border-red-300 bg-red-50 text-red-900";
  }

  return "border-amber-300 bg-amber-50 text-amber-900";
}

export function ActivityTimeline({ events }: ActivityTimelineProps) {
  if (events.length === 0) {
    return (
      <EmptyState
        title="No strategy events yet"
        description="This timeline will populate with Trigger, Decision, Action, and Result records once backend event wiring is connected."
      />
    );
  }

  return (
    <ol className="space-y-4">
      {events.map((event) => (
        <li
          key={event.id}
          className="rounded-2xl border border-[#deceb0] bg-[#fff8eb] p-4"
        >
          <header className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-[#2a3942]">{event.timestamp}</p>
            <span
              className={`rounded-full border px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.08em] ${statusClass(event.status)}`}
            >
              {event.status}
            </span>
          </header>

          <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-[0.08em] text-[#8b6a3b]">Trigger</dt>
              <dd className="mt-1 text-[#33434d]">{event.trigger}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.08em] text-[#8b6a3b]">Decision</dt>
              <dd className="mt-1 text-[#33434d]">{event.decision}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.08em] text-[#8b6a3b]">Action</dt>
              <dd className="mt-1 text-[#33434d]">{event.action}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.08em] text-[#8b6a3b]">Result</dt>
              <dd className="mt-1 text-[#33434d]">{event.result}</dd>
            </div>
          </dl>

          <div className="mt-3 rounded-xl border border-[#d8c9ad] bg-[#fffdf7] px-3 py-2 text-sm text-[#2f3e47]">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8b6a3b]">
              Why system acted
            </span>
            <p className="mt-1">{event.rationale}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
