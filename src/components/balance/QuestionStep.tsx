"use client";

import {
  QUESTION_THEME_LABEL,
  type BalanceQuestion,
} from "@/data/balance/questions";
import { useDeferredSelect } from "../navi/useDeferredSelect";
import { AppIcon, STROKE } from "../ui/AppIcon";
import { IconScene } from "../ui/IconScene";
import { QUESTION_SCENES } from "../ui/visuals";

type OptionValue = BalanceQuestion["options"][number]["value"];

const THEME_CHIP: Record<BalanceQuestion["theme"], string> = {
  life: "bg-gold-soft text-gold-deep",
  protect: "bg-brand-soft text-brand-deep",
  grow: "bg-mint-soft text-mint",
};

/**
 * 1画面1問の質問。
 * 選ぶと選択状態を一瞬見せてから次の質問へ進む（既存の体験フローと同じ操作感）。
 */
export function QuestionStep({
  question,
  number,
  selected,
  onSelect,
}: {
  question: BalanceQuestion;
  number: number;
  selected: OptionValue | undefined;
  onSelect: (value: OptionValue) => void;
}) {
  const { pending, select } = useDeferredSelect<OptionValue>(onSelect);
  const many = question.options.length > 5;

  return (
    <section className="balance-question animate-fade-up">
      <div className="question-heading flex items-start gap-4">
        <span className="scene-group hidden sm:block">
          <IconScene {...QUESTION_SCENES[question.key]} variant="feature" />
        </span>
        <div className="min-w-0">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-[0.68rem] font-bold ${THEME_CHIP[question.theme]}`}
          >
            Q{number}・{QUESTION_THEME_LABEL[question.theme]}
          </span>
          <h1
            id={`question-${question.key}`}
            className="text-balance-ja mt-3 text-[1.45rem] font-semibold leading-[1.55] text-ink sm:text-[1.85rem]"
          >
            {question.title}
          </h1>
          <p className="text-balance-ja mt-2 text-[0.86rem] leading-relaxed text-ink-soft">
            {question.lead}
          </p>
        </div>
      </div>

      <div
        role="group"
        aria-labelledby={`question-${question.key}`}
        className={`question-options stagger mt-7 grid gap-2.5 sm:gap-3 ${many ? "sm:grid-cols-2" : ""}`}
      >
        {question.options.map((option) => {
          const isSelected = pending ? pending === option.value : selected === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => select(option.value)}
              aria-pressed={isSelected}
              className={[
                "question-option group flex min-h-14 w-full items-center gap-3.5 rounded-2xl border bg-surface px-4 py-3.5 text-left sm:min-h-16 sm:px-5",
                "shadow-[0_12px_30px_-26px_rgba(12,26,46,0.55)] transition-all duration-200",
                "hover:border-brand/40 hover:shadow-[0_16px_34px_-24px_rgba(29,75,143,0.45)] ",
                isSelected
                  ? "border-brand bg-brand-soft/60 ring-2 ring-brand/15"
                  : "border-line",
              ].join(" ")}
            >
              <span
                aria-hidden
                className={[
                  "grid size-5 shrink-0 place-items-center rounded-full border-[1.5px] transition-colors",
                  isSelected
                    ? "border-brand bg-brand text-white"
                    : "border-line bg-surface group-hover:border-brand/50",
                ].join(" ")}
              >
                {isSelected ? <AppIcon name="check" size={12} strokeWidth={STROKE.inline} /> : null}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.95rem] font-bold text-ink">{option.label}</span>
                {"hint" in option && option.hint ? (
                  <span className="block text-[0.74rem] text-muted">{option.hint}</span>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
