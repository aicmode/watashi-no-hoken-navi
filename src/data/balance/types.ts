/**
 * 「わたしのお金バランス（守る × 育てる かんたんチェック）」の型定義。
 *
 * 回答はすべて選択式で、値は意味を表す短い ID だけを持つ。
 * 表示用の文言は questions.ts / protectItems.ts / growOptions.ts が持ち、
 * 判定ロジック（src/lib/balance）はこの型だけに依存する。
 */

export type AgeGroup = "20s" | "30s" | "40s" | "50s" | "60plus";

export type Household = "single" | "couple" | "children" | "other";

export type Concern =
  | "illness"
  | "family"
  | "income"
  | "retirement"
  | "education"
  | "investing"
  | "unsure";

export type EmergencyFund = "ready" | "some" | "little" | "unknown";

export type Experience = "none" | "savings" | "nisa" | "ideco" | "other";

export type Horizon = "few" | "mid" | "long" | "retirement";

export type RiskStance = "avoid" | "some" | "longterm";

/** 7問すべてに回答した状態 */
export type BalanceAnswers = {
  age: AgeGroup;
  household: Household;
  concern: Concern;
  emergencyFund: EmergencyFund;
  experience: Experience;
  horizon: Horizon;
  risk: RiskStance;
};

export type QuestionKey = keyof BalanceAnswers;

/** 回答途中の状態（戻る操作で回答を保持するため Partial で持つ） */
export type BalanceDraft = Partial<BalanceAnswers>;

/** 守るお金（生活防衛資金＋生命保険で考えることの多い保障） */
export type ProtectItemId =
  | "emergency"
  | "medical"
  | "death"
  | "income"
  | "cancer"
  | "retirement";

/** 育てるお金（代表的な資産形成の選択肢・制度・考え方） */
export type GrowOptionId = "deposit" | "nisa" | "ideco" | "longterm";

/** 結果画面で示す「考え方」の型 */
export type ApproachId =
  | "foundation"
  | "explore"
  | "steady"
  | "protect"
  | "grow"
  | "balanced";
