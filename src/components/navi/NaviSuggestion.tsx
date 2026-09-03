import { COVERAGE_MAP } from "@/data/coverages";
import type { LifeEvent } from "@/data/lifeEvents";
import { AppIcon } from "../ui/AppIcon";
import { IconScene } from "../ui/IconScene";
import { COVERAGE_SCENES } from "../ui/visuals";

/**
 * 簡易ナビ。
 * 商品の推薦ではなく「考える順番の目安」を示すだけ。
 * 断定的な推奨表現は使わない。
 */
export function NaviSuggestion({ event }: { event: LifeEvent }) {
  const items = event.suggested.map((id) => COVERAGE_MAP[id]);

  return (
    <div className="animate-fade-up rounded-[1.75rem] border border-brand/20 bg-brand-soft/45 p-6 shadow-[0_18px_48px_-40px_rgba(25,92,199,0.5)] sm:p-8">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-[0.7rem] font-bold text-brand-deep">
        <AppIcon name="compass" size={14} />
        かんたんナビ
      </span>

      <h3 className="text-balance-ja mt-3.5 text-[1.05rem] font-bold leading-relaxed text-ink sm:text-lg">
        今の暮らしから、考える入口を並べてみると
      </h3>
      <p className="text-balance-ja mt-2 text-[0.83rem] leading-relaxed text-ink-soft">
        {event.naviNote}
      </p>

      <ol className="mt-5 space-y-2.5">
        {items.map((c, i) => (
          <li
            key={c.id}
            className="scene-group flex items-center gap-3 rounded-2xl bg-surface px-4 py-3"
          >
            <span
              aria-hidden
              className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-soft text-[0.75rem] font-bold text-brand-deep"
            >
              {i + 1}
            </span>
            <IconScene
              {...COVERAGE_SCENES[c.id]}
              badge={undefined}
              variant="compact"
              size="sm"
              smSize="sm"
            />
            <span className="min-w-0 text-[0.92rem] font-bold text-ink">
              {c.title}
            </span>
          </li>
        ))}
      </ol>

      <p className="text-balance-ja mt-5 rounded-2xl bg-surface/70 px-4 py-3 text-[0.72rem] leading-relaxed text-muted">
        これは一般的な考え方の順番を示したもので、特定の保険商品をすすめるものではありません。実際にどうするかは、状況によって変わります。
      </p>
    </div>
  );
}
