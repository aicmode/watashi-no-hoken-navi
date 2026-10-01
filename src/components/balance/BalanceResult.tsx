import { optionLabel } from "@/data/balance/questions";
import type { BalanceAnswers } from "@/data/balance/types";
import type { BalanceResult as Result } from "@/lib/balance/evaluate";
import { ContactCta } from "../ContactCta";
import { AppIcon } from "../ui/AppIcon";
import { Button, ButtonLink } from "../ui/Button";
import { Container } from "../ui/Container";
import { BalanceMeter } from "./BalanceMeter";
import { GrowColumn } from "./GrowColumn";
import { ProtectColumn } from "./ProtectColumn";

/**
 * 結果画面。
 *
 *   1. あなたのお金バランス（守る・育てるのメーター、まず考えてみたいこと、考え方）
 *   2. 守るお金と育てるお金を左右に並べた一覧
 *   3. 相談 CTA → 見直し・やり直しの導線 → 注意書き
 *
 * 点数・ランク付け・商品名は出さず、「考える順番の目安」として見せる。
 */
export function BalanceResult({
  answers,
  result,
  onReview,
  onRestart,
}: {
  answers: BalanceAnswers;
  result: Result;
  onReview: () => void;
  onRestart: () => void;
}) {
  const profile = [
    optionLabel("age", answers.age),
    optionLabel("household", answers.household),
    `気になること：${optionLabel("concern", answers.concern)}`,
  ];

  return (
    <div className="balance-result space-y-10 sm:space-y-14">
      <Container>
        <section className="animate-fade-up" aria-labelledby="balance-result-title">
          <div className="result-heading">
            <span className="eyebrow">YOUR MONEY BALANCE</span>
            <h1
              id="balance-result-title"
              className="text-balance-ja mt-3 text-[1.8rem] font-semibold leading-[1.5] text-ink sm:text-[2.4rem]"
            >
              あなたのお金バランス
            </h1>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {profile.map((p) => (
                <li
                  key={p}
                  className="rounded-full border border-line bg-surface px-3 py-1 text-[0.72rem] font-semibold text-ink-soft"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="result-report mt-8">
            {/* 守る × 育てる を同じ高さ・同じ形で並べる */}
            <div className="balance-axis">
              <BalanceMeter
                side="protect"
                title="守る"
                caption="生命保険・生活防衛"
                level={result.protectLevel}
              />
              <span
                aria-hidden
                className="balance-axis-cross"
              >
                ×
              </span>
              <BalanceMeter
                side="grow"
                title="育てる"
                caption="将来の資産形成"
                level={result.growLevel}
              />
            </div>

            <div className="gold-rule mx-6 sm:mx-9" />

            <div className="result-focus grid gap-6 p-6 sm:grid-cols-[1.1fr_1fr] sm:gap-8 sm:p-9">
              <div>
                <h2 className="text-[1.1rem] font-semibold text-ink sm:text-[1.2rem]">
                  まず考えてみたいこと
                </h2>
                <ol className="mt-4 space-y-2">
                  {result.focus.map((f, i) => {
                    const isProtect = f.side === "protect";
                    return (
                      <li
                        key={`${f.side}-${f.id}`}
                        className="flex items-center gap-3 rounded-2xl border border-line/80 bg-canvas/60 px-4 py-3"
                      >
                        <span
                          aria-hidden
                          className="font-display grid size-7 shrink-0 place-items-center rounded-full bg-surface text-[0.8rem] font-semibold text-gold-deep ring-1 ring-gold/30"
                        >
                          {i + 1}
                        </span>
                        <span className="text-balance-ja min-w-0 flex-1 text-[0.9rem] font-bold text-ink">
                          {f.label}
                        </span>
                        <span
                          className={[
                            "shrink-0 rounded-full px-2 py-0.5 text-[0.65rem] font-bold",
                            isProtect ? "bg-brand-soft text-brand-deep" : "bg-mint-soft text-mint",
                          ].join(" ")}
                        >
                          {isProtect ? "守る" : "育てる"}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div className="navy-panel relative flex flex-col justify-center overflow-hidden rounded-3xl px-6 py-6 text-white sm:px-7">
                <span aria-hidden className="font-display absolute -top-3 right-5 text-[5rem] leading-none text-gold/30">
                  “
                </span>
                <p className="text-[0.7rem] font-bold tracking-[0.12em] text-gold">
                  あなたに合いそうな考え方
                </p>
                <h2 className="mt-2 text-[1.1rem] font-semibold leading-relaxed text-white">
                  {result.approach.title}
                </h2>
                <p className="text-balance-ja mt-2 text-[0.86rem] leading-[1.85] text-white/80">
                  {result.approach.body}
                </p>
              </div>
            </div>
          </div>
        </section>
      </Container>

      <Container size="lg">
        <section aria-labelledby="balance-columns-title" className="animate-fade-up">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">PROTECT × GROW</span>
            <h2
              id="balance-columns-title"
              className="text-balance-ja mt-3 text-[1.45rem] font-semibold leading-[1.55] text-ink sm:text-[1.8rem]"
            >
              守るお金と育てるお金を、並べて見てみる
            </h2>
            <p className="text-balance-ja mt-2 text-[0.86rem] leading-relaxed text-ink-soft">
              保険だけ・投資だけではなく、両方を並べると「どちらから考えるか」が見えやすくなります。回答と関係が深そうなものから並べています。
            </p>
          </div>
          <div className="mt-8 grid items-start gap-4 lg:grid-cols-2 lg:gap-5">
            <ProtectColumn items={result.protect} />
            <GrowColumn options={result.grow} />
          </div>
        </section>
      </Container>

      <Container>
        <section className="result-cta surface-card animate-fade-up rounded-[2rem] px-6 py-8 text-center sm:px-10 sm:py-10">
          <span className="eyebrow">NEXT STEP</span>
          <h2 className="text-balance-ja mt-3 text-[1.3rem] font-semibold leading-[1.6] text-ink sm:text-[1.6rem]">
            自分の場合はどう考えればいい？
          </h2>
          <p className="text-balance-ja mx-auto mt-2 max-w-md text-[0.84rem] leading-relaxed text-ink-soft">
            今ある保障や貯蓄、勤務先の制度によって、考える順番は変わります。結果をもとに、専門家と一緒に整理する方法もあります。
          </p>
          <ContactCta label="保険と資産形成を一緒に整理してみる" className="mt-6 w-full sm:w-auto" />

          <div className="mt-8 flex flex-col items-stretch justify-center gap-2 sm:flex-row sm:items-center sm:gap-3">
            <Button variant="secondary" onClick={onReview} className="w-full sm:w-auto">
              <AppIcon name="arrow-left" size={17} />
              回答を見直す
            </Button>
            <Button variant="secondary" onClick={onRestart} className="w-full sm:w-auto">
              <AppIcon name="restart" size={16} />
              もう一度チェックする
            </Button>
            <ButtonLink href="/navi" variant="ghost" className="w-full sm:w-auto">
              身近な例えで備えを見る
            </ButtonLink>
          </div>
        </section>

        <aside
          aria-label="ご利用にあたって"
          className="mx-auto mt-6 max-w-2xl rounded-2xl border border-line/80 bg-surface/70 px-5 py-4"
        >
          <p className="flex items-start gap-2 text-[0.72rem] leading-relaxed text-muted">
            <AppIcon name="info" size={14} className="mt-0.5 shrink-0" />
            <span className="text-balance-ja">
              この結果は、回答をもとに考える順番の目安を示した一般的な情報です。特定の金融商品・保険商品の勧誘や推奨ではなく、将来の運用成果を示すものでもありません。具体的な契約や投資の判断は、専門家などにご相談ください。
            </span>
          </p>
        </aside>
      </Container>
    </div>
  );
}
