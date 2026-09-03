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
    lead: string;
    points: string[];
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
      lead: "入院や手術は、治療費そのものだけで終わらないことがあります。",
      points: [
        "入院・通院が続くと、日用品や交通費などの出費も重なりやすい",
        "公的な医療保険でカバーされる部分と、されにくい部分がある",
        "「どのくらい貯蓄で対応できそうか」から考えると分かりやすい",
      ],
    },
  },
  {
    id: "income",
    emoji: "💼",
    title: "働けないときへの備え",
    summary: "病気やケガなどで仕事ができない期間の生活を考える備え。",
    field: "life",
    detail: {
      lead: "治療そのものより、「その間の収入」が気になる人は少なくありません。",
      points: [
        "働けない期間が長くなるほど、家計への影響は大きくなりやすい",
        "会社員か自営業かなど、働き方によって前提が変わる",
        "「何か月くらいなら乗り切れそうか」を目安に考えると整理しやすい",
      ],
    },
  },
  {
    id: "family",
    emoji: "👨‍👩‍👧",
    title: "家族への備え",
    summary: "もしものときに家族の生活を支えるための備え。",
    field: "life",
    detail: {
      lead: "自分ひとりの問題ではなくなったときに、意識されやすい備えです。",
      points: [
        "住まいの費用や教育費など、続いていく支出がある家庭ほど関心が高い",
        "家族構成やライフステージが変わると、考えたいことも変わる",
        "「今の暮らしを、どのくらいの期間支えたいか」が出発点になる",
      ],
    },
  },
  {
    id: "accident",
    emoji: "🚗",
    title: "事故・トラブルへの備え",
    summary: "車や日常生活で起こる事故・トラブルへの備え。",
    field: "nonlife",
    detail: {
      lead: "自分がケガをする側だけでなく、相手や物に関わる場面もあります。",
      points: [
        "車・自転車・住まいなど、対象になる場面は意外と身近にある",
        "自分の損害と、相手方への賠償は分けて考えると理解しやすい",
        "すでに加入済みのものと重なっていないか見直すのも一つの方法",
      ],
    },
  },
];

export const COVERAGE_MAP: Record<CoverageId, Coverage> = COVERAGES.reduce(
  (acc, c) => ({ ...acc, [c.id]: c }),
  {} as Record<CoverageId, Coverage>,
);
