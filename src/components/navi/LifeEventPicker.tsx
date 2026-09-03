"use client";

import { LIFE_EVENTS, type LifeEventId } from "@/data/lifeEvents";

export function LifeEventPicker({
  selected,
  onSelect,
}: {
  selected: LifeEventId | null;
  onSelect: (id: LifeEventId) => void;
}) {
  return (
    <div className="stagger grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
      {LIFE_EVENTS.map((e) => {
        const isSelected = selected === e.id;
        return (
          <button
            key={e.id}
            type="button"
            onClick={() => onSelect(e.id)}
            aria-pressed={isSelected}
            className={[
              "group flex items-center gap-4 rounded-2xl border bg-surface p-4 text-left",
              "shadow-[0_12px_30px_-28px_rgba(16,22,35,0.6)] transition-all duration-300",
              "hover:-translate-y-0.5 hover:border-brand/45 hover:shadow-[0_18px_36px_-26px_rgba(31,86,214,0.55)]",
              isSelected ? "border-brand bg-brand-soft/50" : "border-line",
            ].join(" ")}
          >
            <span
              aria-hidden
              className="grid size-12 shrink-0 place-items-center rounded-2xl bg-canvas text-2xl transition-transform duration-300 group-hover:scale-105"
            >
              {e.emoji}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[1rem] font-bold text-ink">
                {e.label}
              </span>
              <span className="block text-[0.78rem] text-muted">{e.hint}</span>
            </span>
            <span
              aria-hidden
              className="shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-brand"
            >
              →
            </span>
          </button>
        );
      })}
    </div>
  );
}
