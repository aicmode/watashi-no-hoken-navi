import {
  PRIORITY_TIER_LABEL,
  PROTECT_MEANS_LABEL,
  type PriorityTier,
} from "@/data/balance/protectItems";
import type { RankedProtect } from "@/lib/balance/evaluate";
import { AppIcon } from "../ui/AppIcon";
import { IconScene } from "../ui/IconScene";
import { PROTECT_SCENES } from "../ui/visuals";
import { ColumnShell } from "./ColumnShell";

const TIER_STYLE: Record<PriorityTier, string> = {
  first: "bg-brand text-white",
  check: "bg-brand-soft text-brand-deep",
  later: "bg-canvas text-muted ring-1 ring-line",
};

/** 守るお金：生活防衛資金と、生命保険で考えることの多い保障を優先度順に並べる */
export function ProtectColumn({ items }: { items: RankedProtect[] }) {
  return (
    <ColumnShell
      side="protect"
      title="守るお金"
      caption="生命保険・生活防衛"
      note="保険だけでなく、貯蓄・公的な制度・勤務先の制度も含めて、今あるものから確認します。"
    >
      <ul className="space-y-2.5">
        {items.map(({ item, tier }) => (
          <li
            key={item.id}
            className={[
              "scene-group rounded-2xl border bg-surface p-4",
              tier === "first" ? "border-brand/30 shadow-[0_14px_34px_-28px_rgba(29,75,143,0.7)]" : "border-line/80",
            ].join(" ")}
          >
            <div className="flex items-start gap-3">
              <IconScene {...PROTECT_SCENES[item.id]} badge={undefined} variant="compact" size="sm" smSize="sm" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <h4 className="text-[0.95rem] font-bold text-ink">{item.title}</h4>
                  <span className={`rounded-full px-2 py-0.5 text-[0.64rem] font-bold ${TIER_STYLE[tier]}`}>
                    {PRIORITY_TIER_LABEL[tier]}
                  </span>
                </div>
                <p className="text-balance-ja mt-1 text-[0.8rem] leading-relaxed text-ink-soft">
                  {item.summary}
                </p>
                {tier === "first" ? (
                  <p className="text-balance-ja mt-2 flex gap-1.5 rounded-xl bg-brand-soft/60 px-3 py-2 text-[0.76rem] font-semibold leading-relaxed text-brand-deep">
                    <AppIcon name="help" size={14} className="mt-0.5 shrink-0" />
                    {item.checkPoint}
                  </p>
                ) : null}
                <p className="mt-1.5 text-[0.68rem] font-semibold text-muted">
                  {PROTECT_MEANS_LABEL[item.means]}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </ColumnShell>
  );
}
