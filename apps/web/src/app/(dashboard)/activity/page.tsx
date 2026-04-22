"use client";

import { useEffect, useState } from "react";

import {
  ActivityTimeline,
  type ActivityEvent,
} from "@/components/activity-timeline";
import { ErrorState } from "@/components/error-state";
import { ExplanationCard } from "@/components/explanation-card";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { useWalletConnection } from "@/hooks/use-wallet";
import { getActivity } from "@/lib/api";

export default function ActivityPage() {
  const { publicKey } = useWalletConnection();
  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;

    const fetchActivity = async () => {
      try {
        const response = await getActivity(publicKey);
        if (canceled) {
          return;
        }
        setEvents(response.events);
        setError(null);
      } catch (requestError) {
        if (canceled) {
          return;
        }
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Failed to load activity timeline",
        );
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    };

    void fetchActivity();

    return () => {
      canceled = true;
    };
  }, [publicKey]);

  async function loadActivity() {
    setLoading(true);

    try {
      const response = await getActivity(publicKey);
      setEvents(response.events);
      setError(null);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Failed to load activity timeline",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Activity"
        title="Action Timeline"
        description="Chronological view of Trigger, Decision, Action, and Result with rationale support."
        actionSlot={
          <button
            type="button"
            onClick={() => {
              void loadActivity();
            }}
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-zinc-300 hover:bg-zinc-700"
          >
            Refresh
          </button>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.85fr]">
        <SectionCard
          title="Automation Timeline"
          description="Strategy engine outcomes in user-readable format."
        >
          {loading ? <LoadingSkeleton lines={6} /> : null}
          {!loading && error ? (
            <ErrorState title="Unable to load activity" description={error} />
          ) : null}
          {!loading && !error ? <ActivityTimeline events={events} /> : null}
        </SectionCard>

        <div className="space-y-4">
          <ExplanationCard />

          <SectionCard
            title="Event States"
            description="Canonical statuses for timeline events and alert grouping."
          >
            <ul className="grid gap-2 text-sm text-zinc-400">
              <li className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2">
                Queued: condition met, waiting for execution window.
              </li>
              <li className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2">
                Executed: action signed and broadcast successfully.
              </li>
              <li className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2">
                Failed: blocked or rejected, requires manual review.
              </li>
            </ul>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
