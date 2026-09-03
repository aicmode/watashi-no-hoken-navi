import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
}) {
  const alignment = align === "center" ? "text-center items-center" : "";
  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      {eyebrow ? (
        <span className="inline-flex w-fit items-center rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold tracking-wide text-brand-deep">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-balance-ja text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        {title}
      </h2>
      {lead ? (
        <p className="text-balance-ja max-w-2xl text-[0.95rem] text-ink-soft sm:text-base">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
