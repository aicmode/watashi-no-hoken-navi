"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button, ButtonLink } from "../ui/Button";
import { Container } from "../ui/Container";
import { StepIndicator, type StepNo } from "./StepIndicator";
import { AnalogyPicker } from "./AnalogyPicker";
import { LifeEventPicker } from "./LifeEventPicker";
import { MetaphorPanel } from "./MetaphorPanel";
import { NaviSuggestion } from "./NaviSuggestion";
import { CoverageCard } from "./CoverageCard";
import { FinalStep } from "./FinalStep";
import { PreparednessMethods } from "./PreparednessMethods";
import { COVERAGES } from "@/data/coverages";
import { ANALOGY_MAP, type Analogy, type AnalogyId } from "@/data/analogies";
import {
  LIFE_EVENT_MAP,
  type LifeEvent,
  type LifeEventId,
} from "@/data/lifeEvents";
import { AppIcon, type AppIconName } from "../ui/AppIcon";
import { analogyIconName, lifeEventIconName } from "../ui/visuals";

/**
 * 体験フロー本体。
 *
 * 状態は3つだけ:
 *   selectedAnalogy  … STEP1 で選んだ例え
 *   selectedLifeEvent … STEP2 で選んだ暮らしの変化
 *   step             … 現在のステップ（1〜4）
 *
 * 保存はしない（localStorage も使わない）。リロードすると最初に戻る。
 */
export function NaviExperience() {
  const [step, setStep] = useState<StepNo>(1);
  const [selectedAnalogy, setSelectedAnalogy] = useState<AnalogyId | null>(null);
  const [selectedLifeEvent, setSelectedLifeEvent] =
    useState<LifeEventId | null>(null);
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

  const handleSelectAnalogy = useCallback(
    (id: AnalogyId) => {
      setSelectedAnalogy(id);
      // 途中で例えだけ変えた場合は、選び直さずそのまま説明へ戻る
      setStep(selectedLifeEvent ? 3 : 2);
    },
    [selectedLifeEvent],
  );

  const handleSelectLifeEvent = useCallback((id: LifeEventId) => {
    setSelectedLifeEvent(id);
    setStep(3);
  }, []);

  const goChangeAnalogy = useCallback(() => setStep(1), []);
  const goChangeLifeEvent = useCallback(() => setStep(2), []);

  const restart = useCallback(() => {
    setSelectedAnalogy(null);
    setSelectedLifeEvent(null);
    setStep(1);
  }, []);

  const analogy = selectedAnalogy ? ANALOGY_MAP[selectedAnalogy] : null;
  const event = selectedLifeEvent ? LIFE_EVENT_MAP[selectedLifeEvent] : null;

  // 想定外の状態（例えが未選択なのに先のステップ）に落ちないようにする
  const current: StepNo = !analogy ? 1 : !event && step > 2 ? 2 : step;

  return (
    <div className="relative overflow-hidden pb-10 pt-5 sm:pt-9">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_50%_0%,rgba(234,242,255,0.9),transparent_72%)]" />
      <Container>
        <div ref={topRef} className="scroll-mt-20" />

        <div className="flex min-h-11 flex-wrap items-center justify-between gap-3">
          <StepIndicator current={current} />
          {current > 1 ? (
            <button
              type="button"
              onClick={restart}
              className="inline-flex min-h-11 items-center py-2 text-[0.78rem] font-semibold text-muted underline-offset-4 transition-colors hover:text-brand hover:underline"
            >
              最初から
            </button>
          ) : null}
        </div>

        {current === 1 ? (
          <StepAnalogy
            selected={selectedAnalogy}
            onSelect={handleSelectAnalogy}
          />
        ) : null}

        {current === 2 && analogy ? (
          <StepLifeEvent
            analogy={analogy}
            selected={selectedLifeEvent}
            onSelect={handleSelectLifeEvent}
            onChangeAnalogy={goChangeAnalogy}
          />
        ) : null}

        {current === 3 && analogy && event ? (
          <StepLearn
            analogy={analogy}
            event={event}
            onChangeAnalogy={goChangeAnalogy}
            onChangeLifeEvent={goChangeLifeEvent}
            onNext={() => setStep(4)}
          />
        ) : null}

        {current === 4 && analogy && event ? (
          <div className="mt-8">
            <FinalStep
              analogy={analogy}
              event={event}
              onChangeAnalogy={goChangeAnalogy}
              onChangeEvent={goChangeLifeEvent}
              onRestart={restart}
            />
          </div>
        ) : null}
      </Container>
    </div>
  );
}

/** STEP1 たとえる */
function StepAnalogy({
  selected,
  onSelect,
}: {
  selected: AnalogyId | null;
  onSelect: (id: AnalogyId) => void;
}) {
  return (
    <section className="animate-fade-up mt-8 sm:mt-10">
      <span className="text-[0.68rem] font-bold tracking-[0.12em] text-brand-deep">STEP 01 · YOUR PERSPECTIVE</span>
      <h1 className="text-balance-ja mt-2 text-[1.7rem] font-bold leading-[1.5] tracking-[-0.03em] text-ink sm:text-[2.15rem]">
        あなたに合う例えを
        <br className="sm:hidden" />
        選んでみましょう
      </h1>
      <p className="text-balance-ja mt-3 max-w-2xl text-[0.9rem] leading-[1.9] text-ink-soft">
        難しく感じやすい保険の話を、あなたにとって身近なものに置き換えて見ていきます。しっくりくるものを1つ選んでください。あとから変えられます。
      </p>

      <div className="mt-8">
        <AnalogyPicker selected={selected} onSelect={onSelect} />
      </div>

      <p className="mt-6 flex items-start gap-2 text-[0.72rem] leading-relaxed text-muted">
        <AppIcon name="help" size={15} className="mt-0.5 shrink-0" />
        どれを選んでも、扱う内容は同じです。説明の入り口が変わるだけです。
      </p>
    </section>
  );
}

/** STEP2 えらぶ */
function StepLifeEvent({
  analogy,
  selected,
  onSelect,
  onChangeAnalogy,
}: {
  analogy: Analogy;
  selected: LifeEventId | null;
  onSelect: (id: LifeEventId) => void;
  onChangeAnalogy: () => void;
}) {
  return (
    <section className="animate-fade-up mt-8 sm:mt-10">
      <SelectionBar analogy={analogy} onChangeAnalogy={onChangeAnalogy} />

      <span className="mt-5 block text-[0.68rem] font-bold tracking-[0.12em] text-brand-deep">STEP 02 · YOUR LIFE CHANGE</span>
      <h1 className="text-balance-ja mt-2 text-[1.7rem] font-bold leading-[1.5] tracking-[-0.03em] text-ink sm:text-[2.15rem]">
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

/** STEP3 知る */
function StepLearn({
  analogy,
  event,
  onChangeAnalogy,
  onChangeLifeEvent,
  onNext,
}: {
  analogy: Analogy;
  event: LifeEvent;
  onChangeAnalogy: () => void;
  onChangeLifeEvent: () => void;
  onNext: () => void;
}) {
  // 選んだイベントに関係の深いものを先に並べる（推薦ではなく並び順の目安）
  const ordered = [...COVERAGES].sort((a, b) => {
    const ai = event.suggested.indexOf(a.id);
    const bi = event.suggested.indexOf(b.id);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  return (
    <section className="mt-8 space-y-10 sm:mt-10 sm:space-y-12">
      <header className="animate-fade-up">
        <div className="flex flex-wrap items-center gap-2">
          <Chip icon={analogyIconName(analogy.id)} label={analogy.title} />
          <span aria-hidden className="text-[0.75rem] text-muted">
            ×
          </span>
          <Chip icon={lifeEventIconName(event.id)} label={event.label} />
        </div>
        <span className="mt-5 block text-[0.68rem] font-bold tracking-[0.12em] text-brand-deep">STEP 03 · UNDERSTAND</span>
        <h1 className="text-balance-ja mt-2 text-[1.7rem] font-bold leading-[1.5] tracking-[-0.03em] text-ink sm:text-[2.15rem]">
          {/* 例えの名前で長さが変わるため、改行はブラウザに任せる */}
          {analogy.title}に例えると、わかりやすくなります。
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.78rem] font-semibold">
          <TextLink onClick={onChangeAnalogy}>例えを変更する</TextLink>
          <span aria-hidden className="hidden h-3 w-px bg-line sm:block" />
          <TextLink onClick={onChangeLifeEvent}>暮らしの変化を選び直す</TextLink>
        </div>
      </header>

      <MetaphorPanel analogy={analogy} event={event} />

      <div className="rounded-[1.75rem] border border-line/70 bg-surface/55 p-4 sm:p-6">
        <h2 className="text-balance-ja text-xl font-bold text-ink sm:text-2xl">
          暮らしの備えは、大きく4つ
        </h2>
        <p className="text-balance-ja mt-2 text-[0.88rem] leading-relaxed text-ink-soft">
          {analogy.browseLead}、どんな備えがあるのかを見てみましょう。カードをタップすると、もう少し詳しい説明が開きます。
        </p>
        <div className="stagger mt-6 grid gap-3 sm:grid-cols-2">
          {ordered.map((c) => (
            <CoverageCard
              key={c.id}
              coverage={c}
              analogy={analogy}
              highlighted={event.suggested.includes(c.id)}
            />
          ))}
        </div>
      </div>

      <PreparednessMethods />

      <NaviSuggestion event={event} />

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <Button
          variant="secondary"
          onClick={onChangeLifeEvent}
          className="w-full sm:w-auto"
        >
          <AppIcon name="arrow-left" size={17} />
          選び直す
        </Button>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <ButtonLink href="/#basics" variant="ghost" className="w-full sm:w-auto">
            保険の分野について見る
          </ButtonLink>
          <Button size="lg" onClick={onNext} className="w-full sm:w-auto">
            ここまでのまとめを見る
            <AppIcon name="arrow-right" size={18} className="transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function SelectionBar({
  analogy,
  onChangeAnalogy,
}: {
  analogy: Analogy;
  onChangeAnalogy: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
      <Chip icon={analogyIconName(analogy.id)} label={`${analogy.title}で見ています`} />
      <TextLink onClick={onChangeAnalogy}>
        <span className="text-[0.78rem] font-semibold">例えを変更する</span>
      </TextLink>
    </div>
  );
}

function Chip({ icon, label }: { icon: AppIconName; label: string }) {
  return (
    <span className="inline-flex min-h-9 items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[0.75rem] font-bold text-ink-soft shadow-sm">
      <AppIcon name={icon} size={14} className="text-brand" />
      {label}
    </span>
  );
}

function TextLink({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-11 items-center gap-1.5 py-2.5 text-[0.78rem] font-semibold text-muted underline-offset-4 transition-colors hover:text-brand hover:underline"
    >
      {children}
    </button>
  );
}
