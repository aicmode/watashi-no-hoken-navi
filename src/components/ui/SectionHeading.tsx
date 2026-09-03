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
    <div className={`flex flex-col gap-3.5 ${alignment}`}>
      {eyebrow ? (
        <span className="inline-flex w-fit items-center gap-2 text-[0.7rem] font-bold tracking-[0.11em] text-brand-deep before:block before:h-px before:w-5 before:bg-brand/60">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-balance-ja text-[1.55rem] font-bold tracking-[-0.025em] text-ink sm:text-[2rem]">
        {title}
      </h2>
      {lead ? (
        <p className="text-balance-ja max-w-2xl text-[0.92rem] leading-[1.85] text-ink-soft sm:text-base">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
