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
    return "border-emerald-500/50 bg-emerald-500/10 text-emerald-400";
  }

  if (status === "failed") {
    return "border-red-500/50 bg-red-500/10 text-red-400";
  }

  return "border-amber-500/50 bg-amber-500/10 text-amber-400";
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
          className="rounded-xl border border-zinc-800 bg-zinc-800/30 p-4"
        >
          <header className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-medium text-zinc-300">{event.timestamp}</p>
            <span
              className={`rounded-full border px-2 py-0.5 text-xs font-medium uppercase tracking-wider ${statusClass(event.status)}`}
            >
              {event.status}
            </span>
          </header>

          <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500">Trigger</dt>
              <dd className="mt-1 text-zinc-400">{event.trigger}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500">Decision</dt>
              <dd className="mt-1 text-zinc-400">{event.decision}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500">Action</dt>
              <dd className="mt-1 text-zinc-400">{event.action}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500">Result</dt>
              <dd className="mt-1 text-zinc-400">{event.result}</dd>
            </div>
          </dl>

          <div className="mt-3 rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-sm text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Why system acted
            </span>
            <p className="mt-1">{event.rationale}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
