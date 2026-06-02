import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Textarea } from "../textarea";

describe("Textarea", () => {
  it("renders a textarea element", () => {
    render(<Textarea placeholder="Write here" />);
    expect(screen.getByPlaceholderText("Write here")).toBeInTheDocument();
  });

  it("accepts and displays typed text", async () => {
    const user = userEvent.setup();
    render(<Textarea placeholder="Type" />);
    const textarea = screen.getByPlaceholderText("Type");
    await user.type(textarea, "Hello world");
    expect(textarea).toHaveValue("Hello world");
  });

  it("supports disabled state", () => {
    render(<Textarea disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText("Disabled")).toBeDisabled();
  });

  it("calls onChange handler", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Textarea onChange={onChange} placeholder="change" />);
    await user.type(screen.getByPlaceholderText("change"), "x");
    expect(onChange).toHaveBeenCalled();
  });

  it("merges custom className", () => {
    const { container } = render(<Textarea className="my-ta" />);
    expect(container.firstChild).toHaveClass("my-ta");
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Textarea ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLTextAreaElement));
  });
});
