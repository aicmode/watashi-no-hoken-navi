import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

const VOICES = [
  {
    emoji: "🤔",
    quote: "保険って難しそう",
    reply: "言葉が難しいだけで、考え方はシンプルです。",
  },
  {
    emoji: "🙂",
    quote: "まだ自分には必要ない",
    reply: "今すぐ入る話ではなく、知っておく話です。",
  },
  {
    emoji: "😵‍💫",
    quote: "何を選べばいいかわからない",
    reply: "選ぶ前に、種類を眺めるところからで大丈夫。",
  },
];

export function EmpathySection() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="よく聞く声"
          title={
            <>
              そう思うのは、
              <br className="sm:hidden" />
              自然なことです。
            </>
          }
          lead="ほとんどの人が同じところでつまずきます。無理にわかろうとしなくて大丈夫です。"
        />

        <ul className="stagger mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
          {VOICES.map((v) => (
            <li
              key={v.quote}
              className="rounded-2xl border border-line bg-surface p-5 shadow-[0_12px_30px_-26px_rgba(16,22,35,0.5)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span aria-hidden className="text-xl">
                {v.emoji}
              </span>
              <p className="text-balance-ja mt-2.5 text-[0.98rem] font-bold text-ink">
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
