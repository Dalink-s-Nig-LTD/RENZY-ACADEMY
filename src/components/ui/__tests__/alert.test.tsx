import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Alert, AlertTitle, AlertDescription } from "../alert";

describe("Alert", () => {
  it("renders with role=alert", () => {
    render(<Alert>Message</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders title and description", () => {
    render(
      <Alert>
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Something happened</AlertDescription>
      </Alert>,
    );
    expect(screen.getByText("Warning")).toBeInTheDocument();
    expect(screen.getByText("Something happened")).toBeInTheDocument();
  });

  it("applies default variant classes", () => {
    render(<Alert data-testid="a">Test</Alert>);
    expect(screen.getByTestId("a")).toHaveClass("bg-background");
  });

  it("applies destructive variant", () => {
    render(
      <Alert variant="destructive" data-testid="d">
        Error
      </Alert>,
    );
    expect(screen.getByTestId("d")).toHaveClass("text-destructive");
  });

  it("merges custom className on Alert", () => {
    render(<Alert className="extra">Test</Alert>);
    expect(screen.getByRole("alert")).toHaveClass("extra");
  });
});
