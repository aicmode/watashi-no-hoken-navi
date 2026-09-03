/**
 * 相談導線の設定。
 *
 * 現時点はプロトタイプのため、どのチャネルも href を null にしてある。
 * 将来 LINE / 電話 / 問い合わせフォームへ差し替える場合は、
 * ここに href を入れるだけで ContactModal 側の表示が実リンクに切り替わる。
 * （UI 側のコードを変更する必要はない）
 */

export type ContactChannel = {
  id: string;
  emoji: string;
  label: string;
  description: string;
  /** null の間は「準備中」として表示される */
  href: string | null;
};

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: "line",
    emoji: "💬",
    label: "メッセージで相談",
    description: "チャットで気軽に質問する（将来 LINE 連携を想定）",
    href: null,
  },
  {
    id: "tel",
    emoji: "📞",
    label: "電話で相談",
    description: "担当者に直接つながる導線（将来設置予定）",
    href: null,
  },
  {
    id: "form",
    emoji: "✉️",
    label: "フォームから相談",
    description: "都合のいい時間を伝える（将来設置予定）",
    href: null,
  },
];

/** 準備中に表示する文言 */
export const CONTACT_PREPARING_MESSAGE =
  "プロトタイプのため、現在お問い合わせ機能は準備中です。";

export const hasActiveContactChannel = (
  channels: ContactChannel[] = CONTACT_CHANNELS,
) => channels.some((c) => c.href);
