export function ExplanationCard() {
  return (
    <section className="rounded-2xl border border-[#deceb0] bg-[#fffdf7] p-4 shadow-[0_8px_24px_rgba(43,58,68,0.08)] sm:p-5">
      <h3 className="text-lg font-semibold tracking-tight text-[#1f2d36]">
        Explainability Frame
      </h3>
      <p className="mt-1 text-sm leading-6 text-[#4f5d66]">
        Every automated action should present a clear rationale that users can
        understand in under five seconds.
      </p>

      <ul className="mt-4 space-y-2 text-sm text-[#33434d]">
        <li className="rounded-xl border border-[#e3d5ba] bg-[#fff7e8] px-3 py-2">
          Trigger context: what threshold was crossed.
        </li>
        <li className="rounded-xl border border-[#e3d5ba] bg-[#fff7e8] px-3 py-2">
          Decision context: why this action was selected.
        </li>
        <li className="rounded-xl border border-[#e3d5ba] bg-[#fff7e8] px-3 py-2">
          Outcome context: expected and actual impact summary.
        </li>
      </ul>
    </section>
  );
}
