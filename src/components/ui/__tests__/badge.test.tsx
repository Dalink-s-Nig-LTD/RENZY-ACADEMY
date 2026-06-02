import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "../badge";

describe("Badge", () => {
  it("renders with default variant", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("applies default variant classes", () => {
    const { container } = render(<Badge>Default</Badge>);
    expect(container.firstChild).toHaveClass("bg-primary");
  });

  it("applies secondary variant", () => {
    const { container } = render(<Badge variant="secondary">Sec</Badge>);
    expect(container.firstChild).toHaveClass("bg-secondary");
  });

  it("applies destructive variant", () => {
    const { container } = render(<Badge variant="destructive">Err</Badge>);
    expect(container.firstChild).toHaveClass("bg-destructive");
  });

  it("applies outline variant", () => {
    const { container } = render(<Badge variant="outline">Out</Badge>);
    expect(container.firstChild).toHaveClass("text-foreground");
  });

  it("merges custom className", () => {
    const { container } = render(<Badge className="extra">Custom</Badge>);
    expect(container.firstChild).toHaveClass("extra");
  });
});
