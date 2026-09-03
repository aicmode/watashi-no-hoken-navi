import { FAQ_ITEMS } from "@/data/faq";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { AppIcon } from "../ui/AppIcon";
import { IconScene } from "../ui/IconScene";

export function FaqSection() {
  return (
    <section className="section-grid py-16 sm:py-24">
      <Container size="sm">
        <SectionHeading
          eyebrow="ミニFAQ"
          title="気になりやすいことを、先に確認"
        />
        <div className="mt-9 space-y-3">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              className="group overflow-hidden rounded-2xl border border-line/80 bg-surface shadow-[0_14px_34px_-30px_rgba(13,27,47,0.46)] transition-colors open:border-brand/25"
            >
              <summary className="scene-group flex min-h-14 cursor-pointer list-none items-center gap-3 px-5 py-4 text-left marker:content-none">
                {/* FAQ は小さな円形タイル。他セクションの角丸四角と描き分ける */}
                <IconScene
                  icon="help"
                  label="Q"
                  tone="brand"
                  decor="none"
                  variant="compact"
                  shape="circle"
                  size="sm"
                  smSize="sm"
                />
                <span className="min-w-0 flex-1 text-balance-ja text-[0.9rem] font-bold text-ink">
                  {item.question}
                </span>
                <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full bg-canvas text-muted transition-all group-open:rotate-180 group-open:bg-brand-soft group-open:text-brand">
                  <AppIcon name="chevron-down" size={16} />
                </span>
              </summary>
              <div className="details-reveal border-t border-line-soft"><div>
                <p className="text-balance-ja px-5 py-5 text-[0.84rem] leading-relaxed text-ink-soft">
                  {item.answer}
                </p>
              </div></div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
