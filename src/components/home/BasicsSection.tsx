import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { INSURANCE_FIELDS } from "@/data/preparedness";

export function BasicsSection() {
  return (
    <section id="basics" className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="はじめの一歩"
          title="そもそも保険にはどんな分野があるの？"
          lead="細かい商品の話はここでは扱いません。ざっくり分野があることを知っておくだけで十分です。"
        />

        <div className="stagger mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INSURANCE_FIELDS.map((f) => (
            <details
              key={f.label}
              className="group overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_16px_40px_-32px_rgba(16,22,35,0.45)]"
            >
              <summary className="flex min-h-44 cursor-pointer list-none flex-col p-6 marker:content-none">
                <span className="flex items-start justify-between gap-3">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${f.tone}`}
                  >
                    <span aria-hidden>{f.emoji}</span>
                    {f.label}
                  </span>
                  <span aria-hidden className="grid size-7 shrink-0 place-items-center rounded-full bg-canvas text-muted transition-transform group-open:rotate-45">
                    ＋
                  </span>
                </span>
                <span className="text-balance-ja mt-4 block text-[0.95rem] font-bold leading-relaxed text-ink">
                  「{f.question}」
                </span>
                <span className="mt-auto pt-3 text-[0.7rem] font-semibold text-brand">
                  分野の説明を見る
                </span>
              </summary>
              <div className="border-t border-line-soft px-6 pb-6 pt-4">
                <p className="text-balance-ja text-[0.83rem] leading-relaxed text-ink-soft">
                  {f.body}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {f.examples.map((ex) => (
                    <li
                      key={ex}
                      className="rounded-full bg-canvas px-3 py-1 text-[0.75rem] text-ink-soft"
                    >
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>

        <p className="text-balance-ja mt-6 text-[0.8rem] leading-relaxed text-muted">
          分野の境目はきれいに分かれているわけではなく、重なる商品もあります。ここでは「こういう分け方があるらしい」と知っておく程度で大丈夫です。
        </p>
      </Container>
    </section>
  );
}
