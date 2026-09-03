"use client";

import { ANALOGIES, type AnalogyId } from "@/data/analogies";
import { useDeferredSelect } from "./useDeferredSelect";

export function AnalogyPicker({
  selected,
  onSelect,
}: {
  selected: AnalogyId | null;
  onSelect: (id: AnalogyId) => void;
}) {
  const { pending, select } = useDeferredSelect<AnalogyId>(onSelect);

  return (
    <div className="stagger grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
      {ANALOGIES.map((a) => {
        const isSelected = pending ? pending === a.id : selected === a.id;
        return (
          <button
            key={a.id}
            type="button"
            onClick={() => select(a.id)}
            aria-pressed={isSelected}
            className={[
              "group flex min-h-[5.5rem] items-center gap-4 rounded-2xl border bg-surface p-4 text-left",
              "shadow-[0_12px_30px_-28px_rgba(16,22,35,0.6)] transition-all duration-300",
              "hover:-translate-y-0.5 hover:border-brand/45 hover:shadow-[0_18px_36px_-26px_rgba(31,86,214,0.55)]",
              "active:scale-[0.99]",
              "sm:flex-col sm:items-start sm:gap-3 sm:p-5",
              isSelected
                ? "border-brand bg-brand-soft/50 shadow-[0_18px_36px_-26px_rgba(31,86,214,0.6)]"
                : "border-line",
            ].join(" ")}
          >
            <span
              aria-hidden
              className={[
                "grid size-12 shrink-0 place-items-center rounded-2xl bg-canvas text-2xl",
                "transition-transform duration-300 group-hover:scale-105",
                isSelected ? "scale-105 bg-surface" : "",
              ].join(" ")}
            >
              {a.emoji}
            </span>
            <span className="min-w-0 flex-1 sm:flex-none">
              <span className="block text-[1rem] font-bold text-ink">
                {a.title}
              </span>
              <span className="text-balance-ja mt-0.5 block text-[0.78rem] leading-relaxed text-muted">
                {a.shortDescription}
              </span>
            </span>
            <span
              aria-hidden
              className={[
                "shrink-0 text-muted transition-all duration-300 sm:hidden",
                isSelected ? "text-brand" : "group-hover:translate-x-0.5 group-hover:text-brand",
              ].join(" ")}
            >
              →
            </span>
          </button>
        );
      })}
    </div>
  );
}
