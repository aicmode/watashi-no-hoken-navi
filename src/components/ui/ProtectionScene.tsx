import { APP_ICONS, type AppIconName } from "./AppIcon";
import { IconScene } from "./IconScene";

/**
 * 「もしもの影響を小さくする」を1枚で表すコンセプトイラスト。
 *
 *   暮らし（病気・事故・仕事・住まい）
 *        ↓
 *      備え（中心）
 *
 * 中心に傘＋シールド、その周囲に暮らしの場面を円形に配置し、
 * 破線のリングと短い接続線で「中心へ集まる」構造を見せる。
 * 画像は使わず、Lucide と自作の小さなSVGだけで構成している。
 */

/**
 * 上下左右に配置する（斜めは中心タイルのバッジと重なるため空けておく）。
 * 角度は SVG 座標系（0° = 右、時計回り）。
 */
const SATELLITES: { icon: AppIconName; angle: number }[] = [
  { icon: "health", angle: 270 }, // 病気・ケガ
  { icon: "car", angle: 0 }, // 事故
  { icon: "briefcase", angle: 90 }, // 仕事
  { icon: "home", angle: 180 }, // 住まい
];

const RING = 35; // 衛星を置く半径（%）

export function ProtectionScene({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`group scene-group relative isolate size-[172px] shrink-0 sm:size-[204px] ${className}`}
    >
      <svg
        className="absolute inset-0 size-full text-brand"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        focusable="false"
      >
        {/* いちばん外側のやわらかい面 */}
        <circle cx="50" cy="50" r="48" fill="rgba(255,255,255,0.6)" stroke="none" />
        <circle cx="50" cy="50" r="48" strokeWidth="0.8" opacity="0.14" />
        {/* 衛星を結ぶ破線のリング */}
        <circle
          cx="50"
          cy="50"
          r={RING}
          strokeWidth="0.9"
          strokeDasharray="1.6 3.4"
          opacity="0.42"
        />
        {/* 中心へ向かう短い接続線 */}
        {SATELLITES.map(({ angle }) => {
          const rad = (angle * Math.PI) / 180;
          const dx = Math.cos(rad);
          const dy = Math.sin(rad);
          return (
            <line
              key={angle}
              x1={50 + dx * 20}
              y1={50 + dy * 20}
              x2={50 + dx * 27.5}
              y2={50 + dy * 27.5}
              strokeWidth="1.1"
              strokeDasharray="1.4 2.6"
              opacity="0.5"
            />
          );
        })}
        {/* 余白の小さな点 */}
        <g fill="currentColor" stroke="none" opacity="0.28">
          <circle cx="19" cy="19" r="1.3" />
          <circle cx="81" cy="19" r="1.1" />
          <circle cx="81" cy="81" r="1.1" />
          <circle cx="19" cy="81" r="1.3" />
        </g>
      </svg>

      {/* 中心：備え */}
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <IconScene
          icon="umbrella"
          badge="shield-check"
          tone="brand"
          decor="rings"
          shape="circle"
          size="2xl"
          smSize="3xl"
        />
      </span>

      {/* 周囲：暮らしの場面 */}
      {SATELLITES.map(({ icon, angle }) => {
        const rad = (angle * Math.PI) / 180;
        const Icon = APP_ICONS[icon];
        return (
          <span
            key={icon}
            className="absolute grid size-[34px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-surface text-brand-deep shadow-[0_8px_18px_-12px_rgba(13,27,47,0.6)] ring-1 ring-brand/12 transition-transform duration-500 group-hover:scale-105 sm:size-10"
            style={{
              left: `${50 + Math.cos(rad) * RING}%`,
              top: `${50 + Math.sin(rad) * RING}%`,
            }}
          >
            <Icon className="size-[17px] sm:size-5" strokeWidth={2} />
          </span>
        );
      })}
    </div>
  );
}
