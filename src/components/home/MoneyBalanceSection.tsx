import { BALANCE_QUESTIONS } from "@/data/balance/questions";
import { ButtonLink } from "../ui/Button";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { AppIcon, type AppIconName } from "../ui/AppIcon";
import { BalanceEmblem } from "../balance/BalanceEmblem";

const SIDES: {
  side: "protect" | "grow";
  icon: AppIconName;
  title: string;
  caption: string;
  items: string[];
}[] = [
  {
    side: "protect",
    icon: "shield-check",
    title: "守るお金",
    caption: "もしもに備える",
    items: ["生活防衛資金", "医療への備え", "死亡保障", "働けないときの収入"],
  },
  {
    side: "grow",
    icon: "sprout",
    title: "育てるお金",
    caption: "先の暮らしに備える",
    items: ["預貯金", "NISA", "iDeCo", "長期・積立・分散"],
  },
];

/** TOP：保険（守る）と資産形成（育てる）を1つのチェックで整理できることを伝える */
export function MoneyBalanceSection() {
  return (
    <section id="money-balance" className="home-balance py-16 sm:py-24">
      <Container>
        <div className="surface-card relative overflow-hidden rounded-[2rem] px-5 py-9 sm:px-10 sm:py-12">
          <div aria-hidden className="gold-rule absolute inset-x-10 top-0" />
          <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-10">
            <div>
              <SectionHeading
                eyebrow="守る × 育てる"
                title="保険と資産形成を、ひとつのバランスで"
                lead="もしもに備える「守るお金」と、将来に向けた「育てるお金」。どちらか一方ではなく、並べて眺めると、いま何から考えるとよさそうかが見えてきます。"
              />
              <div className="mt-7 flex flex-col items-start gap-2.5">
                <ButtonLink href="/balance" size="lg" className="w-full sm:w-auto">
                  わたしのお金バランスを見てみる
                  <AppIcon name="arrow-right" size={18} className="transition-transform group-hover:translate-x-0.5" />
                </ButtonLink>
                <p className="text-xs text-muted">
                  約1分・{BALANCE_QUESTIONS.length}つの質問に選んで答えるだけ
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-canvas/80 p-4 ring-1 ring-line/70 sm:p-5">
              <div className="flex justify-center pb-4 pt-1">
                <BalanceEmblem size="md" smSize="lg" edge="#f8f6f1" />
              </div>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {SIDES.map((s) => {
                  const isProtect = s.side === "protect";
                  return (
                    <div key={s.side} className="relative overflow-hidden rounded-2xl bg-surface p-4 shadow-sm">
                      <span
                        aria-hidden
                        className={`absolute inset-x-0 top-0 h-[3px] ${isProtect ? "bg-brand/70" : "bg-mint/70"}`}
                      />
                      <p className="flex items-center gap-1.5">
                        <AppIcon name={s.icon} size={16} className={isProtect ? "text-brand" : "text-mint"} />
                        <span className="font-display text-[1.02rem] font-semibold text-ink">{s.title}</span>
                      </p>
                      <p className="mt-0.5 text-[0.68rem] font-semibold text-muted">{s.caption}</p>
                      <ul className="mt-3 space-y-1.5">
                        {s.items.map((item) => (
                          <li key={item} className="flex items-center gap-1.5 text-[0.76rem] font-semibold text-ink-soft">
                            <span
                              aria-hidden
                              className={`size-1.5 shrink-0 rounded-full ${isProtect ? "bg-brand" : "bg-mint"}`}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
              <p className="text-balance-ja mt-3 px-1 text-[0.7rem] leading-relaxed text-muted">
                特定の保険や金融商品をすすめるものではありません。考える順番を整理するための体験です。
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
