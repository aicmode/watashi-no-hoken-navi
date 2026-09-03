import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { IconScene } from "../ui/IconScene";
import { CONCERN_SCENES } from "../ui/visuals";

const VOICES = [
  {
    /** ビジュアルは visuals.ts の CONCERN_SCENES 側で管理する */
    visual: "difficult",
    quote: "保険って難しそう",
    reply: "言葉が難しいだけで、考え方はシンプルです。",
  },
  {
    visual: "not-yet",
    quote: "まだ自分には必要ない",
    reply: "今すぐ入る話ではなく、知っておく話です。",
  },
  {
    visual: "too-many",
    quote: "何を選べばいいかわからない",
    reply: "選ぶ前に、種類を眺めるところからで大丈夫。",
  },
];

export function EmpathySection() {
  return (
    <section className="bg-surface/50 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="はじめに"
          title="こんなふうに感じることはありませんか？"
          lead="保険には、難しく感じやすい言葉がたくさん出てきます。無理にわかろうとしなくて大丈夫です。"
        />

        <ul className="stagger mt-9 grid gap-3 sm:grid-cols-3 sm:gap-4">
          {VOICES.map((v) => (
            <li
              key={v.quote}
              className="scene-group rounded-3xl border border-line/80 bg-surface p-5 shadow-[0_16px_42px_-34px_rgba(13,27,47,0.48)] transition-all duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-[0_22px_46px_-32px_rgba(25,92,199,0.35)] sm:p-6"
            >
              <IconScene {...CONCERN_SCENES[v.visual]} variant="feature" />
              <p className="text-balance-ja mt-5 text-[0.98rem] font-bold text-ink">
                「{v.quote}」
              </p>
              <p className="text-balance-ja mt-2 text-[0.82rem] leading-relaxed text-muted">
                {v.reply}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
