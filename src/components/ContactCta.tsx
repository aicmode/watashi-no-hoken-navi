"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { ContactModal } from "./ContactModal";

/**
 * 相談ボタン + モーダル。
 * 将来 LINE / 電話 / フォームに切り替える場合も、
 * 呼び出し側はこのコンポーネントを置くだけでよい。
 */
export function ContactCta({
  label = "担当者に相談してみる",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size="lg" className={className} onClick={() => setOpen(true)}>
        {label}
        <span aria-hidden>→</span>
      </Button>
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
