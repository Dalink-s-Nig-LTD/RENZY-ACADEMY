import { describe, it, expect } from "vitest";
import { renderErrorPage } from "../error-page";

describe("renderErrorPage", () => {
  it("returns a string", () => {
    expect(typeof renderErrorPage()).toBe("string");
  });

  it("returns valid HTML with doctype", () => {
    const html = renderErrorPage();
    expect(html).toMatch(/^<!doctype html>/i);
  });

  it("contains the error title", () => {
    const html = renderErrorPage();
    expect(html).toContain("<title>This page didn't load</title>");
  });

  it("contains a reload button", () => {
    const html = renderErrorPage();
    expect(html).toContain("location.reload()");
    expect(html).toContain("Try again");
  });

  it("contains a go-home link", () => {
    const html = renderErrorPage();
    expect(html).toContain('href="/"');
    expect(html).toContain("Go home");
  });

  it("contains the error message", () => {
    const html = renderErrorPage();
    expect(html).toContain("Something went wrong on our end");
  });

  it("includes viewport meta tag", () => {
    const html = renderErrorPage();
    expect(html).toContain('name="viewport"');
  });
});
