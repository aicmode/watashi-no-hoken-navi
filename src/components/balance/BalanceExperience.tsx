"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BALANCE_QUESTIONS, type BalanceQuestion } from "@/data/balance/questions";
import type { BalanceDraft } from "@/data/balance/types";
import { evaluateBalance, isComplete } from "@/lib/balance/evaluate";
import { AppIcon } from "../ui/AppIcon";
import { Container } from "../ui/Container";
import { BalanceIntro } from "./BalanceIntro";
import { BalanceProgress } from "./BalanceProgress";
import { BalanceResult } from "./BalanceResult";
import { QuestionStep } from "./QuestionStep";

/**
 * 「わたしのお金バランス」本体。
 *
 * 状態は2つだけ:
 *   draft … ここまでの回答（戻っても消えない）
 *   phase … はじめの画面 / n問目 / 結果
 *
 * 判定は src/lib/balance/evaluate.ts の純粋関数に任せ、ここでは画面の切り替えだけを扱う。
 * 既存の体験フローと同じく、保存はしない（リロードすると最初に戻る）。
 */

type Phase = { kind: "intro" } | { kind: "question"; index: number } | { kind: "result" };

const LAST = BALANCE_QUESTIONS.length - 1;

type OptionValue = BalanceQuestion["options"][number]["value"];

export function BalanceExperience() {
  const [phase, setPhase] = useState<Phase>({ kind: "intro" });
  const [draft, setDraft] = useState<BalanceDraft>({});
  const topRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const phaseKey = phase.kind === "question" ? `q${phase.index}` : phase.kind;

  // 画面が切り替わったら読み始めの位置に戻す
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [phaseKey]);

  const answer = useCallback((question: BalanceQuestion, index: number, value: OptionValue) => {
    setDraft((prev) => ({ ...prev, [question.key]: value }));
    setPhase(index >= LAST ? { kind: "result" } : { kind: "question", index: index + 1 });
  }, []);

  const goBack = useCallback((index: number) => {
    setPhase(index <= 0 ? { kind: "intro" } : { kind: "question", index: index - 1 });
  }, []);

  const goNext = useCallback((index: number) => {
    setPhase(index >= LAST ? { kind: "result" } : { kind: "question", index: index + 1 });
  }, []);

  const restart = useCallback(() => {
    setDraft({});
    setPhase({ kind: "question", index: 0 });
  }, []);

  const result = useMemo(() => (isComplete(draft) ? evaluateBalance(draft) : null), [draft]);

  // 結果画面なのに未回答がある（想定外）場合は、最初の未回答の質問へ戻す
  const firstUnanswered = BALANCE_QUESTIONS.findIndex((q) => draft[q.key] === undefined);
  const current: Phase =
    phase.kind === "result" && firstUnanswered !== -1
      ? { kind: "question", index: firstUnanswered }
      : phase;

  return (
    <div className="balance-experience relative overflow-hidden pb-10 pt-5 sm:pt-9">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_50%_0%,rgba(237,242,249,0.95),transparent_72%)]"
      />
      <div ref={topRef} className="scroll-mt-24" />

      {current.kind === "intro" ? (
        <Container>
          <div className="mt-4 sm:mt-6">
            <BalanceIntro onStart={() => setPhase({ kind: "question", index: 0 })} />
          </div>
        </Container>
      ) : null}

      {current.kind === "question" ? (
        <Container>
          <QuestionScreen
            index={current.index}
            draft={draft}
            onAnswer={answer}
            onBack={goBack}
            onNext={goNext}
          />
        </Container>
      ) : null}

      {current.kind === "result" && result && isComplete(draft) ? (
        <div className="mt-4 sm:mt-6">
          <BalanceResult
            answers={draft}
            result={result}
            onReview={() => setPhase({ kind: "question", index: 0 })}
            onRestart={restart}
          />
        </div>
      ) : null}
    </div>
  );
}

function QuestionScreen({
  index,
  draft,
  onAnswer,
  onBack,
  onNext,
}: {
  index: number;
  draft: BalanceDraft;
  onAnswer: (question: BalanceQuestion, index: number, value: OptionValue) => void;
  onBack: (index: number) => void;
  onNext: (index: number) => void;
}) {
  const question = BALANCE_QUESTIONS[index];
  const selected = draft[question.key];

  return (
    <div>
      <div className="flex min-h-11 items-center justify-between gap-4">
        <span className="eyebrow">わたしのお金バランス</span>
      </div>
      <div className="mt-3">
        <BalanceProgress current={index + 1} />
      </div>

      <div className="mt-8 sm:mt-10">
        {/* 質問ごとに作り直し、前の質問の選択状態を持ち越さない */}
        <QuestionStep
          key={question.key}
          question={question}
          number={index + 1}
          selected={selected}
          onSelect={(value) => onAnswer(question, index, value)}
        />
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onBack(index)}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 py-2 text-[0.84rem] font-semibold text-ink-soft transition-colors hover:bg-surface hover:text-brand"
        >
          <AppIcon name="arrow-left" size={16} />
          戻る
        </button>
        {selected !== undefined ? (
          <button
            type="button"
            onClick={() => onNext(index)}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 py-2 text-[0.84rem] font-semibold text-brand transition-colors hover:bg-brand-soft"
          >
            {index >= LAST ? "結果を見る" : "次へ"}
            <AppIcon name="arrow-right" size={16} />
          </button>
        ) : (
          <span className="text-[0.74rem] text-muted">選ぶと次へ進みます</span>
        )}
      </div>
    </div>
  );
}
