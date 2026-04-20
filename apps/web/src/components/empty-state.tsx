type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-800/20 p-5 text-center">
      <p className="text-lg font-semibold text-zinc-300">{title}</p>
      <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-500">
        {description}
      </p>
    </div>
  );
}
