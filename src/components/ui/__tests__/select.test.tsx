import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Select, SelectTrigger, SelectValue } from "../select";

describe("Select", () => {
  it("renders a select trigger with placeholder", () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose..." />
        </SelectTrigger>
      </Select>,
    );
    expect(screen.getByText("Choose...")).toBeInTheDocument();
  });

  it("renders the trigger as a button", () => {
    render(
      <Select>
        <SelectTrigger data-testid="trigger">
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
      </Select>,
    );
    expect(screen.getByTestId("trigger").tagName).toBe("BUTTON");
  });
});
