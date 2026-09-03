"use client";

import { useCallback, useEffect, useRef } from "react";
import { Button } from "./ui/Button";
import {
  CONTACT_CHANNELS,
  CONTACT_PREPARING_MESSAGE,
  type ContactChannel,
} from "@/lib/contact";
import { AppIcon, type AppIconName } from "./ui/AppIcon";

const CHANNEL_ICONS: Record<string, AppIconName> = {
  line: "message",
  tel: "phone",
  form: "mail",
};

type Props = {
  open: boolean;
  onClose: () => void;
  /**
   * 差し替え用。将来 LINE / 電話 / フォームを有効化するときは
   * lib/contact.ts の href を埋めるか、ここに別の配列を渡すだけでよい。
   */
  channels?: ContactChannel[];
};

export function ContactModal({
  open,
  onClose,
  channels = CONTACT_CHANNELS,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    document.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
      previousFocusRef.current?.focus();
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div
      className="animate-fade-in fixed inset-0 z-50 flex items-end justify-center bg-ink/55 p-0 backdrop-blur-md sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (!panelRef.current?.contains(e.target as Node)) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        aria-describedby="contact-modal-description"
        className="animate-pop max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-t-[2rem] border border-line bg-surface p-6 text-left shadow-[0_28px_90px_-28px_rgba(13,27,47,0.65)] sm:rounded-[2rem] sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-soft px-2.5 py-1 text-[0.7rem] font-bold text-amber">
              <AppIcon name="sparkles" size={13} />
              準備中
            </span>
            <h2
              id="contact-modal-title"
              className="text-balance-ja mt-3 text-lg font-bold leading-relaxed text-ink"
            >
              {CONTACT_PREPARING_MESSAGE}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="閉じる"
            className="grid size-11 shrink-0 place-items-center rounded-full bg-canvas text-muted transition-colors hover:bg-line-soft hover:text-ink"
          >
            <AppIcon name="x" size={19} />
          </button>
        </div>

        <p id="contact-modal-description" className="text-balance-ja mt-3 text-[0.85rem] leading-relaxed text-ink-soft">
          このデモでは、実際のご相談の受付は行っていません。正式版では、以下のような相談方法を用意する想定です。
        </p>

        <ul className="mt-5 space-y-2.5">
          {channels.map((c) => (
            <li key={c.id}>
              <ChannelRow channel={c} />
            </li>
          ))}
        </ul>

        <p className="mt-5 text-[0.72rem] leading-relaxed text-muted">
          ※ 本デモでは、お名前・連絡先などの個人情報は一切収集していません。
        </p>

        <Button onClick={onClose} className="mt-6 w-full" size="lg">
          とじる
        </Button>
      </div>
    </div>
  );
}

function ChannelRow({ channel }: { channel: ContactChannel }) {
  const content = (
    <>
      <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface text-brand shadow-sm">
        <AppIcon name={CHANNEL_ICONS[channel.id] ?? "message"} size={18} />
      </span>
      <span className="min-w-0">
        <span className="block text-[0.9rem] font-bold text-ink">
          {channel.label}
        </span>
        <span className="text-balance-ja block text-[0.75rem] leading-relaxed text-muted">
          {channel.description}
        </span>
      </span>
    </>
  );

  const shell =
    "flex w-full items-start gap-3 rounded-2xl border border-line bg-canvas px-4 py-3.5 text-left";

  // href が入った時点で実リンクとして動作する（UI 側の変更は不要）
  if (channel.href) {
    return (
      <a
        href={channel.href}
        className={`${shell} transition-colors hover:border-brand/40 hover:bg-brand-soft/60`}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={`${shell} opacity-70`} aria-disabled="true">
      {content}
    </div>
  );
}
