import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Progress } from "../progress";

describe("Progress", () => {
  it("renders a progress bar", () => {
    const { container } = render(<Progress value={50} />);
    expect(container.firstChild).toHaveAttribute("role", "progressbar");
  });

  it("applies overflow-hidden class", () => {
    const { container } = render(<Progress value={50} />);
    expect(container.firstChild).toHaveClass("overflow-hidden");
  });

  it("merges custom className", () => {
    const { container } = render(<Progress value={50} className="my-prog" />);
    expect(container.firstChild).toHaveClass("my-prog");
  });

  it("renders an indicator child element", () => {
    const { container } = render(<Progress value={60} />);
    const indicator = container.querySelector("[data-state]");
    expect(indicator).toBeInTheDocument();
  });

  it("applies base classes to the root", () => {
    const { container } = render(<Progress value={50} />);
    expect(container.firstChild).toHaveClass("rounded-full");
  });
});
