import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ANALOGIES, ANALOGY_MAP } from "../src/data/analogies";
import { COVERAGES, COVERAGE_MAP } from "../src/data/coverages";
import { LIFE_EVENTS, LIFE_EVENT_MAP } from "../src/data/lifeEvents";

/**
 * 既存の「例え × ライフイベント」18パターンが欠けていないことの確認。
 * 新機能の追加で既存コンテンツを壊していないかを検知する。
 */
describe("例え × ライフイベント（18パターン）", () => {
  it("例え3種 × ライフイベント6種がそろっている", () => {
    assert.deepEqual(
      ANALOGIES.map((a) => a.id),
      ["car", "phone", "home"],
    );
    assert.deepEqual(
      LIFE_EVENTS.map((e) => e.id),
      ["car", "marriage", "child", "house", "work", "future"],
    );
  });

  it("18パターンすべてに説明文と考える問いがある", () => {
    let patterns = 0;
    for (const analogy of ANALOGIES) {
      for (const event of LIFE_EVENTS) {
        const story = analogy.lifeEventStories[event.id];
        assert.ok(story, `${analogy.id} × ${event.id} がありません`);
        for (const text of [story.heading, story.body, story.lifeBody, story.bridge]) {
          assert.ok(text.trim().length > 0, `${analogy.id} × ${event.id} に空の文言があります`);
        }
        assert.ok(story.thinkingPoints.length >= 2);
        patterns++;
      }
    }
    assert.equal(patterns, 18);
  });

  it("備えカードの言い換えが例えごとにそろっている", () => {
    for (const analogy of ANALOGIES) {
      for (const coverage of COVERAGES) {
        assert.ok(analogy.coverageAnalogies[coverage.id]);
      }
    }
  });

  it("ライフイベントの「まず見てみる」備えが存在するカテゴリーを指している", () => {
    for (const event of LIFE_EVENTS) {
      for (const id of event.suggested) assert.ok(COVERAGE_MAP[id]);
    }
  });

  it("ID から引けるマップが一致している", () => {
    for (const a of ANALOGIES) assert.equal(ANALOGY_MAP[a.id], a);
    for (const e of LIFE_EVENTS) assert.equal(LIFE_EVENT_MAP[e.id], e);
  });
});
