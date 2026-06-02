import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Separator } from "../separator";

describe("Separator", () => {
  it("renders a horizontal separator by default", () => {
    const { container } = render(<Separator />);
    expect(container.firstChild).toHaveAttribute("data-orientation", "horizontal");
  });

  it("renders a vertical separator", () => {
    const { container } = render(<Separator orientation="vertical" />);
    expect(container.firstChild).toHaveAttribute("data-orientation", "vertical");
  });

  it("applies horizontal size classes", () => {
    const { container } = render(<Separator orientation="horizontal" />);
    expect(container.firstChild).toHaveClass("h-[1px]");
    expect(container.firstChild).toHaveClass("w-full");
  });

  it("applies vertical size classes", () => {
    const { container } = render(<Separator orientation="vertical" />);
    expect(container.firstChild).toHaveClass("h-full");
    expect(container.firstChild).toHaveClass("w-[1px]");
  });

  it("merges custom className", () => {
    const { container } = render(<Separator className="my-sep" />);
    expect(container.firstChild).toHaveClass("my-sep");
  });
});
