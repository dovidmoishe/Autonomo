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
    <section className="rounded-2xl border border-[#deceb0] bg-[#fffdf7] p-4 shadow-[0_8px_24px_rgba(43,58,68,0.08)] sm:p-5">
      <header>
        <h3 className="text-lg font-semibold tracking-tight text-[#1f2d36]">{title}</h3>
        {description ? (
          <p className="mt-1 text-sm leading-6 text-[#4c5a63]">{description}</p>
        ) : null}
      </header>

      <div className="mt-4">{children}</div>
    </section>
  );
}
