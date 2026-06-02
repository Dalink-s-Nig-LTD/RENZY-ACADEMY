import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "../input";

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("accepts and displays typed text", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Type here" />);
    const input = screen.getByPlaceholderText("Type here");
    await user.type(input, "Hello");
    expect(input).toHaveValue("Hello");
  });

  it("supports type attribute", () => {
    render(<Input type="email" data-testid="email" />);
    expect(screen.getByTestId("email")).toHaveAttribute("type", "email");
  });

  it("supports disabled state", () => {
    render(<Input disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText("Disabled")).toBeDisabled();
  });

  it("calls onChange handler", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input onChange={onChange} placeholder="change" />);
    await user.type(screen.getByPlaceholderText("change"), "a");
    expect(onChange).toHaveBeenCalled();
  });

  it("merges custom className", () => {
    const { container } = render(<Input className="custom-input" />);
    expect(container.firstChild).toHaveClass("custom-input");
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Input ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
  });
});
