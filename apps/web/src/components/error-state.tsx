type ErrorStateProps = {
  title: string;
  description: string;
};

export function ErrorState({ title, description }: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-red-300 bg-red-50 p-4 text-red-900">
      <p className="text-sm font-semibold uppercase tracking-[0.1em]">Issue</p>
      <p className="mt-2 text-lg font-semibold tracking-tight">{title}</p>
      <p className="mt-1 text-sm leading-6">{description}</p>
    </div>
  );
}
