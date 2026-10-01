import { levelLabel } from "@/data/balance/approaches";
import { METER_MAX } from "@/lib/balance/evaluate";
import { AppIcon, type AppIconName } from "../ui/AppIcon";

/**
 * 「考えたい度合い」を6つのブロックで見せるメーター。
 * 点数や評価ではなく、どちらから考えるとよさそうかの目安として表示する。
 */
export function BalanceMeter({
  side,
  title,
  caption,
  level,
}: {
  side: "protect" | "grow";
  title: string;
  caption: string;
  level: number;
}) {
  const isProtect = side === "protect";
  const icon: AppIconName = isProtect ? "shield-check" : "sprout";

  return (
    <div className={`balance-meter balance-meter-${side}`}>
      <div className="meter-heading">
        <AppIcon name={icon} size={26} />
        <p className="meter-title">{title}</p>
      </div>
      <p className="meter-caption">{caption}</p>
      <div
        role="img"
        aria-label={`${title}：${METER_MAX}段階中${level}（${levelLabel(level)}）`}
        className="meter-scale"
      >
        {Array.from({ length: METER_MAX }, (_, i) => (
          <span key={i} className={`meter-segment ${i < level ? "is-filled" : ""}`} style={{ height: `${38 + i * 12}%` }} />
        ))}
      </div>
      <p className="meter-label">{levelLabel(level)}</p>
    </div>
  );
}
