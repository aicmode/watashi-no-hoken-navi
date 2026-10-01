import Link from "next/link";
import { ButtonLink } from "../ui/Button";
import { Container } from "../ui/Container";
import { AppIcon } from "../ui/AppIcon";
import { IconScene } from "../ui/IconScene";

export function CtaBand() {
  return (
    <section className="home-cta pb-4 pt-6 sm:pb-8">
      <Container>
        <div className="navy-panel relative overflow-hidden rounded-[2rem] border border-gold/25 px-6 py-12 text-center shadow-[0_26px_70px_-42px_rgba(13,27,47,0.8)] sm:px-10 sm:py-16">
          <div aria-hidden className="gold-rule absolute inset-x-10 top-0" />
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
            <div>
              <Link
                href="/balance"
                className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-[0.8rem] font-semibold text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                守るお金と育てるお金を整理する
                <AppIcon name="arrow-right" size={15} className="text-gold" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
