import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Label } from "../label";

describe("Label", () => {
  it("renders label text", () => {
    render(<Label>Email</Label>);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("associates with an input via htmlFor", () => {
    render(
      <>
        <Label htmlFor="name">Name</Label>
        <input id="name" />
      </>,
    );
    const label = screen.getByText("Name");
    expect(label).toHaveAttribute("for", "name");
  });

  it("merges custom className", () => {
    const { container } = render(<Label className="custom-label">Test</Label>);
    expect(container.firstChild).toHaveClass("custom-label");
  });
});
