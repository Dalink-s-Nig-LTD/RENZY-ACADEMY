import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "../checkbox";

describe("Checkbox", () => {
  it("renders a checkbox", () => {
    render(<Checkbox aria-label="Accept" />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("starts unchecked by default", () => {
    render(<Checkbox aria-label="Accept" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("data-state", "unchecked");
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="Accept" />);
    const cb = screen.getByRole("checkbox");

    await user.click(cb);
    expect(cb).toHaveAttribute("data-state", "checked");

    await user.click(cb);
    expect(cb).toHaveAttribute("data-state", "unchecked");
  });

  it("respects disabled state", () => {
    render(<Checkbox disabled aria-label="Accept" />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("merges custom className", () => {
    const { container } = render(<Checkbox className="my-cb" aria-label="Accept" />);
    expect(container.querySelector("button")).toHaveClass("my-cb");
  });
});
