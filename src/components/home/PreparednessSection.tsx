import {
  CHECK_POINTS,
  PREPAREDNESS_OPTIONS,
  THINKING_PERSPECTIVES,
} from "@/data/preparedness";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

export function PreparednessSection() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="商品を選ぶ前に"
          title="保険を考えるときの3つの視点"
          lead="保険を「お金を受け取るもの」とだけ見るのではなく、暮らしに起こる変化と、その影響を順番に見ていくと整理しやすくなります。"
        />

        <ol className="stagger mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
          {THINKING_PERSPECTIVES.map((item) => (
            <li
              key={item.no}
              className="rounded-2xl border border-line bg-surface p-5 shadow-[0_12px_30px_-28px_rgba(16,22,35,0.5)]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-canvas text-xl" aria-hidden>
                  {item.emoji}
                </span>
                <span className="text-xs font-bold text-line">{item.no}</span>
              </div>
              <h3 className="text-balance-ja mt-4 text-[0.95rem] font-bold text-ink">
                {item.title}
              </h3>
              <p className="text-balance-ja mt-2 text-[0.8rem] leading-relaxed text-muted">
                {item.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <details className="group overflow-hidden rounded-3xl border border-mint/20 bg-mint-soft/55">
            <summary className="flex min-h-40 cursor-pointer list-none flex-col p-6 marker:content-none sm:p-7">
              <span className="flex items-start justify-between gap-3">
                <span className="inline-flex rounded-full bg-surface px-3 py-1 text-xs font-bold text-mint">
                  いくつかの方法を組み合わせる
                </span>
                <span aria-hidden className="grid size-7 shrink-0 place-items-center rounded-full bg-surface text-muted transition-transform group-open:rotate-45">＋</span>
              </span>
              <h3 className="text-balance-ja mt-3 text-lg font-bold text-ink">
                備え方は、保険だけではありません。
              </h3>
              <p className="text-balance-ja mt-2 text-[0.8rem] leading-relaxed text-ink-soft">
                自分にすでにあるものと、足りない部分を整理します。
              </p>
              <span className="mt-auto pt-3 text-[0.7rem] font-semibold text-mint">4つの選択肢を見る</span>
            </summary>
            <div className="border-t border-mint/15 px-6 pb-6 pt-4 sm:px-7">
              <p className="text-balance-ja text-[0.82rem] leading-relaxed text-ink-soft">
                すべてを保険で備える必要はありません。
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-2">
                {PREPAREDNESS_OPTIONS.map((option) => (
                  <li
                    key={option.label}
                    className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl bg-surface px-2 py-2 text-center text-[0.78rem] font-semibold text-ink-soft sm:min-h-11 sm:flex-row sm:gap-2 sm:px-3 sm:text-left"
                  >
                    <span aria-hidden>{option.emoji}</span>
                    {option.label}
                  </li>
                ))}
              </ul>
            </div>
          </details>

          <details className="group overflow-hidden rounded-3xl border border-line bg-surface">
            <summary className="flex min-h-40 cursor-pointer list-none flex-col p-6 marker:content-none sm:p-7">
              <span className="flex items-start justify-between gap-3">
                <span className="inline-flex rounded-full bg-amber-soft px-3 py-1 text-xs font-bold text-amber">
                  まず確認してみるもの
                </span>
                <span aria-hidden className="grid size-7 shrink-0 place-items-center rounded-full bg-canvas text-muted transition-transform group-open:rotate-45">＋</span>
              </span>
              <h3 className="text-balance-ja mt-3 text-lg font-bold text-ink">
                今ある備えを確認してみる
              </h3>
              <p className="text-balance-ja mt-2 text-[0.8rem] leading-relaxed text-ink-soft">
                入力や保存はしません。手元で確認する項目として眺めてみましょう。
              </p>
              <span className="mt-auto pt-3 text-[0.7rem] font-semibold text-brand">6つの確認項目を見る</span>
            </summary>
            <ul className="grid gap-x-4 gap-y-2 border-t border-line-soft px-6 pb-6 pt-4 sm:grid-cols-2 sm:px-7">
              {CHECK_POINTS.map((point) => (
                <li key={point} className="flex min-h-11 items-center gap-2.5 text-[0.82rem] text-ink-soft">
                  <span
                    aria-hidden
                    className="grid size-5 shrink-0 place-items-center rounded-md border border-line bg-canvas text-[0.65rem] text-muted"
                  >
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </details>
        </div>
      </Container>
    </section>
  );
}
