import {
  GROW_GLOSSARY,
  GROW_KIND_LABEL,
  GROW_RELEVANCE_LABEL,
  SYSTEM_NOTE,
} from "@/data/balance/growOptions";
import type { RankedGrow } from "@/lib/balance/evaluate";
import { AppIcon, type AppIconName } from "../ui/AppIcon";
import { IconScene } from "../ui/IconScene";
import { GROW_SCENES } from "../ui/visuals";
import { ColumnShell } from "./ColumnShell";

const FACTS: { key: "what" | "purpose" | "merit" | "caution"; label: string; icon: AppIconName }[] = [
  { key: "what", label: "どんなもの", icon: "help" },
  { key: "purpose", label: "向いている目的", icon: "flag" },
  { key: "merit", label: "メリット", icon: "check" },
  { key: "caution", label: "注意点", icon: "info" },
];

/** 育てるお金：代表的な選択肢を、同じ4つの観点で短く並べる */
export function GrowColumn({ options }: { options: RankedGrow[] }) {
  return (
    <ColumnShell
      side="grow"
      title="育てるお金"
      caption="将来の資産形成"
      note={
        <>
          {SYSTEM_NOTE}
          <span className="mt-2 block text-muted">
            {GROW_GLOSSARY.map((g) => (
              <span key={g.term} className="block">
                ※ {g.term}：{g.body}
              </span>
            ))}
          </span>
        </>
      }
    >
      <ul className="space-y-2.5">
        {options.map(({ option, relevance }) => (
          <li
            key={option.id}
            className={[
              "scene-group rounded-2xl border bg-surface p-4",
              relevance === "high" ? "border-mint/30 shadow-[0_14px_34px_-28px_rgba(11,107,85,0.65)]" : "border-line/80",
            ].join(" ")}
          >
            <div className="flex items-center gap-3">
              <IconScene {...GROW_SCENES[option.id]} badge={undefined} variant="compact" size="sm" smSize="sm" />
              <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1">
                <h4 className="text-[0.95rem] font-bold text-ink">{option.title}</h4>
                <span className="rounded-full bg-canvas px-2 py-0.5 text-[0.64rem] font-bold text-ink-soft ring-1 ring-line">
                  {GROW_KIND_LABEL[option.kind]}
                </span>
                {relevance === "high" ? (
                  <span className="rounded-full bg-mint px-2 py-0.5 text-[0.64rem] font-bold text-white">
                    {GROW_RELEVANCE_LABEL.high}
                  </span>
                ) : null}
              </div>
            </div>
            <dl className="mt-3 space-y-2 sm:space-y-1.5">
              {FACTS.map((fact) => (
                <div
                  key={fact.key}
                  className="flex flex-col text-[0.78rem] leading-relaxed sm:grid sm:grid-cols-[6.6rem_1fr] sm:gap-2"
                >
                  <dt className="flex items-center gap-1 text-[0.7rem] font-semibold text-muted sm:text-[0.74rem]">
                    <AppIcon
                      name={fact.icon}
                      size={12}
                      className={fact.key === "caution" ? "text-amber" : "text-mint"}
                    />
                    {fact.label}
                  </dt>
                  <dd className="text-balance-ja min-w-0 text-ink-soft">{option[fact.key]}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </ColumnShell>
  );
}
