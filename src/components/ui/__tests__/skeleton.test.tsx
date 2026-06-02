import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Skeleton } from "../skeleton";

describe("Skeleton", () => {
  it("renders a div with pulse animation class", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass("animate-pulse");
  });

  it("applies rounded-md class", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass("rounded-md");
  });

  it("merges custom className", () => {
    const { container } = render(<Skeleton className="h-10 w-full" />);
    expect(container.firstChild).toHaveClass("h-10");
    expect(container.firstChild).toHaveClass("w-full");
    expect(container.firstChild).toHaveClass("animate-pulse");
  });

  it("passes through additional props", () => {
    const { container } = render(<Skeleton data-testid="skel" />);
    expect(container.firstChild).toHaveAttribute("data-testid", "skel");
  });
});
