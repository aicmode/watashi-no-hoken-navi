import type { BalanceAnswers, QuestionKey } from "./types";

/**
 * かんたんチェックの質問（7問）。
 *
 * 1画面1問で、選んだらそのまま次へ進む。
 * 「診断」ではなく「整理」のための質問なので、
 * 正解・不正解や良し悪しを感じさせない言い回しに統一する。
 */

export type QuestionOption<K extends QuestionKey> = {
  value: BalanceAnswers[K];
  label: string;
  /** 選択肢に添える短い補足（任意） */
  hint?: string;
};

/** 質問がどちらのお金に関わるか（画面上の小さなラベルに使う） */
export type QuestionTheme = "life" | "protect" | "grow";

export const QUESTION_THEME_LABEL: Record<QuestionTheme, string> = {
  life: "いまの暮らし",
  protect: "守るお金",
  grow: "育てるお金",
};

type QuestionDef<K extends QuestionKey> = {
  key: K;
  theme: QuestionTheme;
  /** 進み具合の表示に使う短い名前 */
  shortLabel: string;
  title: string;
  /** 質問の下に添える一言 */
  lead: string;
  options: QuestionOption<K>[];
};

/** どの質問でも options の value が回答型と一致するようにする */
export type BalanceQuestion = { [K in QuestionKey]: QuestionDef<K> }[QuestionKey];

export const BALANCE_QUESTIONS: BalanceQuestion[] = [
  {
    key: "age",
    theme: "life",
    shortLabel: "年代",
    title: "あなたの年代を教えてください",
    lead: "年代によって、考えやすいテーマの順番が少し変わります。",
    options: [
      { value: "20s", label: "20代" },
      { value: "30s", label: "30代" },
      { value: "40s", label: "40代" },
      { value: "50s", label: "50代" },
      { value: "60plus", label: "60代以上" },
    ],
  },
  {
    key: "household",
    theme: "life",
    shortLabel: "家族",
    title: "いまの家族構成に近いものは？",
    lead: "誰の暮らしを支えているかで、守りたいものが変わります。",
    options: [
      { value: "single", label: "ひとり暮らし" },
      { value: "couple", label: "夫婦・パートナー" },
      { value: "children", label: "子どもがいる" },
      { value: "other", label: "その他", hint: "親と同居など" },
    ],
  },
  {
    key: "concern",
    theme: "life",
    shortLabel: "気になること",
    title: "いま、いちばん気になることは？",
    lead: "いちばん近いものを1つ選んでください。",
    options: [
      { value: "illness", label: "病気やケガ" },
      { value: "family", label: "家族の暮らし" },
      { value: "income", label: "働けなくなること" },
      { value: "retirement", label: "老後のお金" },
      { value: "education", label: "子どもの教育費" },
      { value: "investing", label: "資産形成" },
      { value: "unsure", label: "まだよく分からない" },
    ],
  },
  {
    key: "emergencyFund",
    theme: "protect",
    shortLabel: "生活防衛資金",
    title: "急な出費に使えるお金はありますか？",
    lead: "「生活防衛資金」と呼ばれる、すぐ使えるように取っておくお金のことです。",
    options: [
      { value: "ready", label: "ある程度準備できている" },
      { value: "some", label: "少しある" },
      { value: "little", label: "ほとんどない" },
      { value: "unknown", label: "分からない" },
    ],
  },
  {
    key: "experience",
    theme: "grow",
    shortLabel: "これまで",
    title: "お金を育てる取り組みで、いちばん近いものは？",
    lead: "複数ある場合は、いちばん中心にしているものを選んでください。",
    options: [
      { value: "none", label: "まだしていない" },
      { value: "savings", label: "預貯金が中心" },
      { value: "nisa", label: "NISAを利用している" },
      { value: "ideco", label: "iDeCoを利用している" },
      { value: "other", label: "その他の積立・投資をしている" },
    ],
  },
  {
    key: "horizon",
    theme: "grow",
    shortLabel: "期間",
    title: "お金を準備したいのは、いつごろ？",
    lead: "使う時期が近いか遠いかで、合う置き場所が変わります。",
    options: [
      { value: "few", label: "数年以内" },
      { value: "mid", label: "5〜10年くらい先" },
      { value: "long", label: "10年以上先" },
      { value: "retirement", label: "老後に向けて" },
    ],
  },
  {
    key: "risk",
    theme: "grow",
    shortLabel: "値動き",
    title: "お金が増えたり減ったりすることについて、近い考えは？",
    lead: "投資には「値動き」があり、一時的に元の金額を下回ることもあります。",
    options: [
      { value: "avoid", label: "できるだけ避けたい" },
      { value: "some", label: "多少なら受け入れられる" },
      { value: "longterm", label: "長い目で見るなら受け入れられる" },
    ],
  },
];

/** 回答済みの値から、表示用のラベルを引く */
export function optionLabel<K extends QuestionKey>(
  key: K,
  value: BalanceAnswers[K],
): string {
  const question = BALANCE_QUESTIONS.find((q) => q.key === key);
  const option = question?.options.find((o) => o.value === value);
  return option?.label ?? "";
}
