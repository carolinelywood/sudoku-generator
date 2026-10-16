import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { CELLS } from "../constants";
import { SudokuGrid } from "./SudokuGrid";

// prettier-ignore
const TEST_PUZZLE = [
  3, 0, 6, 5, 1, 0, 0, 0, 0,
  0, 9, 2, 0, 0, 0, 3, 0, 4,
  0, 0, 8, 2, 9, 3, 7, 6, 0,
  0, 3, 0, 0, 0, 2, 5, 0, 0,
  0, 0, 9, 0, 0, 0, 4, 0, 0,
  7, 0, 0, 4, 5, 0, 6, 3, 0,
  8, 0, 5, 1, 4, 7, 2, 0, 3,
  0, 0, 7, 0, 3, 9, 8, 0, 0,
  0, 0, 3, 0, 2, 5, 1, 7, 0,
];
const EMPTY_CELL = "Row 1, column 2";

function Grid({ puzzle }: { puzzle: number[] }) {
  const [cells, setCells] = useState(
    puzzle.map((n) => (n === 0 ? "" : String(n))),
  );
  return <SudokuGrid cells={cells} puzzle={puzzle} setCells={setCells} />;
}

function renderGrid(puzzle = TEST_PUZZLE) {
  render(<Grid puzzle={puzzle} />);
  return screen.getAllByRole("textbox");
}

describe("SudokuGrid component", () => {
  it("contains the correct number of cells", () => {
    renderGrid(Array(CELLS).fill(0));
    expect(screen.getAllByRole("textbox")).toHaveLength(CELLS);
  });

  it("cells are correctly populated with starting numbers", () => {
    renderGrid();

    const cellInputs = screen.getAllByRole("textbox");
    const cells = TEST_PUZZLE.map((n) => (n === 0 ? "" : String(n)));

    cellInputs.forEach((cellInput, index) => {
      expect(cellInput).toHaveValue(cells[index]);
    });
  });

  it("starting cells are read-only", () => {
    renderGrid();
    const cellInputs = screen.getAllByRole("textbox");

    cellInputs.forEach((cell, index) => {
      if (TEST_PUZZLE[index] !== 0) expect(cell).toHaveAttribute("readonly");
    });
  });

  it("empty cells are editable", () => {
    renderGrid();
    const cellInputs = screen.getAllByRole("textbox");

    cellInputs.forEach((cell, index) => {
      if (TEST_PUZZLE[index] === 0)
        expect(cell).not.toHaveAttribute("readonly");
    });
  });

  it("only one digit can be typed into a cell", async () => {
    renderGrid();
    const cellInput = screen.getByLabelText("Row 1, column 2");

    await userEvent.type(cellInput, "12");
    expect(cellInput).toHaveValue("1");
  });

  it.each(["a", ".", "0"])("ignores %s character", async (input) => {
    renderGrid();
    const cell = screen.getByLabelText(EMPTY_CELL);

    await userEvent.type(cell, input);
    expect(cell).toHaveValue("");
  });
});
