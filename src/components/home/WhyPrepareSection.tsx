import { WHY_PREPARE } from "@/data/preparedness";
import { Container } from "../ui/Container";

export function WhyPrepareSection() {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <div className="overflow-hidden rounded-3xl border border-brand/20 bg-surface shadow-[0_18px_46px_-36px_rgba(31,86,214,0.55)]">
          <div className="grid sm:grid-cols-[auto_1fr] sm:items-center">
            <div className="grid min-h-28 place-items-center bg-brand-soft px-7 py-6 text-4xl sm:min-h-full sm:w-36">
              <span aria-hidden>🌦️</span>
            </div>
            <div className="px-6 py-6 sm:px-8 sm:py-7">
              <p className="text-xs font-semibold tracking-wide text-brand-deep">
                {WHY_PREPARE.eyebrow}
              </p>
              <h2 className="text-balance-ja mt-2 text-xl font-bold text-ink sm:text-2xl">
                {WHY_PREPARE.title}
              </h2>
              <p className="text-balance-ja mt-3 text-[0.9rem] leading-relaxed text-ink-soft">
                {WHY_PREPARE.body}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
