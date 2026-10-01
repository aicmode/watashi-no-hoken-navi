import { IconScene, type SceneSize } from "../ui/IconScene";
import { BALANCE_SIDE_SCENES } from "../ui/visuals";

/**
 * 「守る × 育てる」を1つの記号として見せる小さなビジュアル。
 * TOP・体験フローの橋渡し・お金バランスの入口で共通して使い、
 * 2つを並べて考える機能であることを繰り返し印象づける。
 */
export function BalanceEmblem({
  size = "lg",
  smSize = "xl",
  edge = "#ffffff",
  className = "",
}: {
  size?: SceneSize;
  smSize?: SceneSize;
  edge?: string;
  className?: string;
}) {
  return (
    <span aria-hidden className={`scene-group inline-flex items-center gap-2 sm:gap-3 ${className}`}>
      <IconScene {...BALANCE_SIDE_SCENES.protect} size={size} smSize={smSize} edge={edge} />
      <span className="font-display text-lg text-gold sm:text-xl">×</span>
      <IconScene {...BALANCE_SIDE_SCENES.grow} size={size} smSize={smSize} edge={edge} />
    </span>
  );
}
