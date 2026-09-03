import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

/**
 * 初心者向けの「分野」紹介。
 * 会社ごとの取り扱い範囲を断定しないよう、あくまで "分野" の話に留める。
 */
const FIELDS = [
  {
    emoji: "👤",
    label: "生命保険",
    body: "死亡や生存など、人の生命に関わる保障を中心とする分野。",
    examples: ["家族に何かあったとき", "長生きに向けた備え"],
    tone: "bg-brand-soft text-brand-deep",
  },
  {
    emoji: "🚗",
    label: "損害保険",
    body: "自動車事故、住まい、物の損害など、偶然の事故による損害に備える分野。",
    examples: ["車の事故", "住まいのトラブル", "日常の思わぬ賠償"],
    tone: "bg-mint-soft text-mint",
  },
  {
    emoji: "🏥",
    label: "医療・傷害など",
    body: "病気やケガなどに備える分野。生命保険・損害保険の両方に関係する商品があります。",
    examples: ["入院したとき", "ケガをしたとき"],
    tone: "bg-amber-soft text-amber",
  },
];

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
          {FIELDS.map((f) => (
            <div
              key={f.label}
              className="rounded-3xl border border-line bg-surface p-6 shadow-[0_16px_40px_-32px_rgba(16,22,35,0.45)]"
            >
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${f.tone}`}
              >
                <span aria-hidden>{f.emoji}</span>
                {f.label}
              </span>
              <p className="text-balance-ja mt-4 text-[0.95rem] font-semibold leading-relaxed text-ink">
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
          ))}
        </div>

        <p className="text-balance-ja mt-6 text-[0.8rem] leading-relaxed text-muted">
          分野の境目はきれいに分かれているわけではなく、重なる商品もあります。ここでは「こういう分け方があるらしい」と知っておく程度で大丈夫です。
        </p>
      </Container>
    </section>
  );
}
