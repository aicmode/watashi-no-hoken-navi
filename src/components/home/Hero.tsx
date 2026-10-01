import Link from "next/link";
import { ButtonLink } from "../ui/Button";
import { Container } from "../ui/Container";
import { ANALOGY_CHIPS } from "@/data/analogies";
import { AppIcon } from "../ui/AppIcon";
import { IconScene } from "../ui/IconScene";
import { ANALOGY_SCENES } from "../ui/visuals";

export function Hero() {
  return (
    <section className="editorial-hero">
      <Container>
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">身近なものに例えて、保険を知る</span>
            <h1 className="text-balance-ja hero-title">
              保険を、<br />少し理解できる。
            </h1>
            <p className="text-balance-ja hero-lead">
              身近なものに置き換えながら、<br className="hidden sm:block" />
              商品を選ぶ前に、暮らしと今ある“備え”を見てみませんか？
            </p>
            <div className="hero-actions">
              <ButtonLink href="/navi" size="lg" className="w-full sm:w-auto">
                自分に関係する備えを見てみる
                <AppIcon name="arrow-right" size={18} />
              </ButtonLink>
              <p className="text-xs text-muted">約2〜3分・登録も入力もありません</p>
              <Link href="/balance" className="hero-balance-link">
                <span className="font-display">守る × 育てる</span>
                <span>わたしのお金バランスも見てみる</span>
                <AppIcon name="arrow-right" size={15} />
              </Link>
            </div>
          </div>
          <AnalogyStrip />
        </div>
      </Container>
    </section>
  );
}

function AnalogyStrip() {
  return (
    <div className="hero-diagram">
      <div className="hero-diagram-top">
        <p className="text-xs font-semibold tracking-wide">自分にしっくりくる例えで</p>
        <ul className="hero-analogies">
          {ANALOGY_CHIPS.map((a, index) => (
            <li key={a.id}>
              <span aria-hidden className="hero-analogy-number">{String(index + 1).padStart(2, "0")}</span>
              <IconScene {...ANALOGY_SCENES[a.id]} badge={undefined} satellite={undefined} variant="compact" size="md" smSize="lg" />
              <span>{a.label}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs leading-relaxed">3つの中から、いちばん想像しやすいものを選べます</p>
      </div>
      <div className="hero-connector" aria-hidden><AppIcon name="arrow-down" size={22} /></div>
      <div className="hero-life">
        <div className="hero-life-orbit" aria-hidden>
          <AppIcon name="umbrella" size={64} />
          <span className="hero-orbit-dot"><AppIcon name="shield-check" size={24} /></span>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wide">暮らしなら</p>
          <p className="font-display mt-2 text-2xl sm:text-3xl">暮らしの備え</p>
          <p className="mt-3 text-xs leading-relaxed">病気・ケガ・事故など、もしもの影響を小さくする</p>
        </div>
      </div>
    </div>
  );
}
