import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../table";

describe("Table", () => {
  it("renders a table with header and body", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alpha</TableCell>
            <TableCell>100</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("renders the correct HTML elements", () => {
    const { container } = render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>H</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>C</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(container.querySelector("table")).toBeInTheDocument();
    expect(container.querySelector("thead")).toBeInTheDocument();
    expect(container.querySelector("tbody")).toBeInTheDocument();
    expect(container.querySelector("th")).toHaveTextContent("H");
    expect(container.querySelector("td")).toHaveTextContent("C");
  });
});
