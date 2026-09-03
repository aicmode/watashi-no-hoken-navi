import { ButtonLink } from "../ui/Button";
import { Container } from "../ui/Container";

export function CtaBand() {
  return (
    <section className="pb-4 pt-6 sm:pb-8">
      <Container>
        <div className="relative overflow-hidden rounded-[1.75rem] bg-ink px-6 py-11 text-center sm:px-10 sm:py-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(90% 120% at 50% 0%, rgba(31,86,214,0.55) 0%, rgba(31,86,214,0) 65%)",
            }}
          />
          <div className="relative">
            <h2 className="text-balance-ja text-xl font-bold leading-relaxed text-white sm:text-2xl">
              まずは、眺めてみるだけで大丈夫です。
            </h2>
            <p className="text-balance-ja mx-auto mt-3 max-w-md text-[0.9rem] leading-relaxed text-white/70">
              入力も登録もありません。選ぶのは、しっくりくる例えと、最近あった変化だけ。
            </p>
            <ButtonLink
              href="/navi"
              size="lg"
              variant="secondary"
              className="mt-7 w-full sm:w-auto"
            >
              自分に関係する備えを見てみる
              <span aria-hidden>→</span>
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
