import { ButtonLink } from "../ui/Button";
import { Container } from "../ui/Container";
import { AppIcon } from "../ui/AppIcon";
import { IconScene } from "../ui/IconScene";

export function CtaBand() {
  return (
    <section className="pb-4 pt-6 sm:pb-8">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink px-6 py-12 text-center shadow-[0_26px_70px_-42px_rgba(13,27,47,0.8)] sm:px-10 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(90% 120% at 50% 0%, rgba(31,86,214,0.55) 0%, rgba(31,86,214,0) 65%)",
            }}
          />
          <div className="scene-group relative">
            {/* CTA は「守り」を表すシールドのバッジ */}
            <IconScene
              icon="shield-check"
              badge="check"
              tone="ink"
              decor="rings"
              shape="circle"
              size="xl"
              smSize="xl"
              className="mb-5"
            />
            <h2 className="text-balance-ja text-xl font-bold leading-relaxed text-white sm:text-2xl">
              まずは、眺めてみるだけで大丈夫です。
            </h2>
            <p className="text-balance-ja mx-auto mt-3 max-w-md text-[0.9rem] leading-relaxed text-white/70">
              入力も登録もありません。身近な例えから、自分の暮らしと今ある備えを整理できます。
            </p>
            <ButtonLink
              href="/navi"
              size="lg"
              variant="secondary"
              className="mt-7 w-full sm:w-auto"
            >
              自分に関係する備えを見てみる
              <AppIcon name="arrow-right" size={18} className="transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
