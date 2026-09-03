import { ContactCta } from "../ContactCta";
import { Button, ButtonLink } from "../ui/Button";
import type { LifeEvent } from "@/data/lifeEvents";

export function FinalStep({
  event,
  onRestart,
}: {
  event: LifeEvent;
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
          「{event.label}」という変化から、暮らしの備えを眺めてみました。全部を理解する必要はありません。気になるところが一つ見つかれば十分です。
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

        <div className="mt-7 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
          <Button variant="secondary" onClick={onRestart} className="w-full sm:w-auto">
            <span aria-hidden>↺</span>
            別のできごとで見てみる
          </Button>
          <ButtonLink href="/" variant="ghost" className="w-full sm:w-auto">
            トップにもどる
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
