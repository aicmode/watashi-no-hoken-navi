import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container size="sm">
      <div className="flex flex-col items-center py-24 text-center">
        <span aria-hidden className="text-3xl">
          🧭
        </span>
        <h1 className="mt-4 text-xl font-bold text-ink">
          ページが見つかりませんでした
        </h1>
        <p className="mt-3 text-[0.9rem] text-ink-soft">
          お探しのページは移動または削除された可能性があります。
        </p>
        <ButtonLink href="/" className="mt-7">
          トップにもどる
        </ButtonLink>
      </div>
    </Container>
  );
}
