import type { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function SectionCard({
  title,
  description,
  children,
}: SectionCardProps) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-800/30 p-4 sm:p-5">
      <header>
        <h3 className="text-lg font-semibold text-zinc-100">{title}</h3>
        {description ? (
          <p className="mt-1 text-sm text-zinc-500">{description}</p>
        ) : null}
      </header>

      <div className="mt-4">{children}</div>
    </section>
  );
}
