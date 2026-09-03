"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button, ButtonLink } from "../ui/Button";
import { Container } from "../ui/Container";
import { StepIndicator } from "./StepIndicator";
import { LifeEventPicker } from "./LifeEventPicker";
import { MetaphorPanel } from "./MetaphorPanel";
import { NaviSuggestion } from "./NaviSuggestion";
import { CoverageCard } from "./CoverageCard";
import { FinalStep } from "./FinalStep";
import { COVERAGES } from "@/data/coverages";
import {
  LIFE_EVENT_MAP,
  type LifeEvent,
  type LifeEventId,
} from "@/data/lifeEvents";

type Step = 1 | 2 | 3;

export function NaviExperience() {
  const [step, setStep] = useState<Step>(1);
  const [selected, setSelected] = useState<LifeEventId | null>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // ステップが切り替わったら読み始めの位置に戻す
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const handleSelect = useCallback((id: LifeEventId) => {
    setSelected(id);
    setStep(2);
  }, []);

  const restart = useCallback(() => {
    setSelected(null);
    setStep(1);
  }, []);

  const event = selected ? LIFE_EVENT_MAP[selected] : null;

  return (
    <div className="pb-8 pt-6 sm:pt-10">
      <Container>
        <div ref={topRef} className="scroll-mt-20" />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <StepIndicator current={step} />
          {step > 1 ? (
            <button
              type="button"
              onClick={restart}
              className="text-[0.78rem] font-semibold text-muted underline-offset-4 transition-colors hover:text-brand hover:underline"
            >
              最初から
            </button>
          ) : null}
        </div>

        {step === 1 ? <StepSelect onSelect={handleSelect} selected={selected} /> : null}

        {step === 2 && event ? (
          <StepLearn
            event={event}
            onBack={restart}
            onNext={() => setStep(3)}
          />
        ) : null}

        {step === 3 && event ? (
          <div className="mt-8">
            <FinalStep event={event} onRestart={restart} />
          </div>
        ) : null}
      </Container>
    </div>
  );
}

function StepSelect({
  selected,
  onSelect,
}: {
  selected: LifeEventId | null;
  onSelect: (id: LifeEventId) => void;
}) {
  return (
    <section className="animate-fade-up mt-8">
      <h1 className="text-balance-ja text-2xl font-bold leading-relaxed tracking-tight text-ink sm:text-3xl">
        最近、あなたの暮らしで
        <br className="sm:hidden" />
        変わったことは？
      </h1>
      <p className="text-balance-ja mt-3 max-w-xl text-[0.9rem] leading-relaxed text-ink-soft">
        近いものを1つ選んでください。選んだ内容に合わせて、話の入り口が変わります。当てはまるものがなければ「将来について考え始めた」でどうぞ。
      </p>

      <div className="mt-7">
        <LifeEventPicker selected={selected} onSelect={onSelect} />
      </div>

      <p className="mt-6 text-[0.72rem] text-muted">
        選んだ内容はこの画面の中だけで使われます。どこかに送信・保存されることはありません。
      </p>
    </section>
  );
}

function StepLearn({
  event,
  onBack,
  onNext,
}: {
  event: LifeEvent;
  onBack: () => void;
  onNext: () => void;
}) {
  // 選んだイベントに関係の深いものを先に並べる（推薦ではなく並び順の目安）
  const ordered = [...COVERAGES].sort((a, b) => {
    const ai = event.suggested.indexOf(a.id);
    const bi = event.suggested.indexOf(b.id);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  return (
    <section className="mt-8 space-y-10">
      <header className="animate-fade-up">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[0.75rem] font-bold text-ink-soft">
          <span aria-hidden>{event.emoji}</span>
          {event.label}
        </span>
        <h1 className="text-balance-ja mt-4 text-2xl font-bold leading-relaxed tracking-tight text-ink sm:text-3xl">
          クルマに例えると、
          <br className="sm:hidden" />
          わかりやすくなります。
        </h1>
      </header>

      <MetaphorPanel event={event} />

      <div>
        <h2 className="text-balance-ja text-xl font-bold text-ink sm:text-2xl">
          暮らしの備えは、大きく4つ
        </h2>
        <p className="text-balance-ja mt-2 text-[0.88rem] leading-relaxed text-ink-soft">
          クルマの装備一覧を眺めるように、どんな備えがあるのかを見てみましょう。カードをタップすると、もう少し詳しい説明が開きます。
        </p>
        <div className="stagger mt-6 grid gap-3 sm:grid-cols-2">
          {ordered.map((c) => (
            <CoverageCard
              key={c.id}
              coverage={c}
              highlighted={event.suggested.includes(c.id)}
            />
          ))}
        </div>
      </div>

      <NaviSuggestion event={event} />

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <Button variant="secondary" onClick={onBack} className="w-full sm:w-auto">
          <span aria-hidden>←</span>
          選び直す
        </Button>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <ButtonLink href="/#basics" variant="ghost" className="w-full sm:w-auto">
            生命保険と損害保険の違いを見る
          </ButtonLink>
          <Button size="lg" onClick={onNext} className="w-full sm:w-auto">
            ここまでのまとめを見る
            <span aria-hidden>→</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
