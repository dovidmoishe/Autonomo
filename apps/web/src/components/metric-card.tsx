type MetricCardProps = {
  label: string;
  value?: string;
  hint: string;
};

export function MetricCard({ label, value = "—", hint }: MetricCardProps) {
  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-800/30 p-4 sm:p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold text-zinc-100">{value}</p>
      <p className="mt-2 text-sm text-zinc-500">{hint}</p>
    </article>
  );
}
