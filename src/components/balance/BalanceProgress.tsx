import { BALANCE_QUESTIONS } from "@/data/balance/questions";

/**
 * 質問の進み具合。
 * 7つの細いバーと「3 / 7」の表示だけにとどめ、狭い画面でも折り返さない。
 */
export function BalanceProgress({ current }: { current: number }) {
  const total = BALANCE_QUESTIONS.length;
  return (
    <div className="balance-progress flex items-center gap-3" aria-label={`全${total}問中${current}問目`}>
      <ol
        aria-hidden
        className="grid flex-1 gap-1"
        style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
      >
        {BALANCE_QUESTIONS.map((q, i) => (
          <li
            key={q.key}
            className={[
              "h-1 transition-colors duration-300",
              i < current ? "bg-brand" : "bg-line",
            ].join(" ")}
          />
        ))}
      </ol>
      <span aria-hidden className="shrink-0 text-[0.75rem] font-bold tabular-nums text-ink-soft">
        {current}
        <span className="text-muted"> / {total}</span>
      </span>
    </div>
  );
}
