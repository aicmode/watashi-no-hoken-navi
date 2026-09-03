import { PREPAREDNESS_OPTIONS } from "@/data/preparedness";

export function PreparednessMethods() {
  return (
    <div className="rounded-3xl border border-mint/20 bg-mint-soft/55 p-6 sm:p-7">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-[0.7rem] font-bold text-mint">
        <span aria-hidden>🧩</span>
        備え方の選択肢
      </span>
      <h2 className="text-balance-ja mt-3.5 text-lg font-bold text-ink sm:text-xl">
        備え方は、保険だけではありません。
      </h2>
      <p className="text-balance-ja mt-2 text-[0.84rem] leading-relaxed text-ink-soft">
        貯蓄や公的・勤務先の制度も含めて、すでにあるものと足りない部分を整理します。すべてを保険で備える必要はありません。
      </p>
      <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {PREPAREDNESS_OPTIONS.map((option) => (
          <li
            key={option.label}
            className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl bg-surface px-2 py-2 text-center text-[0.76rem] font-semibold text-ink-soft sm:min-h-12 sm:flex-row sm:gap-2 sm:px-3 sm:text-left"
          >
            <span aria-hidden>{option.emoji}</span>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
