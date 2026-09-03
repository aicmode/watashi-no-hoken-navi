import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { IconScene } from "../ui/IconScene";
import { STEP_SCENES } from "../ui/visuals";

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
    title: "暮らしとつなげて知る",
    body: "選んだ例えから、暮らしへの影響や考えてみたい問いへつなげます。",
  },
  {
    no: "04",
    title: "考える入口を知る",
    body: "今ある備えや、保険以外の方法も含めて考える視点を知ります。",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="体験の流れ"
          title="2〜3分で、こんなことがわかります"
        />
        <ol className="stagger relative mt-9 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {STEPS.map((s, index) => (
            <li
              key={s.no}
              className="scene-group relative rounded-3xl border border-line/80 bg-surface p-5 shadow-[0_15px_38px_-34px_rgba(13,27,47,0.55)] sm:min-h-48 sm:p-6"
            >
              <span
                aria-hidden
                className="absolute right-4 top-3 text-[2.8rem] font-black leading-none text-brand-soft"
              >
                {s.no}
              </span>
              {/* ステップは円形のタイルで、他セクションの角丸四角と描き分ける */}
              <IconScene
                {...STEP_SCENES[index]}
                variant="step"
                className="mb-4"
              />
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
