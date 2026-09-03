import Link from "next/link";
import { Container } from "./ui/Container";
import { SITE } from "@/lib/site";
import { BrandMark } from "./ui/BrandMark";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-canvas/88 backdrop-blur-xl supports-[backdrop-filter]:bg-canvas/78">
      <Container size="lg">
        <div className="flex h-16 items-center justify-between sm:h-[4.5rem]">
          <Link
            href="/"
            className="group scene-group flex min-h-11 items-center gap-3 rounded-xl"
            aria-label={`${SITE.name} トップへ`}
          >
            <BrandMark className="size-9 shadow-[0_8px_22px_-10px_rgba(25,92,199,0.8)] transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span className="text-[0.94rem] font-bold tracking-[-0.025em] text-ink sm:text-base">
              {SITE.name}
            </span>
          </Link>
          <span className="rounded-full border border-brand/15 bg-brand-soft/60 px-3 py-1 text-[0.66rem] font-bold tracking-[0.08em] text-brand-deep">
            DEMO
          </span>
        </div>
      </Container>
    </header>
  );
}
