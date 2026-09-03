import Link from "next/link";
import { LIFE_EVENTS } from "@/data/lifeEvents";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

export function LifeMomentsSection() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="暮らしの変化から"
          title="備えを見直すきっかけになることがあります"
          lead="近い変化があれば、そこから体験を始めてみましょう。選択や入力内容は保存されません。"
        />
        <ul className="stagger mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {LIFE_EVENTS.map((event) => (
            <li key={event.id}>
              <Link
                href="/navi"
                className="group flex min-h-24 h-full flex-col justify-between rounded-2xl border border-line bg-surface p-4 shadow-[0_12px_30px_-28px_rgba(16,22,35,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40"
              >
                <span aria-hidden className="text-xl">{event.emoji}</span>
                <span className="mt-3 flex items-end justify-between gap-2">
                  <span className="text-balance-ja text-[0.82rem] font-bold leading-relaxed text-ink">
                    {event.label}
                  </span>
                  <span aria-hidden className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
