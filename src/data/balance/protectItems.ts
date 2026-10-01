import type { ProtectItemId } from "./types";

/**
 * 「守るお金」の項目。
 *
 * 生活防衛資金（貯蓄で用意するもの）と、
 * 生命保険で話題になりやすい保障の種類を、同じ並びで扱う。
 * 特定の商品を指すものではなく「考える項目」の名前にとどめる。
 */

export type ProtectItem = {
  id: ProtectItemId;
  title: string;
  /** カードの見出し下に置く1行説明 */
  summary: string;
  /** 主に何で準備することが多いか（断定ではなく目安） */
  means: "savings" | "insurance" | "mixed";
  /** 自分の場合を確かめるための問い（1つ） */
  checkPoint: string;
  /** 「まず考えてみたいこと」に出すときの短い名前 */
  focusLabel: string;
};

export const PROTECT_MEANS_LABEL: Record<ProtectItem["means"], string> = {
  savings: "貯蓄で準備",
  insurance: "保障・制度で考える",
  mixed: "貯蓄と保障の両方で考える",
};

export const PROTECT_ITEMS: ProtectItem[] = [
  {
    id: "emergency",
    title: "生活防衛資金",
    summary: "急な出費や収入が減ったときに、すぐ使えるように取っておくお金。",
    means: "savings",
    checkPoint: "毎月の生活費の何か月分あると落ち着けそうですか？",
    focusLabel: "生活防衛資金",
  },
  {
    id: "medical",
    title: "医療への備え",
    summary: "病気やケガで治療・入院したときの費用や、その間の暮らし。",
    means: "insurance",
    checkPoint: "公的な制度や今の貯蓄で、どこまで対応できそうですか？",
    focusLabel: "医療への備え",
  },
  {
    id: "death",
    title: "死亡保障",
    summary: "もしものとき、家族の生活費や教育費を支えるための備え。",
    means: "insurance",
    checkPoint: "あなたの収入で暮らしている人は誰ですか？",
    focusLabel: "家族のための死亡保障",
  },
  {
    id: "income",
    title: "働けなくなったときへの備え",
    summary: "病気やケガで長く働けないとき、減った収入をどう補うか。",
    means: "insurance",
    checkPoint: "勤務先の制度で、休んだときの収入はどうなりますか？",
    focusLabel: "働けないときの収入",
  },
  {
    id: "cancer",
    title: "がん等への備え",
    summary: "治療が長くなることもある病気について、費用や働き方への影響。",
    means: "insurance",
    checkPoint: "医療への備えと重なっている部分はありませんか？",
    focusLabel: "がん等への備え",
  },
  {
    id: "retirement",
    title: "老後への備え",
    summary: "仕事を引退したあとの生活費を、何でまかなうか。",
    means: "mixed",
    checkPoint: "公的年金の見込みと、自分で準備したい部分を分けてみませんか？",
    focusLabel: "老後の生活費",
  },
];

export const PROTECT_ITEM_MAP: Record<ProtectItemId, ProtectItem> =
  PROTECT_ITEMS.reduce(
    (acc, item) => ({ ...acc, [item.id]: item }),
    {} as Record<ProtectItemId, ProtectItem>,
  );

/**
 * 優先度の段階。
 * 「必要です」と断定せず、考える順番の目安として表現する。
 */
export type PriorityTier = "first" | "check" | "later";

export const PRIORITY_TIER_LABEL: Record<PriorityTier, string> = {
  first: "まず考えておきたい備え",
  check: "一度確認しておきたいポイント",
  later: "今後検討してもよさそうな項目",
};
