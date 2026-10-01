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
    <div className={`section-heading flex flex-col gap-3.5 ${alignment}`}>
      {eyebrow ? (
        <span className="eyebrow w-fit">{eyebrow}</span>
      ) : null}
      <h2 className="text-balance-ja text-[1.6rem] font-semibold leading-[1.5] text-ink sm:text-[2.1rem]">
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
