import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../card";

describe("Card", () => {
  it("renders a card container", () => {
    render(<Card data-testid="card">Content</Card>);
    expect(screen.getByTestId("card")).toBeInTheDocument();
  });

  it("renders all card sub-components", () => {
    render(
      <Card data-testid="card">
        <CardHeader data-testid="header">
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent data-testid="content">Body</CardContent>
        <CardFooter data-testid="footer">Footer</CardFooter>
      </Card>,
    );

    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("merges custom className on Card", () => {
    const { container } = render(<Card className="extra">Content</Card>);
    expect(container.firstChild).toHaveClass("extra");
    expect(container.firstChild).toHaveClass("rounded-xl");
  });

  it("merges custom className on CardHeader", () => {
    render(<CardHeader className="header-extra" data-testid="h" />);
    expect(screen.getByTestId("h")).toHaveClass("header-extra");
  });

  it("merges custom className on CardContent", () => {
    render(<CardContent className="content-extra" data-testid="c" />);
    expect(screen.getByTestId("c")).toHaveClass("content-extra");
  });
});
