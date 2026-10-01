import { APPROACHES, type Approach } from "../../data/balance/approaches";
import {
  GROW_OPTIONS,
  type GrowOption,
} from "../../data/balance/growOptions";
import {
  PROTECT_ITEMS,
  type PriorityTier,
  type ProtectItem,
} from "../../data/balance/protectItems";
import { BALANCE_QUESTIONS } from "../../data/balance/questions";
import type {
  ApproachId,
  BalanceAnswers,
  BalanceDraft,
  EmergencyFund,
  GrowOptionId,
  ProtectItemId,
  QuestionKey,
} from "../../data/balance/types";
import {
  FOCUS_WEIGHTS,
  GROW_WEIGHTS,
  PROTECT_WEIGHTS,
  type FocusWeight,
  type WeightTable,
} from "./weights";

/**
 * 「わたしのお金バランス」の判定ロジック。
 *
 * 表示（React）からは切り離した純粋関数だけで構成し、
 * 同じ回答からは常に同じ結果を返す。
 *
 *   1. 回答ごとの重み（weights.ts）を足し合わせる
 *   2. 「守る」「育てる」の考えたい度合いを 2〜6 段階に整える
 *   3. 守る項目・育てる選択肢を、関係の深い順に並べる
 *   4. 並びから「まず考えてみたいこと」と「考え方」を選ぶ
 */

/** メーターの最大段階数 */
export const METER_MAX = 6;
/**
 * メーターの最小段階。
 * どちらか一方が「ゼロ」に見えないよう、両方を必ず少しは表示する。
 */
export const METER_MIN = 2;

export type RankedProtect = {
  item: ProtectItem;
  score: number;
  tier: PriorityTier;
};

export type RankedGrow = {
  option: GrowOption;
  score: number;
  relevance: "high" | "normal";
};

export type FocusPoint =
  | { side: "protect"; id: ProtectItemId; label: string }
  | { side: "grow"; id: GrowOptionId; label: string };

export type BalanceResult = {
  /** 守るお金を考えたい度合い（METER_MIN〜METER_MAX） */
  protectLevel: number;
  /** 育てるお金を考えたい度合い（METER_MIN〜METER_MAX） */
  growLevel: number;
  protect: RankedProtect[];
  grow: RankedGrow[];
  /** まず考えてみたいこと（守る・育てるの両方を含む3項目） */
  focus: FocusPoint[];
  approach: Approach;
};

const QUESTION_KEYS: QuestionKey[] = BALANCE_QUESTIONS.map((q) => q.key);

/**
 * 生活防衛資金が「ほとんどない」「分からない」場合は、
 * 他の項目より先に生活防衛資金を確認する（土台を先に整える）。
 */
const FOUNDATION_FIRST: readonly EmergencyFund[] = ["little", "unknown"];

const needsFoundation = (answers: BalanceAnswers) =>
  FOUNDATION_FIRST.includes(answers.emergencyFund);

/** すべての質問に回答済みかどうか */
export function isComplete(draft: BalanceDraft): draft is BalanceAnswers {
  return QUESTION_KEYS.every((key) => draft[key] !== undefined);
}

function lookup<T, K extends QuestionKey>(
  table: WeightTable<T>,
  key: K,
  value: BalanceAnswers[K],
): T | undefined {
  return table[key]?.[value];
}

/** 回答に対応する重みを、質問の順にすべて取り出す */
function weightsFor<T>(table: WeightTable<T>, answers: BalanceAnswers): T[] {
  return QUESTION_KEYS.flatMap((key) => {
    const weight = lookup(table, key, answers[key]);
    return weight === undefined ? [] : [weight];
  });
}

/** 各 ID ごとの合計点 */
function sumScores<Id extends string>(
  ids: readonly Id[],
  weights: Partial<Record<Id, number>>[],
): Record<Id, number> {
  const totals = Object.fromEntries(ids.map((id) => [id, 0])) as Record<Id, number>;
  for (const weight of weights) {
    for (const id of ids) totals[id] += weight[id] ?? 0;
  }
  return totals;
}

/** どの回答を選んだときに最大になるか（メーターの上限を表から求める） */
function maxFocus(side: keyof FocusWeight): number {
  return QUESTION_KEYS.reduce((sum, key) => {
    const row = FOCUS_WEIGHTS[key];
    const values: FocusWeight[] = row ? Object.values(row) : [];
    return sum + Math.max(0, ...values.map((w) => w[side]));
  }, 0);
}

function toLevel(raw: number, max: number): number {
  if (max <= 0) return METER_MIN;
  const ratio = Math.min(1, Math.max(0, raw / max));
  return METER_MIN + Math.round(ratio * (METER_MAX - METER_MIN));
}

/**
 * 点数の高い順。同点なら元の並び（データの順）を保つ。
 * pinned に当てはまるものは点数に関係なく先頭に置く。
 */
function rank<T>(
  list: readonly T[],
  score: (item: T) => number,
  pinned: (item: T) => boolean = () => false,
) {
  return list
    .map((item, index) => ({ item, index, score: score(item), pin: pinned(item) }))
    .sort(
      (a, b) => Number(b.pin) - Number(a.pin) || b.score - a.score || a.index - b.index,
    );
}

function tierFor(position: number, score: number): PriorityTier {
  if (score <= 0) return "later";
  if (position < 2) return "first";
  if (position < 4) return "check";
  return "later";
}

type ApproachRule = {
  id: ApproachId;
  when: (answers: BalanceAnswers, levels: { protect: number; grow: number }) => boolean;
};

/** 上から順に評価し、最初に当てはまった考え方を採用する */
const APPROACH_RULES: ApproachRule[] = [
  { id: "foundation", when: needsFoundation },
  { id: "explore", when: (a) => a.concern === "unsure" },
  { id: "steady", when: (a) => a.risk === "avoid" || a.horizon === "few" },
  { id: "protect", when: (_, l) => l.protect - l.grow >= 2 },
  { id: "grow", when: (_, l) => l.grow - l.protect >= 2 },
];

export function evaluateBalance(answers: BalanceAnswers): BalanceResult {
  const focusWeights = weightsFor(FOCUS_WEIGHTS, answers);
  const protectRaw = focusWeights.reduce((sum, w) => sum + w.protect, 0);
  const growRaw = focusWeights.reduce((sum, w) => sum + w.grow, 0);
  const protectLevel = toLevel(protectRaw, maxFocus("protect"));
  const growLevel = toLevel(growRaw, maxFocus("grow"));

  const protectScores = sumScores(
    PROTECT_ITEMS.map((i) => i.id),
    weightsFor(PROTECT_WEIGHTS, answers),
  );
  const growScores = sumScores(
    GROW_OPTIONS.map((o) => o.id),
    weightsFor(GROW_WEIGHTS, answers),
  );

  const foundation = needsFoundation(answers);
  const protect: RankedProtect[] = rank(
    PROTECT_ITEMS,
    (i) => protectScores[i.id],
    (i) => foundation && i.id === "emergency",
  ).map(({ item, score }, position) => ({
    item,
    score,
    tier: tierFor(position, score),
  }));

  const grow: RankedGrow[] = rank(GROW_OPTIONS, (o) => growScores[o.id]).map(
    ({ item, score }, position) => ({
      option: item,
      score,
      relevance: position < 2 && score > 0 ? "high" : "normal",
    }),
  );

  // 守る2つ＋育てる1つ。片方だけに偏らないよう、必ず両方から選ぶ
  const focus: FocusPoint[] = [
    ...protect.slice(0, 2).map(
      ({ item }): FocusPoint => ({ side: "protect", id: item.id, label: item.focusLabel }),
    ),
    ...grow.slice(0, 1).map(
      ({ option }): FocusPoint => ({ side: "grow", id: option.id, label: option.focusLabel }),
    ),
  ];

  const levels = { protect: protectLevel, grow: growLevel };
  const approachId =
    APPROACH_RULES.find((rule) => rule.when(answers, levels))?.id ?? "balanced";

  return {
    protectLevel,
    growLevel,
    protect,
    grow,
    focus,
    approach: APPROACHES[approachId],
  };
}
