import { describe, it, expect } from "vitest";
import { findRelevantFAQ, FAQ_DATABASE } from "../faq";

describe("FAQ_DATABASE", () => {
  it("contains 10 entries", () => {
    expect(FAQ_DATABASE).toHaveLength(10);
  });

  it("every entry has id, question, keywords, and answer", () => {
    for (const faq of FAQ_DATABASE) {
      expect(faq).toHaveProperty("id");
      expect(faq).toHaveProperty("question");
      expect(faq).toHaveProperty("keywords");
      expect(faq).toHaveProperty("answer");
      expect(faq.keywords.length).toBeGreaterThan(0);
    }
  });

  it("has unique ids", () => {
    const ids = FAQ_DATABASE.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("findRelevantFAQ", () => {
  it("returns null for a completely unrelated query", () => {
    expect(findRelevantFAQ("xyzzy")).toBeNull();
  });

  it("matches by exact keyword (case-insensitive)", () => {
    const result = findRelevantFAQ("What is PMI-ACP?");
    expect(result).not.toBeNull();
    expect(result?.id).toBe(1);
  });

  it("matches keyword regardless of case", () => {
    const result = findRelevantFAQ("CERTIFICATION details");
    expect(result).not.toBeNull();
    expect(result?.id).toBe(1);
  });

  it("matches prerequisite keywords", () => {
    const result = findRelevantFAQ("What are the prerequisites?");
    expect(result).not.toBeNull();
    expect(result?.id).toBe(2);
  });

  it("matches pricing keywords", () => {
    const result = findRelevantFAQ("pricing information");
    expect(result).not.toBeNull();
    expect(result?.id).toBe(7);
  });

  it("matches refund keywords", () => {
    const result = findRelevantFAQ("Can I get a refund?");
    expect(result).not.toBeNull();
    expect(result?.id).toBe(5);
  });

  it("matches cohort keywords", () => {
    const result = findRelevantFAQ("When does the next cohort start?");
    expect(result).not.toBeNull();
    expect(result?.id).toBe(6);
  });

  it("falls back to word matching against question text", () => {
    // "globally" is not a keyword but appears in the question text of FAQ #10
    const result = findRelevantFAQ("globally");
    expect(result).not.toBeNull();
    expect(result?.id).toBe(10);
  });

  it("returns the first keyword match when multiple FAQs could match", () => {
    // "training" is a keyword for FAQ #3, should be prioritized
    const result = findRelevantFAQ("training");
    expect(result).not.toBeNull();
    expect(result?.id).toBe(3);
  });

  it("handles empty string by falling back to word match", () => {
    // "".split(" ") yields [""] and every question.includes("") is true,
    // so the fallback always matches the first FAQ entry.
    const result = findRelevantFAQ("");
    expect(result).not.toBeNull();
    expect(result?.id).toBe(1);
  });

  it("matches study materials", () => {
    const result = findRelevantFAQ("Do you have study materials?");
    expect(result).not.toBeNull();
    expect(result?.id).toBe(9);
  });

  it("matches framework-related queries", () => {
    const result = findRelevantFAQ("Tell me about scrum");
    expect(result).not.toBeNull();
    expect(result?.id).toBe(4);
  });
});
