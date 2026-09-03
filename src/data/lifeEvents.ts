import type { CoverageId } from "./coverages";

/**
 * ライフイベント定義。
 * 「クルマの装備 → 暮らしの備え」という比喩でつなぐ文章を各イベントごとに持つ。
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
  /** 比喩パート：クルマ側の話 */
  car: {
    heading: string;
    body: string;
  };
  /** 比喩パート：暮らし側の話 */
  life: {
    heading: string;
    body: string;
  };
  /** 比喩の締め */
  bridge: string;
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
    car: {
      heading: "クルマを選ぶとき",
      body: "デザインや走りだけでなく、事故やトラブルに備える安全装備も一緒に考えます。ぶつからないための装備、ぶつかったときに守ってくれる装備。どちらも「起きてほしくないこと」のためにあります。",
    },
    life: {
      heading: "暮らしも同じです",
      body: "毎日の生活には、病気・ケガ・事故・働けなくなるリスクなど、予想できない出来事があります。起きる前提ではないけれど、起きたときの影響は小さくありません。",
    },
    bridge: "保険は、そんなときのための “暮らしの安全装備” のひとつです。",
    suggested: ["accident", "medical"],
    naviNote: "車に乗る時間が増えると、事故やトラブルの場面が身近になります。",
  },
  {
    id: "marriage",
    emoji: "💍",
    label: "結婚した",
    hint: "ふたりの暮らしへ",
    car: {
      heading: "ひとり乗りから、同乗者がいるクルマへ",
      body: "自分だけが乗るクルマと、大切な人を乗せるクルマ。選ぶときに気にするポイントは、少し変わってきます。助手席まで含めて考えるようになるからです。",
    },
    life: {
      heading: "暮らしも同じです",
      body: "自分ひとりの家計から、ふたりの家計へ。どちらかに何かあったとき、もう一方の生活にも影響が出る関係になります。",
    },
    bridge: "「自分のため」から「お互いのため」へ、備えの見え方が変わるタイミングです。",
    suggested: ["family", "income"],
    naviNote: "家計がひとつになると、片方に起きたことがもう片方にも関わってきます。",
  },
  {
    id: "child",
    emoji: "👶",
    label: "子どもができた",
    hint: "守りたい存在が増えた",
    car: {
      heading: "チャイルドシートを付けるとき",
      body: "運転が上手いかどうかに関係なく、多くの人がチャイルドシートを選びます。自分の技術ではどうにもならない場面があると知っているからです。",
    },
    life: {
      heading: "暮らしも同じです",
      body: "健康に気をつけていても、避けられない出来事はあります。そして子どもの成長には、これから長く続いていく費用がついてきます。",
    },
    bridge: "「自分が気をつける」に加えて、「それでも何かあったとき」を考え始める時期です。",
    suggested: ["family", "income", "medical"],
    naviNote: "これから長く続く支出があるほど、期間の見通しが気になりやすくなります。",
  },
  {
    id: "house",
    emoji: "🏠",
    label: "家を買った",
    hint: "暮らしの拠点が決まった",
    car: {
      heading: "大きな買い物には、点検と保証がついてくる",
      body: "クルマを買うとき、車両本体だけを見て終わりにする人は多くありません。保証や点検、万一のときの対応まで含めて「セット」で考えます。",
    },
    life: {
      heading: "暮らしも同じです",
      body: "住まいは、長く付き合っていく大きな買い物です。建物そのもののトラブルもあれば、支払いを続けていく人の側の事情もあります。",
    },
    bridge: "「物への備え」と「人への備え」、二つの方向があることを知っておくと整理しやすくなります。",
    suggested: ["accident", "family"],
    naviNote: "住まいは、建物のトラブルと家計の両方が関わってくるテーマです。",
  },
  {
    id: "work",
    emoji: "💼",
    label: "働き方が変わった",
    hint: "転職・独立・時短など",
    car: {
      heading: "走る道が変われば、必要な装備も変わる",
      body: "毎日高速道路を走るのか、街中の短距離なのか、雪の多い地域なのか。同じクルマでも、選びたい装備は変わってきます。",
    },
    life: {
      heading: "暮らしも同じです",
      body: "会社員、フリーランス、時短勤務。働き方が変わると、休んだときの収入の仕組みや、頼れる制度の前提も変わります。",
    },
    bridge: "以前ちょうど良かった備えが、今もちょうど良いとは限りません。",
    suggested: ["income", "medical"],
    naviNote: "働き方が変わると、休んだときの前提も変わることがあります。",
  },
  {
    id: "future",
    emoji: "🌱",
    label: "将来について考え始めた",
    hint: "そろそろ気になる",
    car: {
      heading: "試乗する前に、カタログを眺める時間",
      body: "すぐに買わなくても、どんな装備があるのか眺めておくと、いざ選ぶときに迷いにくくなります。知っているだけで、選択肢は増えます。",
    },
    life: {
      heading: "暮らしも同じです",
      body: "今すぐ何かが起きるわけではなくても、「どんな備えがあるのか」を知っておくことはできます。まだ決めなくて大丈夫です。",
    },
    bridge: "今日は、選ぶ日ではなく「見てみる日」でかまいません。",
    suggested: ["medical", "income"],
    naviNote: "まだ決めない前提で、どんな種類があるのかを眺めてみる段階です。",
  },
];

export const LIFE_EVENT_MAP: Record<LifeEventId, LifeEvent> =
  LIFE_EVENTS.reduce(
    (acc, e) => ({ ...acc, [e.id]: e }),
    {} as Record<LifeEventId, LifeEvent>,
  );
