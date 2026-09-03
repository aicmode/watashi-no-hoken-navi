import { Container } from "./ui/Container";
import { DISCLAIMER, SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-surface/60">
      <Container size="lg">
        <div className="flex flex-col gap-5 py-9">
          <div className="flex items-center gap-2">
            <span aria-hidden className="text-base">
              🧭
            </span>
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
