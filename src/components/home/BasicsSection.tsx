import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { INSURANCE_FIELDS } from "@/data/preparedness";
import { AppIcon } from "../ui/AppIcon";
import { IconScene } from "../ui/IconScene";
import { FIELD_SCENES } from "../ui/visuals";

export function BasicsSection() {
  return (
    <section id="basics" className="bg-surface/55 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="はじめの一歩"
          title="そもそも保険にはどんな分野があるの？"
          lead="細かい商品の話はここでは扱いません。ざっくり分野があることを知っておくだけで十分です。"
        />

        <div className="stagger mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INSURANCE_FIELDS.map((f) => (
            <details
              key={f.label}
              className="group overflow-hidden rounded-3xl border border-line/80 bg-surface shadow-[0_18px_44px_-36px_rgba(13,27,47,0.5)] transition-all hover:border-brand/20 hover:shadow-[0_22px_48px_-34px_rgba(25,92,199,0.3)]"
            >
              <summary className="scene-group flex min-h-48 cursor-pointer list-none flex-col p-6 marker:content-none">
                <span className="flex items-start justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-3">
                    <IconScene {...FIELD_SCENES[f.label]} variant="life-event" />
                    <span
                      className={`inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ${f.tone}`}
                    >
                      {f.label}
                    </span>
                  </span>
                  <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full bg-canvas text-muted transition-transform group-open:rotate-180 group-open:bg-brand-soft group-open:text-brand">
                    <AppIcon name="chevron-down" size={16} />
                  </span>
                </span>
                <span className="text-balance-ja mt-4 block text-[0.95rem] font-bold leading-relaxed text-ink">
                  「{f.question}」
                </span>
                <span className="mt-auto pt-3 text-[0.7rem] font-semibold text-brand">
                  分野の説明を見る
                </span>
              </summary>
              <div className="details-reveal border-t border-line-soft">
                <div className="px-6 pb-6 pt-4">
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
