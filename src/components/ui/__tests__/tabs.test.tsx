import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../tabs";

describe("Tabs", () => {
  it("renders tabs with triggers and content", () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Tab A</TabsTrigger>
          <TabsTrigger value="b">Tab B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content A</TabsContent>
        <TabsContent value="b">Content B</TabsContent>
      </Tabs>,
    );
    expect(screen.getByText("Tab A")).toBeInTheDocument();
    expect(screen.getByText("Tab B")).toBeInTheDocument();
    expect(screen.getByText("Content A")).toBeInTheDocument();
  });

  it("switches content when clicking a tab", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Tab A</TabsTrigger>
          <TabsTrigger value="b">Tab B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content A</TabsContent>
        <TabsContent value="b">Content B</TabsContent>
      </Tabs>,
    );
    await user.click(screen.getByText("Tab B"));
    expect(screen.getByText("Content B")).toBeInTheDocument();
  });

  it("merges custom className on TabsList", () => {
    render(
      <Tabs defaultValue="a">
        <TabsList className="custom-list" data-testid="list">
          <TabsTrigger value="a">Tab</TabsTrigger>
        </TabsList>
      </Tabs>,
    );
    expect(screen.getByTestId("list")).toHaveClass("custom-list");
  });
});
