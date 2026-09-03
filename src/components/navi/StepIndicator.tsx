export const NAVI_STEPS = ["たとえる", "えらぶ", "知る", "考える"] as const;

export type StepNo = 1 | 2 | 3 | 4;

/**
 * 4STEP のインジケーター。
 * 狭い画面（320px 想定）ではラベルを現在のステップだけに絞り、
 * 横スクロールや折り返しの崩れが起きないようにしている。
 */
export function StepIndicator({ current }: { current: StepNo }) {
  return (
    <ol className="flex items-center gap-1.5 sm:gap-2" aria-label="体験の進み具合">
      {NAVI_STEPS.map((label, i) => {
        const no = i + 1;
        const done = no < current;
        const active = no === current;
        return (
          <li key={label} className="flex items-center gap-1.5 sm:gap-2">
            <span
              aria-current={active ? "step" : undefined}
              aria-label={`STEP${no} ${label}`}
              className={[
                "flex items-center gap-1.5 rounded-full px-2 py-1 text-[0.7rem] font-bold",
                "transition-colors duration-300 sm:px-2.5 sm:text-[0.72rem]",
                active
                  ? "bg-brand text-white"
                  : done
                    ? "bg-brand-soft text-brand-deep"
                    : "bg-line-soft text-muted",
              ].join(" ")}
            >
              <span aria-hidden>{done ? "✓" : no}</span>
              <span
                aria-hidden
                className={active ? "inline" : "hidden sm:inline"}
              >
                {label}
              </span>
            </span>
            {i < NAVI_STEPS.length - 1 ? (
              <span aria-hidden className="h-px w-2.5 bg-line sm:w-5" />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
