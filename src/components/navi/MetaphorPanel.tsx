import type { Analogy } from "@/data/analogies";
import type { LifeEvent } from "@/data/lifeEvents";
import { AppIcon } from "../ui/AppIcon";
import { analogyIconName } from "../ui/visuals";

/**
 * 「例え × ライフイベント」の説明パネル。
 * 左：選ばれた例えの世界 / 右：暮らしへの橋渡し / 下：考えるきっかけ
 */
export function MetaphorPanel({
  analogy,
  event,
}: {
  analogy: Analogy;
  event: LifeEvent;
}) {
  const story = analogy.lifeEventStories[event.id];

  return (
    <div className="animate-fade-up overflow-hidden rounded-[1.75rem] border border-line/80 bg-surface shadow-[0_24px_60px_-42px_rgba(13,27,47,0.58)]">
      <div className="grid gap-px bg-line sm:grid-cols-2">
        <Panel
          tone="metaphor"
          icon={analogyIconName(analogy.id)}
          badge={analogy.worldBadge}
          heading={story.heading}
          body={story.body}
        />
        <Panel
          tone="life"
          icon="home"
          badge="暮らしなら"
          heading={analogy.lifeHeading}
          body={story.lifeBody}
        />
      </div>
      <div className="border-t border-brand/10 bg-brand-soft/65 px-6 py-5 sm:px-8 sm:py-6">
        <p className="text-balance-ja text-[0.95rem] font-bold leading-relaxed text-brand-deep">
          {story.bridge}
        </p>
      </div>
      <div className="border-t border-brand/10 bg-surface px-6 py-6 sm:px-8 sm:py-7">
        <p className="text-[0.7rem] font-bold tracking-[0.08em] text-brand-deep">
          この変化で考えてみたいこと
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-3">
          {story.thinkingPoints.map((point, index) => (
            <li
              key={point}
              className="flex gap-3 rounded-2xl border border-line/70 bg-canvas/70 px-4 py-4"
            >
              <span aria-hidden className="grid size-7 shrink-0 place-items-center rounded-full bg-surface text-[0.68rem] font-black text-brand shadow-sm">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-balance-ja text-[0.78rem] leading-relaxed text-ink-soft">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Panel({
  tone,
  icon,
  badge,
  heading,
  body,
}: {
  tone: "metaphor" | "life";
  icon: "home" | ReturnType<typeof analogyIconName>;
  badge: string;
  heading: string;
  body: string;
}) {
  return (
    <div className="bg-surface px-6 py-7 sm:px-8 sm:py-8">
      <span
        className={[
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-bold",
          tone === "metaphor" ? "bg-canvas text-muted" : "bg-mint-soft text-mint",
        ].join(" ")}
      >
        <AppIcon name={icon} size={14} />
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
