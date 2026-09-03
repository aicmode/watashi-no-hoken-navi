"use client";

import { LIFE_EVENTS, type LifeEventId } from "@/data/lifeEvents";
import { useDeferredSelect } from "./useDeferredSelect";
import { AppIcon, STROKE } from "../ui/AppIcon";
import { IconScene } from "../ui/IconScene";
import { LIFE_EVENT_SCENES } from "../ui/visuals";

export function LifeEventPicker({
  selected,
  onSelect,
}: {
  selected: LifeEventId | null;
  onSelect: (id: LifeEventId) => void;
}) {
  const { pending, select } = useDeferredSelect<LifeEventId>(onSelect);

  return (
    <div className="stagger grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
      {LIFE_EVENTS.map((e) => {
        const isSelected = pending ? pending === e.id : selected === e.id;
        return (
          <button
            key={e.id}
            type="button"
            onClick={() => select(e.id)}
            aria-pressed={isSelected}
            className={[
              "group scene-group flex min-h-24 items-center gap-4 rounded-3xl border bg-surface p-4 text-left sm:p-5",
              "shadow-[0_14px_38px_-32px_rgba(13,27,47,0.55)] transition-all duration-300",
              "hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_22px_46px_-30px_rgba(25,92,199,0.4)]",
              "active:scale-[0.99]",
              isSelected ? "border-brand bg-brand-soft/55 ring-2 ring-brand/15" : "border-line",
            ].join(" ")}
          >
            <IconScene
              {...LIFE_EVENT_SCENES[e.id]}
              variant="life-event"
              active={isSelected}
              edge={isSelected ? "#f2f7ff" : "#ffffff"}
            />
            <span className="min-w-0 flex-1">
              <span className="block text-[1rem] font-bold text-ink">
                {e.label}
              </span>
              <span className="block text-[0.78rem] text-muted">{e.hint}</span>
            </span>
            <span
              aria-hidden
              className={[
                "shrink-0 text-muted transition-all duration-300",
                isSelected
                  ? "text-brand"
                  : "group-hover:translate-x-0.5 group-hover:text-brand",
              ].join(" ")}
            >
              {isSelected ? <AppIcon name="check" size={18} strokeWidth={STROKE.inline} /> : <AppIcon name="arrow-right" size={17} />}
            </span>
          </button>
        );
      })}
    </div>
  );
}
