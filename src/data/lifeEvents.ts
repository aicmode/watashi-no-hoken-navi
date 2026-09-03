import type { CoverageId } from "./coverages";

/**
 * ライフイベント定義。
 *
 * このファイルは「どんな暮らしの変化があるか」だけを持つ。
 * 比喩の文章そのものは、選ばれた例え（クルマ / スマホ / 住まい）ごとに
 * src/data/analogies.ts の lifeEventStories が持つ。
 *
 * 断定的な推奨表現は使わず、あくまで "考えるきっかけ" の言い回しに統一する。
 */

export type LifeEventId =
  | "car"
  | "marriage"
  | "child"
  | "house"
  | "work"
  | "future";

export type LifeEvent = {
  id: LifeEventId;
  emoji: string;
  label: string;
  /** カードに添える一言 */
  hint: string;
  /** 簡易ナビで先に出す備え（2〜3個） */
  suggested: CoverageId[];
  /** ナビの前置き（断定を避けた表現） */
  naviNote: string;
};

export const LIFE_EVENTS: LifeEvent[] = [
  {
    id: "car",
    emoji: "🚗",
    label: "車を買った",
    hint: "新しい相棒がやってきた",
    suggested: ["accident", "medical"],
    naviNote: "車に乗る時間が増えると、事故やトラブルの場面が身近になります。",
  },
  {
    id: "marriage",
    emoji: "💍",
    label: "結婚した",
    hint: "ふたりの暮らしへ",
    suggested: ["family", "income"],
    naviNote: "家計がひとつになると、片方に起きたことがもう片方にも関わってきます。",
  },
  {
    id: "child",
    emoji: "👶",
    label: "子どもができた",
    hint: "守りたい存在が増えた",
    suggested: ["family", "income", "medical"],
    naviNote: "これから長く続く支出があるほど、期間の見通しが気になりやすくなります。",
  },
  {
    id: "house",
    emoji: "🏠",
    label: "家を買った",
    hint: "暮らしの拠点が決まった",
    suggested: ["accident", "family"],
    naviNote: "住まいは、建物のトラブルと家計の両方が関わってくるテーマです。",
  },
  {
    id: "work",
    emoji: "💼",
    label: "働き方が変わった",
    hint: "転職・独立・時短など",
    suggested: ["income", "medical"],
    naviNote: "働き方が変わると、休んだときの前提も変わることがあります。",
  },
  {
    id: "future",
    emoji: "🌱",
    label: "将来について考え始めた",
    hint: "そろそろ気になる",
    suggested: ["medical", "income"],
    naviNote: "まだ決めない前提で、どんな種類があるのかを眺めてみる段階です。",
  },
];

export const LIFE_EVENT_MAP: Record<LifeEventId, LifeEvent> =
  LIFE_EVENTS.reduce(
    (acc, e) => ({ ...acc, [e.id]: e }),
    {} as Record<LifeEventId, LifeEvent>,
  );
