import type { GrowOptionId } from "./types";

/**
 * 「育てるお金」の代表的な選択肢。
 *
 * 特定の金融商品をすすめる画面にしないため、
 *   - 預貯金 … お金の置き場所
 *   - NISA / iDeCo … 税金の面で優遇される「制度」（商品ではない）
 *   - 長期・積立・分散 … 投資信託などとの付き合い方の「考え方」
 * という種類の違いを kind で明示する。
 *
 * 各項目の文章は1行に収まる長さにとどめる。
 * 将来の成果を約束する表現や、断定的な表現は使わない。
 */

export type GrowOptionKind = "place" | "system" | "approach";

export const GROW_KIND_LABEL: Record<GrowOptionKind, string> = {
  place: "置き場所",
  system: "国の制度",
  approach: "考え方",
};

export type GrowOption = {
  id: GrowOptionId;
  title: string;
  kind: GrowOptionKind;
  /** どんなものか */
  what: string;
  /** 向いている目的 */
  purpose: string;
  /** メリット */
  merit: string;
  /** 注意点 */
  caution: string;
  /** 「まず考えてみたいこと」に出すときの短い名前 */
  focusLabel: string;
};

export const GROW_OPTIONS: GrowOption[] = [
  {
    id: "deposit",
    title: "預貯金",
    kind: "place",
    what: "銀行などにお金を預けておく方法。",
    purpose: "近いうちに使うお金・生活防衛資金",
    merit: "値動きがなく、必要なときに引き出しやすい。",
    caution: "物価が上がると、お金の価値が目減りすることも。",
    focusLabel: "使う時期が近いお金の置き場所",
  },
  {
    id: "nisa",
    title: "NISA",
    kind: "system",
    what: "投資で得た利益に税金がかからなくなる制度。",
    purpose: "数年〜長期の資産形成",
    merit: "少額から始められ、利益がそのまま残りやすい。",
    caution: "投資なので元本割れの可能性も。非課税の枠には上限あり。",
    focusLabel: "NISAのしくみを知る",
  },
  {
    id: "ideco",
    title: "iDeCo",
    kind: "system",
    what: "老後資金づくりを支援する、自分で積み立てる私的年金の制度。",
    purpose: "老後に向けた資金づくり",
    merit: "積み立てた分、毎年の税金が軽くなるしくみがある。",
    caution: "原則60歳まで引き出せない。加入できる条件や上限あり。",
    focusLabel: "iDeCoのしくみを知る",
  },
  {
    id: "longterm",
    title: "長期・積立・分散",
    kind: "approach",
    what: "投資信託などを、長い期間・少しずつ・幅広く持つ考え方。",
    purpose: "10年以上先に向けた資産形成",
    merit: "買う時期と投資先を分けることで、値動きの影響をならしやすい。",
    caution: "値下がりする時期もあり、将来の成果は約束されない。",
    focusLabel: "長期・積立・分散の考え方",
  },
];

export const GROW_OPTION_MAP: Record<GrowOptionId, GrowOption> =
  GROW_OPTIONS.reduce(
    (acc, option) => ({ ...acc, [option.id]: option }),
    {} as Record<GrowOptionId, GrowOption>,
  );

/** 用語の短い説明（結果画面でその場に添える） */
export const GROW_GLOSSARY = [
  {
    term: "投資信託",
    body: "多くの人から集めたお金を、専門家がまとめて運用する商品。",
  },
  {
    term: "元本割れ",
    body: "預けたり投資したりした金額より、少なくなること。",
  },
] as const;

/** NISA / iDeCo が商品ではなく制度であることを伝える一文 */
export const SYSTEM_NOTE =
  "NISAやiDeCoは金融商品ではなく、税金の面で優遇される「制度（口座のしくみ）」です。その中で、何で運用するかを選びます。";

/** 「関係が深そう」の目安ラベル */
export const GROW_RELEVANCE_LABEL = {
  high: "いまの回答と関係が深そう",
  normal: "知っておくと整理しやすい",
} as const;
