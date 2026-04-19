type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-[#cab489] bg-[#fff8ea] p-5 text-center">
      <p className="text-lg font-semibold tracking-tight text-[#243239]">{title}</p>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#4d5b65]">
        {description}
      </p>
    </div>
  );
}
