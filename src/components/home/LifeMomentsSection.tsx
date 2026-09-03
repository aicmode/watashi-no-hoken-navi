import Link from "next/link";
import { LIFE_EVENTS } from "@/data/lifeEvents";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { AppIcon } from "../ui/AppIcon";
import { IconScene } from "../ui/IconScene";
import { LIFE_EVENT_SCENES } from "../ui/visuals";

export function LifeMomentsSection() {
  return (
    <section className="bg-surface/55 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="暮らしの変化から"
          title="備えを見直すきっかけになることがあります"
          lead="近い変化があれば、そこから体験を始めてみましょう。選択や入力内容は保存されません。"
        />
        <ul className="stagger mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {LIFE_EVENTS.map((event) => (
            <li key={event.id}>
              <Link
                href="/navi"
                className="group scene-group flex h-full min-h-32 flex-col justify-between rounded-3xl border border-line/80 bg-surface p-4 shadow-[0_14px_36px_-32px_rgba(13,27,47,0.55)] transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_20px_44px_-30px_rgba(25,92,199,0.35)] sm:p-5"
              >
                <IconScene {...LIFE_EVENT_SCENES[event.id]} variant="life-event" />
                <span className="mt-3 flex items-end justify-between gap-2">
                  <span className="text-balance-ja text-[0.82rem] font-bold leading-relaxed text-ink">
                    {event.label}
                  </span>
                  <AppIcon name="arrow-right" size={16} className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
