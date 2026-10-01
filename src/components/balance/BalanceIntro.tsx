import { BALANCE_QUESTIONS } from "@/data/balance/questions";
import { Button } from "../ui/Button";
import { AppIcon, type AppIconName } from "../ui/AppIcon";
import { BalanceEmblem } from "./BalanceEmblem";

const SIDES: {
  side: "protect" | "grow";
  icon: AppIconName;
  title: string;
  body: string;
  examples: string[];
}[] = [
  {
    side: "protect",
    icon: "shield-check",
    title: "守るお金",
    body: "病気・ケガ・働けないときなど、もしもの影響を小さくするお金。",
    examples: ["生活防衛資金", "医療", "死亡保障", "収入の減少"],
  },
  {
    side: "grow",
    icon: "sprout",
    title: "育てるお金",
    body: "老後や教育費など、少し先の暮らしのために準備していくお金。",
    examples: ["預貯金", "NISA", "iDeCo", "長期の積立"],
  },
];

/** はじめの画面：守る × 育てる の考え方を1枚で伝える */
export function BalanceIntro({ onStart }: { onStart: () => void }) {
  return (
    <section className="balance-intro animate-fade-up">
      <div className="flex flex-col items-center text-center">
        <BalanceEmblem />
        <span className="eyebrow mt-6">守る × 育てる かんたんチェック</span>
        <h1 className="text-balance-ja mt-3 text-[1.8rem] font-semibold leading-[1.5] text-ink sm:text-[2.4rem]">
          わたしのお金バランス
        </h1>
        <p className="text-balance-ja mt-3 max-w-xl text-[0.92rem] leading-[1.9] text-ink-soft">
          保険だけ、投資だけで考えるのではなく、2つのお金を同じ机に並べてみましょう。いま何から考えるとよさそうかが見えてきます。
        </p>
      </div>

      <div className="relative mt-9 grid gap-3 sm:grid-cols-2 sm:gap-4">
        {SIDES.map((s) => {
          const isProtect = s.side === "protect";
          return (
            <div
              key={s.side}
              className="surface-card relative overflow-hidden rounded-3xl p-5 sm:p-6"
            >
              <span
                aria-hidden
                className={`absolute inset-x-0 top-0 h-[3px] ${isProtect ? "bg-brand/70" : "bg-mint/70"}`}
              />
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className={[
                    "grid size-10 place-items-center rounded-full",
                    isProtect ? "bg-brand-soft text-brand" : "bg-mint-soft text-mint",
                  ].join(" ")}
                >
                  <AppIcon name={s.icon} size={20} />
                </span>
                <h2 className="text-[1.25rem] font-semibold text-ink">{s.title}</h2>
              </div>
              <p className="text-balance-ja mt-3 text-[0.84rem] leading-relaxed text-ink-soft">
                {s.body}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {s.examples.map((ex) => (
                  <li
                    key={ex}
                    className={[
                      "rounded-full px-2.5 py-1 text-[0.72rem] font-semibold",
                      isProtect ? "bg-brand-soft/70 text-brand-deep" : "bg-mint-soft text-mint",
                    ].join(" ")}
                  >
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="mt-9 flex flex-col items-center gap-3">
        <Button size="lg" onClick={onStart} className="w-full sm:w-auto">
          {BALANCE_QUESTIONS.length}つの質問ではじめる
          <AppIcon name="arrow-right" size={18} className="transition-transform group-hover:translate-x-0.5" />
        </Button>
        <p className="text-balance-ja text-center text-xs leading-relaxed text-muted">
          約1分・選ぶだけ。回答はこの画面の中だけで使われ、保存・送信されません。
        </p>
      </div>
    </section>
  );
}
