"use client";

import { useId, useState } from "react";
import type { Coverage } from "@/data/coverages";

export function CoverageCard({
  coverage,
  highlighted = false,
}: {
  coverage: Coverage;
  highlighted?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div
      className={[
        "overflow-hidden rounded-2xl border bg-surface transition-all duration-300",
        highlighted
          ? "border-brand/45 shadow-[0_16px_40px_-30px_rgba(31,86,214,0.7)]"
          : "border-line shadow-[0_12px_30px_-28px_rgba(16,22,35,0.6)]",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-start gap-4 p-5 text-left"
      >
        <span
          aria-hidden
          className="grid size-11 shrink-0 place-items-center rounded-xl bg-canvas text-xl"
        >
          {coverage.emoji}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-[1rem] font-bold text-ink">
              {coverage.title}
            </span>
            {highlighted ? (
              <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[0.68rem] font-bold text-brand-deep">
                まずここから
              </span>
            ) : null}
          </span>
          <span className="text-balance-ja mt-1 block text-[0.83rem] leading-relaxed text-ink-soft">
            {coverage.summary}
          </span>
        </span>
        <span
          aria-hidden
          className={`mt-1 shrink-0 text-muted transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          ⌄
        </span>
      </button>

      {open ? (
        <div id={panelId} className="animate-fade-in border-t border-line-soft">
          <div className="space-y-4 px-5 pb-5 pt-4">
            <div className="rounded-xl bg-canvas px-4 py-3">
              <p className="text-[0.7rem] font-semibold text-muted">
                クルマに例えるなら
              </p>
              <p className="text-balance-ja mt-1 text-[0.85rem] font-bold text-ink">
                {coverage.carAnalogy}
              </p>
            </div>

            <p className="text-balance-ja text-[0.88rem] leading-relaxed text-ink">
              {coverage.detail.lead}
            </p>

            <ul className="space-y-2">
              {coverage.detail.points.map((p) => (
                <li key={p} className="flex gap-2.5">
                  <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                  <span className="text-balance-ja text-[0.83rem] leading-relaxed text-ink-soft">
                    {p}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-[0.72rem] text-muted">
              {coverage.field === "life"
                ? "一般に「生命保険」で話題になりやすい分野です。"
                : "一般に「損害保険」で話題になりやすい分野です。"}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
