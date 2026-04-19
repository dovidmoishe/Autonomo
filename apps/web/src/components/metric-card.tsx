type MetricCardProps = {
  label: string;
  value?: string;
  hint: string;
};

export function MetricCard({ label, value = "—", hint }: MetricCardProps) {
  return (
    <article className="rounded-2xl border border-[#deceb0] bg-[#fffdf7] p-4 shadow-[0_8px_24px_rgba(43,58,68,0.08)] sm:p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#8b6a3b]">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-[#1f2d36]">{value}</p>
      <p className="mt-2 text-sm leading-6 text-[#4f5d66]">{hint}</p>
    </article>
  );
}
