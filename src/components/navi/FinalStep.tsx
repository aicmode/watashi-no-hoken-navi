import { ContactCta } from "../ContactCta";
import { Button, ButtonLink } from "../ui/Button";
import type { Analogy } from "@/data/analogies";
import type { LifeEvent } from "@/data/lifeEvents";

export function FinalStep({
  analogy,
  event,
  onChangeAnalogy,
  onChangeEvent,
  onRestart,
}: {
  analogy: Analogy;
  event: LifeEvent;
  onChangeAnalogy: () => void;
  onChangeEvent: () => void;
  onRestart: () => void;
}) {
  return (
    <div className="animate-fade-up">
      <div className="overflow-hidden rounded-3xl border border-line bg-surface p-7 text-center shadow-[0_24px_60px_-44px_rgba(16,22,35,0.7)] sm:p-10">
        <span aria-hidden className="text-3xl">
          🌤️
        </span>
        <h2 className="text-balance-ja mt-4 text-xl font-bold leading-relaxed text-ink sm:text-2xl">
          少しだけ、保険が身近になりましたか？
        </h2>
        <p className="text-balance-ja mx-auto mt-3.5 max-w-md text-[0.9rem] leading-relaxed text-ink-soft">
          「{analogy.title}」に置き換えながら、「{event.label}」という変化から暮らしの備えを眺めてみました。全部を覚えなくて大丈夫です。気になるところが一つ見つかれば十分です。
        </p>

        <div className="mx-auto mt-8 max-w-md rounded-2xl bg-canvas px-5 py-6">
          <p className="text-balance-ja text-[0.95rem] font-bold leading-relaxed text-ink">
            自分の場合はどうなのか、
            <br className="sm:hidden" />
            もう少し詳しく聞いてみる
          </p>
          <p className="text-balance-ja mt-2 text-[0.78rem] leading-relaxed text-muted">
            一般的な話ではなく、あなたの状況に合わせた話は、人に聞くのがいちばん早いこともあります。
          </p>
          <ContactCta className="mt-5 w-full" />
        </div>

        {/* 別の入口も試せることを、控えめに示す */}
        <div className="mx-auto mt-7 flex max-w-md flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[0.78rem] font-semibold">
          <TextLink onClick={onChangeAnalogy}>
            <span aria-hidden>{analogy.emoji}</span>
            別の例えで見てみる
          </TextLink>
          <span aria-hidden className="hidden h-3 w-px bg-line sm:block" />
          <TextLink onClick={onChangeEvent}>
            <span aria-hidden>↺</span>
            別のできごとで見てみる
          </TextLink>
        </div>

        <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
          <Button variant="secondary" onClick={onRestart} className="w-full sm:w-auto">
            はじめから見てみる
          </Button>
          <ButtonLink href="/" variant="ghost" className="w-full sm:w-auto">
            トップにもどる
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

function TextLink({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 py-2.5 text-muted underline-offset-4 transition-colors hover:text-brand hover:underline"
    >
      {children}
    </button>
  );
}
