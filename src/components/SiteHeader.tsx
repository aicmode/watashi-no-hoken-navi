import Link from "next/link";
import { Container } from "./ui/Container";
import { SITE } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-canvas/80 backdrop-blur-md">
      <Container size="lg">
        <div className="flex h-14 items-center justify-between sm:h-16">
          <Link
            href="/"
            className="group flex min-h-11 items-center gap-2.5"
            aria-label={`${SITE.name} トップへ`}
          >
            <span
              aria-hidden
              className="grid size-8 place-items-center rounded-xl bg-brand text-[0.95rem] text-white shadow-[0_6px_16px_-8px_rgba(31,86,214,0.9)] transition-transform duration-300 group-hover:-translate-y-0.5"
            >
              🧭
            </span>
            <span className="text-[0.95rem] font-bold tracking-tight text-ink">
              {SITE.name}
            </span>
          </Link>
          <span className="rounded-full border border-line bg-surface px-2.5 py-1 text-[0.7rem] font-semibold text-muted">
            デモ版
          </span>
        </div>
      </Container>
    </header>
  );
}
