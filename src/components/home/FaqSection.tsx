import { FAQ_ITEMS } from "@/data/faq";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

export function FaqSection() {
  return (
    <section className="py-14 sm:py-20">
      <Container size="sm">
        <SectionHeading
          eyebrow="ミニFAQ"
          title="気になりやすいことを、先に確認"
        />
        <div className="mt-8 space-y-3">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              className="group overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_12px_30px_-28px_rgba(16,22,35,0.5)]"
            >
              <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-5 py-4 text-left marker:content-none">
                <span className="text-sm font-bold text-brand">Q.</span>
                <span className="min-w-0 flex-1 text-balance-ja text-[0.9rem] font-bold text-ink">
                  {item.question}
                </span>
                <span aria-hidden className="grid size-7 shrink-0 place-items-center rounded-full bg-canvas text-muted transition-transform group-open:rotate-45">
                  ＋
                </span>
              </summary>
              <div className="border-t border-line-soft px-5 py-4">
                <p className="text-balance-ja text-[0.84rem] leading-relaxed text-ink-soft">
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
