import type { ApproachId } from "./types";

/**
 * 結果画面の「あなたに合いそうな考え方」。
 *
 * 「〜すべき」ではなく「〜という方法があります」で結び、
 * 守ると育てるの両方に触れる文章にそろえる。
 * どれが選ばれるかは src/lib/balance/evaluate.ts の規則で決まる。
 */

export type Approach = {
  id: ApproachId;
  /** 考え方の短い名前 */
  title: string;
  /** 本文（1〜2文） */
  body: string;
};

export const APPROACHES: Record<ApproachId, Approach> = {
  foundation: {
    id: "foundation",
    title: "まず土台を整える",
    body: "まず生活を守る資金を確保しながら、余裕のある分で長期の資産形成を考えていく方法があります。",
  },
  explore: {
    id: "explore",
    title: "全体を眺めるところから",
    body: "今ある貯蓄・保障・勤務先の制度を書き出して、守ると育てるの全体像を眺めるところから始める方法があります。",
  },
  steady: {
    id: "steady",
    title: "使う時期でお金を分ける",
    body: "近いうちに使うお金は値動きのない場所に置き、先に使うお金だけを時間をかけて育てる、と分けて考える方法があります。",
  },
  protect: {
    id: "protect",
    title: "守る備えを先に確認する",
    body: "家族や暮らしを支える備えを先に確認し、そのうえで無理なく続けられる金額の積立を考える方法があります。",
  },
  grow: {
    id: "grow",
    title: "守りを確認しつつ、育てる",
    body: "今ある保障に重なりや不足がないかを確認しつつ、長期・積立で資産形成を続けていく考え方があります。",
  },
  balanced: {
    id: "balanced",
    title: "両方を少しずつ整える",
    body: "守る備えと育てる準備を、どちらかに偏らず、暮らしの変化に合わせて少しずつ整えていく考え方があります。",
  },
};

/** メーターの段階ごとの言葉（点数ではなく「考えたい度合い」として見せる） */
export function levelLabel(level: number): string {
  if (level >= 5) return "優先して考えたい";
  if (level >= 3) return "考えておきたい";
  return "確認しておく程度";
}
