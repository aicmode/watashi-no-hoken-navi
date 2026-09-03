const STEPS = ["えらぶ", "知る", "考える"];

export function StepIndicator({ current }: { current: 1 | 2 | 3 }) {
  return (
    <ol className="flex items-center gap-2" aria-label="体験の進み具合">
      {STEPS.map((label, i) => {
        const no = i + 1;
        const done = no < current;
        const active = no === current;
        return (
          <li key={label} className="flex items-center gap-2">
            <span
              aria-current={active ? "step" : undefined}
              className={[
                "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.72rem] font-bold transition-colors duration-300",
                active
                  ? "bg-brand text-white"
                  : done
                    ? "bg-brand-soft text-brand-deep"
                    : "bg-line-soft text-muted",
              ].join(" ")}
            >
              <span aria-hidden>{done ? "✓" : no}</span>
              {label}
            </span>
            {i < STEPS.length - 1 ? (
              <span aria-hidden className="h-px w-3 bg-line sm:w-5" />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
