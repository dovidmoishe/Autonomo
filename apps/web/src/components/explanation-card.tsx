export function ExplanationCard() {
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-800/30 p-4 sm:p-5">
      <h3 className="text-lg font-semibold text-zinc-100">
        Explainability Frame
      </h3>
      <p className="mt-1 text-sm text-zinc-500">
        Every automated action should present a clear rationale that users can
        understand in under five seconds.
      </p>

      <ul className="mt-4 space-y-2 text-sm text-zinc-400">
        <li className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2">
          Trigger context: what threshold was crossed.
        </li>
        <li className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2">
          Decision context: why this action was selected.
        </li>
        <li className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2">
          Outcome context: expected and actual impact summary.
        </li>
      </ul>
    </section>
  );
}
