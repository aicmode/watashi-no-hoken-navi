"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppIcon, type AppIconName } from "./ui/AppIcon";

const LINKS: { href: string; label: string; short: string; icon: AppIconName }[] = [
  { href: "/navi", label: "身近な例えで知る", short: "例えで知る", icon: "compass" },
  { href: "/balance", label: "わたしのお金バランス", short: "お金バランス", icon: "scale" },
];

/**
 * ヘッダーのナビゲーション。
 * 狭い画面では「お金バランス」だけを短い名前で出し、横幅をはみ出さないようにする。
 */
export function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="メインメニュー" className="header-nav flex shrink-0 items-center gap-1">
      {LINKS.map((link) => {
        const active = pathname === link.href;
        const isBalance = link.href === "/balance";
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={[
              "shrink-0 items-center gap-1 whitespace-nowrap rounded-full font-semibold transition-colors sm:gap-1.5",
              "min-h-10 px-2.5 py-1.5 text-[0.75rem] sm:min-h-11 sm:px-3.5 sm:text-[0.8rem]",
              "inline-flex",
              active
                ? "bg-ink text-white"
                : isBalance
                  ? "border border-gold/45 bg-surface/80 text-ink hover:border-gold hover:bg-gold-soft/60"
                  : "text-ink-soft hover:bg-surface hover:text-ink",
            ].join(" ")}
          >
            <AppIcon name={link.icon} size={14} className={active ? "text-gold" : "text-gold-deep"} />
            <span className="sm:hidden">{link.short}</span>
            <span className="hidden sm:inline">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
