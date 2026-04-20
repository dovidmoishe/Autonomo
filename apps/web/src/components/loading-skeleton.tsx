type LoadingSkeletonProps = {
  lines?: number;
};

export function LoadingSkeleton({ lines = 4 }: LoadingSkeletonProps) {
  return (
    <div className="space-y-2" aria-label="Loading">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-4 animate-pulse rounded-lg bg-zinc-700"
          style={{ width: `${100 - index * 7}%` }}
        />
      ))}
    </div>
  );
}
