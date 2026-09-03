import { test } from "node:test";
import assert from "node:assert/strict";
import { recommendationRules } from "../src/data/recommendation-rules.ts";

const expected: Record<string, string> = {
  "job-preparation": "jrp",
  "career-growth": "jrp-advance",
  "ai-beginner": "basic-ai",
  "ai-existing": "advanced-ai",
  "career-uncertainty": "career-counselling",
  "company-training": "corporate-training",
};

test("recommendation rules cover the published matching table", () => {
  for (const [goal, slug] of Object.entries(expected)) {
    const rule = recommendationRules.find((item) => item.careerGoal === goal);
    assert.ok(rule, `missing rule for ${goal}`);
    assert.equal(rule?.offeringSlug, slug);
  }
});
