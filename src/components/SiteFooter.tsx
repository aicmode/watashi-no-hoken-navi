import { Container } from "./ui/Container";
import { DISCLAIMER, SITE } from "@/lib/site";
import { BrandMark } from "./ui/BrandMark";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line/80 bg-surface/70">
      <Container size="lg">
        <div className="flex flex-col gap-5 py-10 sm:py-12">
          <div className="flex items-center gap-2">
            <BrandMark className="size-7" />
            <span className="text-sm font-bold text-ink">{SITE.name}</span>
          </div>
          <p className="text-balance-ja max-w-3xl text-[0.72rem] leading-relaxed text-muted">
            {DISCLAIMER}
          </p>
          <p className="text-[0.7rem] text-muted/80">
            © {new Date().getFullYear()} {SITE.name}（プロトタイプ）
          </p>
        </div>
      </Container>
    </footer>
  );
}
