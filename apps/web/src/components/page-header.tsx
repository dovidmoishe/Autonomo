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
    <section className="rounded-2xl border border-[#d7c7a5] bg-[#fff8eb] px-4 py-4 sm:px-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8b6a3b]">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#1e2d34] sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#3e4e58] sm:text-base">
            {description}
          </p>
        </div>
        {actionSlot ? <div>{actionSlot}</div> : null}
      </div>
    </section>
  );
}
