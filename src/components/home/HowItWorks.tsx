import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

const STEPS = [
  {
    no: "01",
    title: "しっくりくる例えを選ぶ",
    body: "クルマ・スマホ・住まい。自分がいちばん想像しやすいものを1つ選びます。",
  },
  {
    no: "02",
    title: "最近の変化を選ぶ",
    body: "車を買った、結婚した、働き方が変わった。当てはまるものを1つ選ぶだけ。",
  },
  {
    no: "03",
    title: "選んだ例えで読む",
    body: "専門用語ではなく、選んだ例えの話に置き換えて説明します。",
  },
  {
    no: "04",
    title: "考える入口を知る",
    body: "「どこから見てみるとよさそうか」の目安が見えます。商品の紹介はしません。",
  },
];

export function HowItWorks() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="体験の流れ"
          title="1分で、こんなことがわかります"
        />
        <ol className="stagger mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {STEPS.map((s) => (
            <li
              key={s.no}
              className="relative overflow-hidden rounded-2xl border border-line bg-surface p-5"
            >
              <span
                aria-hidden
                className="absolute -right-1 -top-2 text-[3.2rem] font-black leading-none text-line-soft"
              >
                {s.no}
              </span>
              <p className="relative text-[0.95rem] font-bold text-ink">
                {s.title}
              </p>
              <p className="text-balance-ja relative mt-2 text-[0.82rem] leading-relaxed text-ink-soft">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
