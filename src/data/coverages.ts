/**
 * 「備え」のカテゴリー定義。
 * ここは商品ではなく "考え方のカテゴリー" のみを扱う。
 * 将来カテゴリーを増やす場合はこの配列に足すだけでよい。
 *
 * 例え（クルマ / スマホ / 住まい）ごとの言い換えは
 * src/data/analogies.ts の coverageAnalogies が持つ。
 */

export type CoverageId = "medical" | "income" | "family" | "accident";

/**
 * ざっくりした分類の目安。
 * 「生命保険会社＝これだけ」と断定するものではなく、
 * どの分野の話題に近いかを示すだけのラベル。
 */
export type InsuranceField = "life" | "nonlife" | "both";

/** 分野ラベルに添える注記（断定を避けた表現に統一する） */
export const FIELD_NOTE: Record<InsuranceField, string> = {
  life: "一般に「生命保険」の分野で話題になりやすいテーマです。",
  nonlife: "一般に「損害保険」の分野で話題になりやすいテーマです。",
  both: "生命保険・損害保険のどちらにも関係する商品があるテーマです。",
};

export type Coverage = {
  id: CoverageId;
  emoji: string;
  title: string;
  /** カード表面に出す短い説明（1〜2行） */
  summary: string;
  field: InsuranceField;
  /** タップで開く詳細。文章は短く、箇条書き中心。 */
  detail: {
    /** 「どんなことを考える？」の短い導入 */
    lead: string;
    points: string[];
    /** 詳細の最後に置く、自分の暮らしへつなげる問い */
    question: string;
  };
};

export const COVERAGES: Coverage[] = [
  {
    id: "medical",
    emoji: "🏥",
    title: "医療への備え",
    summary: "病気やケガで治療・入院が必要になったときの備え。",
    field: "both",
    detail: {
      lead: "病気やケガそのものだけでなく、治療中の暮らしも一緒に考えてみます。",
      points: [
        "治療中の生活や、仕事を休む可能性",
        "公的な制度など、すでにある支え",
        "自分で準備できそうな費用",
      ],
      question: "もし1か月仕事を休んだら、生活はどう変わりそうですか？",
    },
  },
  {
    id: "income",
    emoji: "💼",
    title: "働けないときへの備え",
    summary: "病気やケガなどで仕事ができない期間の生活を考える備え。",
    field: "life",
    detail: {
      lead: "治療費だけでなく、仕事を休んでいる間の生活費や収入も考える視点です。",
      points: [
        "毎月続く生活費や住まいの支払い",
        "働き方によって異なる制度や収入の形",
        "貯蓄で対応できそうな期間",
      ],
      question: "収入が一時的に減った場合、どのくらいなら対応できそうですか？",
    },
  },
  {
    id: "family",
    emoji: "👨‍👩‍👧",
    title: "家族への備え",
    summary: "もしものときに家族の生活を支えるための備え。",
    field: "life",
    detail: {
      lead: "自分だけでなく、家族の生活・住まい・教育などへの影響も考える視点です。",
      points: [
        "誰の生活に、どんな影響がありそうか",
        "住まいや教育など、続いていく支出",
        "家族構成の変化に合わせて見直したいこと",
      ],
      question: "自分にもしものことがあった場合、誰の生活に影響がありそうですか？",
    },
  },
  {
    id: "accident",
    emoji: "🚗",
    title: "事故・トラブルへの備え",
    summary: "車や日常生活で起こる事故・トラブルへの備え。",
    field: "nonlife",
    detail: {
      lead: "車・住まい・日常生活で、予想外のトラブルが起きた場合の影響を考えます。",
      points: [
        "自分のケガや持ちものへの影響",
        "相手や相手の物に関わる場面",
        "すでに加入している保障との重なり",
      ],
      question: "急な修理や賠償が必要になった場合、どう対応できそうですか？",
    },
  },
];

export const COVERAGE_MAP: Record<CoverageId, Coverage> = COVERAGES.reduce(
  (acc, c) => ({ ...acc, [c.id]: c }),
  {} as Record<CoverageId, Coverage>,
);
