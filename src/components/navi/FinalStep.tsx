import { ContactCta } from "../ContactCta";
import { Button, ButtonLink } from "../ui/Button";
import type { Analogy } from "@/data/analogies";
import type { LifeEvent } from "@/data/lifeEvents";
import { FINAL_LEARNINGS } from "@/data/preparedness";
import { AppIcon, STROKE } from "../ui/AppIcon";
import { IconScene } from "../ui/IconScene";
import { analogyIconName } from "../ui/visuals";

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
      <div className="relative overflow-hidden rounded-[2rem] border border-line/80 bg-surface p-6 text-center shadow-[0_28px_70px_-46px_rgba(13,27,47,0.7)] sm:p-11">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_50%_0%,rgba(234,242,255,0.95),transparent_72%)]" />
        <span className="scene-group relative mx-auto block w-fit">
          <IconScene
            icon="sparkles"
            badge="check"
            tone="brand"
            decor="rings"
            shape="circle"
            size="xl"
            smSize="2xl"
          />
        </span>
        <h2 className="text-balance-ja relative mt-4 text-xl font-bold leading-relaxed text-ink sm:text-2xl">
          少しだけ、保険が身近になりましたか？
        </h2>
        <p className="text-balance-ja mx-auto mt-3.5 max-w-md text-[0.9rem] leading-relaxed text-ink-soft">
          「{analogy.title}」に置き換えながら、「{event.label}」という変化から暮らしの備えを眺めてみました。全部を覚えなくて大丈夫です。気になるところが一つ見つかれば十分です。
        </p>

        <div className="mx-auto mt-7 max-w-lg rounded-2xl bg-brand-soft/55 px-5 py-5 text-left">
          <p className="text-[0.72rem] font-bold text-brand-deep">
            ここまでで分かったこと
          </p>
          <ul className="mt-3 space-y-2.5">
            {FINAL_LEARNINGS.map((learning) => (
              <li key={learning} className="flex gap-2.5">
                <span aria-hidden className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-surface text-brand"><AppIcon name="check" size={12} strokeWidth={STROKE.inline} /></span>
                <span className="text-balance-ja text-[0.82rem] font-semibold leading-relaxed text-ink-soft">
                  {learning}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-4 max-w-lg rounded-2xl bg-canvas px-5 py-6">
          <p className="text-balance-ja text-[0.95rem] font-bold leading-relaxed text-ink">
            自分の場合はどうなのか、
            <br className="sm:hidden" />
            もう少し詳しく聞いてみる
          </p>
          <p className="text-balance-ja mt-2 text-[0.78rem] leading-relaxed text-muted">
            自分の状況に合わせて整理したいときは、専門家と一緒に確認する方法もあります。
          </p>
          <ContactCta label="自分の場合について聞いてみる" className="mt-5 w-full" />
        </div>

        {/* 別の入口も試せることを、控えめに示す */}
        <div className="mx-auto mt-7 flex max-w-md flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[0.78rem] font-semibold">
          <TextLink onClick={onChangeAnalogy}>
            <AppIcon name={analogyIconName(analogy.id)} size={15} />
            別の例えで見てみる
          </TextLink>
          <span aria-hidden className="hidden h-3 w-px bg-line sm:block" />
          <TextLink onClick={onChangeEvent}>
            <AppIcon name="restart" size={15} />
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
      className="inline-flex min-h-11 items-center gap-1.5 py-2.5 text-muted underline-offset-4 transition-colors hover:text-brand hover:underline"
    >
      {children}
    </button>
  );
}
