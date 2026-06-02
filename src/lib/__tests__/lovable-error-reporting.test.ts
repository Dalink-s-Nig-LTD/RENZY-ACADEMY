import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { reportLovableError } from "../lovable-error-reporting";

describe("reportLovableError", () => {
  let capturedArgs: {
    error: unknown;
    context: Record<string, unknown>;
    options: Record<string, unknown>;
  } | null = null;

  beforeEach(() => {
    capturedArgs = null;
    Object.defineProperty(window, "location", {
      value: { pathname: "/test-page" },
      writable: true,
    });
    window.__lovableEvents = {
      captureException: vi.fn(
        (error: unknown, context?: Record<string, unknown>, options?: Record<string, unknown>) => {
          capturedArgs = {
            error,
            context: context ?? {},
            options: options ?? {},
          };
        },
      ),
    };
  });

  afterEach(() => {
    delete window.__lovableEvents;
  });

  it("calls captureException when __lovableEvents is available", () => {
    const err = new Error("test");
    reportLovableError(err);

    expect(window.__lovableEvents?.captureException).toHaveBeenCalledOnce();
  });

  it("passes the error as the first argument", () => {
    const err = new Error("boom");
    reportLovableError(err);

    expect(capturedArgs?.error).toBe(err);
  });

  it("includes source and route in context", () => {
    reportLovableError(new Error("test"));

    expect(capturedArgs?.context).toMatchObject({
      source: "react_error_boundary",
      route: "/test-page",
    });
  });

  it("merges custom context with defaults", () => {
    reportLovableError(new Error("test"), { component: "Header" });

    expect(capturedArgs?.context).toMatchObject({
      source: "react_error_boundary",
      route: "/test-page",
      component: "Header",
    });
  });

  it("passes correct options", () => {
    reportLovableError(new Error("test"));

    expect(capturedArgs?.options).toEqual({
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error",
    });
  });

  it("does nothing when __lovableEvents is not available", () => {
    delete window.__lovableEvents;
    // Should not throw
    expect(() => reportLovableError(new Error("safe"))).not.toThrow();
  });

  it("does nothing when captureException is not defined", () => {
    window.__lovableEvents = {};
    expect(() => reportLovableError(new Error("safe"))).not.toThrow();
  });
});
