import { ButtonLink } from "../ui/Button";
import { Container } from "../ui/Container";
import { ANALOGY_CHIPS } from "@/data/analogies";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* 背景：やわらかいグラデーション（安心感を出すための控えめな装飾） */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, #eaf0ff 0%, rgba(234,240,255,0.35) 42%, rgba(246,247,250,0) 72%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-20 -z-10 size-72 rounded-full bg-mint-soft blur-3xl sm:size-96"
      />

      <Container>
        <div className="flex flex-col items-center pb-16 pt-14 text-center sm:pb-24 sm:pt-24">
          <span className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3.5 py-1.5 text-xs font-semibold text-ink-soft shadow-sm backdrop-blur">
            <span aria-hidden>🚗📱🏠</span>
            身近なものに例えて、保険を知る
          </span>

          <h1 className="text-balance-ja animate-fade-up mt-6 text-[2rem] font-bold leading-[1.35] tracking-tight text-ink sm:text-5xl sm:leading-[1.3]">
            保険を、
            <br className="sm:hidden" />
            もっとわかりやすく。
          </h1>

          <p
            className="text-balance-ja animate-fade-up mt-5 max-w-xl text-[0.98rem] leading-relaxed text-ink-soft sm:text-lg"
            style={{ animationDelay: "0.1s" }}
          >
            身近なものに置き換えながら、
            <br className="hidden sm:block" />
            あなたの暮らしに関係する“備え”を見てみませんか？
          </p>

          <div
            className="animate-fade-up mt-9 flex w-full flex-col items-center gap-3"
            style={{ animationDelay: "0.18s" }}
          >
            <ButtonLink href="/navi" size="lg" className="w-full sm:w-auto">
              自分に関係する備えを見てみる
              <span aria-hidden>→</span>
            </ButtonLink>
            <p className="text-xs text-muted">約1分・登録も入力もありません</p>
          </div>

          {/* 「自分にしっくりくる例えを選べる」ことを示すミニビジュアル */}
          <div
            className="animate-fade-up mt-14 w-full"
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
    <div className="rounded-3xl border border-line bg-surface/80 p-5 shadow-[0_20px_50px_-32px_rgba(16,22,35,0.35)] backdrop-blur sm:p-7">
      <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-2xl bg-canvas px-5 py-5 text-left">
          <p className="text-[0.7rem] font-semibold tracking-wide text-muted">
            自分にしっくりくる例えで
          </p>
          <ul className="mt-2.5 flex flex-wrap gap-2">
            {ANALOGY_CHIPS.map((a) => (
              <li
                key={a.id}
                className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-[0.8rem] font-bold text-ink shadow-[0_6px_16px_-12px_rgba(16,22,35,0.6)]"
              >
                <span aria-hidden>{a.emoji}</span>
                {a.label}
              </li>
            ))}
          </ul>
          <p className="mt-2.5 text-xs leading-relaxed text-ink-soft">
            3つの中から、いちばん想像しやすいものを選べます
          </p>
        </div>

        <div className="flex items-center justify-center" aria-hidden>
          <span className="grid size-9 place-items-center rounded-full bg-brand text-white">
            <span className="hidden sm:inline">→</span>
            <span className="sm:hidden">↓</span>
          </span>
        </div>

        <div className="rounded-2xl bg-brand-soft px-5 py-5 text-left">
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
