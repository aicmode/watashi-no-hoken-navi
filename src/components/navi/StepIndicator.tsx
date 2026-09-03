import { AppIcon, STROKE } from "../ui/AppIcon";

export const NAVI_STEPS = ["たとえる", "えらぶ", "知る", "考える"] as const;

export type StepNo = 1 | 2 | 3 | 4;

/**
 * 4STEP のインジケーター。
 * 狭い画面（320px 想定）ではラベルを現在のステップだけに絞り、
 * 横スクロールや折り返しの崩れが起きないようにしている。
 */
export function StepIndicator({ current }: { current: StepNo }) {
  return (
    <ol className="flex items-center" aria-label="体験の進み具合">
      {NAVI_STEPS.map((label, i) => {
        const no = i + 1;
        const done = no < current;
        const active = no === current;
        return (
          <li key={label} className="flex items-center">
            <span
              aria-current={active ? "step" : undefined}
              aria-label={`STEP${no} ${label}`}
              className={[
                "flex min-h-9 items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.68rem] font-bold",
                "transition-all duration-300 sm:px-3 sm:text-[0.72rem]",
                active
                  ? "bg-brand text-white shadow-[0_8px_20px_-10px_rgba(25,92,199,0.7)]"
                  : done
                    ? "bg-brand-soft text-brand-deep"
                    : "bg-surface text-muted ring-1 ring-line",
              ].join(" ")}
            >
              <span aria-hidden>{done ? <AppIcon name="check" size={13} strokeWidth={STROKE.inline} /> : no}</span>
              <span
                aria-hidden
                className={active ? "inline" : "hidden sm:inline"}
              >
                {label}
              </span>
            </span>
            {i < NAVI_STEPS.length - 1 ? (
              <span aria-hidden className={`h-px w-2.5 sm:w-5 ${done ? "bg-brand/45" : "bg-line"}`} />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
