"use client";

import { ANALOGIES, type AnalogyId } from "@/data/analogies";
import { useDeferredSelect } from "./useDeferredSelect";
import { AppIcon, STROKE } from "../ui/AppIcon";
import { IconScene } from "../ui/IconScene";
import { ANALOGY_SCENES } from "../ui/visuals";

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
              "group scene-group relative flex min-h-[6.5rem] items-center gap-4 rounded-3xl border bg-surface p-4 text-left",
              "shadow-[0_16px_40px_-32px_rgba(13,27,47,0.55)] transition-all duration-300",
              "hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_24px_48px_-30px_rgba(25,92,199,0.4)]",
              "active:scale-[0.99]",
              "sm:min-h-56 sm:flex-col sm:items-start sm:gap-5 sm:p-6",
              isSelected
                ? "border-brand bg-brand-soft/55 ring-2 ring-brand/15 shadow-[0_20px_46px_-28px_rgba(25,92,199,0.52)]"
                : "border-line",
            ].join(" ")}
          >
            {/* 例えは最大のタイル。中心＋補助シンボル2つで世界観を見せる */}
            <IconScene
              {...ANALOGY_SCENES[a.id]}
              variant="analogy"
              active={isSelected}
              edge={isSelected ? "#f2f7ff" : "#ffffff"}
            />
            <span className="min-w-0 flex-1 sm:flex-none">
              <span className="block text-[1rem] font-bold text-ink">
                {a.title}
              </span>
              <span className="text-balance-ja mt-0.5 block text-[0.78rem] leading-relaxed text-muted">
                {a.shortDescription}
              </span>
            </span>
            {isSelected ? (
              <span aria-hidden className="absolute right-4 top-4 grid size-6 place-items-center rounded-full bg-brand text-white">
                <AppIcon name="check" size={13} strokeWidth={STROKE.inline} />
              </span>
            ) : null}
            <span
              aria-hidden
              className={[
                "shrink-0 text-muted transition-all duration-300 sm:absolute sm:bottom-6 sm:right-6",
                isSelected ? "text-brand" : "group-hover:translate-x-0.5 group-hover:text-brand",
              ].join(" ")}
            >
              <AppIcon name="arrow-right" size={17} />
            </span>
          </button>
        );
      })}
    </div>
  );
}
