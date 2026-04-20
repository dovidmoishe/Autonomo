import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  actionSlot?: ReactNode;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  actionSlot,
}: PageHeaderProps) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-800/30 px-4 py-4 sm:px-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-100 sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400 sm:text-base">
            {description}
          </p>
        </div>
        {actionSlot ? <div>{actionSlot}</div> : null}
      </div>
    </section>
  );
}
