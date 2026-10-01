import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { APPROACHES } from "../src/data/balance/approaches";
import {
  GROW_GLOSSARY,
  GROW_OPTIONS,
  SYSTEM_NOTE,
} from "../src/data/balance/growOptions";
import {
  PRIORITY_TIER_LABEL,
  PROTECT_ITEMS,
} from "../src/data/balance/protectItems";
import { BALANCE_QUESTIONS, optionLabel } from "../src/data/balance/questions";
import type { BalanceAnswers } from "../src/data/balance/types";
import {
  METER_MAX,
  METER_MIN,
  evaluateBalance,
  isComplete,
} from "../src/lib/balance/evaluate";

const familyFirst: BalanceAnswers = {
  age: "30s",
  household: "children",
  concern: "education",
  emergencyFund: "little",
  experience: "none",
  horizon: "mid",
  risk: "avoid",
};

const growthMinded: BalanceAnswers = {
  age: "20s",
  household: "single",
  concern: "investing",
  emergencyFund: "ready",
  experience: "nisa",
  horizon: "long",
  risk: "longterm",
};

/** 全回答パターンを列挙する（5×4×7×4×5×4×3 = 33,600 通り） */
function* allAnswers(): Generator<BalanceAnswers> {
  const [age, household, concern, emergencyFund, experience, horizon, risk] =
    BALANCE_QUESTIONS.map((q) => q.options.map((o) => o.value));
  for (const a of age)
    for (const h of household)
      for (const c of concern)
        for (const e of emergencyFund)
          for (const x of experience)
            for (const z of horizon)
              for (const r of risk)
                yield {
                  age: a,
                  household: h,
                  concern: c,
                  emergencyFund: e,
                  experience: x,
                  horizon: z,
                  risk: r,
                } as BalanceAnswers;
}

describe("質問データ", () => {
  it("5〜7問で構成されている", () => {
    assert.ok(BALANCE_QUESTIONS.length >= 5 && BALANCE_QUESTIONS.length <= 7);
  });

  it("質問のキーと選択肢の値が重複していない", () => {
    const keys = BALANCE_QUESTIONS.map((q) => q.key);
    assert.equal(new Set(keys).size, keys.length);
    for (const q of BALANCE_QUESTIONS) {
      const values = q.options.map((o) => o.value as string);
      assert.ok(values.length >= 2, `${q.key} の選択肢が少なすぎます`);
      assert.equal(new Set(values).size, values.length, `${q.key} の値が重複しています`);
    }
  });

  it("回答値からラベルを引ける", () => {
    assert.equal(optionLabel("household", "children"), "子どもがいる");
    assert.equal(optionLabel("experience", "ideco"), "iDeCoを利用している");
  });

  it("途中の回答は未完了として扱う", () => {
    assert.equal(isComplete({ age: "30s" }), false);
    assert.equal(isComplete(familyFirst), true);
  });
});

describe("判定ロジック", () => {
  it("全回答パターンで、守る・育てるの両方が範囲内に表示される", () => {
    let count = 0;
    for (const answers of allAnswers()) {
      const r = evaluateBalance(answers);
      assert.ok(r.protectLevel >= METER_MIN && r.protectLevel <= METER_MAX);
      assert.ok(r.growLevel >= METER_MIN && r.growLevel <= METER_MAX);
      assert.equal(r.protect.length, PROTECT_ITEMS.length);
      assert.equal(r.grow.length, GROW_OPTIONS.length);
      assert.equal(r.focus.length, 3);
      assert.ok(r.focus.some((f) => f.side === "protect"));
      assert.ok(r.focus.some((f) => f.side === "grow"));
      assert.ok(r.approach.body.length > 0);
      count++;
    }
    assert.equal(count, 33600);
  });

  it("同じ回答からは同じ結果になる", () => {
    assert.deepEqual(evaluateBalance(familyFirst), evaluateBalance(familyFirst));
  });

  it("回答によって結果が変わる", () => {
    const a = evaluateBalance(familyFirst);
    const b = evaluateBalance(growthMinded);
    assert.ok(a.protectLevel > a.growLevel, "家族・生活防衛資金が少ない場合は守る側が大きい");
    assert.ok(b.growLevel > b.protectLevel, "生活防衛資金があり長期志向なら育てる側が大きい");
    assert.notDeepEqual(
      a.focus.map((f) => f.id),
      b.focus.map((f) => f.id),
    );
    assert.notEqual(a.approach.id, b.approach.id);
  });

  it("生活防衛資金が少ない・分からないときは、まず土台を整える", () => {
    for (const emergencyFund of ["little", "unknown"] as const) {
      const r = evaluateBalance({ ...familyFirst, concern: "family", emergencyFund });
      assert.equal(r.approach.id, "foundation");
      assert.equal(r.focus[0].id, "emergency");
      assert.equal(r.protect[0].item.id, "emergency");
      assert.equal(r.protect[0].tier, "first");
    }
  });

  it("生活防衛資金が準備できていれば、先頭に固定しない", () => {
    const r = evaluateBalance({ ...familyFirst, emergencyFund: "ready" });
    assert.notEqual(r.protect[0].item.id, "emergency");
  });

  it("子どもがいる場合は死亡保障の優先度が上がる", () => {
    const withChildren = evaluateBalance({ ...growthMinded, household: "children" });
    const single = evaluateBalance(growthMinded);
    const rankOf = (r: ReturnType<typeof evaluateBalance>) =>
      r.protect.findIndex((p) => p.item.id === "death");
    assert.ok(rankOf(withChildren) < rankOf(single));
  });

  it("老後に向けた準備では iDeCo が上位2つに入る", () => {
    const r = evaluateBalance({ ...growthMinded, concern: "retirement", horizon: "retirement" });
    const top = r.grow.filter((g) => g.relevance === "high").map((g) => g.option.id);
    assert.ok(top.includes("ideco"));
  });

  it("近いうちに使うお金・値動きを避けたい場合は預貯金が上位に来る", () => {
    const r = evaluateBalance({ ...growthMinded, horizon: "few", risk: "avoid" });
    assert.equal(r.grow[0].option.id, "deposit");
    assert.equal(r.approach.id, "steady");
  });

  it("まだよく分からない場合は、全体を眺める考え方になる", () => {
    const r = evaluateBalance({ ...growthMinded, concern: "unsure" });
    assert.equal(r.approach.id, "explore");
  });
});

describe("表現のガイドライン", () => {
  const texts: string[] = [
    ...BALANCE_QUESTIONS.flatMap((q) => [
      q.title,
      q.lead,
      ...q.options.flatMap((o) => [o.label, "hint" in o && o.hint ? o.hint : ""]),
    ]),
    ...PROTECT_ITEMS.flatMap((i) => [i.title, i.summary, i.checkPoint, i.focusLabel]),
    ...GROW_OPTIONS.flatMap((o) => [o.title, o.what, o.purpose, o.merit, o.caution, o.focusLabel]),
    ...Object.values(APPROACHES).flatMap((a) => [a.title, a.body]),
    ...Object.values(PRIORITY_TIER_LABEL),
    ...GROW_GLOSSARY.map((g) => g.body),
    SYSTEM_NOTE,
  ];

  const banned = ["絶対", "必ず", "確実", "保証", "おすすめ", "入るべき", "すべき", "儲か", "損しない"];

  for (const word of banned) {
    it(`「${word}」を使っていない`, () => {
      const hit = texts.find((t) => t.includes(word));
      assert.equal(hit, undefined, `禁止表現を含む文言: ${hit}`);
    });
  }

  it("NISA / iDeCo は「制度」として扱っている", () => {
    for (const id of ["nisa", "ideco"] as const) {
      const option = GROW_OPTIONS.find((o) => o.id === id);
      assert.equal(option?.kind, "system");
      assert.ok(option?.what.includes("制度"));
    }
  });

  it("育てる選択肢は、どんなもの・目的・メリット・注意点を短く持つ", () => {
    for (const o of GROW_OPTIONS) {
      for (const text of [o.what, o.purpose, o.merit, o.caution]) {
        assert.ok(text.length > 0 && text.length <= 40, `${o.id}: 「${text}」が長すぎます`);
      }
    }
  });
});
