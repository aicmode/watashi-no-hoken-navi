import Link from "next/link";
import { Container } from "./ui/Container";
import { DISCLAIMER, SITE } from "@/lib/site";
import { BrandMark } from "./ui/BrandMark";

const FOOTER_LINKS = [
  { href: "/", label: "トップ" },
  { href: "/navi", label: "身近な例えで知る" },
  { href: "/balance", label: "わたしのお金バランス" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer mt-20">
      <div aria-hidden className="gold-rule" />
      <Container size="lg">
        <div className="flex flex-col gap-6 py-11 sm:py-14">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2.5">
              <BrandMark className="size-8" />
              <span className="font-display text-base font-semibold tracking-[0.02em]">
                {SITE.name}
              </span>
            </div>
            <nav aria-label="フッターメニュー">
              <ul className="flex flex-wrap gap-x-5 gap-y-1">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-11 items-center text-[0.78rem] font-semibold text-ink-soft underline-offset-4 transition-colors hover:text-ink hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div aria-hidden className="h-px bg-line" />
          <p className="text-balance-ja max-w-3xl text-[0.72rem] leading-relaxed text-muted">
            {DISCLAIMER}
          </p>
          <p className="text-[0.7rem] text-muted">
            © {new Date().getFullYear()} {SITE.name}（プロトタイプ）
          </p>
        </div>
      </Container>
    </footer>
  );
}
