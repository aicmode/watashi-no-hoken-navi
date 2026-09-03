import type { AnalogyId } from "@/data/analogies";
import type { CoverageId } from "@/data/coverages";
import type { LifeEventId } from "@/data/lifeEvents";
import type { AppIconName } from "./AppIcon";
import type { SceneSpec } from "./IconScene";

/**
 * 意味（データ側のID）→ ビジュアル表現のマッピング。
 *
 * データファイルは "car" / "medical" のような意味情報だけを持ち、
 * どのアイコンをどう重ねるかはこのファイルだけが知っている。
 * ここを差し替えれば、文言に触れずにビジュアルを一新できる。
 */

/** 例え（クルマ / スマホ / 住まい）。3つで世界観をごく淡く変える。 */
export const ANALOGY_SCENES: Record<AnalogyId, SceneSpec> = {
  // 安全装備・メンテナンス・走る道のり
  car: { icon: "car", badge: "shield-check", satellite: "wrench", tone: "cyan", decor: "route" },
  // バックアップ・セキュリティ・同期
  phone: { icon: "smartphone", badge: "lock", satellite: "cloud", tone: "indigo", decor: "orbit" },
  // 安全・防災・鍵をかけて守る
  home: { icon: "home", badge: "shield-check", satellite: "key", tone: "mint", decor: "arc" },
};

/** 暮らしの変化。アイコンだけで意味が伝わることを優先する。 */
export const LIFE_EVENT_SCENES: Record<LifeEventId, SceneSpec> = {
  car: { icon: "car", badge: "key", tone: "cyan", decor: "route" },
  marriage: { icon: "family", badge: "gem", tone: "brand", decor: "spark" },
  child: { icon: "baby", badge: "heart", tone: "brand", decor: "dots" },
  house: { icon: "home", badge: "key", tone: "mint", decor: "arc" },
  work: { icon: "briefcase", badge: "refresh", tone: "indigo", decor: "branch" },
  future: { icon: "sprout", badge: "flag", tone: "mint", decor: "rings" },
};

/** 備え4カテゴリー。主要ビジュアルとして一段強く見せる。 */
export const COVERAGE_SCENES: Record<CoverageId, SceneSpec> = {
  medical: { icon: "health", badge: "plus", tone: "brand", decor: "pulse" },
  income: { icon: "briefcase", badge: "clock", tone: "indigo", decor: "timeline" },
  family: { icon: "users", badge: "home", tone: "cyan", decor: "arc" },
  accident: { icon: "shield-alert", badge: "car", tone: "amber", decor: "dots" },
};

/**
 * 保険以外も含む備え方4種類。
 * 「全部同格」であることが最も重要なので、
 * トーン・装飾・バッジ有無をすべて揃え、民間保険だけを強調しない。
 */
export const METHOD_SCENES: Record<string, SceneSpec> = {
  貯蓄: { icon: "piggy-bank", tone: "mint", decor: "dots" },
  公的な制度: { icon: "landmark", tone: "mint", decor: "dots" },
  勤務先の制度: { icon: "building", tone: "mint", decor: "dots" },
  民間の保険: { icon: "shield-check", tone: "mint", decor: "dots" },
};

/** 「こんなふうに感じることはありませんか？」の3枚。 */
export const CONCERN_SCENES: Record<string, SceneSpec> = {
  // 難しそう＝言葉と書類の多さ。中心は「？」、背景に文字列。
  difficult: { icon: "help", badge: "document", tone: "brand", decor: "lines" },
  // まだ必要ない＝今ではなく、これから。不安を煽らない時間軸の表現。
  "not-yet": { icon: "calendar", badge: "sprout", tone: "cyan", decor: "timeline" },
  // 選べない＝選択肢を並べて整理する。
  "too-many": { icon: "layers", badge: "compass", tone: "indigo", decor: "branch" },
};

/** 保険を考えるときの3つの視点。 */
export const PERSPECTIVE_SCENES: SceneSpec[] = [
  { icon: "umbrella", badge: "cloud", tone: "brand", decor: "drops" },
  { icon: "home", badge: "users", tone: "cyan", decor: "arc" },
  { icon: "layers", badge: "piggy-bank", tone: "mint", decor: "branch" },
];

/** 保険の分野（生命 / 損害 / 医療・傷害）。 */
export const FIELD_SCENES: Record<string, SceneSpec> = {
  生命保険: { icon: "family", badge: "heart", tone: "brand", decor: "arc" },
  損害保険: { icon: "car", badge: "shield-check", tone: "mint", decor: "route" },
  "医療・傷害など": { icon: "health", badge: "stethoscope", tone: "amber", decor: "pulse" },
};

/** 体験の流れ（4STEP）。 */
export const STEP_SCENES: SceneSpec[] = [
  { icon: "layers", tone: "brand", decor: "dots" },
  { icon: "calendar", tone: "cyan", decor: "timeline" },
  { icon: "route", tone: "indigo", decor: "branch" },
  { icon: "shield-check", tone: "mint", decor: "rings" },
];

/** チップやリスト内など、面を持たせない小さな用途向けのアイコン名。 */
export const analogyIconName = (id: AnalogyId | string): AppIconName =>
  ANALOGY_SCENES[id as AnalogyId]?.icon ?? "compass";

export const lifeEventIconName = (id: LifeEventId | string): AppIconName =>
  LIFE_EVENT_SCENES[id as LifeEventId]?.icon ?? "sparkles";

export const coverageIconName = (id: CoverageId | string): AppIconName =>
  COVERAGE_SCENES[id as CoverageId]?.icon ?? "shield-check";
