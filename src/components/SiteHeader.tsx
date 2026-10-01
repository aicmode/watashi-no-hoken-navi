import Link from "next/link";
import { Container } from "./ui/Container";
import { SITE } from "@/lib/site";
import { BrandMark } from "./ui/BrandMark";
import { HeaderNav } from "./HeaderNav";

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-40 border-b border-line/70 bg-canvas/88 backdrop-blur-xl supports-[backdrop-filter]:bg-canvas/75">
      <Container size="lg">
        <div className="site-header-inner flex h-16 items-center justify-between gap-3 sm:h-[4.5rem]">
          <Link
            href="/"
            className="group scene-group flex min-h-11 min-w-0 items-center gap-2 rounded-xl sm:gap-3"
            aria-label={`${SITE.name} トップへ`}
          >
            <BrandMark className="size-8 shadow-[0_8px_22px_-10px_rgba(17,47,92,0.8)] transition-transform duration-300 group-hover:-translate-y-0.5 sm:size-9" />
            <span className="font-display truncate text-[0.88rem] font-semibold tracking-[0.01em] text-ink sm:text-[1.05rem] sm:tracking-[0.02em]">
              {SITE.name}
            </span>
            <span className="shrink-0 rounded-full border border-gold/40 px-1.5 py-px text-[0.56rem] font-bold tracking-[0.12em] text-gold-deep sm:px-2 sm:text-[0.6rem]">
              DEMO
            </span>
          </Link>
          <HeaderNav />
        </div>
      </Container>
      <div aria-hidden className="gold-rule opacity-60" />
    </header>
  );
}
