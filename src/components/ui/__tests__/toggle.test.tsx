import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toggle } from "../toggle";

describe("Toggle", () => {
  it("renders a toggle button", () => {
    render(<Toggle aria-label="Bold">B</Toggle>);
    expect(screen.getByText("B")).toBeInTheDocument();
  });

  it("toggles pressed state on click", async () => {
    const user = userEvent.setup();
    render(<Toggle aria-label="Bold">B</Toggle>);
    const toggle = screen.getByRole("button");

    expect(toggle).toHaveAttribute("data-state", "off");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("data-state", "on");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("data-state", "off");
  });

  it("applies variant classes", () => {
    const { container } = render(
      <Toggle variant="outline" aria-label="Bold">
        B
      </Toggle>,
    );
    expect(container.firstChild).toHaveClass("border");
  });

  it("applies size classes", () => {
    const { container } = render(
      <Toggle size="sm" aria-label="Bold">
        B
      </Toggle>,
    );
    expect(container.firstChild).toHaveClass("h-8");
  });

  it("supports disabled state", () => {
    render(
      <Toggle disabled aria-label="Bold">
        B
      </Toggle>,
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
