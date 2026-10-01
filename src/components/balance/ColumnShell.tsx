import type { ReactNode } from "react";
import { AppIcon } from "../ui/AppIcon";

/**
 * 結果画面で「守るお金」「育てるお金」を左右に並べるための共通の枠。
 * 両方を同じ形・同じ大きさで並べ、どちらか一方だけを強調しない。
 */
export function ColumnShell({
  side,
  title,
  caption,
  note,
  children,
}: {
  side: "protect" | "grow";
  title: string;
  caption: string;
  note: ReactNode;
  children: ReactNode;
}) {
  const isProtect = side === "protect";
  return (
    <section
      data-side={side}
      aria-labelledby={`column-${side}`}
      className={[
        "balance-column relative overflow-hidden rounded-[1.75rem] border p-4 sm:p-6",
        isProtect ? "border-brand/15 bg-brand-soft/40" : "border-mint/15 bg-mint-soft/45",
      ].join(" ")}
    >
      <span
        aria-hidden
        className={`absolute inset-x-0 top-0 h-[3px] ${isProtect ? "bg-brand/70" : "bg-mint/70"}`}
      />
      <div className="flex items-center gap-3 px-1">
        <span
          aria-hidden
          className={[
            "grid size-10 shrink-0 place-items-center rounded-full bg-surface shadow-sm",
            isProtect ? "text-brand" : "text-mint",
          ].join(" ")}
        >
          <AppIcon name={isProtect ? "shield-check" : "sprout"} size={20} />
        </span>
        <div>
          <h3 id={`column-${side}`} className="font-display text-[1.3rem] font-semibold leading-tight text-ink">
            {title}
          </h3>
          <p className="text-[0.72rem] font-semibold text-muted">{caption}</p>
        </div>
      </div>
      <div className="mt-4">{children}</div>
      <p className="text-balance-ja mt-4 px-1 text-[0.74rem] leading-relaxed text-ink-soft">
        {note}
      </p>
    </section>
  );
}
