import type {
  BalanceAnswers,
  GrowOptionId,
  ProtectItemId,
  QuestionKey,
} from "../../data/balance/types";

/**
 * 回答 → 重みの対応表。
 *
 * 判定は「巨大な if 文」ではなく、この表の値を足し合わせて行う。
 * 数値は "考える順番の目安" を作るためのもので、
 * 必要性や金額を示すものではない。
 * 表を書き換えるだけで、結果の傾向を調整できる。
 */

/** 質問ごと・回答ごとに、何点を足すかを表す表 */
export type WeightTable<T> = {
  [K in QuestionKey]?: Partial<Record<BalanceAnswers[K], T>>;
};

export type FocusWeight = { protect: number; grow: number };

/** 「守る」「育てる」それぞれをどのくらい考えたいか */
export const FOCUS_WEIGHTS: WeightTable<FocusWeight> = {
  age: {
    "20s": { protect: 0, grow: 1 },
    "30s": { protect: 1, grow: 1 },
    "40s": { protect: 1, grow: 1 },
    "50s": { protect: 1, grow: 0 },
    "60plus": { protect: 1, grow: 0 },
  },
  household: {
    single: { protect: 0, grow: 1 },
    couple: { protect: 1, grow: 0 },
    children: { protect: 2, grow: 0 },
    other: { protect: 1, grow: 0 },
  },
  concern: {
    illness: { protect: 2, grow: 0 },
    family: { protect: 2, grow: 0 },
    income: { protect: 2, grow: 0 },
    retirement: { protect: 1, grow: 1 },
    education: { protect: 1, grow: 1 },
    investing: { protect: 0, grow: 2 },
    unsure: { protect: 1, grow: 1 },
  },
  emergencyFund: {
    ready: { protect: 0, grow: 1 },
    some: { protect: 1, grow: 0 },
    little: { protect: 2, grow: 0 },
    unknown: { protect: 1, grow: 0 },
  },
  experience: {
    none: { protect: 0, grow: 1 },
    savings: { protect: 0, grow: 1 },
    nisa: { protect: 0, grow: 0 },
    ideco: { protect: 0, grow: 0 },
    other: { protect: 0, grow: 0 },
  },
  horizon: {
    few: { protect: 1, grow: 0 },
    mid: { protect: 0, grow: 1 },
    long: { protect: 0, grow: 2 },
    retirement: { protect: 0, grow: 2 },
  },
  risk: {
    avoid: { protect: 0, grow: 0 },
    some: { protect: 0, grow: 1 },
    longterm: { protect: 0, grow: 1 },
  },
};

/** 守るお金：どの項目から考えるとよさそうか */
export const PROTECT_WEIGHTS: WeightTable<Partial<Record<ProtectItemId, number>>> = {
  age: {
    "20s": { medical: 1 },
    "30s": { medical: 1, income: 1 },
    "40s": { income: 1, cancer: 1 },
    "50s": { cancer: 2, medical: 1, retirement: 1 },
    "60plus": { retirement: 2, medical: 2, cancer: 1 },
  },
  household: {
    single: { income: 2, medical: 1 },
    couple: { death: 1, income: 1 },
    children: { death: 3, income: 1 },
    other: { income: 1, death: 1 },
  },
  concern: {
    illness: { medical: 3, cancer: 2 },
    family: { death: 3 },
    income: { income: 3 },
    retirement: { retirement: 3 },
    education: { death: 2 },
    unsure: { emergency: 1, medical: 1 },
  },
  emergencyFund: {
    some: { emergency: 2 },
    little: { emergency: 4 },
    unknown: { emergency: 3 },
  },
  horizon: {
    retirement: { retirement: 1 },
  },
};

/** 育てるお金：どの選択肢と関係が深そうか */
export const GROW_WEIGHTS: WeightTable<Partial<Record<GrowOptionId, number>>> = {
  age: {
    "20s": { nisa: 1, longterm: 1 },
    "30s": { nisa: 1, ideco: 1 },
    "40s": { ideco: 1, nisa: 1 },
    "50s": { ideco: 1, deposit: 1 },
    "60plus": { deposit: 2 },
  },
  concern: {
    retirement: { ideco: 2, longterm: 1 },
    education: { nisa: 1, deposit: 1 },
    investing: { nisa: 2, longterm: 2 },
    unsure: { deposit: 1 },
  },
  emergencyFund: {
    ready: { nisa: 1, longterm: 1 },
    some: { deposit: 1 },
    little: { deposit: 3 },
    unknown: { deposit: 2 },
  },
  experience: {
    none: { nisa: 1 },
    savings: { nisa: 1, longterm: 1 },
    nisa: { ideco: 1, longterm: 1 },
    ideco: { nisa: 1, longterm: 1 },
    other: { nisa: 1, ideco: 1 },
  },
  horizon: {
    few: { deposit: 3 },
    mid: { nisa: 2 },
    long: { longterm: 2, nisa: 1, ideco: 1 },
    retirement: { ideco: 3, longterm: 1 },
  },
  risk: {
    avoid: { deposit: 3 },
    some: { nisa: 1 },
    longterm: { longterm: 2, nisa: 1 },
  },
};
