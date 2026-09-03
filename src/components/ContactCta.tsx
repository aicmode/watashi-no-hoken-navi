"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { ContactModal } from "./ContactModal";
import { AppIcon } from "./ui/AppIcon";

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
        <AppIcon name="arrow-right" size={18} className="transition-transform group-hover:translate-x-0.5" />
      </Button>
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
