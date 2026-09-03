import { WHY_PREPARE } from "@/data/preparedness";
import { Container } from "../ui/Container";
import { ProtectionScene } from "../ui/ProtectionScene";

export function WhyPrepareSection() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="overflow-hidden rounded-[1.75rem] border border-brand/15 bg-surface shadow-[0_24px_60px_-44px_rgba(25,92,199,0.48)]">
          <div className="grid sm:grid-cols-[15.5rem_1fr] sm:items-stretch">
            {/* 「暮らし → もしも → 備え」をひと目で見せるコンセプトビジュアル */}
            <div className="section-grid grid place-items-center bg-brand-soft/70 px-6 py-8 sm:px-6 sm:py-9">
              <ProtectionScene />
            </div>
            <div className="px-6 py-7 sm:px-9 sm:py-9">
              <p className="text-[0.7rem] font-bold tracking-[0.1em] text-brand-deep">
                {WHY_PREPARE.eyebrow}
              </p>
              <h2 className="text-balance-ja mt-2.5 text-xl font-bold text-ink sm:text-[1.65rem]">
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
