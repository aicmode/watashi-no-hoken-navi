import { ButtonLink } from "../ui/Button";
import { Container } from "../ui/Container";
import { ANALOGY_CHIPS } from "@/data/analogies";
import { AppIcon } from "../ui/AppIcon";
import { IconScene } from "../ui/IconScene";
import { ANALOGY_SCENES } from "../ui/visuals";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line/60">
      {/* 背景：やわらかいグラデーション（安心感を出すための控えめな装飾） */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(95% 75% at 50% -5%, #dfeaff 0%, rgba(234,242,255,0.52) 45%, rgba(245,247,250,0) 78%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-12 -z-10 size-72 rounded-full bg-mint-soft/80 blur-3xl sm:size-[28rem]"
      />

      <Container>
        <div className="flex flex-col items-center pb-16 pt-14 text-center sm:pb-28 sm:pt-24">
          <span className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-brand/15 bg-surface/75 px-3.5 py-1.5 text-[0.7rem] font-bold tracking-[0.05em] text-brand-deep shadow-[0_8px_24px_-18px_rgba(13,27,47,0.55)] backdrop-blur">
            <AppIcon name="sparkles" size={14} />
            身近なものに例えて、保険を知る
          </span>

          <h1 className="text-balance-ja animate-fade-up mt-6 text-[2.35rem] font-bold leading-[1.28] tracking-[-0.045em] text-ink sm:mt-7 sm:text-[3.45rem] sm:leading-[1.18]">
            保険を、
            <br className="sm:hidden" />
            少し理解できる。
          </h1>

          <p
            className="text-balance-ja animate-fade-up mt-5 max-w-[36rem] text-[0.95rem] leading-[1.9] text-ink-soft sm:mt-6 sm:text-[1.05rem]"
            style={{ animationDelay: "0.1s" }}
          >
            身近なものに置き換えながら、
            <br className="hidden sm:block" />
            商品を選ぶ前に、暮らしと今ある“備え”を見てみませんか？
          </p>

          <div
            className="animate-fade-up mt-8 flex w-full flex-col items-center gap-3 sm:mt-9"
            style={{ animationDelay: "0.18s" }}
          >
            <ButtonLink href="/navi" size="lg" className="w-full sm:w-auto">
              自分に関係する備えを見てみる
              <AppIcon name="arrow-right" size={18} className="transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
            <p className="text-xs text-muted">約2〜3分・登録も入力もありません</p>
          </div>

          {/* 「自分にしっくりくる例えを選べる」ことを示すミニビジュアル */}
          <div
            className="animate-fade-up mt-12 w-full sm:mt-16"
            style={{ animationDelay: "0.26s" }}
          >
            <AnalogyStrip />
          </div>
        </div>
      </Container>
    </section>
  );
}

function AnalogyStrip() {
  return (
    <div className="rounded-[1.75rem] border border-surface bg-surface/76 p-3 shadow-[0_28px_70px_-42px_rgba(13,27,47,0.38)] ring-1 ring-line/70 backdrop-blur-xl sm:p-4">
      <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-2xl bg-canvas/85 px-5 py-5 text-left sm:px-6 sm:py-6">
          <p className="text-[0.67rem] font-bold tracking-[0.08em] text-muted">
            自分にしっくりくる例えで
          </p>
          <ul className="mt-2.5 flex flex-wrap gap-2">
            {ANALOGY_CHIPS.map((a) => (
              <li
                key={a.id}
                className="scene-group inline-flex items-center gap-2 rounded-2xl border border-line/70 bg-surface py-1.5 pl-1.5 pr-3 text-[0.78rem] font-bold text-ink shadow-[0_8px_18px_-16px_rgba(13,27,47,0.55)]"
              >
                <IconScene
                  {...ANALOGY_SCENES[a.id]}
                  badge={undefined}
                  satellite={undefined}
                  variant="compact"
                  size="xs"
                  smSize="xs"
                />
                {a.label}
              </li>
            ))}
          </ul>
          <p className="mt-2.5 text-xs leading-relaxed text-ink-soft">
            3つの中から、いちばん想像しやすいものを選べます
          </p>
        </div>

        <div className="flex items-center justify-center" aria-hidden>
          <span className="grid size-9 place-items-center rounded-full border border-brand/15 bg-surface text-brand shadow-sm">
            <AppIcon name="arrow-right" size={16} className="hidden sm:block" />
            <AppIcon name="arrow-down" size={16} className="sm:hidden" />
          </span>
        </div>

        <div className="scene-group rounded-2xl border border-brand/10 bg-brand-soft/80 px-5 py-5 text-left sm:px-6 sm:py-6">
          <IconScene
            icon="umbrella"
            badge="shield-check"
            tone="brand"
            decor="drops"
            variant="life-event"
            edge="#eaf2ff"
            className="mb-3"
          />
          <p className="text-[0.7rem] font-semibold tracking-wide text-brand-deep">
            暮らしなら
          </p>
          <p className="mt-1.5 text-[0.95rem] font-bold text-ink">暮らしの備え</p>
          <p className="mt-1 text-xs leading-relaxed text-ink-soft">
            病気・ケガ・事故など、もしもの影響を小さくする
          </p>
        </div>
      </div>
    </div>
  );
}
