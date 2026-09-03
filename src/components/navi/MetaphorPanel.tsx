import type { LifeEvent } from "@/data/lifeEvents";

export function MetaphorPanel({ event }: { event: LifeEvent }) {
  return (
    <div className="animate-fade-up overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_20px_50px_-38px_rgba(16,22,35,0.6)]">
      <div className="grid gap-px bg-line sm:grid-cols-2">
        <Panel
          tone="car"
          badge="クルマなら"
          heading={event.car.heading}
          body={event.car.body}
        />
        <Panel
          tone="life"
          badge="暮らしなら"
          heading={event.life.heading}
          body={event.life.body}
        />
      </div>
      <div className="bg-brand-soft/70 px-6 py-5 sm:px-7">
        <p className="text-balance-ja text-[0.95rem] font-bold leading-relaxed text-brand-deep">
          {event.bridge}
        </p>
      </div>
    </div>
  );
}

function Panel({
  tone,
  badge,
  heading,
  body,
}: {
  tone: "car" | "life";
  badge: string;
  heading: string;
  body: string;
}) {
  return (
    <div className="bg-surface px-6 py-6 sm:px-7 sm:py-7">
      <span
        className={[
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-bold",
          tone === "car"
            ? "bg-canvas text-muted"
            : "bg-mint-soft text-mint",
        ].join(" ")}
      >
        <span aria-hidden>{tone === "car" ? "🚗" : "🏡"}</span>
        {badge}
      </span>
      <h3 className="text-balance-ja mt-3 text-[1.05rem] font-bold text-ink">
        {heading}
      </h3>
      <p className="text-balance-ja mt-2.5 text-[0.88rem] leading-relaxed text-ink-soft">
        {body}
      </p>
    </div>
  );
}
