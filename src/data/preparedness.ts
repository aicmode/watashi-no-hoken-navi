/**
 * 保険商品を選ぶ前に知っておきたい、備えの考え方。
 * TOP と体験フローの両方から参照し、教育コンテンツの文言を一元管理する。
 */

export const WHY_PREPARE = {
  eyebrow: "備えを考える理由",
  title: "そもそも、なぜ備えについて考えるの？",
  body: "病気やケガ、事故、働き方・家族・住まいの変化など、暮らしには自分だけではコントロールしきれない出来事があります。保険は何かが起きると決めつけるものではなく、もしものときに自分や家族の生活への影響を小さくする方法のひとつです。",
} as const;

export const THINKING_PERSPECTIVES = [
  {
    no: "01",
    emoji: "🌦️",
    title: "何が起きる可能性があるか",
    body: "病気・事故・働けない期間など、暮らしの中で考えられる変化を眺めます。",
  },
  {
    no: "02",
    emoji: "🏡",
    title: "生活にどんな影響があるか",
    body: "費用だけでなく、収入・家族・毎月の生活への影響も一緒に考えます。",
  },
  {
    no: "03",
    emoji: "🧩",
    title: "何で準備するか",
    body: "自分で準備できる部分と、制度や保険を使う部分に分けて整理します。",
  },
] as const;

export const INSURANCE_FIELDS = [
  {
    emoji: "👤",
    label: "生命保険",
    question: "もし自分に何かあったとき、家族の生活はどうなるだろう？",
    body: "など、人の生命やその後の生活について考える分野です。",
    examples: ["家族の生活", "長く続く支出"],
    tone: "bg-brand-soft text-brand-deep",
  },
  {
    emoji: "🚗",
    label: "損害保険",
    question: "事故で車や住まいに損害が出たら、生活にどう影響するだろう？",
    body: "など、偶然の事故による損害について考える分野です。",
    examples: ["車の事故", "住まいのトラブル", "日常での賠償"],
    tone: "bg-mint-soft text-mint",
  },
  {
    emoji: "🏥",
    label: "医療・傷害など",
    question: "病気やケガで治療が続いたら、暮らしはどうなるだろう？",
    body: "など、治療やケガ、その間の生活について考える分野です。",
    examples: ["治療中の生活", "仕事を休む期間"],
    tone: "bg-amber-soft text-amber",
  },
] as const;

export const PREPAREDNESS_OPTIONS = [
  { emoji: "💰", label: "貯蓄" },
  { emoji: "🏛️", label: "公的な制度" },
  { emoji: "🏢", label: "勤務先の制度" },
  { emoji: "🛡️", label: "民間の保険" },
] as const;

export const CHECK_POINTS = [
  "今の貯蓄",
  "勤務先の福利厚生",
  "公的な制度",
  "すでに加入している保障",
  "家族の状況",
  "毎月の生活費",
] as const;

export const FINAL_LEARNINGS = [
  "保険は、暮らしの変化と一緒に考えられる",
  "備え方は、保険だけではない",
  "今ある備えを知ることから始められる",
] as const;
