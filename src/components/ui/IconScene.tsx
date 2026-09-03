import type { CSSProperties, ReactNode } from "react";
import { APP_ICONS, type AppIconName } from "./AppIcon";

/**
 * Illustrated Icon Tile.
 *
 * Lucide の線画を「そのまま淡色の四角に入れる」のをやめ、
 *   面（グラデーションタイル）
 *   ＋ 装飾レイヤー（点・弧・破線・波形など）
 *   ＋ 主アイコン
 *   ＋ 小バッジ / 小チップ（意味の補足）
 * を重ねて、1つのミニイラストとして見せる。
 *
 * 見た目のパラメーターはすべてここと globals.css の .scene 系に集約し、
 * データ側（src/data/*）には意味情報だけを残す。
 */

export type SceneTone = "brand" | "cyan" | "indigo" | "mint" | "amber" | "ink";
export type SceneShape = "square" | "circle";
export type SceneSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

/** 装飾レイヤーの種類。意味を補強する方向で選ぶ。 */
export type SceneDecor =
  | "none"
  | "dots"
  | "grid"
  | "arc"
  | "rings"
  | "route"
  | "pulse"
  | "lines"
  | "timeline"
  | "branch"
  | "drops"
  | "spark"
  | "orbit";

/** 用途別のプリセット。サイズ・形の選び方をここで一元化する。 */
export type SceneVariant =
  | "feature" // 主要カード（rounded square・大きめ）
  | "analogy" // 例え（最大の layered tile）
  | "life-event" // ライフイベント
  | "coverage" // 備えカテゴリー
  | "method" // 備え方（4つ同格）
  | "step" // ステップ（circle）
  | "compact"; // リスト・チップ内

type SizeSpec = {
  box: number;
  icon: number;
  badge: number;
  badgeIcon: number;
  radius: number;
  stroke: number;
};

const SIZES: Record<SceneSize, SizeSpec> = {
  xs: { box: 30, icon: 16, badge: 15, badgeIcon: 9, radius: 10, stroke: 2 },
  sm: { box: 38, icon: 20, badge: 17, badgeIcon: 10, radius: 12, stroke: 2 },
  md: { box: 48, icon: 25, badge: 20, badgeIcon: 11, radius: 15, stroke: 1.95 },
  lg: { box: 58, icon: 29, badge: 23, badgeIcon: 12, radius: 18, stroke: 1.9 },
  xl: { box: 68, icon: 34, badge: 26, badgeIcon: 13, radius: 22, stroke: 1.85 },
  "2xl": { box: 80, icon: 40, badge: 29, badgeIcon: 15, radius: 26, stroke: 1.8 },
  "3xl": { box: 96, icon: 48, badge: 33, badgeIcon: 17, radius: 30, stroke: 1.8 },
};

/** variant ごとの既定値（呼び出し側は意味だけ渡せばよい） */
const VARIANTS: Record<
  SceneVariant,
  { size: SceneSize; smSize?: SceneSize; shape: SceneShape }
> = {
  feature: { size: "lg", smSize: "xl", shape: "square" },
  analogy: { size: "xl", smSize: "2xl", shape: "square" },
  "life-event": { size: "md", smSize: "lg", shape: "square" },
  coverage: { size: "lg", smSize: "lg", shape: "square" },
  method: { size: "lg", smSize: "lg", shape: "square" },
  step: { size: "md", smSize: "lg", shape: "circle" },
  compact: { size: "xs", smSize: "sm", shape: "square" },
};

export type SceneSpec = {
  /** 中心に置く主アイコン */
  icon: AppIconName;
  /** 右下の小バッジ（意味を補足するセカンダリアイコン） */
  badge?: AppIconName;
  /** 左上の小チップ（3つ目の要素。奥行きを出す） */
  satellite?: AppIconName;
  tone?: SceneTone;
  decor?: SceneDecor;
};

export type IconSceneProps = SceneSpec & {
  variant?: SceneVariant;
  /** variant の既定サイズを上書きしたいときだけ指定する */
  size?: SceneSize;
  smSize?: SceneSize;
  shape?: SceneShape;
  /** 選択中（面をブランドカラーで塗り、線画を白へ反転） */
  active?: boolean;
  /** バッジ・チップの縁の色（白以外の面に置くとき用） */
  edge?: string;
  className?: string;
  /** アイコンの代わりに短いテキストを出す（「Q」「01」など） */
  label?: string;
};

function sizeVars(spec: SizeSpec, suffix: "" | "-sm"): CSSProperties {
  return {
    [`--sc-box${suffix}`]: `${spec.box}px`,
    [`--sc-icon${suffix}`]: `${spec.icon}px`,
    [`--sc-badge${suffix}`]: `${spec.badge}px`,
    [`--sc-badge-icon${suffix}`]: `${spec.badgeIcon}px`,
    [`--sc-radius${suffix}`]: `${spec.radius}px`,
    [`--sc-stroke${suffix}`]: `${spec.stroke}`,
  } as CSSProperties;
}

export function IconScene({
  icon,
  badge,
  satellite,
  tone = "brand",
  decor = "dots",
  variant = "feature",
  size,
  smSize,
  shape,
  active = false,
  edge,
  className = "",
  label,
}: IconSceneProps) {
  const preset = VARIANTS[variant];
  const base = SIZES[size ?? preset.size];
  const wide = SIZES[smSize ?? (size ? size : (preset.smSize ?? preset.size))];
  const finalShape = shape ?? preset.shape;

  const Icon = APP_ICONS[icon];
  const BadgeIcon = badge ? APP_ICONS[badge] : null;
  const SatIcon = satellite ? APP_ICONS[satellite] : null;

  const style: CSSProperties = {
    ...sizeVars(base, ""),
    ...sizeVars(wide, "-sm"),
    ...(edge ? ({ "--scene-edge": edge } as CSSProperties) : null),
    ...(finalShape === "circle" ? { borderRadius: "999px" } : null),
  };

  return (
    <span
      aria-hidden="true"
      className={`scene ${className}`}
      data-tone={tone}
      data-active={active ? "true" : undefined}
      style={style}
    >
      <span className="scene__tile" />
      {decor === "none" ? null : <Decor kind={decor} shape={finalShape} />}
      {label ? (
        <span className="scene__label">{label}</span>
      ) : (
        <Icon className="scene__icon" />
      )}
      {SatIcon ? (
        <span className="scene__sat">
          <SatIcon />
        </span>
      ) : null}
      {BadgeIcon ? (
        <span className="scene__badge">
          <BadgeIcon />
        </span>
      ) : null}
    </span>
  );
}

/**
 * 装飾レイヤー。
 * 外部SVGは取得せず、すべてこの場で描く小さな図形にとどめる。
 * 主アイコンの読み取りを邪魔しないよう、余白側（四隅）へ寄せている。
 */
function Decor({ kind, shape }: { kind: SceneDecor; shape: SceneShape }) {
  // 円形タイルは端が切れるので、装飾をやや内側に寄せる
  const inset = shape === "circle" ? "translate(3 3) scale(0.875)" : undefined;
  return (
    <svg
      className="scene__deco"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
    >
      <g transform={inset}>{DECOR[kind]}</g>
    </svg>
  );
}

const DECOR: Record<SceneDecor, ReactNode> = {
  none: null,
  dots: (
    <>
      <circle cx="39" cy="9" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="43.5" cy="15" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="33.5" cy="5.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="7" cy="41" r="1.4" fill="currentColor" stroke="none" opacity="0.7" />
    </>
  ),
  grid: (
    <g fill="currentColor" stroke="none" opacity="0.85">
      {[6, 13, 20].map((y) =>
        [6, 13, 20].map((x) => (
          <circle key={`${x}-${y}`} cx={42 - x} cy={y} r="1.05" />
        )),
      )}
    </g>
  ),
  arc: (
    <>
      <circle cx="5" cy="43" r="13" strokeWidth="1.2" opacity="0.85" />
      <circle cx="5" cy="43" r="20" strokeWidth="1" opacity="0.5" />
      <circle cx="40" cy="8" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
  rings: (
    <>
      <circle cx="24" cy="24" r="16" strokeWidth="1.1" strokeDasharray="2 4" opacity="0.8" />
      <circle cx="24" cy="24" r="21.5" strokeWidth="0.9" opacity="0.35" />
    </>
  ),
  route: (
    <>
      <path
        d="M5 41 C 13 41 14 30 22 29 C 30 28 32 15 43 9"
        strokeWidth="1.4"
        strokeDasharray="2.5 3.5"
        opacity="0.85"
      />
      <circle cx="5" cy="41" r="1.9" fill="currentColor" stroke="none" />
      <circle cx="43" cy="9" r="1.9" fill="currentColor" stroke="none" />
    </>
  ),
  pulse: (
    <>
      <path d="M3 41 h7.5 l2.5 -6 3.5 12 2.5 -6 H26" strokeWidth="1.4" opacity="0.85" />
      <circle cx="41" cy="8" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="45" cy="13" r="1" fill="currentColor" stroke="none" opacity="0.7" />
    </>
  ),
  lines: (
    <>
      <path d="M6 8 h15" strokeWidth="1.6" opacity="0.75" />
      <path d="M6 13.5 h10" strokeWidth="1.6" opacity="0.55" />
      <path d="M27 40 h15" strokeWidth="1.6" opacity="0.6" />
      <path d="M32 34.5 h10" strokeWidth="1.6" opacity="0.4" />
    </>
  ),
  timeline: (
    <>
      <path d="M5 42 h38" strokeWidth="1.1" strokeDasharray="2 3.5" opacity="0.7" />
      <circle cx="9" cy="42" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="24" cy="42" r="1.3" fill="currentColor" stroke="none" opacity="0.75" />
      <circle cx="39" cy="42" r="2.1" fill="currentColor" stroke="none" />
    </>
  ),
  branch: (
    <>
      <path d="M6 41 h6 a4 4 0 0 0 4 -4 v-4" strokeWidth="1.3" opacity="0.8" />
      <path d="M16 41 h6 a4 4 0 0 1 4 -4" strokeWidth="1.3" opacity="0.5" />
      <circle cx="16" cy="30.5" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="41" cy="9" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="45" cy="14.5" r="1" fill="currentColor" stroke="none" opacity="0.7" />
    </>
  ),
  drops: (
    <>
      <path d="M12 5 v5" strokeWidth="1.6" opacity="0.7" />
      <path d="M19 4 v7" strokeWidth="1.6" opacity="0.45" />
      <path d="M38 36 v5" strokeWidth="1.6" opacity="0.6" />
      <path d="M43.5 32 v6" strokeWidth="1.6" opacity="0.4" />
    </>
  ),
  spark: (
    <>
      <path
        d="M40 4.5 c0 4 1.6 5.6 5.5 5.6 -3.9 0 -5.5 1.6 -5.5 5.6 0 -4 -1.6 -5.6 -5.5 -5.6 3.9 0 5.5 -1.6 5.5 -5.6Z"
        fill="currentColor"
        stroke="none"
        opacity="0.9"
      />
      <circle cx="7" cy="40" r="1.5" fill="currentColor" stroke="none" opacity="0.7" />
      <circle cx="12.5" cy="44" r="0.9" fill="currentColor" stroke="none" opacity="0.5" />
    </>
  ),
  orbit: (
    <>
      <ellipse
        cx="24"
        cy="24"
        rx="21"
        ry="10"
        strokeWidth="1.1"
        opacity="0.5"
        transform="rotate(-28 24 24)"
      />
      <circle cx="41" cy="14" r="2" fill="currentColor" stroke="none" />
    </>
  ),
};
