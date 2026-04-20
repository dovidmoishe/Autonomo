type ErrorStateProps = {
  title: string;
  description: string;
};

export function ErrorState({ title, description }: ErrorStateProps) {
  return (
    <div className="rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-red-400">
      <p className="text-xs font-medium uppercase tracking-wider">Issue</p>
      <p className="mt-2 text-lg font-semibold text-red-300">{title}</p>
      <p className="mt-1 text-sm">{description}</p>
    </div>
  );
}
