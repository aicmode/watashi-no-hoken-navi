import { PREPAREDNESS_OPTIONS } from "@/data/preparedness";
import { AppIcon } from "../ui/AppIcon";
import { IconScene } from "../ui/IconScene";
import { METHOD_SCENES } from "../ui/visuals";

export function PreparednessMethods() {
  return (
    <div className="rounded-[1.75rem] border border-mint/20 bg-mint-soft/55 p-6 shadow-[0_18px_48px_-40px_rgba(8,127,103,0.48)] sm:p-8">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-[0.7rem] font-bold text-mint">
        <AppIcon name="layers" size={14} />
        備え方の選択肢
      </span>
      <h2 className="text-balance-ja mt-3.5 text-lg font-bold text-ink sm:text-xl">
        備え方は、保険だけではありません。
      </h2>
      <p className="text-balance-ja mt-2 text-[0.84rem] leading-relaxed text-ink-soft">
        貯蓄や公的・勤務先の制度も含めて、すでにあるものと足りない部分を整理します。すべてを保険で備える必要はありません。
      </p>
      <ul className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {PREPAREDNESS_OPTIONS.map((option) => (
          <li
            key={option.label}
            className="scene-group flex min-h-32 flex-col items-center justify-center gap-2.5 rounded-2xl border border-mint/10 bg-surface px-2 py-4 text-center text-[0.78rem] font-semibold text-ink-soft shadow-sm sm:min-h-32 sm:px-3"
          >
            {/* 4つは同サイズ・同構造・同トーン。民間の保険だけを強調しない */}
            <IconScene {...METHOD_SCENES[option.label]} variant="method" />
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
