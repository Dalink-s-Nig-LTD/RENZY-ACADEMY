import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar, AvatarFallback } from "../avatar";

describe("Avatar", () => {
  it("renders fallback when no image", () => {
    render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("merges custom className on Avatar", () => {
    const { container } = render(
      <Avatar className="my-avatar">
        <AvatarFallback>X</AvatarFallback>
      </Avatar>,
    );
    expect(container.firstChild).toHaveClass("my-avatar");
  });
});
