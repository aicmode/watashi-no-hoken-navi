import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

const FIELDS = [
  {
    emoji: "🧑",
    label: "生命保険",
    body: "人の病気・ケガ・死亡・生活などに関する備え。",
    examples: ["入院したとき", "働けなくなったとき", "家族に何かあったとき"],
    tone: "bg-brand-soft text-brand-deep",
  },
  {
    emoji: "🚗",
    label: "損害保険",
    body: "自動車・住まい・事故・物などのトラブルに関する備え。",
    examples: ["車の事故", "住まいのトラブル", "日常の思わぬ賠償"],
    tone: "bg-mint-soft text-mint",
  },
];

export function BasicsSection() {
  return (
    <section id="basics" className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="はじめの一歩"
          title="そもそも生命保険と損害保険って？"
          lead="細かい商品の話はここでは扱いません。大きく2つに分かれる、とだけ知っておけば十分です。"
        />

        <div className="stagger mt-8 grid gap-4 sm:grid-cols-2">
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
              <p className="text-balance-ja mt-4 text-[0.98rem] font-semibold leading-relaxed text-ink">
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
          ざっくり言えば「人に関すること」と「物・事故に関すること」。この区別がつくだけで、話がぐっと聞きやすくなります。
        </p>
      </Container>
    </section>
  );
}
