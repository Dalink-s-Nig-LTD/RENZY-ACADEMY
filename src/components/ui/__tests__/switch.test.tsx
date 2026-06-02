import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Switch } from "../switch";

describe("Switch", () => {
  it("renders a switch", () => {
    render(<Switch aria-label="Toggle" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("starts unchecked by default", () => {
    render(<Switch aria-label="Toggle" />);
    expect(screen.getByRole("switch")).toHaveAttribute("data-state", "unchecked");
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="Toggle" />);
    const sw = screen.getByRole("switch");

    await user.click(sw);
    expect(sw).toHaveAttribute("data-state", "checked");

    await user.click(sw);
    expect(sw).toHaveAttribute("data-state", "unchecked");
  });

  it("respects disabled state", async () => {
    const user = userEvent.setup();
    render(<Switch disabled aria-label="Toggle" />);
    const sw = screen.getByRole("switch");
    expect(sw).toBeDisabled();
    await user.click(sw);
    expect(sw).toHaveAttribute("data-state", "unchecked");
  });

  it("merges custom className", () => {
    const { container } = render(<Switch className="my-switch" aria-label="Toggle" />);
    expect(container.querySelector("button")).toHaveClass("my-switch");
  });
});
